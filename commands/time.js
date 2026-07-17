module.exports = {
    name: "time",

    execute: async (sock, m) => {

        const now = new Date();

        const time = now.toLocaleTimeString(
            "en-US",
            {
                timeZone: "Africa/Harare",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            }
        );

        const date = now.toLocaleDateString(
            "en-US",
            {
                timeZone: "Africa/Harare",
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


        const text = `
╭━━━〔 🕒 TECHX-MD TIME 〕━━━⬣
┃
┃ 📅 Date : ${date}
┃ ⏰ Time : ${time}
┃ 🌍 Zone : Africa/Harare
┃
┃ 🟢 Bot Status : Online
┃ ⚡ Version : V3 PRO
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD
        `;


        await sock.sendMessage(
            m.key.remoteJid,
            {
                text
            },
            {
                quoted: m
            }
        );

    }
};
