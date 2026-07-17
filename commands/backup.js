const fs = require("fs");
const { exec } = require("child_process");

module.exports = {
    name: "backup",

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
                text: "📦 Creating backup..."
            },
            {
                quoted: m
            }
        );


        exec(
            "zip -r TECHX-MD-backup.zip . -x node_modules/* sessions/*",
            async (err) => {

                if (err) {
                    return sock.sendMessage(
                        m.key.remoteJid,
                        {
                            text: "❌ Backup failed"
                        },
                        {
                            quoted: m
                        }
                    );
                }


                await sock.sendMessage(
                    m.key.remoteJid,
                    {
                        document: fs.readFileSync(
                            "TECHX-MD-backup.zip"
                        ),
                        fileName: "TECHX-MD-backup.zip",
                        mimetype: "application/zip"
                    },
                    {
                        quoted: m
                    }
                );

            }
        );

    }
};
