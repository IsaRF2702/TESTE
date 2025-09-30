// Quando o DOM for completamente carregado, chama a função que lista os livros cadastrados
document.addEventListener('DOMContentLoaded', carregarLivros);

// Adiciona um evento de clique no elemento com id "form-livro"
document.querySelector('#form-livro').addEventListener('click', async function(event) {
  event.preventDefault(); // Impede que o formulário recarregue a página ao ser enviado

  // Coleta os valores digitados pelo usuário nos campos do formulário
  const titulo = document.querySelector("#titulo").value;
  const autor = document.querySelector('#autor').value;
  const ano_publicacao = document.querySelector('#ano_publicacao').value;
  const genero = document.querySelector('#genero').value;
  const resumo = document.querySelector('#resumo').value;

  try {
      // Envia os dados para o backend usando uma requisição POST
      const res = await fetch('http://192.168.1.5:3000/livros', {
          method: "POST",
          headers: {
              "Content-Type": "application/json" // Informa que o corpo da requisição está em JSON
          },
          body: JSON.stringify({ 
              titulo: titulo, 
              autor: autor,
              ano_publicacao: ano_publicacao, 
              genero: genero,
              resumo: resumo
          }) // Converte os dados em JSON
      });

      // Se a resposta for bem-sucedida, exibe um alerta
      if (res.ok) {
          alert('Livro cadastrado com sucesso!!');
      }
  } catch (error) {
      // Se der erro na requisição (ex: servidor offline), exibe no console
      console.error("Erro ao cadastrar seu livro", error);
  }
});
  
// Função que busca os livros cadastrados no backend e renderiza na tela
async function carregarLivros() {
  try {
      // Faz uma requisição GET para obter a lista de livros cadastrados
      const res = await fetch('http://192.168.1.5:3000/livrosCad');

      if (res.status == 200) {
          // Converte a resposta JSON em um array de objetos livro
          const livros = await res.json();
          console.log("Achamos o(os) livro(os)", livros);

          // Seleciona a lista onde os livros serão exibidos
          const listaLivros = document.querySelector('#lista-livros');
          listaLivros.innerHTML = ''; // Limpa a lista antes de renderizar os novos itens

          
          livros.forEach(livro => {
              const card = document.createElement('div');
              card.classList.add('card');

              card.innerHTML = `
                <h3>${livro.titulo}</h3>
                <p><strong>Autor:</strong> ${livro.autor}</p>
                <p><strong>Ano:</strong> ${livro.ano_publicacao}</p>
                <p><strong>Gênero:</strong> ${livro.genero}</p>
                <p><strong>Resumo:</strong> ${livro.resumo}</p>
              `;

              listaLivros.appendChild(card);
          });
      } else {
          // Exibe erro no console se a resposta não for 200
          console.error("Erro ao buscar seus livros:", res.status);
      }
  } catch (error) {
      // Exibe erro no console se houver falha na conexão
      console.error("Erro de conexão:", error);
  }
}
