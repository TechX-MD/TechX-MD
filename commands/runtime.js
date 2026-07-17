module.exports = {
    name: "runtime",

    execute: async (sock, m) => {

        const uptime = process.uptime();

        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);


        const text = `
╭━━━〔 ⚡ TECHX-MD PRO 〕━━━⬣
┃
┃ 🟢 Bot Status : Online
┃ ⏱️ Runtime :
┃ ${days}d ${hours}h ${minutes}m ${seconds}s
┃
┃ 🤖 Version : V3 PRO
┃ 🚀 Engine  : Baileys
┃ 👑 Owner   : Kelly
┃
╰━━━━━━━━━━━━━━━━⬣

🔥 TECHX-MD Running Smoothly
        `;


        await sock.sendMessage(
            m.key.remoteJid,
            {
                text: text
            },
            {
                quoted: m
            }
        );

    }
};
