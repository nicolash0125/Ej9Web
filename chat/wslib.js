const WebSocket = require("ws");

const clients = [];
const messages = [];

var mongo = require("./controller/mongo");

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (m) => {
      m =  JSON.parse(m)
      messages.push(m.message);
      mongo.getDatabase(db => {
        mongo.insertDocuments(db, data => {
          
        }, {autor:m.autor,message:m.message,ts:new Date().getTime()})
      });
      
      sendMessages();
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => client.send(JSON.stringify(messages)));
  };
};

exports.wsConnection = wsConnection;