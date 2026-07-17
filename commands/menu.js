module.exports = {
    name: "menu",

    execute: async (sock, m) => {

        const text = `
╭━━━〔 🤖 TECHX-MD V3 〕━━━⬣
┃ 👤 Owner : Kelly
┃ ⚡ Status : Online
┃ 📌 Prefix : .
┃ 🌐 https://techx-md.onrender.com
╰━━━━━━━━━━━━━━━━⬣


╭━━〔 📋 SELECT CATEGORY 〕━━⬣
┃
┃ ⚡ .main
┃ 👥 .group
┃ 👑 .owner
┃ 🛠️ .tools
┃ 🤖 .ai
┃ 🎵 .download
┃ 🎨 .media
┃ 🎮 .games
┃ 🔐 .security
┃ 💎 .premium
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3`;

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
