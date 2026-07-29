require("./settings");

const fs = require("fs");
const { loadPlugins } = require("./lib/loader");
const connect = require("./lib/connect");

loadPlugins();

require("./pair");

console.log(`
╔════════════════════════════╗
║      🚀 TECHX-MD BOT       ║
║      Starting Bot...       ║
╚════════════════════════════╝
`);


// Auto restore saved sessions
if (fs.existsSync("./sessions")) {

    const sessions = fs.readdirSync("./sessions");

    for (const number of sessions) {

        console.log("♻️ Restoring session:", number);

        connect(number)
            .then(() => {
                console.log("✅ Restored:", number);
            })
            .catch(err => {
                console.log(
                    "❌ Restore failed:",
                    number,
                    err.message
                );
            });

    }

}
