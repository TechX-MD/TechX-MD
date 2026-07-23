const api = require("../lib/api");

module.exports = {
    name: "weather",

    execute: async (sock, m, args) => {

        const city = args.join(" ");

        if (!city) {
            return sock.sendMessage(
                m.chat,
                {
                    text: "🌦️ Usage:\n.weather Harare"
                },
                { quoted: m }
            );
        }

        try {



const res = await api.get(
    `/weather?city=${encodeURIComponent(city)}`
);

const data = res.data;

await sock.sendMessage(
    m.chat,
    {
        text:
`╭━━〔 🌦️ WEATHER REPORT 〕━━⬣
┃
┃ 📍 City: ${data.city}
┃ 🌡️ Temperature: ${data.temperature}
┃ 💧 Humidity: ${data.humidity}
┃ 🌬️ Wind: ${data.wind}
┃ ☁️ Condition: ${data.condition}
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3`
    },
    { quoted: m }
);
        } catch (err) {

            console.log("WEATHER ERROR:", err.message);

            await sock.sendMessage(
                m.chat,
                {
                    text: "❌ Weather service failed."
                },
                { quoted: m }
            );

        }

    }
};
