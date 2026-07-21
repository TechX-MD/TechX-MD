module.exports = {
    name: "unlock",

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


        await sock.groupSettingUpdate(
            m.chat,
            "not_announcement"
        );


        await sock.sendMessage(
            m.chat,
            {
                text:
                "🔓 Group unlocked.\nEveryone can send messages."
            },
            { quoted: m }
        );

    }
};
