module.exports = {
    name: "demote",

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


        let user =
            m.mentionedJid?.[0];


        if (!user && m.quoted)
            user = m.quoted.sender;


        if (!user)
            return sock.sendMessage(
                m.chat,
                {
                    text:
                    "❌ Tag or reply munhu waunoda kubvisa admin.\n\nExample:\n.demote @user"
                },
                { quoted: m }
            );


        await sock.groupParticipantsUpdate(
            m.chat,
            [user],
            "demote"
        );


        await sock.sendMessage(
            m.chat,
            {
                text:
                `⬇️ Demoted successfully:\n@${user.split("@")[0]}`,
                mentions: [user]
            },
            { quoted: m }
        );

    }
};
