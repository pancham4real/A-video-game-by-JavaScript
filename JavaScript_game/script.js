score = 0;
cross = true;
audio = new Audio("music.mp3");
audiogo = new Audio("gameover.mp3");
setTimeout(() => {
  console.log(audio.play());
}, 100);

document.onkeydown = function (e) {
  console.log("Key code is: ", e.keyCode);
  if (e.keyCode == 38) {
    audio.play();
    originalPlayer = document.querySelector(".originalPlayer");
    originalPlayer.classList.add("animateOriginalPlayer");
    setTimeout(() => {
      originalPlayer.classList.remove("animateOriginalPlayer");
    }, 700);
  }
  if (e.keyCode == 39) {
    originalPlayer = document.querySelector(".originalPlayer");
    origialPlayerx = parseInt(
      window.getComputedStyle(originalPlayer, null).getPropertyValue("left")
    );
    originalPlayer.style.left = origialPlayerx + 112 + "px";
  }
  if (e.keyCode == 37) {
    originalPlayer = document.querySelector(".originalPlayer");
    origialPlayerx = parseInt(
      window.getComputedStyle(originalPlayer, null).getPropertyValue("left")
    );
    originalPlayer.style.left = origialPlayerx - 112 + "px";
  }
};
setInterval(() => {
  audio.play();
  originalPlayer = document.querySelector(".originalPlayer");
  gameOver = document.querySelector(".gameOver");
  enemyyy = document.querySelector(".enemyyy");
  dx = parseInt(
    window.getComputedStyle(originalPlayer, null).getPropertyValue("left")
  );
  dy = parseInt(
    window.getComputedStyle(originalPlayer, null).getPropertyValue("top")
  );
  ox = parseInt(
    window.getComputedStyle(enemyyy, null).getPropertyValue("left")
  );
  oy = parseInt(window.getComputedStyle(enemyyy, null).getPropertyValue("top"));

  offsetX = Math.abs(dx - ox);
  offsetY = Math.abs(dy - ox);
  //   console.log(offsetX, offsetY);
  if (offsetX < 113 && offsetY < 42) {
    gameOver.innerHTML = "Game Over- Reload to play again";
    enemyyy.classList.remove("enemyyyAni");
    audiogo.play();
    setTimeout(() => {
      audiogo.pause();
      audio.pause();
    }, 100);
  } else if (offsetX < 145 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);
    setTimeout(() => {
      aniDur = parseFloat(
        window
          .getComputedStyle(enemyyy, null)
          .getPropertyValue("animation-duration")
      );
      newDur = aniDur - 0.3;
      enemyyy.style.animationDuration = newDur + "s";
    }, 1000);
  }
}, 10);
function updateScore(score) {
  scoreCount.innerHTML = "Your Score:" + score;
}
