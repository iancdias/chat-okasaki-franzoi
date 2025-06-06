const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMsg = input.value.trim();
  if (!userMsg) return;

  addMessage(userMsg, 'user-msg');
  input.value = '';

  const response = await fetch('https://iandcias.app.n8n.cloud/webhook/4ea83f2b-3a08-4074-aa52-a3176d3717af/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatInput: userMsg })
  });

  const data = await response.json();
  const botReply = data.text || data.resposta || 'Desculpe, não consegui responder.';

  addMessage(botReply, 'bot-msg');
});

function addMessage(message, className) {
  const div = document.createElement('div');
  div.className = className;
  div.textContent = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
