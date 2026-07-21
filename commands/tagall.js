module.exports = {
    name: "tagall",

    execute: async (sock, m, args) => {

        if (!m.isGroup)
            return sock.sendMessage(
                m.chat,
                { text: "❌ This command works only in groups." },
                { quoted: m }
            );

        if (!m.isAdmin)
            return sock.sendMessage(
                m.chat,
                { text: "❌ Admin only." },
                { quoted: m }
            );


        const metadata =
            await sock.groupMetadata(
                m.chat
            );


        const members =
            metadata.participants.map(
                p => p.id
            );


        let message =
            args.join(" ") ||
            "📢 Attention everyone!";


        let text =
            `📢 *TAG ALL*\n\n${message}\n\n`;


        for (let id of members) {
            text += `@${id.split("@")[0]}\n`;
        }


        await sock.sendMessage(
            m.chat,
            {
                text,
                mentions: members
            },
            {
                quoted: m
            }
        );

    }
};
