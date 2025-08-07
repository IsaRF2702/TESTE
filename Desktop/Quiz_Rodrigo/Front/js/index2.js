let questoes = [];
let respostas = {};
let indiceAtual = 0;

async function carregarQuestoes() {
  const response = await fetch('http://192.168.1.21:3000/quest/consulta');  // Faz a requisição para o backend
  questoes = await response.json();  // Recebe as questões, incluindo o gabarito (resposta certa)

  const respostasSalvas = localStorage.getItem("respostas");
  if (respostasSalvas) {
    respostas = JSON.parse(respostasSalvas);
  }

  exibirQuestao();  // Exibe a primeira questão
}

function exibirQuestao() {
  const perguntaElemento = document.getElementById("pergunta");
  const alternativasElemento = document.getElementById("alternativas");  // Ajuste aqui para o ID correto
  const questao = questoes[indiceAtual];

  const alternativas = [
    questao.option1,
    questao.option2,
    questao.option3,
    questao.option4,
  ];

  perguntaElemento.innerHTML = `<strong>${indiceAtual + 1}. ${questao.question}</strong>`;

  const alternativasHtml = alternativas.map((alt, i) => {
    const checked = respostas[questao.id] === alt ? "checked" : "";
    const letra = String.fromCharCode(65 + i);
    return `
      <label>
        <input type="radio" name="resposta" value="${alt}" ${checked}>
        <strong>${letra})</strong> ${alt}
      </label>
    `;
  }).join("");

  alternativasElemento.innerHTML = alternativasHtml;  // Exibe as alternativas corretamente

  atualizarBotoes();
}

function atualizarBotoes() {
  document.getElementById("btnAnterior").disabled = indiceAtual === 0;
  document.getElementById("btnProxima").style.display = (indiceAtual < questoes.length - 1) ? "inline-block" : "none";
  document.getElementById("btnFinalizar").style.display = (indiceAtual === questoes.length - 1) ? "inline-block" : "none";
}

document.getElementById("btnProxima").addEventListener("click", () => {
  salvarResposta();
  if (indiceAtual < questoes.length - 1) {
    indiceAtual++;
    exibirQuestao();
  }
});

document.getElementById("btnAnterior").addEventListener("click", () => {
  salvarResposta();
  if (indiceAtual > 0) {
    indiceAtual--;
    exibirQuestao();
  }
});

document.getElementById("prova").addEventListener("submit", (event) => {
  event.preventDefault();
  salvarResposta();
  let acertos = 0;

  questoes.forEach((questao) => {
    if (respostas[questao.id] === questao.gabarito) {
      acertos++;
    }
  });

  document.getElementById("resultado").innerText = `Você acertou ${acertos} de ${questoes.length} questões.`;
  document.getElementById("prova").style.display = "none";

  localStorage.removeItem("respostas");
});

function salvarResposta() {
  const selecionado = document.querySelector('input[name="resposta"]:checked');
  if (selecionado) {
    respostas[questoes[indiceAtual].id] = selecionado.value;
    localStorage.setItem("respostas", JSON.stringify(respostas));
  }
}

carregarQuestoes();
