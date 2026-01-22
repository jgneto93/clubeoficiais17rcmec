const API = "https://script.google.com/macros/s/AKfycbxUwf5i-bbchKxJCKCP2PtJxBhQUv0LhkCueLOuuivG7j4yA-IDMaNTlwWzRgiKoT4/exec";

document.addEventListener("DOMContentLoaded", () => {

  // 🔹 Inicializa o calendário corretamente
  flatpickr("#data", {
    dateFormat: "Y-m-d",
    minDate: "today",
    locale: "pt"
  });

  document.getElementById("btnReservar").onclick = reservar;
});

async function reservar() {
  const mensagem = document.getElementById("mensagem");

  mensagem.innerText = "";
  mensagem.className = "mensagem";

  const nome = document.getElementById("nome").value.trim();
  const posto = document.getElementById("posto").value.trim();
  const local = document.getElementById("local").value;
  const data = document.getElementById("data").value;
  const turno = document.getElementById("turno").value;

  if (!nome || !posto || !data || !turno) {
    mensagem.innerText = "Preencha todos os campos e selecione o turno.";
    mensagem.classList.add("erro");
    return;
  }

  const dados = { nome, posto, local, data, turno };

  try {
    const res = await fetch(API, {
      method: "POST",
      body: JSON.stringify(dados)
    });

    const r = await res.json();

    if (r.status === "ok") {
      mensagem.innerText = "✅ Reserva confirmada com sucesso!";
      mensagem.classList.add("sucesso");
      document.getElementById("turno").value = "";
    } else {
      mensagem.innerText = "⚠️ Este local já está reservado nesse turno.";
      mensagem.classList.add("erro");
    }

  } catch {
    mensagem.innerText = "Erro ao comunicar com o servidor.";
    mensagem.classList.add("erro");
  }
}
