const fs = require("fs");

module.exports = {
    name: "logs",

    execute: async (sock, m) => {

        if (!m.key.fromMe) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Owner only command."
                },
                {
                    quoted: m
                }
            );
        }


        try {

            let logs = "";

            if (fs.existsSync("logs.txt")) {
                logs = fs.readFileSync(
                    "logs.txt",
                    "utf8"
                );
            } else {
                logs = "No logs found.";
            }


            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text:
`📜 TECHX-MD LOGS

${logs.slice(0,4000)}`
                },
                {
                    quoted: m
                }
            );


        } catch(err) {

            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text:
`❌ Logs error:
${err.message}`
                },
                {
                    quoted: m
                }
            );

        }

    }
};
