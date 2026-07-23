const { isPremium } = require("../lib/premium");

module.exports = {
    name: "premium",

    execute: async (sock, m) => {

        const number = m.sender.replace(/[^0-9]/g, "");

        const status = isPremium(number);

        await sock.sendMessage(
            m.chat,
            {
                text: status
                    ? "👑 You are a Premium User."
                    : "❌ You are not a Premium User."
            },
            { quoted: m }
        );

    }
};
