class CourseQuiz extends HTMLElement {
  connectedCallback() {
    const data = JSON.parse(this.querySelector("script[type='application/json']").textContent);
    data.questions.forEach((question) => this.shuffle(question.choices));
    this.innerHTML = data.questions.map((question, index) => this.renderQuestion(question, index)).join("");
    this.addEventListener("click", (event) => this.handleClick(event, data.questions));
  }

  shuffle(items) {
    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  renderQuestion(question, index) {
    const choices = question.choices.map((choice, choiceIndex) => (
      `<button class="choice" type="button" data-index="${index}" data-choice="${choiceIndex}" aria-pressed="false">${choice.label}</button>`
    )).join("");

    return `
      <section class="quiz" aria-labelledby="q${index}">
        <h3 id="q${index}">${question.prompt}</h3>
        <div class="choices">${choices}</div>
        <p class="feedback" id="f${index}" aria-live="polite"></p>
      </section>
    `;
  }

  handleClick(event, questions) {
    const button = event.target.closest("button[data-index]");
    if (!button) return;

    const questionIndex = Number(button.dataset.index);
    const choiceIndex = Number(button.dataset.choice);
    const question = questions[questionIndex];
    const feedback = this.querySelector(`#f${questionIndex}`);
    const group = this.querySelectorAll(`button[data-index="${questionIndex}"]`);

    group.forEach((choice) => choice.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", "true");

    const selected = question.choices[choiceIndex];
    const correct = selected.correct === 1;
    feedback.className = `feedback ${correct ? "good" : "bad"}`;
    feedback.textContent = `${correct ? "Correct." : "Try again."} ${selected.feedback}`;
  }
}

customElements.define("course-quiz", CourseQuiz);
