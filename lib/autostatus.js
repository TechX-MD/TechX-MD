const { downloadContentFromMessage } = require("@whiskeysockets/baileys");


async function handleStatusUpdate(sock, m, botData, userId) {

    try {

        if (!botData) return;

        if (!botData.statusSettings) {
            botData.statusSettings = {};
        }


        const settings = botData.statusSettings[userId];

        if (!settings || !settings.autoStatus) return;


        const msg = m.messages?.[0];

        if (!msg) return;


console.log("STATUS RECEIVED:", msg.key.remoteJid);

        if (msg.key.remoteJid !== "status@broadcast") {
            return;
        }


        const sender =
            msg.key.participant ||
            msg.key.remoteJid;


        // Auto Seen
        if (settings.autoSeen) {
            await sock.readMessages([
                msg.key
            ]);
        }


        // Auto Like
        if (settings.autoLike) {

            await sock.sendMessage(
                "status@broadcast",
                {
                    react: {
                        text: "❤️",
                        key: msg.key
                    }
                },
                {
                    statusJidList: [
                        sender
                    ]
                }
            );

        }


        // Auto Download
        if (settings.autoDownload) {

            const type =
            Object.keys(msg.message || {})[0];


            if (
                type === "imageMessage" ||
                type === "videoMessage"
            ) {

                const stream =
                await downloadContentFromMessage(
                    msg.message[type],
                    type.replace("Message","")
                );


                let buffer = Buffer.from([]);

                for await (const chunk of stream) {
                    buffer = Buffer.concat([
                        buffer,
                        chunk
                    ]);
                }


                await sock.sendMessage(
                    sock.user.id,
                    {
                        document: buffer,
                        fileName: `status-${Date.now()}`
                    }
                );

            }

        }


    } catch (e) {

        console.log(
            "AUTO STATUS ERROR:",
            e.message
        );

    }

}


module.exports = {
    handleStatusUpdate
};
