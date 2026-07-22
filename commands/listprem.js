const { getPremium } = require("../lib/premium");

module.exports = {
    name: "listprem",

    execute: async (sock, m) => {

        if (!m.isOwner) {
            return sock.sendMessage(
                m.chat,
                {
                    text: "❌ Owner only."
                },
                { quoted: m }
            );
        }


        const users = getPremium();


        if (users.length === 0) {

            return sock.sendMessage(
                m.chat,
                {
                    text:
                    "📂 No premium users."
                },
                { quoted: m }
            );

        }


        let text =
        "👑 PREMIUM USERS\n\n";


        users.forEach(
            (user, i) => {

                text +=
                `${i + 1}. +${user}\n`;

            }
        );


        await sock.sendMessage(
            m.chat,
            {
                text
            },
            { quoted: m }
        );

    }
};
