const api = require("../lib/api");

module.exports = {
    name: "shorturl",

    execute: async (sock, m, args) => {

        const url = args[0];

        if (!url) {
            return sock.sendMessage(
                m.chat,
                {
                    text: "🔗 Usage:\n.shorturl https://example.com"
                },
                { quoted: m }
            );
        }

        try {

            const res = await api.get(
                `/shorten?url=${encodeURIComponent(url)}`
            );

            const data = res.data;

            await sock.sendMessage(
                m.chat,
                {
                    text:
`╭━━〔 🔗 SHORT URL 〕━━⬣
┃
┃ 🔗 Original:
┃ ${url}
┃
┃ ⚡ Short:
┃ ${data.short || data.url || JSON.stringify(data)}
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
                    text: "❌ URL shortening failed."
                },
                { quoted: m }
            );

        }

    }
};
