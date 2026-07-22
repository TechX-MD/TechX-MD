const { removePremium } = require("../lib/premium");

module.exports = {
    name: "delprem",

    execute: async (sock, m, args) => {

        if (!m.isOwner) {
            return sock.sendMessage(
                m.chat,
                {
                    text: "❌ Owner only."
                },
                { quoted: m }
            );
        }


        let number =
            args[0] ||
            m.mentionedJid?.[0];


        if (!number) {
            return sock.sendMessage(
                m.chat,
                {
                    text:
                    "❌ Use:\n.delprem 2637xxxxxxx"
                },
                { quoted: m }
            );
        }


        number = number.replace(/[^0-9]/g, "");


        removePremium(number);


        await sock.sendMessage(
            m.chat,
            {
                text:
                `✅ Removed from Premium\n\n📱 Number: ${number}`
            },
            { quoted: m }
        );

    }
};
