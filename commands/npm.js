const api = require("../lib/api");

module.exports = {
    name: "npm",

    execute: async (sock, m, args) => {

        const pkg = args[0];

        if (!pkg) {
            return sock.sendMessage(
                m.chat,
                { text: "📦 Usage:\n.npm axios" },
                { quoted: m }
            );
        }

        try {

            const res = await api.get(
                `/npm?package=${encodeURIComponent(pkg)}`
            );

            const data = res.data;

            await sock.sendMessage(
                m.chat,
                {
                    text:
`╭━━〔 📦 NPM SEARCH 〕━━⬣
┃
┃ 📌 Package:
┃ ${pkg}
┃
┃ 📖 Name:
┃ ${data.name || pkg}
┃
┃ ⭐ Version:
┃ ${data.version || "Unknown"}
┃
┃ 📝 Description:
┃ ${data.description || "No description"}
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3`
                },
                { quoted: m }
            );

        } catch (e) {
            sock.sendMessage(
                m.chat,
                { text: "❌ NPM search failed." },
                { quoted: m }
            );
        }
    }
};
