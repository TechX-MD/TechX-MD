module.exports = {
    name: "ping",
    description: "Check bot speed",

    async execute(sock, m) {
        await sock.sendMessage(
            m.key.remoteJid,
            {
                text: "🏓 Pong!\n\n⚡ TechX-MD Online"
            }
        );
    }
};
