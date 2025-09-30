document.addEventListener('DOMContentLoaded', carregarLivros);

document.querySelector('#form-livro').addEventListener('click', async function(event) {
  event.preventDefault();

  const titulo = document.querySelector("#titulo").value;
  const autor = document.querySelector('#autor').value;
  const ano_publicacao = document.querySelector('#ano_publicacao').value;
  const genero = document.querySelector('#genero').value;
  const resumo = document.querySelector('#resumo').value;

  try {
      const res = await fetch('http://192.168.1.5:3000/livros', {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ 
              titulo: titulo, 
              autor: autor,
              ano_publicacao: ano_publicacao, 
              genero: genero,
              resumo: resumo
          })
      });

      if (res.ok) {
          alert('Livro cadastrado com sucesso!!');
      }
  } catch (error) {
      console.error("Erro ao cadastrar seu livro", error);
  }
});
  
async function carregarLivros() {
  try {
      const res = await fetch('http://192.168.1.5:3000/livrosCad');

      if (res.status == 200) {
          const livros = await res.json();
          console.log("Achamos o(os) livro(os)", livros);

          const listaLivros = document.querySelector('#lista-livros');
          listaLivros.innerHTML = '';

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
          console.error("Erro ao buscar seus livros:", res.status);
      }
  } catch (error) {
      console.error("Erro de conexão:", error);
  }
}
