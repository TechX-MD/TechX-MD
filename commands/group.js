module.exports = {
    name: "group",

    execute: async(sock,m)=>{

        const text = `
╭━━〔 👥 GROUP COMMANDS 〕━━⬣
┃ 👥 .tagall
┃ ➕ .add
┃ ➖ .kick
┃ ⭐ .promote
┃ ⬇️ .demote
┃ 🔒 .lock
┃ 🔓 .unlock
┃ 📝 .setname
┃ 📄 .setdesc
┃ 🔗 .linkgroup
┃ 🚫 .antilink
┃ 🤖 .welcome
┃ 👋 .goodbye
┃ 👑 .admins
┃ 📊 .groupinfo
╰━━━━━━━━━━━━━━━━⬣
`;

        await sock.sendMessage(
            m.key.remoteJid,
            {text},
            {quoted:m}
        );

    }
};
