module.exports = {
    name: "kick",

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

        if (!m.isBotAdmin)
            return sock.sendMessage(
                m.chat,
                { text: "❌ Make me admin first." },
                { quoted: m }
            );

        let user = m.mentionedJid?.[0];

        if (!user && m.quoted)
            user = m.quoted.sender;

        if (!user)
            return sock.sendMessage(
                m.chat,
                {
                    text: "❌ Tag munhu waunoda kubvisa.\n\nExample: .kick @user"
                },
                { quoted: m }
            );

        await sock.groupParticipantsUpdate(
            m.chat,
            [user],
            "remove"
        );

        await sock.sendMessage(
            m.chat,
            {
                text: `✅ User removed successfully.`
            },
            { quoted: m }
        );

    }
};
