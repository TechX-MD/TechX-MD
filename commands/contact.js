module.exports = {
    name: "contact",

    execute: async (sock, m) => {

        const text = `
╭━━━〔 📞 TECHX-MD CONTACT 〕━━━⬣
┃
┃ 👑 Owner : Kelly
┃ 📱 WhatsApp : 263716616101
┃ 🤖 Bot : TECHX-MD V3 PRO
┃
┃ 🌐 Website:
┃ https://techx-md.onrender.com
┃
┃ 💬 For:
┃ • Support
┃ • Bug Reports
┃ • Suggestions
┃ • Partnerships
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD PRO
        `;

        await sock.sendMessage(
            m.key.remoteJid,
            {
                text
            },
            {
                quoted: m
            }
        );

    }
};
