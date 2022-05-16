"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResizedAssetsWithoutAlpha = exports.generateResizedAssets = void 0;
const path_1 = require("path");
const sharp_1 = __importDefault(require("sharp"));
const file_processing_1 = require("./file.processing");
const generateResizedAssets = async (sourcePath, destinationPath, width, height = width, options = {
    fit: 'contain',
}) => {
    (0, file_processing_1.createDirectoryIfNotExists)(destinationPath);
    return (0, sharp_1.default)((0, path_1.normalize)(sourcePath)).resize(width, height, options).toFile(destinationPath);
};
exports.generateResizedAssets = generateResizedAssets;
const generateResizedAssetsWithoutAlpha = async (sourcePath, destinationPath, width, height = width, options, backgroundColor) => {
    (0, file_processing_1.createDirectoryIfNotExists)(destinationPath);
    return (0, sharp_1.default)((0, path_1.normalize)(sourcePath))
        .resize(width, height, options)
        .flatten({ background: backgroundColor !== null && backgroundColor !== void 0 ? backgroundColor : { r: 0, g: 0, b: 0 } })
        .toFile(destinationPath);
};
exports.generateResizedAssetsWithoutAlpha = generateResizedAssetsWithoutAlpha;
