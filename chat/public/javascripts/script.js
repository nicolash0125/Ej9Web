const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  const html = data.map((item) => `<p>${item}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  let m = document.getElementById("message");
  let a = document.getElementById("autor");
  ws.send(
    JSON.stringify({autor: a.value,message: m.value})
  )
  
  m.value = "";
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
