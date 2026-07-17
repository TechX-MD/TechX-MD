module.exports = {
    name: "clear",

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


        console.log(
            "\x1Bc"
        );


        await sock.sendMessage(
            m.key.remoteJid,
            {
                text:
`🧹 Console cleared

🚀 TECHX-MD PRO`
            },
            {
                quoted: m
            }
        );

    }
};
