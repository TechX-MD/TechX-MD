const fs = require("fs");
const path = require("path");
const {
    downloadContentFromMessage,
    jidNormalizedUser
} = require("@whiskeysockets/baileys");

const messageStore = new Map();

const MAX_STORE = 1000;
const MEDIA_DIR = path.join(__dirname, "../tmp");

if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR, {
        recursive: true
    });
}


function bold(text) {

    return text
        .split("")
        .map(c => {
            const map = {
                a:"𝗮",b:"𝗯",c:"𝗰",d:"𝗱",e:"𝗲",
                f:"𝗳",g:"𝗴",h:"𝗵",i:"𝗶",
                j:"𝗷",k:"𝗸",l:"𝗹",m:"𝗺",
                n:"𝗻",o:"𝗼",p:"𝗽",q:"𝗾",
                r:"𝗿",s:"𝘀",t:"𝘁",u:"𝘂",
                v:"𝘃",w:"𝘄",x:"𝘅",
                y:"𝘆",z:"𝘇"
            };

            return map[c.toLowerCase()] || c;

        })
        .join("");
}



// command
async function handleAntideleteCommand(
    sock,
    chatId,
    message,
    isOwner,
    botData,
    saveBotData,
    userId,
    args
){

    if(!isOwner){

        return sock.sendMessage(
            chatId,
            {
                text:"❌ Owner only."
            },
            {quoted:message}
        );

    }


    const option =
        args[0]?.toLowerCase();


    if(!botData.antiDelete)
        botData.antiDelete={};



    if(!option){

        return sock.sendMessage(
            chatId,
            {
text:
`╭━━━〔 ${bold("ANTI DELETE")} 〕━━━╮

Status:
${botData.antiDelete[userId] ? "✅ ON":"❌ OFF"}

Commands:

.antidelete on
.antidelete off

╰━━━━━━━━━━━━━━╯`
            },
            {quoted:message}
        );

    }



    if(option==="on")
        botData.antiDelete[userId]=true;


    else if(option==="off")
        botData.antiDelete[userId]=false;


    else
        return sock.sendMessage(
            chatId,
            {
                text:"❌ Use on/off"
            },
            {quoted:message}
        );


    saveBotData();


    return sock.sendMessage(
        chatId,
        {
            text:
            `✅ Antidelete ${
                option==="on"
                ?"enabled"
                :"disabled"
            }`
        },
        {quoted:message}
    );

}





async function downloadMedia(media,type,id){

    try{

        const stream =
        await downloadContentFromMessage(
            media,
            type
        );


        let buffer =
        Buffer.from([]);


        for await(const chunk of stream){

            buffer =
            Buffer.concat([
                buffer,
                chunk
            ]);


            if(buffer.length > 50*1024*1024)
                break;

        }


        const ext={
            image:"jpg",
            video:"mp4",
            audio:"mp3",
            sticker:"webp"
        }[type];


        const file =
        path.join(
            MEDIA_DIR,
            `${id}.${ext}`
        );


        fs.writeFileSync(
            file,
            buffer
        );


        return file;


    }catch(e){

        console.log(
            "MEDIA DOWNLOAD ERROR:",
            e.message
        );

        return null;

    }

}




async function storeMessage(message){


    try{


        const id =
        message.key?.id;


        if(!id) return;


        if(message.message?.protocolMessage)
            return;



        let msg =
        message.message;


        if(msg?.ephemeralMessage)
            msg =
            msg.ephemeralMessage.message;



        if(msg?.viewOnceMessage)
            msg =
            msg.viewOnceMessage.message;



        if(msg?.viewOnceMessageV2)
            msg =
            msg.viewOnceMessageV2.message;



        if(!msg)
            return;



        let data={

            text:"",
            type:"",
            file:null,
            sender:
            message.key.participant ||
            message.key.remoteJid,

            group:
            message.key.remoteJid?.endsWith("@g.us")
            ?
            message.key.remoteJid
            :
            null,

            time:Date.now()

        };



        if(msg.conversation){

            data.text =
            msg.conversation;

        }


        else if(msg.extendedTextMessage){

            data.text =
            msg.extendedTextMessage.text;

        }


        else if(msg.imageMessage){

            data.type="image";
            data.text=
            msg.imageMessage.caption || "";

            data.file =
            await downloadMedia(
                msg.imageMessage,
                "image",
                id
            );

        }


        else if(msg.videoMessage){

            data.type="video";

            data.text =
            msg.videoMessage.caption || "";

            data.file =
            await downloadMedia(
                msg.videoMessage,
                "video",
                id
            );

        }


        else if(msg.audioMessage){

            data.type="audio";

            data.file =
            await downloadMedia(
                msg.audioMessage,
                "audio",
                id
            );

        }


        else if(msg.stickerMessage){

            data.type="sticker";

            data.file =
            await downloadMedia(
                msg.stickerMessage,
                "sticker",
                id
            );

        }



        if(messageStore.size >= MAX_STORE){

            const first =
            messageStore.keys()
            .next().value;

            messageStore.delete(first);

        }



        messageStore.set(
            id,
            data
        );


    }catch(e){}

}





async function handleMessageRevocation(sock,message){


    try{


        const revoke =
        message.message?.protocolMessage;


        if(!revoke || revoke.type !==0)
            return;



        const deleted =
        messageStore.get(
            revoke.key.id
        );


        if(!deleted)
            return;



        const owner =
        jidNormalizedUser(
            sock.user.id
        );


        const sender =
        deleted.sender
        .split("@")[0];



        let text =
`🚨 *ANTI DELETE*

👤 Sender:
@${sender}

📂 Type:
${deleted.type || "text"}

🕒 Time:
${new Date(
deleted.time
).toLocaleString()}

`;



        if(deleted.text)
            text +=
`\n📝 Message:

${deleted.text}`;



        await sock.sendMessage(
            owner,
            {
                text,
                mentions:[
                    deleted.sender
                ]
            }
        );



        if(
            deleted.file &&
            fs.existsSync(deleted.file)
        ){


            const options={
                caption:
                `Deleted ${deleted.type}`,
                mentions:[
                    deleted.sender
                ]
            };


            if(deleted.type==="image")
                await sock.sendMessage(
                    owner,
                    {
                        image:{
                            url:deleted.file
                        },
                        ...options
                    }
                );


            if(deleted.type==="video")
                await sock.sendMessage(
                    owner,
                    {
                        video:{
                            url:deleted.file
                        },
                        ...options
                    }
                );


            if(deleted.type==="audio")
                await sock.sendMessage(
                    owner,
                    {
                        audio:{
                            url:deleted.file
                        },
                        mimetype:
                        "audio/mp4"
                    }
                );


            if(deleted.type==="sticker")
                await sock.sendMessage(
                    owner,
                    {
                        sticker:{
                            url:deleted.file
                        }
                    }
                );


            setTimeout(()=>{

                try{
                    fs.unlinkSync(
                        deleted.file
                    );
                }catch{}

            },5000);

        }



        messageStore.delete(
            revoke.key.id
        );



    }catch(e){

        console.log(
            "ANTI DELETE ERROR:",
            e.message
        );

    }

}




module.exports={
    handleAntideleteCommand,
    storeMessage,
    handleMessageRevocation
};
