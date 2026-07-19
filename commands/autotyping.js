const fs = require("fs");

const FILE = "./database/users.json";

module.exports = {
    name: "autotyping",

    execute: async (sock, m, args) => {

        if (!fs.existsSync(FILE)) {
            fs.writeFileSync(FILE, "{}");
        }

        let users = JSON.parse(
            fs.readFileSync(FILE, "utf8")
        );

        const option = args[0];

        if (!option || !["on","off"].includes(option)) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text:
                    "Use:\n.autotyping on\n.autotyping off"
                },
                { quoted:m }
            );
        }

        users[m.key.remoteJid] =
            users[m.key.remoteJid] || {};

        users[m.key.remoteJid].autotyping =
            option === "on";

        fs.writeFileSync(
            FILE,
            JSON.stringify(users,null,2)
        );

        await sock.sendMessage(
            m.key.remoteJid,
            {
                text:
                `✅ Your AutoTyping ${option.toUpperCase()}`
            },
            { quoted:m }
        );
    }
};
