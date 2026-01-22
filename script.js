const telefoneWhatsApp = "5513988682642"; // <<< TROQUE PELO SEU NÚMERO

const jogos = [
  {
    hora: "11h",
    timeA: "Continental FC",
    escudoA: "img/continental.png",
    timeB: "Jamaica",
    escudoB: "img/jamaica.png"
  },
  {
    hora: "12h",
    timeA: "Central FC",
    escudoA: "img/central.png",
    timeB: "Meirelles",
    escudoB: "img/meirelles.png"
  }
];

const container = document.getElementById("jogos");

jogos.forEach(jogo => {
  let resultadoSelecionado = null;

  const card = document.createElement("div");
  card.className = "jogo";

  card.innerHTML = `
    <div class="linha-jogo">

      <div class="linha-info">
        <span class="horario">${jogo.hora}</span>

        <div class="unica-linha-times">
          <div class="time time-a">
            <img src="${jogo.escudoA}" class="logo" alt="${jogo.timeA}">
            <span>${jogo.timeA}</span>
          </div>

          <strong class="versus">x</strong>

          <div class="time time-b">
            <span>${jogo.timeB}</span>
            <img src="${jogo.escudoB}" class="logo" alt="${jogo.timeB}">
          </div>
        </div>
      </div>

    </div>

    <div class="aposta" style="display:none;">
      <div class="aposta-coluna">

        <div class="opcoes-resultado">
          <div class="opcao" data-res="1">1</div>
          <div class="opcao" data-res="X">X</div>
          <div class="opcao" data-res="2">2</div>
        </div>

        <input
          type="text"
          class="valor-aposta"
          placeholder="Valor da aposta (máx. R$ 1.000,00)"
          disabled
        >

        <button class="btn-validar" disabled>
          Validar aposta
        </button>

      </div>
    </div>
  `;

  const linhaJogo = card.querySelector(".linha-jogo");
  const painel = card.querySelector(".aposta");
  const botoesResultado = card.querySelectorAll(".opcao");
  const inputValor = card.querySelector(".valor-aposta");
  const btnValidar = card.querySelector(".btn-validar");

  /* Abrir / fechar painel */
  linhaJogo.addEventListener("click", () => {
    painel.style.display = painel.style.display === "none" ? "block" : "none";
  });

  /* Seleção do resultado */
  botoesResultado.forEach(botao => {
    botao.addEventListener("click", (event) => {
      event.stopPropagation();

      botoesResultado.forEach(b => b.classList.remove("ativo"));
      botao.classList.add("ativo");

      resultadoSelecionado = botao.dataset.res;
      inputValor.disabled = false;
      btnValidar.disabled = false;
    });
  });

  /* Formatação do valor */
  inputValor.addEventListener("input", (event) => {
    event.stopPropagation();

    let v = inputValor.value.replace(/\D/g, "");
    if (!v) {
      inputValor.value = "";
      return;
    }

    v = Math.min(Number(v), 100000); // até 1.000,00
    v = (v / 100).toFixed(2).replace(".", ",");
    v = v.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    inputValor.value = v;
  });

  /* Validação WhatsApp */
  btnValidar.addEventListener("click", (event) => {
    event.stopPropagation();

    const valor = inputValor.value;

    if (!resultadoSelecionado) {
      alert("Selecione o resultado da partida.");
      return;
    }

    if (!valor) {
      alert("Informe o valor da aposta.");
      return;
    }

    let resultadoTexto = "";
    if (resultadoSelecionado === "1") resultadoTexto = jogo.timeA;
    if (resultadoSelecionado === "2") resultadoTexto = jogo.timeB;
    if (resultadoSelecionado === "X") resultadoTexto = "Empate";

    const mensagem = `
Aposta – Copa Área Continental 2025

Jogo: ${jogo.timeA} x ${jogo.timeB}
Resultado: ${resultadoTexto}
Valor: R$ ${valor}
    `.trim();

    const url =
      `https://wa.me/${telefoneWhatsApp}?text=` +
      encodeURIComponent(mensagem);

    window.open(url, "_blank");
  });

  container.appendChild(card);
});
