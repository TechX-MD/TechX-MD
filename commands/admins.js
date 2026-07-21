module.exports = {
    name: "admins",

    execute: async (sock, m) => {

        if (!m.isGroup)
            return sock.sendMessage(
                m.chat,
                { text: "❌ This command works only in groups." },
                { quoted: m }
            );


        const metadata =
            await sock.groupMetadata(
                m.chat
            );


        const admins =
            metadata.participants
            .filter(
                p => p.admin
            )
            .map(
                p => p.id
            );


        let text =
            "👑 *GROUP ADMINS*\n\n";


        admins.forEach(
            (id, i) => {
                text += `${i + 1}. @${id.split("@")[0]}\n`;
            }
        );


        await sock.sendMessage(
            m.chat,
            {
                text,
                mentions: admins
            },
            {
                quoted: m
            }
        );

    }
};
