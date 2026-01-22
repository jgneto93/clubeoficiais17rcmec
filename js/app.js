const API = "https://script.google.com/macros/s/AKfycbxUwf5i-bbchKxJCKCP2PtJxBhQUv0LhkCueLOuuivG7j4yA-IDMaNTlwWzRgiKoT4/exec";

// Calendário
flatpickr("#data", {
  dateFormat: "Y-m-d",
  minDate: "today"
});

document.getElementById("btnReservar").onclick = async () => {

  const mensagem = document.getElementById("mensagem");

  // Limpa mensagens antigas
  mensagem.innerText = "";
  mensagem.className = "mensagem";

  const nome = document.getElementById("nome").value.trim();
  const posto = document.getElementById("posto").value.trim();
  const local = document.getElementById("local").value;
  const data = document.getElementById("data").value;
  const turno = document.getElementById("turno").value;

  // Validação bá
