





const { isPremium } = require("../lib/premium");

module.exports = {
    name: "premium",

    execute: async (sock, m) => {

        const number =
            (m.sender || "")
            .split(":")[0]
            .replace("@s.whatsapp.net", "")
            .replace("@lid", "")
            .replace(/[^0-9]/g, "");

        console.log(
            "PREMIUM CHECK NUMBER:",
            number
        );

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
