const api = require("../lib/api");

module.exports = {
    name: "apk",

    execute: async (sock, m, args) => {

        const app = args.join(" ");

        if (!app) {
            return sock.sendMessage(
                m.chat,
                { text: "📱 Usage:\n.apk WhatsApp" },
                { quoted: m }
            );
        }

        try {

            const res = await api.get(
                `/apk?q=${encodeURIComponent(app)}`
            );

            const data = res.data;

            await sock.sendMessage(
                m.chat,
                {
                    text:
`╭━━〔 📱 APK SEARCH 〕━━⬣
┃
┃ 🔎 App:
┃ ${app}
┃
┃ 📦 Result:
┃ ${JSON.stringify(data, null, 2)}
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3`
                },
                { quoted: m }
            );

        } catch(e){

            sock.sendMessage(
                m.chat,
                { text:"❌ APK search failed." },
                { quoted:m }
            );

        }
    }
};
