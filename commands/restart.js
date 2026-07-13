module.exports = {
    name: "restart",

    execute: async (sock, m) => {

        const sender =
        m.key.participant ||
        m.key.remoteJid;

        if (!sender.includes(global.owner)) {
            return sock.sendMessage(
                m.key.remoteJid,
                { text: "❌ Owner only" },
                { quoted: m }
            );
        }

        await sock.sendMessage(
            m.key.remoteJid,
            { text: "🔄 Restarting..." },
            { quoted: m }
        );

        process.exit();
    }
};
