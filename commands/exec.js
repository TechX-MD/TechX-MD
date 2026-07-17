const { exec } = require("child_process");

module.exports = {
    name: "exec",

    execute: async (sock, m, args) => {

        if (!m.key.fromMe) {
            return sock.sendMessage(
                m.key.remoteJid,
                { text:"❌ Owner only command." },
                { quoted:m }
            );
        }

        exec(args.join(" "), (err, stdout, stderr)=>{

            sock.sendMessage(
                m.key.remoteJid,
                {
                    text: stdout || stderr || err.message
                },
                { quoted:m }
            );

        });

    }
};
