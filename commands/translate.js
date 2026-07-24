const api = require("../lib/api");

module.exports = {
    name: "translate",

    execute: async (sock, m, args) => {

        const text = args.join(" ");

        if (!text) {
            return sock.sendMessage(
                m.chat,
                {
                    text: "🌍 Usage:\n.translate Hello world"
                },
                { quoted: m }
            );
        }

        try {

            const res = await api.get(
                `/translate?text=${encodeURIComponent(text)}`
            );

            const data = res.data;

            await sock.sendMessage(
                m.chat,
                {
                    text:
`╭━━〔 🌍 TRANSLATE 〕━━⬣
┃
┃ 📝 Text:
┃ ${text}
┃
┃ 🔤 Result:
┃ ${data.result || data.translation || JSON.stringify(data)}
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3`
                },
                { quoted: m }
            );

        } catch (e) {

            await sock.sendMessage(
                m.chat,
                {
                    text: "❌ Translation failed."
                },
                { quoted: m }
            );

        }

    }
};
