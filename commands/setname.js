module.exports = {
    name: "setname",

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


        const name = args.join(" ");


        if (!name)
            return sock.sendMessage(
                m.chat,
                {
                    text:
                    "❌ Enter new group name.\n\nExample:\n.setname TECHX FAMILY"
                },
                { quoted: m }
            );


        await sock.groupUpdateSubject(
            m.chat,
            name
        );


        await sock.sendMessage(
            m.chat,
            {
                text:
                `✅ Group name changed to:\n${name}`
            },
            { quoted: m }
        );

    }
};
