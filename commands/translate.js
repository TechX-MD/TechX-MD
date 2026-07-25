const fetch = require("node-fetch");

module.exports = {
    name: "translate",
    aliases: ["trt", "tr"],

    execute: async (sock, m, args) => {

        const chatId = m.chat || m.key.remoteJid;

        try {

            // React loading
            await sock.sendMessage(chatId, {
                react: {
                    text: "🌐",
                    key: m.key
                }
            });


            await sock.presenceSubscribe(chatId);
            await sock.sendPresenceUpdate(
                "composing",
                chatId
            );


            let textToTranslate = "";
            let lang = "";


            // Check replied message
            const quoted =
                m.message?.extendedTextMessage
                ?.contextInfo?.quotedMessage;


            if (quoted) {

                textToTranslate =
                    quoted.conversation ||
                    quoted.extendedTextMessage?.text ||
                    quoted.imageMessage?.caption ||
                    quoted.videoMessage?.caption ||
                    "";


                lang = args[0];

            } else {


                if (args.length < 2) {

                    return sock.sendMessage(
                        chatId,
                        {
                            text:
`🌐 *TRANSLATOR*

Usage:

Reply:
.translate <language>

Example:
.reply message
.translate fr


Direct:
.translate hello fr


Languages:
en - English
fr - French
es - Spanish
de - German
pt - Portuguese
it - Italian
ru - Russian
ja - Japanese
ko - Korean
zh - Chinese
ar - Arabic
hi - Hindi`,
                        },
                        { quoted: m }
                    );

                }


                lang = args.pop();

                textToTranslate =
                    args.join(" ");

            }



            if (!textToTranslate) {

                return sock.sendMessage(
                    chatId,
                    {
                        text:
                        "❌ No text found to translate."
                    },
                    { quoted: m }
                );

            }



            let translated = null;



            // Google translate
            try {

                const res = await fetch(
`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(textToTranslate)}`
                );


                const data = await res.json();


                if (
                    data &&
                    data[0] &&
                    data[0][0]
                ) {

                    translated =
                        data[0][0][0];

                }


            } catch (e) {}



            // MyMemory fallback
            if (!translated) {

                try {

                    const res =
                    await fetch(
`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textToTranslate)}&langpair=auto|${lang}`
                    );


                    const data =
                    await res.json();


                    if (
                    data.responseData
                    ?.translatedText
                    ) {

                        translated =
                        data.responseData.translatedText;

                    }


                } catch (e) {}

            }



            // Third API fallback
            if (!translated) {

                try {

                    const res =
                    await fetch(
`https://api.dreaded.site/api/translate?text=${encodeURIComponent(textToTranslate)}&lang=${lang}`
                    );


                    const data =
                    await res.json();


                    if (data.translated) {

                        translated =
                        data.translated;

                    }


                } catch (e) {}

            }



            if (!translated) {

                throw new Error(
                    "Translation failed"
                );

            }



            await sock.sendMessage(
                chatId,
                {
                    text:
`🌐 *Translation*

📝 Original:
${textToTranslate}

✅ Result:
${translated}`
                },
                {
                    quoted: m
                }
            );


            // Success reaction
            await sock.sendMessage(chatId,{
                react:{
                    text:"✅",
                    key:m.key
                }
            });



        } catch (err) {

            console.log(
                "TRANSLATE ERROR:",
                err
            );


            await sock.sendMessage(
                chatId,
                {
                    text:
                    "❌ Translation failed. Try again later."
                },
                {
                    quoted:m
                }
            );

        }

    }
};




