module.exports = {
    name: "botinfo",

    execute: async (sock, m) => {

        const text = `
╭━━━〔 🤖 TECHX-MD PRO 〕━━━⬣
┃
┃ 🚀 Bot Name : TECHX-MD
┃ 👑 Owner    : Kelly
┃ ⚡ Version  : V3 PRO
┃ 🟢 Status   : Online
┃ 🔧 Engine   : Baileys
┃ 🌐 Platform : WhatsApp
┃ 📌 Prefix   : .
┃
┃ ✨ Features:
┃ • AI Assistant
┃ • Downloader
┃ • Weather
┃ • Group Tools
┃ • Media Tools
┃ • Fast Response
┃
╰━━━━━━━━━━━━━━━━⬣

🔥 Powered by TECHX-MD
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
