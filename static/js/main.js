/**
 * Mostra na tela os membros do Grupo Tesseract
 * cadastrados no GitHub.
 */
function mostrarMembrosGrupoTesseract() {
  let url = 'https://api.github.com/orgs/grupotesseract/public_members';
  $.ajax({
    url: url,
    method: 'GET',
    beforeSend: function() {},
    success: function(response) {
      const membrosGrupoTesseract = response;
      let html = '';
      html += '<ul id="membros">';
      membrosGrupoTesseract.forEach(function(membro) {
        html += '<li id="' + membro.login + '" class="membro">';
        html += '<a class="membro-detalhes" href="' + membro.url + '">';
        html += '<figure class="figure">';
        html += '<img';
        html += ' class="membro-avatar"';
        html += ' src="' + membro.avatar_url + '"';
        html += ' />';
        html += '<figcaption class="figure-caption">';
        html += membro.login;
        html += '</figcaption>';
        html += '</figure>';
        html += '</a>';
        html += '</li>';
      });
      html += '</ul>';
      const content = $('#content');
      content.html(html);

      let linksMembroDetalhes = $('.membro-detalhes');
      linksMembroDetalhes.each(function(index, linkMembroDetalhe) {
        $(linkMembroDetalhe).click(function(event) {
          event.preventDefault();
          let url = linkMembroDetalhe.href;
          console.log(url);
          mostrarDetalhesMembro(url);
        });
      });
    },
    fail: function(response) {
      console.error(response);
    }
  });
}

function mostrarDetalhesMembro(url) {
  try {
    $.ajax({
      url: url,
      method: 'GET',
      success: function(response) {
        let dadosMembro = 'INFORMAÇÕES\n\n';
        dadosMembro += 'Nome: ' + response.name;
        dadosMembro += '\n';
        dadosMembro += 'Quantidade de repositórios: ' + response.public_repos;
        dadosMembro += '\n';
        dadosMembro += 'Quantidade de seguidores: ' + response.followers;
        dadosMembro += '\n';
        var dataIngresso = new Date(response.created_at).toLocaleDateString();
        dadosMembro += 'Data de ingresso: ' + dataIngresso;
        alert(dadosMembro);
      },
      fail: function(response) {
        console.error(response);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

$(document).ready(function(event) {
  mostrarMembrosGrupoTesseract();

  let campoPesquisa = document.getElementById('pesquisa');
  let botaoLimpar = document.getElementById('limpar');

  botaoLimpar.onclick = function(event) {
    campoPesquisa.value = '';
    let membrosGrupoTesseract = $('.membro');
    $(membrosGrupoTesseract).each(function(index, membro) {
      $(membro).show();
    });
  };

  $(campoPesquisa).keyup(function(event) {
    var termoPesquisado = event.target.value;
    if (termoPesquisado) {
      let membrosGrupoTesseract = $('.membro');
      $(membrosGrupoTesseract).each(function(index, membro) {
        var regex = new RegExp('^.*' + termoPesquisado + '.*$', 'gmi');
        if (regex.test($(membro).attr('id'))) {
          $(membro).show();
        } else {
          $(membro).hide();
        }
      });
    } else {
      $('.membro').show();
    }
  });
});
