/**
 * PORTFÓLIO MARIA EDUARDA - SCRIPT PRINCIPAL
 * Funcionalidades: Menu responsivo, navegação com scroll ativo,
 * validação interativa do formulário de contato e efeitos dinâmicos.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Atualizar ano corrente no rodapé dinamicamente
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 2. Menu Mobile (Abrir / Fechar)
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');

      // Animação das barrinhas do botão hamburguer
      const bars = mobileToggle.querySelectorAll('.bar');
      if (bars.length === 3) {
        if (!isExpanded) {
          bars[0].style.transform = 'translateY(7.5px) rotate(45deg)';
          bars[1].style.opacity = '0';
          bars[2].style.transform = 'translateY(-7.5px) rotate(-45deg)';
        } else {
          bars[0].style.transform = 'none';
          bars[1].style.opacity = '1';
          bars[2].style.transform = 'none';
        }
      }
    });

    // Fechar menu ao clicar em qualquer link de navegação
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          const bars = mobileToggle.querySelectorAll('.bar');
          if (bars.length === 3) {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
          }
        }
      });
    });
  }

  // 3. Efeito no Cabeçalho ao Rolar a Página
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 4. Destaque do Link Ativo de Acordo com a Seção Visível
  const sections = document.querySelectorAll('section[id]');
  const handleScrollSpy = () => {
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const relatedLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (relatedLink && !relatedLink.classList.contains('nav-link-cta')) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach((l) => l.classList.remove('active'));
          relatedLink.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScrollSpy);

  // 5. Validação e Envio do Formulário de Contato
  const contactForm = document.getElementById('contact-form');
  const nomeInput = document.getElementById('nome');
  const emailInput = document.getElementById('email');
  const mensagemInput = document.getElementById('mensagem');
  const formFeedback = document.getElementById('form-feedback');
  const btnSubmit = document.getElementById('btn-submit');

  const errorNome = document.getElementById('error-nome');
  const errorEmail = document.getElementById('error-email');
  const errorMensagem = document.getElementById('error-mensagem');

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
  };

  const clearErrors = () => {
    [nomeInput, emailInput, mensagemInput].forEach((input) => {
      input.classList.remove('invalid');
    });
    [errorNome, errorEmail, errorMensagem].forEach((err) => {
      err.textContent = '';
      err.classList.remove('visible');
    });
    formFeedback.className = 'form-feedback';
    formFeedback.style.display = 'none';
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      clearErrors();

      let hasErrors = false;

      // Validação do Nome
      if (!nomeInput.value.trim()) {
        nomeInput.classList.add('invalid');
        errorNome.textContent = 'Por favor, informe seu nome.';
        errorNome.classList.add('visible');
        hasErrors = true;
      }

      // Validação do E-mail
      if (!emailInput.value.trim()) {
        emailInput.classList.add('invalid');
        errorEmail.textContent = 'Por favor, informe seu e-mail.';
        errorEmail.classList.add('visible');
        hasErrors = true;
      } else if (!validateEmail(emailInput.value.trim())) {
        emailInput.classList.add('invalid');
        errorEmail.textContent = 'Por favor, digite um endereço de e-mail válido.';
        errorEmail.classList.add('visible');
        hasErrors = true;
      }

      // Validação da Mensagem
      if (!mensagemInput.value.trim()) {
        mensagemInput.classList.add('invalid');
        errorMensagem.textContent = 'Por favor, escreva sua mensagem.';
        errorMensagem.classList.add('visible');
        hasErrors = true;
      } else if (mensagemInput.value.trim().length < 6) {
        mensagemInput.classList.add('invalid');
        errorMensagem.textContent = 'A mensagem deve conter pelo menos 6 caracteres.';
        errorMensagem.classList.add('visible');
        hasErrors = true;
      }

      if (hasErrors) {
        return;
      }

      // Simulação de envio com estado de carregamento
      const originalBtnText = btnSubmit.innerHTML;
      btnSubmit.disabled = true;
      btnSubmit.innerHTML = `
        <span>Enviando...</span>
        <svg class="spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
      `;

      setTimeout(() => {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = originalBtnText;

        const userName = nomeInput.value.trim();
        contactForm.reset();

        formFeedback.className = 'form-feedback success';
        formFeedback.innerHTML = `
          ✨ <strong>Obrigada pelo contato, ${userName}!</strong><br>
          Sua mensagem de demonstração foi registrada com sucesso. Logo retornarei!
        `;
        formFeedback.style.display = 'block';

        // Rolagem suave até a mensagem de sucesso
        formFeedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 900);
    });
  }

  // 6. Alternância de Modo Claro / Escuro (Theme Toggle)
  const themeToggle = document.getElementById('theme-toggle');

  const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      // Ignora erro se localStorage estiver desabilitado/bloqueado
    }

    if (themeToggle) {
      const isDark = theme === 'dark';
      themeToggle.setAttribute(
        'aria-label',
        isDark ? 'Ativar modo claro' : 'Ativar modo escuro'
      );
      themeToggle.setAttribute(
        'title',
        isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'
      );
    }
  };

  // Inicializa o tema atual (prioriza o atributo já definido pelo script inline do <head>)
  const activeTheme =
    document.documentElement.getAttribute('data-theme') ||
    localStorage.getItem('theme') ||
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light');

  applyTheme(activeTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  // Escuta alteração nas preferências do sistema se o usuário não salvou manualmente
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
});

