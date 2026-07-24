const api = require("../lib/api");

module.exports = {
    name: "github",

    execute: async (sock, m, args) => {

        const user = args[0];

        if (!user) {
            return sock.sendMessage(
                m.chat,
                {
                    text: "🐙 Usage:\n.github torvalds"
                },
                { quoted: m }
            );
        }

        try {

            const res = await api.get(
                `/github?user=${encodeURIComponent(user)}`
            );

            const data = res.data;

            await sock.sendMessage(
                m.chat,
                {
                    text:
`╭━━〔 🐙 GITHUB USER 〕━━⬣
┃
┃ 👤 Username:
┃ ${data.username || user}
┃
┃ 📝 Name:
┃ ${data.name || "Unknown"}
┃
┃ 📦 Repositories:
┃ ${data.public_repos || "Unknown"}
┃
┃ 👥 Followers:
┃ ${data.followers || "Unknown"}
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
                    text: "❌ GitHub lookup failed."
                },
                { quoted: m }
            );

        }

    }
};
