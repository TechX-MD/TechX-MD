module.exports = {
    name: "rules",

    execute: async (sock, m) => {

        const text = `
╭━━━〔 📜 TECHX-MD RULES 〕━━━⬣
┃
┃ 1️⃣ Do not use the bot for spam
┃
┃ 2️⃣ Do not send too many messages
┃    in a short time
┃
┃ 3️⃣ Respect other users
┃
┃ 4️⃣ Do not use the bot for illegal
┃    activities
┃
┃ 5️⃣ Avoid abusing commands in groups
┃
┃ 6️⃣ Follow WhatsApp Terms of Service
┃
┃ 7️⃣ Use TECHX-MD responsibly 🚀
┃
╰━━━━━━━━━━━━━━━━⬣

⚡ TECHX-MD V3 PRO
👑 Owner: Kelly
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
