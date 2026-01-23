const fetch = require("node-fetch"); // если используешь Node 18+ можно убрать

exports.handler = async (event) => {
  const { names, visit } = JSON.parse(event.body);

  const TOKEN = process.env.BOT_TOKEN;  // вот сюда вставляем токен через ENV
  const CHAT_ID = process.env.CHAT_ID;   // через ENV

  const text = `
💍 Ответ на приглашение
👤 Гости: ${names}
📅 Придут: ${visit}
`;

  await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text })
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};