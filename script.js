document.getElementById("inviteForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const names = document.getElementById("names").value;
  const visit = document.querySelector('input[name="visit"]:checked').value;

  const text = `
💍 Ответ на приглашение
👤 Гости: ${names}
📅 Придут: ${visit}
`;

  fetch("/.netlify/functions/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ names, visit })
})
  .then(() => {
    document.getElementById("status").innerText = "Спасибо! Ответ отправлен 💐";
    document.getElementById("inviteForm").reset();
  })
  .catch(() => {
    document.getElementById("status").innerText = "Ошибка отправки";
  });
});