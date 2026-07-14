module.exports = {
    name: "main",

    execute: async(sock,m)=>{

        const text = `
╭━━〔 ⚡ MAIN COMMANDS 〕━━⬣
┃ 🏓 .ping
┃ ❤️ .alive
┃ 📋 .menu
┃ 👑 .owner
┃ 🤖 .botinfo
┃ ⏱ .runtime
┃ 🚀 .speed
┃ 📊 .status
┃ 📅 .date
┃ 🕒 .time
┃ 📌 .rules
┃ 📞 .contact
╰━━━━━━━━━━━━━━━━⬣
`;

        await sock.sendMessage(
            m.key.remoteJid,
            {text},
            {quoted:m}
        );

    }
};
