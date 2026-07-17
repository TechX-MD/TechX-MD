const axios = require("axios");

module.exports = {
    name: "weather",

    execute: async (sock, m, args) => {

        const city = args.join(" ");

        if (!city) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Shandisa:\n.weather Harare"
                },
                {
                    quoted: m
                }
            );
        }

        try {

            const { data } = await axios.get(
                `https://techx-ap.onrender.com/weather?city=${city}`
            );


            if (!data.success) {
                return sock.sendMessage(
                    m.key.remoteJid,
                    {
                        text: "❌ City not found"
                    },
                    {
                        quoted: m
                    }
                );
            }


            const text = `
🌤️ *WEATHER REPORT*

📍 City: ${data.city}

🌡️ Temperature: ${data.temperature}
💧 Humidity: ${data.humidity}
🌬️ Wind: ${data.wind}
☁️ Condition: ${data.condition}

🚀 TECHX-MD
            `;


            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text
                },
                {
                    quoted: m
                }
            );


        } catch (err) {

            console.log(
                "WEATHER ERROR:",
                err.message
            );

            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Weather service error"
                },
                {
                    quoted: m
                }
            );

        }

    }
};
