module.exports = {
    name: "status",

    execute: async (sock, m) => {

        const text = `
╭━━━〔 🟢 TECHX-MD STATUS 〕━━━⬣
┃
┃ 🤖 Bot Name : TECHX-MD
┃ 🟢 Status   : Online
┃ ⚡ Mode     : PRO
┃ 🔧 Engine   : Baileys
┃ 📡 Server   : Active
┃ 👑 Owner    : Kelly
┃ 📌 Prefix   : .
┃
┃ ✨ Systems:
┃ ✅ WhatsApp Connected
┃ ✅ Commands Online
┃ ✅ API Services Active
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3 PRO
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
