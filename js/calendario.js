// Script para o calendário da agenda
document.addEventListener("DOMContentLoaded", function () {
  // Inicializar calendário
  inicializarCalendarioAgenda();

  // Event listeners para os botões de agendamento
  const botoesAgendar = document.querySelectorAll(
    ".btn-agendar-hora:not([disabled])"
  );
  botoesAgendar.forEach((botao) => {
    botao.addEventListener("click", function () {
      const hora = this.parentElement.querySelector(".hora").textContent;
      const data = document.getElementById("data-selecionada").textContent;

      alert(`Redirecionando para agendamento: ${data} às ${hora}`);
      window.location.href = "/view/agendamento.html";
    });
  });

  // Filtros da agenda
  const btnAplicarFiltros = document.querySelector(
    ".agenda-filtros .btn-primary"
  );
  if (btnAplicarFiltros) {
    btnAplicarFiltros.addEventListener("click", function () {
      const profissional = document.getElementById("filtro-profissional").value;
      const servico = document.getElementById("filtro-servico").value;
      const data = document.getElementById("filtro-data").value;

      alert(
        `Filtros aplicados:\nProfissional: ${profissional}\nServiço: ${servico}\nData: ${data}`
      );
      // Aqui viria a lógica real de filtragem
    });
  }
});

function inicializarCalendarioAgenda() {
  const hoje = new Date();
  const calendarioGrid = document.querySelector(".calendario-grid");
  const mesAnoElemento = document.querySelector(".calendario-header h2");

  if (!calendarioGrid) return;

  // Limpar calendário
  calendarioGrid.innerHTML = "";

  // Configurar mês e ano
  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  mesAnoElemento.textContent = `${
    meses[hoje.getMonth()]
  } ${hoje.getFullYear()}`;

  // Obter primeiro dia do mês e último dia do mês
  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

  // Dias da semana (0 = Domingo, 1 = Segunda, etc.)
  const diaInicio = primeiroDia.getDay();
  const totalDias = ultimoDia.getDate();

  // Adicionar dias vazios no início se necessário
  for (let i = 0; i < diaInicio; i++) {
    const emptyDay = document.createElement("div");
    emptyDay.classList.add("calendario-dia", "vazio");
    calendarioGrid.appendChild(emptyDay);
  }

  // Adicionar os dias do mês
  for (let i = 1; i <= totalDias; i++) {
    const day = document.createElement("div");
    day.classList.add("calendario-dia");

    // Verificar se é hoje
    if (i === hoje.getDate() && hoje.getMonth() === new Date().getMonth()) {
      day.classList.add("hoje");
    }

    // Verificar se é fim de semana
    const diaSemana = new Date(hoje.getFullYear(), hoje.getMonth(), i).getDay();
    if (diaSemana === 0 || diaSemana === 6) {
      day.classList.add("fim-de-semana");
    }

    // Adicionar número do dia
    const diaNumero = document.createElement("span");
    diaNumero.classList.add("dia-numero");
    diaNumero.textContent = i;
    day.appendChild(diaNumero);

    // Adicionar indicador de disponibilidade (aleatório para demonstração)
    const disponibilidade = document.createElement("div");
    disponibilidade.classList.add("disponibilidade");

    // Simular disponibilidade (70% de chance de ter horários disponíveis)
    if (Math.random() > 0.3) {
      disponibilidade.classList.add("disponivel");

      // Adicionar número de horários disponíveis (1-8)
      const horariosDisponiveis = Math.floor(Math.random() * 8) + 1;
      disponibilidade.textContent = `${horariosDisponiveis} horários`;
    } else {
      disponibilidade.classList.add("indisponivel");
      disponibilidade.textContent = "Lotado";
    }

    day.appendChild(disponibilidade);

    // Adicionar evento de clique
    day.addEventListener("click", function () {
      document.querySelectorAll(".calendario-dia").forEach((d) => {
        d.classList.remove("selecionado");
      });
      this.classList.add("selecionado");

      // Atualizar data selecionada
      const dataSelecionada = `${i.toString().padStart(2, "0")}/${(
        hoje.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}/${hoje.getFullYear()}`;
      document.getElementById("data-selecionada").textContent = dataSelecionada;

      // Simular carregamento de horários
      carregarHorariosDisponiveis(dataSelecionada);
    });

    calendarioGrid.appendChild(day);
  }

  // Navegação do calendário
  const botoesNav = document.querySelectorAll(".nav-btn");
  botoesNav.forEach((botao, index) => {
    botao.addEventListener("click", function () {
      hoje.setMonth(hoje.getMonth() + (index === 0 ? -1 : 1));
      inicializarCalendarioAgenda();
    });
  });
}

function carregarHorariosDisponiveis(data) {
  // Simular carregamento de horários disponíveis
  const horariosLista = document.querySelector(".horarios-lista");
  horariosLista.innerHTML = "";

  const horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
  ];

  horarios.forEach((hora) => {
    const horarioDiv = document.createElement("div");
    horarioDiv.classList.add("horario-disponivel");

    // Simular disponibilidade (70% de chance de estar disponível)
    const disponivel = Math.random() > 0.3;

    const spanHora = document.createElement("span");
    spanHora.classList.add("hora");
    spanHora.textContent = hora;

    const spanStatus = document.createElement("span");
    spanStatus.classList.add("status");
    spanStatus.classList.add(disponivel ? "disponivel" : "ocupado");
    spanStatus.textContent = disponivel ? "Disponível" : "Ocupado";

    const botaoAgendar = document.createElement("button");
    botaoAgendar.classList.add("btn-agendar-hora");
    botaoAgendar.textContent = "Agendar";

    if (!disponivel) {
      botaoAgendar.disabled = true;
    } else {
      botaoAgendar.addEventListener("click", function () {
        alert(`Redirecionando para agendamento: ${data} às ${hora}`);
        window.location.href = "/view/agendamento.html";
      });
    }

    horarioDiv.appendChild(spanHora);
    horarioDiv.appendChild(spanStatus);
    horarioDiv.appendChild(botaoAgendar);

    horariosLista.appendChild(horarioDiv);
  });
}
