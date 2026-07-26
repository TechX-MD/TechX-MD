const {
    downloadContentFromMessage
} = require("@whiskeysockets/baileys");


const toBold = (text) => {

    const bold = {
        a:"𝗮",b:"𝗯",c:"𝗰",d:"𝗱",e:"𝗲",
        f:"𝗳",g:"𝗴",h:"𝗵",i:"𝗶",
        j:"𝗷",k:"𝗸",l:"𝗹",m:"𝗺",
        n:"𝗻",o:"𝗼",p:"𝗽",q:"𝗾",
        r:"𝗿",s:"𝘀",t:"𝘁",u:"𝘂",
        v:"𝘃",w:"𝘄",x:"𝘅",
        y:"𝘆",z:"𝘇"
    };

    return text
    .split("")
    .map(c => bold[c.toLowerCase()] || c)
    .join("");

};



async function downloadStatus(sock, msg){


    try{

        const type =
        Object.keys(msg.message)[0];


        if(
            type === "imageMessage" ||
            type === "videoMessage"
        ){

            const media =
            msg.message[type];


            const stream =
            await downloadContentFromMessage(
                media,
                type.replace("Message","")
            );


            let buffer =
            Buffer.from([]);


            for await(const chunk of stream){

                buffer =
                Buffer.concat([
                    buffer,
                    chunk
                ]);

            }


            return buffer;

        }


    }catch(e){

        console.log(
            "STATUS DOWNLOAD ERROR:",
            e.message
        );

    }

}





async function handleStatusUpdate(
    sock,
    m,
    botData,
    userId
){

    try{


        const settings =
        botData.statusSettings?.[userId];


        if(!settings || !settings.autoStatus)
            return;



        const msg =
        m.messages?.[0];


        if(
            !msg ||
            msg.key.remoteJid !== "status@broadcast"
        )
            return;



        const sender =
        msg.key.participant ||
        msg.key.remoteJid;



        // AUTO SEEN

        if(settings.autoSeen){

            await sock.readMessages([
                msg.key
            ]);

        }




        // AUTO LIKE

        if(settings.autoLike){

            const emojis=[
                "❤️",
                "🔥",
                "👍",
                "😍",
                "👏",
                "✨"
            ];


            const emoji =
            emojis[
                Math.floor(
                    Math.random()*emojis.length
                )
            ];


            await sock.sendMessage(
                "status@broadcast",
                {
                    react:{
                        text:emoji,
                        key:msg.key
                    }
                },
                {
                    statusJidList:[
                        sender
                    ]
                }
            );

        }





        // AUTO DOWNLOAD

        if(settings.autoDownload){

            const buffer =
            await downloadStatus(
                sock,
                msg
            );


            if(buffer){

                await sock.sendMessage(
                    sock.user.id,
                    {
                        document:buffer,
                        mimetype:"application/octet-stream",
                        fileName:
                        `status-${Date.now()}`
                    }
                );

            }

        }



    }catch(err){

        console.log(
            "AUTO STATUS ERROR:",
            err.message
        );

    }

}





module.exports = {
    handleStatusUpdate
};
