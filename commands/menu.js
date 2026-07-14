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

╭━━〔 📋 COMMANDS 〕━━⬣
┃ ⚡ .main
┃ 👥 .group
┃ 👑 .owner
┃ 🛠️ .tools
┃ 🤖 .ai
┃ 🎵 .download
┃ 🎨 .media
┃ 🎮 .games
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD WhatsApp Automation
`;

        await sock.sendMessage(
            m.key.remoteJid,
            {
                image: {
                    url: "https://your-image-link.com/logo.jpg"
                },
                caption: text
            },
            {
                quoted: m
            }
        );
    }
};
