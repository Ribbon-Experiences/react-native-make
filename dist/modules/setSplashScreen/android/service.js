"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addAndroidSplashScreen = void 0;
const color_processing_1 = require("../../../services/color.processing");
const file_processing_1 = require("../../../services/file.processing");
const path_1 = require("path");
const config_1 = require("../../config");
const image_processing_1 = require("../../../services/image.processing");
const config_2 = require("./config");
const type_1 = require("../../../services/type");
const utils_1 = require("../../../utils");
const addAndroidSplashScreen = async (imageSource, backgroundColor, resizeMode) => {
    try {
        addReactNativeSplashScreen(backgroundColor, resizeMode);
        await generateAndroidSplashImages(imageSource);
    }
    catch (err) {
        console.log(err);
    }
};
exports.addAndroidSplashScreen = addAndroidSplashScreen;
const addLaunchScreenBackgroundColor = (backgroundColor) => {
    (0, file_processing_1.replaceInFile)((0, path_1.join)(__dirname, '../../../../templates/android/values/colors-splash.xml'), `${config_1.ANDROID_MAIN_RES_PATH}/values/colors-splash.xml`, [
        {
            oldContent: /{{splashprimary}}/g,
            newContent: `${(0, color_processing_1.getHexColor)(backgroundColor)}`,
        },
    ]);
};
const addReactNativeSplashScreen = (backgroundColor, resizeMode = type_1.EResizeMode.CONTAIN) => {
    addLaunchScreenBackgroundColor(backgroundColor);
    (0, file_processing_1.copyFile)((0, path_1.join)(__dirname, '../../../../templates/android/drawable/splashscreen.xml'), `${config_1.ANDROID_MAIN_RES_PATH}/drawable/splashscreen.xml`);
    (0, file_processing_1.copyFile)((0, path_1.join)(__dirname, `../../../../templates/android/layout/launch_screen.${resizeMode}.xml`), `${config_1.ANDROID_MAIN_RES_PATH}/layout/launch_screen.xml`);
    (0, file_processing_1.applyPatch)(`${config_1.ANDROID_MAIN_RES_PATH}/values/styles.xml`, {
        pattern: /^.*<resources>.*[\r\n]/g,
        patch: (0, file_processing_1.readFile)((0, path_1.join)(__dirname, '../../../../templates/android/values/styles-splash.xml')),
    });
    const mainActivityPath = `${config_1.ANDROID_MAIN_PATH}/java/${(0, utils_1.convertAndroidPackageNameToUri)((0, utils_1.getAndroidPackageName)())}/MainActivity.java`;
    (0, file_processing_1.applyPatch)(mainActivityPath, {
        pattern: /^(.+?)(?=import)/gs,
        patch: 'import android.os.Bundle;\n' + 'import org.devio.rn.splashscreen.SplashScreen;\n',
    });
    const onCreateRegExp = /^.*onCreate.*[\r\n]/gm;
    const mainActivityContent = (0, file_processing_1.readFile)(mainActivityPath);
    const hasOnCreate = mainActivityContent.match(onCreateRegExp);
    if (hasOnCreate) {
        if (mainActivityContent.match(/^.*SplashScreen\.show.*[\r\n]/gm)) {
            return;
        }
        (0, file_processing_1.applyPatch)(mainActivityPath, {
            pattern: onCreateRegExp,
            patch: 'SplashScreen.show(this, R.style.SplashScreenTheme);',
        });
    }
    else {
        (0, file_processing_1.applyPatch)(mainActivityPath, {
            pattern: /^.*MainActivity.*[\r\n]/gm,
            patch: '    @Override\n' +
                '    protected void onCreate(Bundle savedInstanceState) {\n' +
                '        SplashScreen.show(this, R.style.SplashScreenTheme);\n' +
                '        super.onCreate(savedInstanceState);\n' +
                '    }',
        });
    }
};
const generateAndroidSplashImages = (imageSource) => Promise.all(config_2.config.androidSplashImages.map(({ size, density }) => (0, image_processing_1.generateResizedAssets)(imageSource, `${config_1.ANDROID_MAIN_RES_PATH}/drawable-${density}/splash_image.png`, size, size, {
    fit: 'inside',
})));
