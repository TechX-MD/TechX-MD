const api = require("../lib/api");

module.exports = {
    name: "google",

    execute: async (sock, m, args) => {

        const query = args.join(" ");

        if (!query) {
            return sock.sendMessage(
                m.chat,
                {
                    text: "🔍 Usage:\n.google WhatsApp bot"
                },
                { quoted: m }
            );
        }

        try {

            const res = await api.get(
                `/google?query=${encodeURIComponent(query)}`
            );

            const data = res.data;

            await sock.sendMessage(
                m.chat,
                {
                    text:
`╭━━〔 🔍 GOOGLE SEARCH 〕━━⬣
┃
┃ 🔎 Query:
┃ ${query}
┃
┃ 📄 Result:
┃ ${JSON.stringify(data, null, 2)}
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3`
                },
                { quoted: m }
            );

        } catch (err) {

            console.log("GOOGLE ERROR:", err.message);

            await sock.sendMessage(
                m.chat,
                {
                    text: "❌ Google search failed."
                },
                { quoted: m }
            );

        }

    }
};
