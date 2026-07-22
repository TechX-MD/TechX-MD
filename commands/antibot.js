module.exports = {
    name: "antibot",

    execute: async (sock, m, args) => {

        if (!m.isGroup)
            return sock.sendMessage(
                m.chat,
                { text: "❌ Group only." },
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

        global.antibot = global.antibot || {};

        const option = (args[0] || "").toLowerCase();

        if (option === "on") {

            global.antibot[m.chat] = true;

            return sock.sendMessage(
                m.chat,
                {
                    text: "✅ Anti-Bot enabled."
                },
                { quoted: m }
            );

        }

        if (option === "off") {

            delete global.antibot[m.chat];

            return sock.sendMessage(
                m.chat,
                {
                    text: "❌ Anti-Bot disabled."
                },
                { quoted: m }
            );

        }

        return sock.sendMessage(
            m.chat,
            {
                text: "Usage:\n.antibot on\n.antibot off"
            },
            { quoted: m }
        );

    }
};
