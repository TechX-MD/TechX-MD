module.exports = {
    name: "broadcast",

    execute: async (sock, m, args) => {

        if (!m.key.fromMe) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ This command is only for the bot owner."
                },
                {
                    quoted: m
                }
            );
        }


        const message = args.join(" ");

        if (!message) {
            return sock.sendMessage(
                m.key.remoteJid,
                {
                    text: "❌ Example:\n.broadcast Hello everyone"
                },
                {
                    quoted: m
                }
            );
        }


        const chats = await sock.groupFetchAllParticipating();

        let groups = Object.keys(chats);

        let sent = 0;


        for (let id of groups) {

            try {

                await sock.sendMessage(
                    id,
                    {
                        text:
`📢 *BROADCAST MESSAGE*

${message}

🚀 TECHX-MD`
                    }
                );

                sent++;

                await new Promise(
                    resolve => setTimeout(resolve, 1500)
                );

            } catch (err) {

                console.log(
                    "Broadcast error:",
                    err.message
                );

            }

        }


        await sock.sendMessage(
            m.key.remoteJid,
            {
                text:
`✅ Broadcast completed

📌 Sent to: ${sent} groups`
            },
            {
                quoted: m
            }
        );

    }
};
