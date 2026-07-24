const api = require("../lib/api");

module.exports = {
    name: "currency",

    execute: async (sock, m, args) => {

        const pair = args.join(" ");

        if (!pair) {
            return sock.sendMessage(
                m.chat,
                { text:"💱 Usage:\n.currency USD ZAR" },
                { quoted:m }
            );
        }

        try {

            const res = await api.get(
                `/currency?pair=${encodeURIComponent(pair)}`
            );

            const data = res.data;

            await sock.sendMessage(
                m.chat,
                {
                    text:
`╭━━〔 💱 CURRENCY 〕━━⬣
┃
┃ 🔄 Pair:
┃ ${pair}
┃
┃ 💰 Rate:
┃ ${data.rate || JSON.stringify(data)}
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3`
                },
                { quoted:m }
            );

        } catch(e){

            sock.sendMessage(
                m.chat,
                { text:"❌ Currency conversion failed." },
                { quoted:m }
            );

        }
    }
};
