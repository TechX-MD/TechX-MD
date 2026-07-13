module.exports = {
    name: "menu",
    description: "Show bot menu",

    async execute(sock, m) {

        const menu = `
╭━━━〔 🤖 TECHX-MD 〕━━━⬣
┃ 👤 Owner : ${global.ownerName}
┃ ⚡ Status : Online
┃ 📌 Prefix : ${global.prefix}
╰━━━━━━━━━━━━━━━━⬣

╭━━〔 MAIN 〕━━⬣
┃ 🏓 .ping
┃ 📋 .menu
┃ ❤️ .alive
╰━━━━━━━━━━━━⬣

╭━━〔 GROUP 〕━━⬣
┃ 👥 .tagall
┃ ➕ .add
┃ ➖ .kick
┃ ⭐ .promote
┃ ⬇️ .demote
╰━━━━━━━━━━━━⬣

© TechX-MD
`;

        await sock.sendMessage(
            m.key.remoteJid,
            { text: menu },
            { quoted: m }
        );
    }
};
