const API = "https://script.google.com/macros/s/AKfycbxUwf5i-bbchKxJCKCP2PtJxBhQUv0LhkCueLOuuivG7j4yA-IDMaNTlwWzRgiKoT4/exec";

const mensagem = document.getElementById("mensagem");

document.getElementById("btnReservar").onclick = async () => {

  const nome = document.getElementById("nome").value.trim();
  const posto = document.getElementById("posto").value.trim();
  const local = document.getElementById("local").value;
  const data = document.getElementById("data").value;
  const turno = document.getElementById("turno").value;

  console.log({ nome, posto, local, data, turno }); // DEBUG

  if (!nome || !posto || !data || !turno) {
    mensagem.innerText = "Preencha todos os campos e selecione o turno.";
    return;
  }

  const dados = {
    nome,
    posto,
    local,
    data,
    turno
  };

  try {
    const res = await fetch(API, {
      method: "POST",
      body: JSON.stringify(dados)
    });

    const r = await res.json();

    mensagem.innerText =
      r.status === "ok"
        ? "✅ Reserva confirmada!"
        : "⚠️ Este local já está reservado nesse turno.";

  } catch (e) {
    mensagem.innerText = "Erro ao comunicar com o servidor.";
  }
};
