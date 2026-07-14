module.exports = {
    name: "menu",

    execute: async (sock, m) => {

        const caption = `
╭━━━〔 🤖 TECHX-MD V3 〕━━━⬣
┃ 👤 Owner : Kelly
┃ ⚡ Status : Online
┃ 📌 Prefix : .
┃ 🌐 https://techx-md.onrender.com
╰━━━━━━━━━━━━━━━━⬣

🚀 Select a category below
`;

        await sock.sendMessage(
            m.key.remoteJid,
            {
                image: {
                    url: "https://up6.cc/2026/07/178402176851411.jpeg"
                },
                caption: caption,

                footer: "TECHX-MD V3",

                buttons: [
                    {
                        buttonId: ".main",
                        buttonText: {
                            displayText: "⚡ MAIN"
                        },
                        type: 1
                    },
                    {
                        buttonId: ".group",
                        buttonText: {
                            displayText: "👥 GROUP"
                        },
                        type: 1
                    },
                    {
                        buttonId: ".owner",
                        buttonText: {
                            displayText: "👑 OWNER"
                        },
                        type: 1
                    }
                ],

                headerType: 4
            },
            {
                quoted: m
            }
        );

    }
};
