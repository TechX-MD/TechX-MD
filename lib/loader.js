const fs = require("fs");
const path = require("path");

const plugins = new Map();

function loadPlugins() {

    const commandPath = path.join(
        __dirname,
        "../commands"
    );

    fs.readdirSync(commandPath).forEach((file) => {

        if (file.endsWith(".js")) {

            const plugin = require(
                path.join(commandPath, file)
            );

            if (plugin.name) {

                plugins.set(
                    plugin.name,
                    plugin
                );

                console.log(
                    "✅ Loaded:",
                    plugin.name
                );

            }

        }

    });

}

module.exports = {
    plugins,
    loadPlugins
};
