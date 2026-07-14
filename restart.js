module.exports = {
    name: "restart",

    execute: async (sock, m) => {

        const sender = (m.key.participant || m.key.remoteJid || "").split("@")[0];

        console.log("SENDER:", sender);
        console.log("OWNER:", global.owner);

        if (sender !== global.owner) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: `❌ Owner only\n\nSender: ${sender}\nOwner: ${global.owner}`
                },
                {
                    quoted: m
                }
            );
        }

        await sock.sendMessage(
            m.key.remoteJid,
            {
                text: "🔄 Restarting..."
            },
            {
                quoted: m
            }
        );

        process.exit(0);
    }
};
