module.exports = {
    name: "menu",

    execute: async (sock, m) => {
console.log("MENU COMMAND EXECUTED");
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
┃ 🔌 .plugins
┃
╰━━━━━━━━━━━━━━━━⬣


╭━━━〔 🚧 OTHER MENU 〕━━━⬣
┃
┃ 🚧 COMING SOON
┃
┃ 🔜 More Features Coming Soon
┃ 🔜 AI Tools
┃ 🔜 Web Tools
┃ 🔜 Extra Commands
┃
╰━━━━━━━━━━━━━━⬣
🚀 TECHX-MD V3`;

    await sock.sendMessage(
        m.key.remoteJid,
        {
            image: {
                url: "https://up6.cc/2026/07/178402176851411.jpeg"
            },
            caption: text
        },
        {
            quoted: m
        }
    );

    }

};
