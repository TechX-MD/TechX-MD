module.exports = {
    name: "linkgroup",

    execute: async (sock, m) => {

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

        if (!m.isBotAdmin)
            return sock.sendMessage(
                m.chat,
                { text: "❌ Make me admin first." },
                { quoted: m }
            );


        const code =
            await sock.groupInviteCode(
                m.chat
            );


        const link =
            `https://chat.whatsapp.com/${code}`;


        await sock.sendMessage(
            m.chat,
            {
                text:
                `🔗 *Group Link*\n\n${link}`
            },
            { quoted: m }
        );

    }
};
