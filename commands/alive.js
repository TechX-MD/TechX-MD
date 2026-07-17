module.exports = {
    name: "alive",

    execute: async (sock, m) => {

        const text = `
╭━━━〔 🤖 TECHX-MD 〕━━━⬣
┃
┃ ✅ Bot Status: Online
┃ ⚡ Response: Active
┃ 🟢 Uptime: Running
┃ 👤 Owner: Kelly
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3
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
