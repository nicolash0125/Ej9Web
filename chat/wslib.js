const WebSocket = require("ws");

const clients = [];
const messages = [];

var mongo = require("./controller/mongo");

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      messages.push(message);
      mongo.getDatabase(db => {
        mongo.insertDocuments(db, data => {
          
        }, {mes:message,ts:3})
      });
      
      sendMessages();
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => client.send(JSON.stringify(messages)));
  };
};

exports.wsConnection = wsConnection;