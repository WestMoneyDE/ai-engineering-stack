const root = document.documentElement;
root.classList.add("js");

const menuButton = document.querySelector("#menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuButton && primaryNav) {
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    primaryNav.classList.toggle("is-open", !open);
    menuButton.querySelector(".menu-toggle-icon").textContent = open ? "+" : "×";
  });

  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      primaryNav.classList.remove("is-open");
      menuButton.querySelector(".menu-toggle-icon").textContent = "+";
    });
  });
}

const navLinks = [...document.querySelectorAll(".primary-nav a[href^='#']")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      for (const link of navLinks) {
        link.setAttribute("aria-current", link.getAttribute("href") === `#${entry.target.id}` ? "true" : "false");
      }
    }
  }, { rootMargin: "-25% 0px -60% 0px", threshold: 0 });
  sections.forEach((section) => observer.observe(section));
}

const canvas = document.querySelector("#loop-canvas");
const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

if (canvas instanceof HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  const nodes = [
    { label: "PLAN", color: "#a78bfa" },
    { label: "BUILD", color: "#8b5cf6" },
    { label: "VERIFY", color: "#5eead4" },
    { label: "REVIEW", color: "#fcd34d" },
    { label: "RECOVER", color: "#67e8f9" },
  ];

  if (context) {
    const draw = (time = 0) => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radiusX = width * 0.36;
      const radiusY = height * 0.28;
      const phase = reducedMotion ? 0 : time / 1800;
      const points = nodes.map((node, index) => {
        const angle = -Math.PI / 2 + (index / nodes.length) * Math.PI * 2 + phase * 0.08;
        return { ...node, x: centerX + Math.cos(angle) * radiusX, y: centerY + Math.sin(angle) * radiusY };
      });

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#11131b";
      context.fillRect(0, 0, width, height);
      context.strokeStyle = "rgba(167, 139, 250, 0.32)";
      context.lineWidth = 2;
      context.beginPath();
      points.forEach((point, index) => {
        const next = points[(index + 1) % points.length];
        if (index === 0) context.moveTo(point.x, point.y);
        context.quadraticCurveTo(centerX, centerY, next.x, next.y);
      });
      context.stroke();

      context.fillStyle = "rgba(252, 211, 77, 0.09)";
      context.beginPath();
      context.arc(centerX, centerY, 72, 0, Math.PI * 2);
      context.fill();
      context.fillStyle = "#fcd34d";
      context.font = "600 18px 'Fira Code', monospace";
      context.textAlign = "center";
      context.fillText("HERMES", centerX, centerY + 6);

      context.textAlign = "center";
      context.font = "600 14px 'Fira Code', monospace";
      for (const point of points) {
        context.fillStyle = point.color;
        context.beginPath();
        context.arc(point.x, point.y, 9, 0, Math.PI * 2);
        context.fill();
        context.fillStyle = "#e9e7f0";
        context.fillText(point.label, point.x, point.y + 32);
      }

      if (!reducedMotion) window.requestAnimationFrame(draw);
    };
    draw();
  }
}
