document.addEventListener("click", (event) => {
  const button = event.target.closest("[data-reveal]");
  if (!button) return;

  const target = document.querySelector(button.dataset.reveal);
  if (!target) return;

  const visible = target.classList.toggle("visible");
  button.textContent = visible ? "Hide example" : "Show example";
});
