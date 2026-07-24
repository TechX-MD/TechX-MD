const api = require("../lib/api");

module.exports = {
    name: "ipcheck",

    execute: async (sock, m, args) => {

        const ip = args[0];

        if (!ip) {
            return sock.sendMessage(
                m.chat,
                {
                    text: "🌐 Usage:\n.ipcheck 8.8.8.8"
                },
                { quoted: m }
            );
        }

        try {

            const res = await api.get(
                `/ip?ip=${ip}`
            );

            const data = res.data;

            await sock.sendMessage(
                m.chat,
                {
                    text:
`╭━━〔 🌐 IP CHECK 〕━━⬣
┃
┃ 🆔 IP:
┃ ${ip}
┃
┃ 🌍 Country:
┃ ${data.country || "Unknown"}
┃
┃ 🏙️ City:
┃ ${data.city || "Unknown"}
┃
┃ 📡 ISP:
┃ ${data.isp || "Unknown"}
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
                    text: "❌ IP check failed."
                },
                { quoted: m }
            );

        }

    }
};
