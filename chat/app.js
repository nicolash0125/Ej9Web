var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const clients = [
    { id: 1, name: "Nestle" },
    { id: 2, name: "IBM" },
    { id: 3, name: "Apple" },
  ];

app.get("/api/clients", (req, res) => {
    res.send(clients);
  });

app.get("/api/clients/:id", (req, res) => {
    const client = clients.find((c) => c.id === parseInt(req.params.id));
    if (!client)
      return res.status(404).send("The client with the given id was not found.");
    res.send(client);
});

app.post("/api/clients", (req, res) => {
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      return res.status(400).send(error);
    }
  
    const client = {
      id: clients.length + 1,
      name: req.body.name,
    };
  
    clients.push(client);
    res.send(client);
});
  
app.put("/api/clients/:id", (req, res) => {
    const client = clients.find((c) => c.id === parseInt(req.params.id));
    if (!client)
      return res.status(404).send("The client with the given id was not found.");
  
    const schema = Joi.object({
      name: Joi.string().min(3).required(),
    });
  
    const { error } = schema.validate(req.body);
  
    if (error) {
      return res.status(400).send(error);
    }
  
    client.name = req.body.name;
  
    res.send(client);
});
  
app.delete("/api/clients/:id", (req, res) => {
    const client = clients.find((c) => c.id === parseInt(req.params.id));
    if (!client)
      return res.status(404).send("The client with the given id was not found.");
  
    const index = clients.indexOf(client);
    clients.splice(index, 1);
  
    res.send(client);
  });
  


module.exports = app;
