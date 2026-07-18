const axios = require("axios");

module.exports = {
    name: "remini",

    execute: async (sock, m) => {

        if (!m.quoted || !m.quoted.message?.imageMessage) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Reply to an image with .remini"
                },
                {
                    quoted: m
                }
            );
        }


        await sock.sendMessage(
            m.key.remoteJid,
            {
                text: "⏳ Enhancing image..."
            },
            {
                quoted: m
            }
        );


        // API call ichauya pano
        const api =
        "https://techx-ap.onrender.com/remini";


        try {

            const response = await axios.post(api);


            await sock.sendMessage(
                m.key.remoteJid,
                {
                    text:
`✅ REMINI COMPLETE

${JSON.stringify(response.data)}`
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
`❌ Error:
${err.message}`
                },
                {
                    quoted: m
                }
            );

        }

    }
};
