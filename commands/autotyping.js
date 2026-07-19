const fs = require("fs");

const FILE = "./database/settings.json";

module.exports = {
    name: "autotyping",

    execute: async (sock, m, args) => {

        let settings = JSON.parse(
            fs.readFileSync(FILE, "utf8")
        );

        if (args[0] === "on") {
            settings.autotyping = true;
        } else if (args[0] === "off") {
            settings.autotyping = false;
        } else {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "Example:\n.autotyping on\n.autotyping off"
                },
                { quoted: m }
            );
        }

        fs.writeFileSync(
            FILE,
            JSON.stringify(settings, null, 2)
        );

        await sock.sendMessage(
            m.key.remoteJid,
            {
                text: `✅ AutoTyping ${args[0].toUpperCase()}`
            },
            { quoted: m }
        );
    }
};
