
require("../settings");

module.exports = {
    name: "allmenu",
    aliases: ["fullmenu"],

    execute: async (sock, m, args) => {

        const botName = global.botName || "TECHX-MD";
        const owner = global.ownerName || "Kelly";
        const prefix = global.prefix || ".";

        const text = `
╭━━━〔 🤖 ${botName} V3 〕━━━⬣
┃ 👤 Owner : ${owner}
┃ ⚡ Status : Online
┃ 📌 Prefix : ${prefix}
┃ 🌐 https://techx-md.onrender.com
╰━━━━━━━━━━━━━━━━⬣

╭━━〔 👥 GROUP COMMANDS 〕━━⬣
┃
> 👥 ${prefix}tagall
> ➕ ${prefix}add
> ➖ ${prefix}kick
> ⭐ ${prefix}promote
> ⬇️ ${prefix}demote
> 🔒 ${prefix}lock
> 🔓 ${prefix}unlock
> 📝 ${prefix}setname
> 📄 ${prefix}setdesc
> 🔗 ${prefix}linkgroup
> 🚫 ${prefix}antilink
> 🤖 ${prefix}welcome
> 👋 ${prefix}goodbye
> 👑 ${prefix}admins
> 📊 ${prefix}groupinfo
╰━━━━━━━━━━━━━━━━⬣

╭━━〔 👑 OWNER COMMANDS 〕━━⬣
┃
> 🔄 ${prefix}restart
> 📢 ${prefix}broadcast
> ⚙️ ${prefix}eval
> 🖥 ${prefix}exec
> 🔒 ${prefix}block
> 🔓 ${prefix}unblock
> 🔄 ${prefix}update
> 📂 ${prefix}backup
> 🧹 ${prefix}clear
> 🐞 ${prefix}debug
> 📜 ${prefix}logs
╰━━━━━━━━━━━━━━━━⬣

╭━━〔 🛠️ TOOLS COMMANDS 〕━━⬣
┃
> 🔗 ${prefix}shorturl
> 🔍 ${prefix}google
> 📚 ${prefix}wikipedia
> 🌦️ ${prefix}weather
> 🧮 ${prefix}calculator
> 🔐 ${prefix}password
> 🔢 ${prefix}qr
> 🔤 ${prefix}base64
> 🔒 ${prefix}encode
> 🔓 ${prefix}decode
> 🌍 ${prefix}translate
> 📱 ${prefix}ipcheck
> 🆔 ${prefix}uuid
> ⏰ ${prefix}timestamp
> 🎨 ${prefix}font
> 📝 ${prefix}read
> 📄 ${prefix}json
╰━━━━━━━━━━━━━━━━⬣

╭━━〔 🤖 AI COMMANDS 〕━━⬣
┃
> 🧠 ${prefix}ai
> 💬 ${prefix}chat
> ✍️ ${prefix}write
> 📝 ${prefix}rewrite
> 🌍 ${prefix}translateai
> 📚 ${prefix}summary
> 💡 ${prefix}idea
> 🎵 ${prefix}lyricsai
> 🎨 ${prefix}imagine
> 💻 ${prefix}codeai
> 🐞 ${prefix}debugai
> 📖 ${prefix}story
> 🎤 ${prefix}songai
> ⚡ ${prefix}prompt
╰━━━━━━━━━━━━━━━━⬣

╭━━〔 🎵 DOWNLOADER COMMANDS 〕━━⬣
┃
> 🎬 ${prefix}ytmp4
> 🎵 ${prefix}ytmp3
> 🔍 ${prefix}ytsearch
> 🎶 ${prefix}song
> 📱 ${prefix}tiktok
> 📸 ${prefix}instagram
> 📘 ${prefix}facebook
> 🐦 ${prefix}twitter
> 🎧 ${prefix}spotify
> ☁️ ${prefix}soundcloud
> 📌 ${prefix}pinterest
> 📂 ${prefix}mediafire
> 📦 ${prefix}apk
> ▶️ ${prefix}play
> ⬇️ ${prefix}video
╰━━━━━━━━━━━━━━━━⬣

╭━━〔 🎨 MEDIA COMMANDS 〕━━⬣
┃
> 🖼 ${prefix}sticker
> 😀 ${prefix}emojimix
> ✍️ ${prefix}ttp
> 🖌 ${prefix}attp
> 🎭 ${prefix}qc
> 🖼 ${prefix}toimg
> 🎬 ${prefix}togif
> 📹 ${prefix}tovideo
> 🌐 ${prefix}tourl
> ✨ ${prefix}remini
> 🗑 ${prefix}removebg
> ✂️ ${prefix}crop
> 🔄 ${prefix}rotate
> 📐 ${prefix}resize
> 🪞 ${prefix}flip
> 🌑 ${prefix}grayscale
> 🎨 ${prefix}invert
> 🌫 ${prefix}blur
> 🧩 ${prefix}pixelate
> 🏷 ${prefix}take
> 🎞 ${prefix}compress
> 💡 ${prefix}enhance
> 🖍 ${prefix}sketch
> 🖼 ${prefix}mirror
> 🌈 ${prefix}colorize
> 🧼 ${prefix}sharpen
> 🔍 ${prefix}hd
> 📷 ${prefix}imageinfo
> 🎥 ${prefix}videoinfo
> 🎵 ${prefix}audioinfo
> 📂 ${prefix}media
╰━━━━━━━━━━━━━━━━⬣

╭━━〔 🔐 SECURITY COMMANDS 〕━━⬣
┃
> 🔒 ${prefix}lock
> 🔓 ${prefix}unlock
> 🚫 ${prefix}antilink on/off
> 🤖 ${prefix}antibot on/off
> 🚨 ${prefix}antispam on/off
> 👥 ${prefix}antitag on/off
> 📵 ${prefix}antifake on/off
> 🗑 ${prefix}antidelete on/off
> 👁 ${prefix}antiviewonce on/off
> 👋 ${prefix}welcome on/off
> 👋 ${prefix}goodbye on/off
╰━━━━━━━━━━━━━━━━⬣

╭━━〔 🔌 PLUGINS 〕━━⬣
┃
> 🟢 ${prefix}alwaysonline
> 📖 ${prefix}autostatus
> 👀 ${prefix}autoread
> ✍️ ${prefix}autotyping
> 🎙️ ${prefix}autorecording
> ❤️ ${prefix}autoreact
> 📥 ${prefix}autodownload
> 📸 ${prefix}autoview
> 👁 ${prefix}vv
> 📝 ${prefix}autobio
> 🛡 ${prefix}antidelete
> 🚫 ${prefix}antilink
> 👥 ${prefix}antitag
> 🚷 ${prefix}antispam
> 👋 ${prefix}welcome
> 🔒 ${prefix}anticall
> 🔇 ${prefix}mute
> 🔊 ${prefix}unmute
> ⚙️ ${prefix}plugins
╰━━━━━━━━━━━━━━━━⬣

🚀 ${botName} V3
`;

        await sock.sendMessage(
            m.chat,
            { text },
            { quoted: m }
        );
    }
};
