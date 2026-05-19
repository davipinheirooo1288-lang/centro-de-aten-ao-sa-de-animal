const phoneNumber = "5585985412260";

const services = [
  ["Emergência 24h", "Atendimento rápido para casos que não podem esperar."],
  ["Clínico geral", "Consulta, avaliação inicial e orientação para o tutor."],
  ["Hospitalização", "Acompanhamento contínuo com equipe preparada."],
  ["Cardiologia", "Avaliação especializada para a saúde do coração."],
  ["Dermatologia", "Cuidado para pele, alergias e coceiras persistentes."],
  ["Oftalmologia", "Diagnóstico e tratamento para a saúde dos olhos."],
  ["Ortopedia", "Dor, fraturas, coluna e dificuldades de locomoção."],
  ["Cirurgia geral", "Procedimentos com preparo, segurança e acompanhamento."],
  ["Diagnóstico por imagem", "Raio-X, radiologia e apoio para decisões seguras."],
  ["Animais silvestres", "Atendimento direcionado para aves e pets não convencionais."],
  ["Odontologia", "Cuidado dentário, prevenção e procedimentos orais."],
  ["Especialidades", "Oncologia, endoscopia, acupuntura e terapias integrativas."]
];

const reviews = [
  {
    name: "Godva Grace",
    meta: "Local Guide",
    text: "A área de cães e gatos é separada. Sempre fomos bem atendidos em ambas as áreas, especialmente pelas doutoras Nayara, Natalia e Sullyane."
  },
  {
    name: "Carolina Pedroza Barros",
    meta: "5 avaliações",
    text: "Gostei bastante da clínica, super indico. Atendimento rápido, valores justos e exames realizados corretamente."
  },
  {
    name: "Valeria",
    meta: "5 avaliações",
    text: "Ótimo atendimento da equipe. Muitas especialidades e veterinários muito bons. O ortopedista Dr. Victor Lacerda foi muito atencioso e competente."
  },
  {
    name: "Priscilla Ribeiro Arruda",
    meta: "Local Guide",
    text: "Dr. Jairo foi super atencioso e minucioso com minha cadela. Fomos à noite, em emergência, e ele foi ágil e competente."
  },
  {
    name: "Vera Nascimento",
    meta: "2 avaliações",
    text: "Na verdade, são 10 estrelas para o Dr. Jairo Ramos. Até meu doguinho reativo se rendeu ao profissionalismo."
  },
  {
    name: "Juliana Constancio",
    meta: "Local Guide",
    text: "Local super organizado, atendimento muito bom, funcionários simpáticos e prestativos. O exame de sangue ficou pronto no mesmo dia."
  }
];

const contactSubject = document.querySelector("[data-contact-subject]");
const servicesGrid = document.querySelector("[data-services-grid]");

function whatsappUrl(message) {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
}

function populateServices() {
  const options = services.map(([name]) => `<option value="${name}">${name}</option>`).join("");
  contactSubject.innerHTML = `<option value="Atendimento geral">Atendimento geral</option>${options}`;

  servicesGrid.innerHTML = services
    .map(
      ([name, description], index) => `
        <article class="service-card tilt-card" data-animate>
          <span>${String(index + 1).padStart(2, "0")}</span>
          <h3>${name}</h3>
          <p>${description}</p>
          <button type="button" data-service-book="${name}">Selecionar serviço</button>
        </article>
      `
    )
    .join("");
}

let observer;
function observeAnimated() {
  if (!observer) {
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 }
    );
  }
  document.querySelectorAll("[data-animate]:not(.is-visible)").forEach(element => observer.observe(element));
}

function setupServiceBooking() {
  servicesGrid.addEventListener("click", event => {
    const button = event.target.closest("[data-service-book]");
    if (!button) return;

    contactSubject.value = button.dataset.serviceBook;
    document.querySelector("#contato").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function setupWhatsappLinks() {
  document.querySelectorAll("[data-whatsapp]").forEach(link => {
    const message =
      link.dataset.whatsapp === "emergencia"
        ? "Olá, CASA! Preciso de atendimento veterinário emergencial agora."
        : "Olá, CASA! Vim pelo site e gostaria de falar com a equipe.";
    link.href = whatsappUrl(message);
  });
}

function setupReviews() {
  const track = document.querySelector("[data-review-track]");
  const loopReviews = [...reviews, ...reviews, ...reviews];
  let index = reviews.length;

  track.innerHTML = loopReviews
    .map(
      (review, itemIndex) => `
        <article class="mini-review">
          <div class="stars">★★★★★</div>
          <p>“${review.text}”</p>
          <div>
            <strong>${review.name}</strong>
            <small>${review.meta}</small>
          </div>
        </article>
      `
    )
    .join("");

  const cards = Array.from(track.querySelectorAll(".mini-review"));

  function cardStep() {
    const card = cards[0];
    const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function render(animate = true) {
    const viewport = track.parentElement.getBoundingClientRect().width;
    const activeCard = cards[index];
    const offset = viewport / 2 - activeCard.offsetLeft - activeCard.getBoundingClientRect().width / 2;
    track.style.transition = animate ? "transform 680ms var(--ease)" : "none";
    track.style.transform = `translateX(${offset}px)`;
    cards.forEach((card, cardIndex) => card.classList.toggle("is-active", cardIndex === index));
  }

  function next() {
    index += 1;
    render(true);
    if (index >= reviews.length * 2) {
      setTimeout(() => {
        index = reviews.length;
        render(false);
      }, 720);
    }
  }

  render(false);
  window.addEventListener("resize", () => render(false));
  setInterval(next, 3200);
}

function setupContactForm() {
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");

  form.addEventListener("submit", event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (!data.name || !data.animal || !data.animalType || !data.message) {
      status.textContent = "Preencha seu nome, o nome do animal, qual animal é e a mensagem.";
      return;
    }

    const message = [
      "Olá, CASA! Vim pelo site.",
      `Tutor: ${data.name}`,
      `Animal: ${data.animal}`,
      `Tipo de animal: ${data.animalType}`,
      `Serviço: ${data.subject}`,
      `Mensagem: ${data.message}`
    ].join("\n");

    status.textContent = "Abrindo WhatsApp com sua mensagem pronta...";
    window.open(whatsappUrl(message), "_blank", "noopener");
    form.reset();
  });
}

function setupMenu() {
  const nav = document.querySelector("[data-nav]");
  document.querySelector("[data-menu-toggle]").addEventListener("click", () => nav.classList.toggle("is-open"));
  nav.addEventListener("click", event => {
    if (event.target.matches("a")) nav.classList.remove("is-open");
  });
}

function setupTilt() {
  document.querySelectorAll(".tilt-card").forEach(card => {
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--rx", `${y * -7}deg`);
      card.style.setProperty("--ry", `${x * 7}deg`);
    });
    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    });
  });
}

populateServices();
setupServiceBooking();
setupWhatsappLinks();
setupReviews();
setupContactForm();
setupMenu();
setupTilt();
observeAnimated();
