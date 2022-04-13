"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAndroidIcon = void 0;
const image_processing_1 = require("../../../services/image.processing");
const config_1 = require("./config");
const config_2 = require("../../config");
const path_1 = require("path");
const file_processing_1 = require("../../../services/file.processing");
const color_processing_1 = require("../../../services/color.processing");
const addAndroidIcon = async (iconSource, backgroundColor) => {
    await generateLegacyIcons(iconSource);
    await generateAdaptiveIcons(iconSource, backgroundColor);
};
exports.addAndroidIcon = addAndroidIcon;
const generateLegacyIcons = (iconSource) => Promise.all(config_1.config.androidIconSizes.map((size) => (0, image_processing_1.generateResizedAssets)(iconSource, `${config_2.ANDROID_MAIN_RES_PATH}/mipmap-${size.density}/ic_launcher.png`, size.value)));
const generateAdaptiveIcons = (iconSource, backgroundColor) => {
    (0, file_processing_1.replaceInFile)((0, path_1.join)(__dirname, `../../../../templates/android/values/colors-icon.xml`), `${config_2.ANDROID_MAIN_RES_PATH}/values/colors-icon.xml`, [
        {
            newContent: (0, color_processing_1.getHexColor)(backgroundColor),
            oldContent: /{{iconBackground}}/g,
        },
    ]);
    (0, file_processing_1.replaceInFile)(`${config_2.ANDROID_MAIN_PATH}/AndroidManifest.xml`, `${config_2.ANDROID_MAIN_PATH}/AndroidManifest.xml`, [
        {
            newContent: '',
            oldContent: /^.*android:roundIcon.*[\r\n]/gm,
        },
    ]);
    (0, file_processing_1.replaceInFile)(`${config_2.ANDROID_MAIN_PATH}/AndroidManifest.xml`, `${config_2.ANDROID_MAIN_PATH}/AndroidManifest.xml`, [
        {
            newContent: '      android:icon="@mipmap/ic_launcher"',
            oldContent: /^.*android:icon.*$/gm,
        },
    ]);
    return Promise.all(config_1.config.androidIconSizes.map((size) => generateAdaptiveIcon(iconSource, size.density, size.value)));
};
const generateAdaptiveIcon = (iconSource, density, value) => {
    const destinationDirectoryPath = `${config_2.ANDROID_MAIN_RES_PATH}/mipmap-${density}-v26`;
    (0, file_processing_1.copyFile)((0, path_1.join)(__dirname, `../../../../templates/android/mipmap/ic_launcher.xml`), `${destinationDirectoryPath}/ic_launcher.xml`);
    return (0, image_processing_1.generateResizedAssets)(iconSource, `${destinationDirectoryPath}/ic_foreground.png`, value);
};
