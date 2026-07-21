module.exports = {
    name: "goodbye",

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
                "👋 Goodbye feature enabled for this group."
            },
            {
                quoted: m
            }
        );

    }
};
