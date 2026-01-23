import fetch from "node-fetch"; // для Netlify безопасно с Node 18+

export const handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
    if (!event.body) return { statusCode: 400, body: "Missing request body" };

    let { names, visit } = JSON.parse(event.body);

    const TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    if (!TOKEN || !CHAT_ID) return { statusCode: 500, body: "BOT_TOKEN or CHAT_ID not set" };

    const text = `
💍 Ответ на приглашение
👤 Гости: ${names}
📅 Придут: ${visit}
`;

    console.log("Sending message to Telegram:", text);

    // Явно импортируем fetch
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: CHAT_ID, text })
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };

  } catch (error) {
    console.log("ERROR:", error);
    return { statusCode: 500, body: JSON.stringify({ success: false, error: error.message }) };
  }
};
