module.exports = {
    name: "setdesc",

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


        const desc = args.join(" ");


        if (!desc)
            return sock.sendMessage(
                m.chat,
                {
                    text:
                    "❌ Enter new group description.\n\nExample:\n.setdesc Welcome to TECHX FAMILY"
                },
                { quoted: m }
            );


        await sock.groupUpdateDescription(
            m.chat,
            desc
        );


        await sock.sendMessage(
            m.chat,
            {
                text:
                "✅ Group description updated successfully."
            },
            { quoted: m }
        );

    }
};
