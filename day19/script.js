document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".container");
  const submitButton = document.querySelector("button");

  const correctAnswers = {
    q1: "script",
    q2: "3",
    q3: "4",
    q4: "1",
    q5: "3",
  };

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();

    let score = 0;
    const formData = new FormData(form);

    for (let [question, answer] of Object.entries(correctAnswers)) {
      const userAnswer = formData.get(question);
      if (userAnswer === answer) {
        score++;
      }
    }

    alert(`You scored ${score} out of ${Object.keys(correctAnswers).length}`);
  });
});
