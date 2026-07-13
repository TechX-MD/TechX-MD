module.exports = {
    name: "restart",

    execute: async (sock, m) => {

        const sender =
            m.key.participant ||
            m.key.remoteJid;

        const number = sender.split("@")[0];

        console.log("OWNER CHECK:", number);

        if (number !== global.owner) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Owner only"
                },
                {
                    quoted: m
                }
            );
        }

        await sock.sendMessage(
            m.key.remoteJid,
            {
                text: "🔄 Restarting TECHX-MD..."
            },
            {
                quoted: m
            }
        );

        setTimeout(() => {
            process.exit(0);
        }, 2000);

    }
};
