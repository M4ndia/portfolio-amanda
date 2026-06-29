/* =============================================
   SCRIPT.JS — Portfólio Amanda Pereira
   ============================================= */


/* ── 1. NAV ATIVO AO ROLAR ─────────────────── */
const secoes = document.querySelectorAll('section[id]');
const linksNav = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let secaoAtual = '';

  secoes.forEach(secao => {
    if (window.scrollY >= secao.offsetTop - 80) {
      secaoAtual = secao.id;
    }
  });

  linksNav.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + secaoAtual) {
      link.classList.add('active');
    }
  });
});


/* ── 2. ANIMAÇÃO DE ENTRADA (scroll reveal) ───
   O observer observa cada elemento com .reveal.
   Quando ele entra na tela, adiciona .visivel.

   CORREÇÃO: usamos threshold: 0 para disparar
   assim que qualquer pixel aparecer, e chamamos
   observer.observe() logo ao carregar a página
   para pegar os elementos já visíveis.
   ─────────────────────────────────────────── */
const elementosReveal = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
    }
  });
}, {
  threshold: 0       // dispara assim que qualquer pixel aparecer
});

// Observa todos os elementos — inclusive os já visíveis ao carregar
elementosReveal.forEach(el => observer.observe(el));

const formulario = document.getElementById("formContato");

if(formulario){

    formulario.addEventListener("submit", function(event){

        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        const status = document.getElementById("mensagemStatus");

        if(nome === "" || email === "" || mensagem === ""){

            status.style.color = "#d9534f";
            status.textContent = "Preencha todos os campos.";

            return;
        }

        emailjs.send(
            "amandape17@outlook.com",
            "template_3t1qp9z",
            {
                name: nome,
                email: email,
                message: mensagem
            }
        )
        .then(function(){

            status.style.color = "#3b5c45";
            status.textContent = "Mensagem enviada com sucesso!";

            formulario.reset();

        })
        .catch(function(error){

            console.error(error);

            status.style.color = "#d9534f";
            status.textContent = "Erro ao enviar a mensagem.";

        });

    });

}