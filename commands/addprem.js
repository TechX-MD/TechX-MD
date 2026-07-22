const { addPremium } = require("../lib/premium");

module.exports = {
    name: "addprem",

    execute: async (sock, m, args) => {

        if (!m.isOwner)
            return sock.sendMessage(
                m.chat,
                {
                    text: "❌ Owner only."
                },
                { quoted: m }
            );


        let number =
            args[0];


        if (!number)
            return sock.sendMessage(
                m.chat,
                {
                    text:
                    "❌ Provide number.\n\nExample:\n.addprem 263771234567"
                },
                { quoted: m }
            );


        addPremium(number);


        await sock.sendMessage(
            m.chat,
            {
                text:
                `✅ Added to premium:\n+${number.replace(/[^0-9]/g,"")}`
            },
            { quoted: m }
        );

    }
};
