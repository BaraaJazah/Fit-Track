module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [

        'react-native-reanimated/plugin', // 👈 يجب أن يكون آخر `plugin` في القائمة
        ["module:react-native-dotenv", {
            "envName": "APP_ENV",
            "moduleName": "@env",
            "path": ".env",
            "blocklist": null,
            "allowlist": null,
            "blacklist": null, // DEPRECATED
            "whitelist": null, // DEPRECATED
            "safe": false,
            "allowUndefined": true,
            "verbose": false
        }
        ]
    ]
};