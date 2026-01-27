const popup = document.getElementById("popup");
const openBtns = document.querySelectorAll(".main-btn"); // теперь несколько кнопок
const closeBtn = document.getElementById("closePopup");

const weddingDate = new Date("2026-04-11T16:20:00");

    function updateTimer() {
      const now = new Date();
      const diff = weddingDate - now;

      if (diff <= 0) return;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      document.getElementById("days").textContent = days;
      document.getElementById("hours").textContent = hours;
      document.getElementById("minutes").textContent = minutes;
      document.getElementById("seconds").textContent = seconds;
    }

    updateTimer();
    setInterval(updateTimer, 1000);

openBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      popup.classList.add("active");
    });
  });

closeBtn.addEventListener("click", () => {
  popup.classList.remove("active");
});

popup.addEventListener("click", (e) => {
    if (e.target === popup) { // клик именно на оверлей, а не на попап
      popup.classList.remove("active");
    }
  });

const form = document.getElementById("inviteForm");
const button = form.querySelector("button");
const status = document.getElementById("status");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  // Блокируем кнопку сразу
  button.disabled = true;
  button.innerText = "Отправка...";

  const names = document.getElementById("names").value;
  const visit = document.querySelector('input[name="visit"]:checked').value;

  fetch("/.netlify/functions/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ names, visit })
  })
  .then(res => res.json())
  .then(() => {
    status.innerText = "Спасибо! Ответ отправлен 💐";
    form.reset();
    button.disabled = false;
    button.innerText = "Отправить";
  })
  .catch(() => {
    status.innerText = "Ошибка отправки. Попробуйте снова.";
    // Разблокируем кнопку, чтобы пользователь мог повторить
    button.disabled = false;
    button.innerText = "Отправить";
  });
});