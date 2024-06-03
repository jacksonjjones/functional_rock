document.addEventListener("DOMContentLoaded", () => {
  const highScoresText = document.querySelector("#highscores");
  let highScoresTag = "";

  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

  for (let i = 0; i < highscores.length; i++) {
    const highScoreData = highscores[i];
    if (highScoreData && highScoreData.name && highScoreData.score) {
      highScoresTag = highScoresTag.concat(
        `<li>${highScoreData.name} - ${highScoreData.score}</li>`
      );
    }
  }

  highScoresText.innerHTML = highScoresTag;

  const clearButton = document.querySelector("#clear");
  clearButton.addEventListener("click", () => {
    localStorage.removeItem("highscores"); // Clear highscores from localStorage
    highScoresText.innerHTML = ""; // Clear the displayed list
  });
});
