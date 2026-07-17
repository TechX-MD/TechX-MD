module.exports = {
    name: "block",

    execute: async (sock, m, args) => {

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


        let number = args[0];

        if (!number) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Example:\n.block 263716616101"
                },
                {
                    quoted: m
                }
            );
        }


        number = number.replace(/[^0-9]/g, "");

        const jid = number + "@s.whatsapp.net";


        try {

            await sock.updateBlockStatus(
                jid,
                "block"
            );


            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text:
`✅ User blocked successfully

📱 Number: ${number}`
                },
                {
                    quoted: m
                }
            );


        } catch (err) {

            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text:
`❌ Block failed:
${err.message}`
                },
                {
                    quoted: m
                }
            );

        }

    }
};
