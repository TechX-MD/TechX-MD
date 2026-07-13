require("./settings");

const { loadPlugins } = require("./lib/loader");

loadPlugins();

require("./pair");

console.log(`
╔════════════════════════════╗
║      🚀 TECHX-MD BOT       ║
║      Starting Bot...       ║
╚════════════════════════════╝
`);
