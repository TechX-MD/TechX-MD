module.exports = {
    name: "debug",

    execute: async (sock, m) => {

        if (!m.key.fromMe) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Owner only command."
                },
                {
                    quoted: m
                }
            );
        }


        const info = `
╭━━━〔 🐞 DEBUG INFO 〕━━━⬣
┃
┃ 🤖 Bot: TECHX-MD
┃ 🟢 Status: Running
┃ 📦 Node: ${process.version}
┃ 💻 Platform: ${process.platform}
┃ ⏱️ Uptime: ${Math.floor(process.uptime())} seconds
┃
╰━━━━━━━━━━━━━━━━⬣
        `;


        await sock.sendMessage(
            m.key.remoteJid,
            {
                text: info
            },
            {
                quoted: m
            }
        );

    }
};
