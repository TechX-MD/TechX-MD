module.exports = {
    name: "security",

    execute: async (sock, m) => {

        const text = `
╭━━〔 🔐 TECHX-MD SECURITY 〕━━⬣

🔒 .lock
🔓 .unlock

🚫 .antilink on
🚫 .antilink off

🤖 .antibot on
🤖 .antibot off

🚨 .antispam on
🚨 .antispam off

👥 .antitag on
👥 .antitag off

📵 .antifake on
📵 .antifake off

🗑️ .antidelete on
🗑️ .antidelete off

👁️ .antiviewonce on
👁️ .antiviewonce off

👋 .welcome on
👋 .welcome off

👋 .goodbye on
👋 .goodbye off

━━━━━━━━━━━━━━━━━━
👑 Owner : ${global.ownerName}
🤖 Bot : ${global.botName}
━━━━━━━━━━━━━━━━━━
`;

        await sock.sendMessage(
            m.chat,
            {
                text
            },
            {
                quoted: m
            }
        );

    }
};
