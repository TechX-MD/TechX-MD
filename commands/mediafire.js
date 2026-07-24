const api = require("../lib/api");

module.exports = {
    name: "mediafire",

    execute: async (sock, m, args) => {

        const url = args[0];

        if (!url) {
            return sock.sendMessage(
                m.chat,
                {
                    text:"📥 Usage:\n.mediafire link"
                },
                { quoted:m }
            );
        }

        try {

            const res = await api.get(
                `/mediafire?url=${encodeURIComponent(url)}`
            );

            const data = res.data;

            await sock.sendMessage(
                m.chat,
                {
                    text:
`╭━━〔 📥 MEDIAFIRE 〕━━⬣
┃
┃ 🔗 Link:
┃ ${url}
┃
┃ 📄 File:
┃ ${data.filename || "Unknown"}
┃
┃ ⬇️ Download:
┃ ${data.download || JSON.stringify(data)}
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3`
                },
                { quoted:m }
            );

        } catch(e){

            sock.sendMessage(
                m.chat,
                { text:"❌ MediaFire download failed." },
                { quoted:m }
            );

        }
    }
};
