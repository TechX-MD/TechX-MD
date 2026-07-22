module.exports = {
    name: "antispam",

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

        global.antispam = global.antispam || {};

        const option = (args[0] || "").toLowerCase();

        if (option === "on") {

            global.antispam[m.chat] = true;

            return sock.sendMessage(
                m.chat,
                {
                    text: "✅ Anti-Spam enabled."
                },
                { quoted: m }
            );

        }

        if (option === "off") {

            delete global.antispam[m.chat];

            return sock.sendMessage(
                m.chat,
                {
                    text: "❌ Anti-Spam disabled."
                },
                { quoted: m }
            );

        }

        return sock.sendMessage(
            m.chat,
            {
                text:
`Usage:
.antispam on
.antispam off`
            },
            { quoted: m }
        );

    }
};
