const CracoAlias = require("craco-alias");
module.exports = {
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "options",
                baseUrl: "./",
                aliases: {
                    "@style": "./src/styles/index",
                    "@animation": './src/styles/animations',
                    "@globalFunctions": "./src/utils/globalFunctions",
                    "@config": "./src/config",
                    "@util": "./src/utils",
                    "@card": "./src/components/cards",
                    "@layout": './src/components/layouts',
                    "@page": './src/pages',
                }
            },
        },
    ],
};