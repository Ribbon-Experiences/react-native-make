"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rnPluginConfig = void 0;
const modules_1 = require("./modules");
const v2Config = {
    commands: [modules_1.setIconCommand, modules_1.setSplashScreenCommand],
};
exports.rnPluginConfig = v2Config;
