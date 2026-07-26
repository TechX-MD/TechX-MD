module.exports = {
    name: "restart",

    execute: async (sock, m) => {

        const sender =
            (m.key.participant || m.key.remoteJid)
            .split(":")[0]
            .replace("@lid", "")
            .replace("@s.whatsapp.net", "");


        const owners = Array.isArray(global.ownerNumber)
            ? global.ownerNumber
            : [global.ownerNumber];


        const isOwner = owners.some(num =>
            sender === String(num).replace(/[^0-9]/g, "")
        );


        if (!isOwner) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ This command is only for the bot owner."
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
