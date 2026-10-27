const homePage = document.getElementById("homePage");
const insideNav = document.getElementById("insideNav");

const contentPages = {
  about: document.getElementById("aboutPage"),
  work: document.getElementById("workPage"),
  interests: document.getElementById("interestsPage"),
  contact: document.getElementById("contactPage"),
};

const homeCircles = document.querySelectorAll(".home-circle");
const navButtons = document.querySelectorAll(".inside-nav button");

function showPage(pageName) {
  homePage.style.display = "none";

  Object.values(contentPages).forEach((page) => {
    page.classList.remove("active");
  });

  if (pageName === "home") {
    homePage.style.display = "flex";
    insideNav.classList.remove("visible");
  } else if (contentPages[pageName]) {
    contentPages[pageName].classList.add("active");
    insideNav.classList.add("visible");
  }

  navButtons.forEach((button) => {
    const isSelected = button.dataset.page === pageName;

    button.classList.toggle("selected", isSelected);

    if (isSelected) {
      button.setAttribute("aria-current", "page");
    } else {
      button.removeAttribute("aria-current");
    }
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

homeCircles.forEach((circle) => {
  circle.addEventListener("click", () => {
    const pageName = circle.dataset.page;

    circle.classList.add("clicked");

    createPowderExplosion(circle);

    showPage(pageName);
  });
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showPage(button.dataset.page);
  });
});

function createPowderExplosion(circle) {
  const rect = circle.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const colors = [
    "#a855f7",
    "#7c3aed",
    "#ec4899",
    "#f0abfc",
    "#38bdf8",
    "#818cf8",
    "#ffffff",
  ];

  for (let i = 0; i < 100; i++) {
    const particle = document.createElement("span");

    particle.className = "powder-particle";

    const angle = Math.random() * Math.PI * 2;
    const distance = 70 + Math.random() * 230;
    const size = 1.5 + Math.random() * 3.5;
    const radius = 3 + Math.random() * 13;

    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.left = `${centerX - radius}px`;
    particle.style.top = `${centerY - radius}px`;
    particle.style.width = `${radius * 2}px`;
    particle.style.height = `${radius * 2}px`;
    particle.style.background = color;
    particle.style.boxShadow = `0 0 12px ${color}`;

    particle.style.setProperty("--x", `${x}px`);
    particle.style.setProperty("--y", `${y}px`);
    particle.style.setProperty("--size", size);

    document.body.appendChild(particle);

    particle.addEventListener("animationend", () => {
      particle.remove();
    });
  }
}

const discoverButton = document.getElementById("discoverButton");
const myStory = document.getElementById("myStory");

if (discoverButton && myStory) {
  discoverButton.addEventListener("click", function () {
    myStory.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    myStory.classList.remove("story-revealed");

    // Restart the reveal animation
    void myStory.offsetWidth;

    myStory.classList.add("story-revealed");
  });
}
