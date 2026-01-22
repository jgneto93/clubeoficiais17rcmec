const API = "https://script.google.com/macros/s/AKfycbxUwf5i-bbchKxJCKCP2PtJxBhQUv0LhkCueLOuuivG7j4yA-IDMaNTlwWzRgiKoT4/exec";

const dataInput = document.getElementById("data");
const localSelect = document.getElementById("local");
const turnosDiv = document.getElementById("turnos");
const mensagem = document.getElementById("mensagem");

let turnoSelecionado = null;

dataInput.addEventListener("change", carregarTurnos);
localSelect.addEventListener("change", carregarTurnos);

async function carregarTurnos() {
  turnosDiv.innerHTML = "";
  mensagem.innerText = "";
  turnoSelecionado = null;

  const data = dataInput.value;
  const local = localSelect.value;

  if (!data) {
    turnosDiv.innerHTML = "<em>Selecione uma data</em>";
    return;
  }

  turnosDiv.innerHTML = "Carregando...";

  try {
    const res = await fetch(`${API}?acao=disponibilidade&data=${data}&local=${local}`);
    const turnos = await res.json();

    turnosDiv.innerHTML = "";

    if (turnos.length === 0) {
      turnosDiv.innerHTML = "<strong>Nenhum turno disponível</strong>";
      return;
    }

    turnos.forEach(turno => {
      const btn = document.createElement("button");
      btn.innerText = turno;
      btn.onclick = () => selecionarTurno(btn, turno);
      turnosDiv.appendChild(btn);
    });

  } catch (e) {
    turnosDiv.innerHTML = "Erro ao carregar turnos";
  }
}

function selecionarTurno(botao, turno) {
  document.querySelectorAll(".turnos button").forEach(b => b.classList.remove("selecionado"));
  botao.classList.add("selecionado");
  turnoSelecionado = turno;
}

  document.getElementById("btnReservar").onclick = async () => {
  
    const turnoSelect = document.getElementById("turno");
    const turno = turnoSelect.value;
  
    console.log("Turno selecionado:", turno); // debug
  
    if (!turno) {
      mensagem.innerText = "Selecione um turno";
      return;
    }
  
    const dados = {
      nome: document.getElementById("nome").value.trim(),
      posto: document.getElementById("posto").value.trim(),
      local: document.getElementById("local").value,
      data: document.getElementById("data").value,
      turno: turno
    };
  
    const res = await fetch(API, {
      method: "POST",
      body: JSON.stringify(dados)
    });
  
    const r = await res.json();
  
    mensagem.innerText =
      r.status === "ok"
        ? "Reserva confirmada!"
        : "⚠️ Este local já está reservado nesse turno.";
  };


  const dados = {
    nome: document.getElementById("nome").value,
    posto: document.getElementById("posto").value,
    local: localSelect.value,
    data: dataInput.value,
    turno: turnoSelecionado
  };

  const res = await fetch(API, {
    method: "POST",
    body: JSON.stringify(dados)
  });

  const r = await res.json();
  mensagem.innerText = r.status === "ok" ? "Reserva confirmada!" : r.mensagem;
};
