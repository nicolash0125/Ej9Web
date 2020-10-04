var express = require('express');
var router = express.Router();
const ws = require("../wslib");

var mongo = require("../controller/mongo");

/* GET home page. */
router.get('/', function (req, res, next) {
    mongo.getDatabase(db => {
        mongo.findDocuments(db, docs => {
        res.send(docs);
      })
    });
  });


router.get('/:id',function (req,res,next) {
    const ts = parseInt(req.params.id) 
    mongo.getDatabase(db =>{
        mongo.findMessage(db,ts, element =>{
            res.send(element)
        })
        
    })    
})


router.post('/', function (req, res, next) {
    mongo.getDatabase(db => {
      mongo.insertDocuments(db, data => {
        res.send(req.body);
      }, req.body)
    });
  });
  router.delete('/:id', function (req, res, next) {
      mongo.getDatabase(db => {
        const ts = parseInt(req.params.id) 
        
        mongo.deleteMessage(db,ts).then(element=>{
            res.send('Eliminado'+ element)
        })
       
      })
      
  })
  router.put("/:id", function (req, res, next) {
      mongo.getDatabase(db =>{
        const ts = parseInt(req.params.id) 
        mongo.updateMessage(db,ts,req.body).then(element=>{
            res.send('Actualizado'+element)
        })
      })
  })


  
module.exports = router;