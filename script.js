const telefoneWhatsApp = "5511999999999";

const jogos = [
  { a: "Continental FC", b: "Jamaica", hora: "11h" },
  { a: "Central FC", b: "Meirelles", hora: "12h" },
  { a: "Unidos da Rua 6", b: "Praça 12", hora: "13h" },
  { a: "Vila Nova Mariana", b: "Evolução", hora: "14h" },
  { a: "Última Ponte Humaitá", b: "S.C Juventude", hora: "15h" },
  { a: "Projetada FC", b: "A.D Alvorada", hora: "16h" },
  { a: "Cyclone FC", b: "Skina FC", hora: "17h" }
];

const container = document.getElementById("jogos");

jogos.forEach(jogo => {
  const div = document.createElement("div");
  div.className = "jogo";

  div.innerHTML = `
    <div class="linha-jogo">
      <div class="hora">${jogo.hora}</div>
      <div class="logo"></div>
      <div class="time">${jogo.a}</div>
      <div class="x">X</div>
      <div class="time">${jogo.b}</div>
      <div class="logo"></div>
    </div>

    <div class="caderneta">
      <input type="text"
        placeholder="Valor da aposta (máx. 1.000,00)"
        oninput="formatarValor(this)"
        onclick="event.stopPropagation()">

      <button onclick="enviarWhatsApp(event, '${jogo.a}', '${jogo.b}', '${jogo.hora}')">
        Validar aposta
      </button>
    </div>
  `;

  // abre / fecha ao clicar no card
  div.addEventListener("click", () => {
    const c = div.querySelector(".caderneta");
    c.style.display = c.style.display === "block" ? "none" : "block";
  });

  // impede que clique dentro da caderneta feche
  div.querySelector(".caderneta").addEventListener("click", e => {
    e.stopPropagation();
  });

  container.appendChild(div);
});

function formatarValor(input) {
  let v = input.value.replace(/\D/g, "");
  v = Math.min(v, 100000); // 1000,00
  v = (v / 100).toFixed(2);
  input.value = v.replace(".", ",");
}

function enviarWhatsApp(event, a, b, hora) {
  event.stopPropagation();

  const input = event.target.previousElementSibling;
  if (!input.value) {
    alert("Informe o valor da aposta");
    return;
  }

  const msg =
    `Aposta:\n${a} X ${b}\nHorário: ${hora}\nValor: R$ ${input.value}`;

  window.open(
    `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(msg)}`,
    "_blank"
  );
}
