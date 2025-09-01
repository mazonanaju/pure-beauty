// Controle do modal de agendamento
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("modalAgendamento");
  const btnAgendar = document.getElementById("btnAgendar");
  const closeModal = document.getElementById("closeModal");

  if (btnAgendar) {
    btnAgendar.addEventListener("click", () => {
      modal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      resetForm();
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      resetForm();
    }
  });

  // Navegação entre os passos do formulário
  window.nextStep = function (next) {
    document.querySelector(".form-step.active").classList.remove("active");
    document.getElementById("step" + next).classList.add("active");
  };

  window.prevStep = function (prev) {
    document.querySelector(".form-step.active").classList.remove("active");
    document.getElementById("step" + prev).classList.add("active");
  };

  // Reset do formulário ao fechar
  function resetForm() {
    document.querySelectorAll(".form-step").forEach((step) => {
      step.classList.remove("active");
    });
    document.getElementById("step1").classList.add("active");
    document.getElementById("formAgendamento").reset();
  }

  // Envio do formulário
  const formAgendamento = document.getElementById("formAgendamento");
  if (formAgendamento) {
    formAgendamento.addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "Agendamento realizado com sucesso! Em breve entraremos em contato para confirmação."
      );
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      resetForm();
    });
  }

  // Slider de depoimentos
  const depoimentosSlider = document.querySelector(".depoimentos-slider");
  if (depoimentosSlider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    depoimentosSlider.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - depoimentosSlider.offsetLeft;
      scrollLeft = depoimentosSlider.scrollLeft;
    });

    depoimentosSlider.addEventListener("mouseleave", () => {
      isDown = false;
    });

    depoimentosSlider.addEventListener("mouseup", () => {
      isDown = false;
    });

    depoimentosSlider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - depoimentosSlider.offsetLeft;
      const walk = (x - startX) * 2;
      depoimentosSlider.scrollLeft = scrollLeft - walk;
    });
  }

  // Menu mobile
  const menuToggle = document.createElement("button");
  menuToggle.innerHTML = "<span>☰</span>";
  menuToggle.classList.add("menu-toggle");
  const headerContent = document.querySelector(".header-content");
  if (headerContent) {
    headerContent.appendChild(menuToggle);

    menuToggle.addEventListener("click", function () {
      document.querySelector("nav").classList.toggle("show");
    });
  }
});
