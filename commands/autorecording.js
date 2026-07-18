const fs = require("fs");

const SETTINGS_FILE = "./database/settings.json";

module.exports = {
    name: "autorecording",

    execute: async (sock, m, args) => {

        const settings = JSON.parse(
            fs.readFileSync(SETTINGS_FILE, "utf8")
        );

        const option = args[0];

        if (!option || !["on", "off"].includes(option)) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "Use:\n.autorecording on\n.autorecording off"
                },
                { quoted: m }
            );
        }

        settings.autorecording = option === "on";

        fs.writeFileSync(
            SETTINGS_FILE,
            JSON.stringify(settings, null, 2)
        );

        await sock.sendMessage(
            m.key.remoteJid,
            {
                text: `🎙️ Auto Recording ${option.toUpperCase()}`
            },
            { quoted: m }
        );

    }
};
