"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIconTask = void 0;
const service_1 = require("./ios/service");
const service_2 = require("./android/service");
const type_1 = require("../../services/type");
const setIconTask = async (argv, config, args) => {
    const { path, platform, background } = args;
    switch (platform) {
        case type_1.EPlatform.IOS:
            await (0, service_1.addIosIcon)(path, background);
            break;
        case type_1.EPlatform.ANDROID:
            await (0, service_2.addAndroidIcon)(path, background);
            break;
        case type_1.EPlatform.ALL:
            await (0, service_1.addIosIcon)(path, background);
            await (0, service_2.addAndroidIcon)(path, background);
            break;
        default:
            console.log("We don't support this platform yet");
            break;
    }
};
exports.setIconTask = setIconTask;
