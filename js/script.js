/* -- script.js do meu portfólio -- */

/* ── NAV ATIVO AO ROLAR ── */
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


/* ── ANIMAÇÃO REVEAL ── */
const elementosReveal = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
    }
  });
}, {
  threshold: 0.1
});

elementosReveal.forEach(el => observer.observe(el));


/* ── FORMULÁRIO DE CONTATO ── */
const formulario = document.getElementById("formContato");

if (formulario) {

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    const status = document.getElementById("mensagemStatus");

    /* ── validação campos ── */
    if (!nome || !email || !mensagem) {
      status.style.color = "#d9534f";
      status.textContent = "Preencha todos os campos.";
      return;
    }

    /* ── validação e-mail ── */
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

    if (!emailValido) {
      status.style.color = "#d9534f";
      status.textContent = "Por favor, insira um e-mail válido.";
      return;
    }

    /* ── envio EmailJS ── */
    emailjs.send(
      "service_xhw180h",   // 🔴 TROQUE AQUI PELO SEU SERVICE ID REAL
      "template_3t1qp9z",
      {
        name: nome,
        email: email,
        message: mensagem
      }
    )
    .then(function () {
      status.style.color = "#3b5c45";
      status.textContent = "Mensagem enviada com sucesso!";
      formulario.reset();
    })
    .catch(function (error) {
      console.error("Erro ao enviar:", error);
      status.style.color = "#d9534f";
      status.textContent = "Erro ao enviar a mensagem.";
    });

  });

}