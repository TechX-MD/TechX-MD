module.exports = {
    name: "media",

    execute: async (sock, m) => {

        const text = `
╭━━━〔 🎨 TECHX-MD MEDIA 〕━━━⬣
┃
┃ 🖼 .sticker
┃ 😀 .emojimix
┃ ✍️ .ttp
┃ 🖌 .attp
┃ 🎭 .qc
┃ 🖼 .toimg
┃ 🎬 .togif
┃ 📹 .tovideo
┃ 🌐 .tourl
┃ ✨ .remini
┃ 🗑 .removebg
┃ ✂️ .crop
┃ 🔄 .rotate
┃ 📐 .resize
┃ 🪞 .flip
┃ 🌑 .grayscale
┃ 🎨 .invert
┃ 🌫 .blur
┃ 🧩 .pixelate
┃ 🏷 .take
┃ 🎞 .compress
┃ 💡 .enhance
┃ 🖍 .sketch
┃ 🖼 .mirror
┃ 🌈 .colorize
┃ 🧼 .sharpen
┃ 🔍 .hd
┃ 📷 .imageinfo
┃ 🎥 .videoinfo
┃ 🎵 .audioinfo
┃ 📂 .media
┃
╰━━━━━━━━━━━━━━━━⬣

🚀 TECHX-MD V3 PRO
👑 Owner: Kelly
`;

        await sock.sendMessage(
            m.key.remoteJid,
            {
                image: {
                    url: "https://up6.cc/2026/07/178402176851411.jpeg"
                },
                caption: text
            },
            {
                quoted: m
            }
        );

    }
};
