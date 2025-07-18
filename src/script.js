// Add some interactive elements
document.addEventListener("DOMContentLoaded", function () {
  // Skill tags interaction
  const skillTags = document.querySelectorAll(".skill-tag");
  skillTags.forEach((tag) => {
    tag.addEventListener("click", function () {
      this.style.background = "rgba(255, 0, 64, 0.2)";
      this.style.borderColor = "var(--lcl)";
      setTimeout(() => {
        this.style.background = "rgba(0, 255, 140, 0.1)";
        this.style.borderColor = "var(--neon)";
      }, 500);
    });
  });

  // Terminal typing effect completion
  const typingElement = document.querySelector(".typing-effect");
  setTimeout(() => {
    typingElement.style.borderRight = "none";
  }, 3000);

  // Add subtle parallax effect
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const background = document.querySelector(".eva-background");
    const evaContainer = document.querySelector(".eva-container");

    if (background) {
      background.style.transform = `translateY(${-50 + scrolled * 0.1}%)`;
    }
    if (evaContainer) {
      evaContainer.style.transform = `translateY(${-50 + scrolled * 0.05}%)`;
    }
  });

  // EVA image hover effect
  const main = document.querySelector("main");
  const evaContainer = document.querySelector(".eva-container");

  main.addEventListener("mouseenter", () => {
    evaContainer.style.opacity = "0.15";
  });

  main.addEventListener("mouseleave", () => {
    evaContainer.style.opacity = "0";
  });
});
