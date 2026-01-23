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