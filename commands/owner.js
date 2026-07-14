module.exports = {
    name: "owner",

    execute: async(sock,m)=>{

        const text = `
╭━━〔 👑 OWNER COMMANDS 〕━━⬣
┃ 🔄 .restart
┃ 📢 .broadcast
┃ ⚙️ .eval
┃ 🖥 .exec
┃ 🔒 .block
┃ 🔓 .unblock
┃ 🔄 .update
┃ 📂 .backup
┃ 🧹 .clear
┃ 🐞 .debug
┃ 📜 .logs
╰━━━━━━━━━━━━━━━━⬣

Owner: Kelly
`;

        await sock.sendMessage(
            m.key.remoteJid,
            {text},
            {quoted:m}
        );

    }
};
