document.querySelector('#cadastro').addEventListener('click', async(event) => {
    event.preventDefault();
    const Nome = document.querySelector('#pergunta').value;
    const Resp1 = document.querySelector('#alternativa1').value;
    const Resp2 = document.querySelector('#alternativa2').value;
    const Resp3 = document.querySelector('#alternativa3').value;
    const Resp4 = document.querySelector('#alternativa4').value;
    const RespostaCorreta = document.querySelector('#resposta').value;
    const Nivel = document.querySelector('#nivel').value;

    const res = await fetch ('http://192.168.1.21:3000/quest/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            question: Nome,
            option1: Resp1,
            option2: Resp2,
            option3: Resp3,
            option4: Resp4,
            gabarito: RespostaCorreta,
            nivel: Nivel
            })
    });

    if (res.status == 200) {
        alert('Postagem com sucesso')
    }
    else if (res.status == 500) {
        alert('Ops...houve um erro ao compartilhar sua pesquisa!')
    }
    else if (res.status == 409) {
        alert('Enunciado ja cadastrado')
    }
});// Função para carregar perguntas cadastradas
async function carregarPerguntas() {
    try {
        const res = await fetch('http://192.168.1.21:3000/quest/consulta', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.ok) {
            const perguntas = await res.json();
            exibirPerguntas(perguntas); // Exibe as perguntas na seção correta
        } else {
            console.error("Erro ao carregar perguntas");
        }
    } catch (error) {
        console.error("Erro ao tentar buscar perguntas", error);
    }
}

// Função para exibir perguntas na div correta
function exibirPerguntas(lista) {
    const container = document.getElementById("lista-perguntas"); // Seção onde as perguntas serão exibidas
    container.innerHTML = ""; // Limpa a lista antes de exibir as novas perguntas

    lista.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "card-pergunta";
        card.innerHTML = `
            <h4>${index + 1}. ${item.question}</h4>
            <p><strong>Alternativas:</strong></p>
            <ul>
                <li>A: ${item.option1}</li>
                <li>B: ${item.option2}</li>
                <li>C: ${item.option3}</li>
                <li>D: ${item.option4}</li>
            </ul>
            <p><strong>Resposta Correta:</strong> ${item[item.gabarito]}</p>
            <p><strong>Nível:</strong> ${item.nivel}</p>
        `;
        container.appendChild(card);
    });
}

// Função para cadastrar nova pergunta
document.querySelector('#cadastro').addEventListener('click', async (event) => {
    event.preventDefault();

    const Nome = document.querySelector('#pergunta').value;
    const Resp1 = document.querySelector('#alternativa1').value;
    const Resp2 = document.querySelector('#alternativa2').value;
    const Resp3 = document.querySelector('#alternativa3').value;
    const Resp4 = document.querySelector('#alternativa4').value;
    const RespostaCorreta = document.querySelector('#resposta').value;
    const Nivel = document.querySelector('#nivel').value;

    const res = await fetch('http://192.168.1.21:3000/quest/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            question: Nome,
            option1: Resp1,
            option2: Resp2,
            option3: Resp3,
            option4: Resp4,
            gabarito: RespostaCorreta,
            nivel: Nivel
        })
    });

    if (res.status == 200) {
        alert('Postagem com sucesso');
        carregarPerguntas(); // Atualiza a lista de perguntas após o cadastro
    }
    else if (res.status == 500) {
        alert('Ops...houve um erro ao compartilhar sua pesquisa!');
    }
    else if (res.status == 409) {
        alert('Enunciado já cadastrado');
    }
});

// Chama a função carregarPerguntas ao carregar a página para exibir as perguntas cadastradas
window.onload = carregarPerguntas;

