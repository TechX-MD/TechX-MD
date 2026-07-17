module.exports = {
    name: "update",

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


        await sock.sendMessage(
            m.key.remoteJid,
            {
                text: "🔄 Checking for updates..."
            },
            {
                quoted: m
            }
        );


        const { exec } = require("child_process");


        exec(
            "git pull && npm install",
            async (err, stdout, stderr) => {

                let result =
                    stdout ||
                    stderr ||
                    err?.message;


                await sock.sendMessage(
                    m.key.remoteJid,
                    {
                        text:
`✅ Update finished

📂 Result:

${result}

🚀 TECHX-MD`
                    },
                    {
                        quoted: m
                    }
                );

            }
        );

    }
};
