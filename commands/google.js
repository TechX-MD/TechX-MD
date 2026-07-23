const api = require("../lib/api");

module.exports = {
    name: "google",

    execute: async (sock, m, args) => {

        const query = args.join(" ");

        if (!query) {
            return sock.sendMessage(
                m.chat,
                {
                    text: "🔍 Usage:\n.google latest AI news"
                },
                { quoted: m }
            );
        }

        try {

            const res = await api.get(
                `/google?q=${encodeURIComponent(query)}`
            );

            const data = res.data;

            if (!data.success) {
                return sock.sendMessage(
                    m.chat,
                    {
                        text: `❌ ${data.message}`
                    },
                    { quoted: m }
                );
            }

            if (!data.results || data.results.length === 0) {
                return sock.sendMessage(
                    m.chat,
                    {
                        text: "❌ No search results found."
                    },
                    { quoted: m }
                );
            }

            const list = data.results
                .map((r, i) =>
`${i + 1}. ${r.title}

🌐 ${r.link}

📝 ${r.snippet}`)
                .join("\n\n");

            await sock.sendMessage(
                m.chat,
                {
                    text:
`╭━━〔 🔍 GOOGLE SEARCH 〕━━⬣
┃
┃ 🔎 Query:
┃ ${query}
┃
${list}
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3`
                },
                { quoted: m }
            );

        } catch (err) {

            console.log("GOOGLE ERROR:", err.message);

           
