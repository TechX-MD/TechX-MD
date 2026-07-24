const api = require("../lib/api");

module.exports = {
    name: "wikipedia",

    execute: async (sock, m, args) => {

        const query = args.join(" ");

        if (!query) {
            return sock.sendMessage(
                m.chat,
                {
                    text: "📚 Usage:\n.wikipedia OpenAI"
                },
                { quoted: m }
            );
        }

        try {

            const res = await api.get(
                `/wiki?q=${encodeURIComponent(query)}`
            );

            const data = res.data;

            await sock.sendMessage(
                m.chat,
                {
                    text:
`╭━━〔 📚 WIKIPEDIA 〕━━⬣
┃
┃ 🔎 Search:
┃ ${query}
┃
┃ 📖 Result:
┃ ${data.result || data.summary || JSON.stringify(data)}
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
                    text: "❌ Wikipedia search failed."
                },
                { quoted: m }
            );

        }

    }
};
