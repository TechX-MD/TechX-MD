const api = require("../lib/api");

module.exports = {
    name: "qr",

    execute: async (sock, m, args) => {

        const text = args.join(" ");

        if (!text) {
            return sock.sendMessage(
                m.chat,
                {
                    text: "🔳 Usage:\n.qr Hello TECHX"
                },
                { quoted: m }
            );
        }

        try {

            const res = await api.get(
                `/qrcode?text=${encodeURIComponent(text)}`,
                {
                    responseType: "arraybuffer"
                }
            );

            await sock.sendMessage(
                m.chat,
                {
                    image: Buffer.from(res.data),
                    caption:
`╭━━〔 🔳 QR CODE 〕━━⬣
┃
┃ 📝 Text:
┃ ${text}
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
                    text: "❌ QR generation failed."
                },
                { quoted: m }
            );

        }

    }
};
