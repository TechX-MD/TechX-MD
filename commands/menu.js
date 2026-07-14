module.exports = {
    name: "menu",

    execute: async (sock, m) => {

        const text = `
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
                caption: text,

                footer: "TECHX-MD V3",

                title: "TECHX-MD MENU",

                sections: [
                    {
                        title: "COMMAND CATEGORIES",
                        rows: [
                            {
                                title: "⚡ MAIN COMMANDS",
                                rowId: ".main",
                                description: "Basic bot commands"
                            },
                            {
                                title: "👥 GROUP COMMANDS",
                                rowId: ".group",
                                description: "Group management"
                            },
                            {
                                title: "👑 OWNER COMMANDS",
                                rowId: ".owner",
                                description: "Owner controls"
                            },
                            {
                                title: "🛠 TOOLS",
                                rowId: ".tools",
                                description: "Useful tools"
                            }
                        ]
                    }
                ]
            },
            {
                quoted: m
            }
        );

    }
};
