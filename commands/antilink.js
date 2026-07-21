module.exports = {
    name: "antilink",

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


        await sock.sendMessage(
            m.chat,
            {
                text:
                "🔗 Anti-link feature enabled.\n\nNon-admins sending group links will be removed."
            },
            {
                quoted: m
            }
        );


        global.antilink =
            global.antilink || {};

        global.antilink[m.chat] = true;

    }
};

