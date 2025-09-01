// Script específico para a página de agendamento
document.addEventListener("DOMContentLoaded", function () {
  // Atualizar resumo do agendamento
  const form = document.getElementById("formAgendamentoCompleto");
  const servicoSelect = document.getElementById("servico");
  const profissionalSelect = document.getElementById("profissional");

  // Event listeners para atualizar o resumo
  if (servicoSelect) {
    servicoSelect.addEventListener("change", atualizarResumo);
  }

  if (profissionalSelect) {
    profissionalSelect.addEventListener("change", atualizarResumo);
  }

  // Selecionar horário
  const horarioButtons = document.querySelectorAll(".horario-btn");
  horarioButtons.forEach((button) => {
    button.addEventListener("click", function () {
      horarioButtons.forEach((btn) => btn.classList.remove("selected"));
      this.classList.add("selected");
      atualizarResumo();
    });
  });

  // Calendário
  inicializarCalendario();

  // Submit do formulário
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      nextStep(5);
      atualizarConfirmacao();
    });
  }

  function atualizarResumo() {
    const servico = servicoSelect.options[servicoSelect.selectedIndex].text;
    const profissional = profissionalSelect.value
      ? profissionalSelect.options[profissionalSelect.selectedIndex].text
      : "Qualquer profissional";

    const dataSelecionada = document.querySelector(".calendario-dia.selected");
    const data = dataSelecionada
      ? dataSelecionada.getAttribute("data-data")
      : "-";

    const horarioSelecionado = document.querySelector(".horario-btn.selected");
    const horario = horarioSelecionado ? horarioSelecionado.textContent : "-";

    document.getElementById("resumo-servico").textContent = servico;
    document.getElementById("resumo-profissional").textContent = profissional;
    document.getElementById("resumo-data").textContent = data;
    document.getElementById("resumo-horario").textContent = horario;
  }

  function atualizarConfirmacao() {
    document.getElementById("confirmacao-servico").textContent =
      document.getElementById("resumo-servico").textContent;

    document.getElementById("confirmacao-profissional").textContent =
      document.getElementById("resumo-profissional").textContent;

    document.getElementById("confirmacao-data").textContent =
      document.getElementById("resumo-data").textContent;

    document.getElementById("confirmacao-horario").textContent =
      document.getElementById("resumo-horario").textContent;
  }
});

function inicializarCalendario() {
  const hoje = new Date();
  const calendarioGrid = document.querySelector(".calendario-grid");

  // Se não encontrou o elemento, sair
  if (!calendarioGrid) return;

  // Limpar conteúdo existente (exceto os dias da semana)
  while (calendarioGrid.children.length > 7) {
    calendarioGrid.removeChild(calendarioGrid.lastChild);
  }

  // Obter primeiro dia do mês e último dia do mês
  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

  // Dias da semana (0 = Domingo, 1 = Segunda, etc.)
  const diaInicio = primeiroDia.getDay();
  const totalDias = ultimoDia.getDate();

  // Adicionar dias vazios no início se necessário
  for (let i = 0; i < diaInicio; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("calendario-dia", "disabled");
    emptyDay.innerHTML = "";
    calendarioGrid.appendChild(emptyDay);
  }

  // Adicionar os dias do mês
  for (let i = 1; i <= totalDias; i++) {
    const day = document.createElement("div");
    day.classList.add("calendario-dia");
    day.innerHTML = i;

    // Formatar data para exibição
    const dataCompleta = new Date(hoje.getFullYear(), hoje.getMonth(), i);
    const dataFormatada = dataCompleta.toLocaleDateString("pt-BR");
    day.setAttribute("data-data", dataFormatada);

    // Destacar o dia atual
    if (i === hoje.getDate() && hoje.getMonth() === new Date().getMonth()) {
      day.classList.add("selected");
    }

    // Adicionar evento de clique
    day.addEventListener("click", function () {
      document.querySelectorAll(".calendario-dia").forEach((d) => {
        d.classList.remove("selected");
      });
      this.classList.add("selected");

      // Atualizar resumo
      if (typeof atualizarResumo === "function") {
        atualizarResumo();
      }
    });

    calendarioGrid.appendChild(day);
  }

  // Atualizar título do mês/ano
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julio",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const calendarioMes = document.querySelector(".calendario-mes");
  if (calendarioMes) {
    calendarioMes.textContent = `${
      meses[hoje.getMonth()]
    } ${hoje.getFullYear()}`;
  }

  // Navegação do calendário
  const btnPrev = document.querySelector(
    ".calendario-navegacao button:first-child"
  );
  const btnNext = document.querySelector(
    ".calendario-navegacao button:last-child"
  );

  if (btnPrev && btnNext) {
    btnPrev.addEventListener("click", function () {
      hoje.setMonth(hoje.getMonth() - 1);
      inicializarCalendario();
    });

    btnNext.addEventListener("click", function () {
      hoje.setMonth(hoje.getMonth() + 1);
      inicializarCalendario();
    });
  }
}
