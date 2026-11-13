// Menu, navegação e rodapé.
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav a");
const footer = document.querySelector(".footer");

// Reinicia o destaque do contato para a animação aparecer sempre que o usuário entrar na seção.
const triggerContactHighlight = () => {
  if (!footer) return;

  footer.classList.remove("contact-highlight");
  void footer.offsetWidth; // força o navegador a recalcular o layout
  footer.classList.add("contact-highlight");

  window.clearTimeout(triggerContactHighlight.timeoutId);
  triggerContactHighlight.timeoutId = window.setTimeout(() => {
    footer.classList.remove("contact-highlight");
  }, 1300);
};

// Abre e fecha o menu em telas menores.
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navMenu.classList.toggle("nav--open");
  });
}

// Fecha o menu ao clicar em um item e ativa o destaque do contato quando for esse link.
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (navMenu) {
      navMenu.classList.remove("nav--open");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }

    if (link.getAttribute("href") === "#contato") {
      triggerContactHighlight();
    }
  });
});

// Se a página abrir já com o hash de contato, a animação entra na hora.
if (window.location.hash === "#contato") {
  triggerContactHighlight();
}

// Efeito das pílulas de tecnologia: elas se afastam do cursor quando o mouse passa por perto.
const techShowcase = document.querySelector(".tech-showcase");
const techPills = document.querySelectorAll(".tech-pill");

if (techShowcase && techPills.length) {
  const resetPills = () => {
    techPills.forEach((pill) => {
      pill.style.setProperty("--tx", "0px");
      pill.style.setProperty("--ty", "0px");
    });
  };

  techShowcase.addEventListener("pointermove", (event) => {
    const pointerX = event.clientX;
    const pointerY = event.clientY;

    techPills.forEach((pill) => {
      const pillRect = pill.getBoundingClientRect();
      const centerX = pillRect.left + pillRect.width / 2;
      const centerY = pillRect.top + pillRect.height / 2;
      const dx = centerX - pointerX;
      const dy = centerY - pointerY;
      const distance = Math.hypot(dx, dy) || 1;
      const influenceRadius = 180;
      const force = Math.max(0, 1 - distance / influenceRadius);
      const angle = Math.atan2(dy, dx);
      const pushX = Math.cos(angle) * force * 18;
      const pushY = Math.sin(angle) * force * 18;

      pill.style.setProperty("--tx", `${pushX}px`);
      pill.style.setProperty("--ty", `${pushY}px`);
    });
  });

  techShowcase.addEventListener("pointerleave", resetPills);
  techShowcase.addEventListener("pointercancel", resetPills);
}
