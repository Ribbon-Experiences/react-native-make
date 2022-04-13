"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceInFile = exports.applyPatch = exports.copyFile = exports.createDirectoryIfNotExists = exports.readFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const readFile = (sourcePath) => (0, fs_1.readFileSync)(sourcePath, 'utf8');
exports.readFile = readFile;
const createDirectoryIfNotExists = (path) => {
    const directory = (0, path_1.dirname)(path);
    if (!(0, fs_1.existsSync)(directory)) {
        (0, fs_1.mkdirSync)(directory, { recursive: true });
    }
};
exports.createDirectoryIfNotExists = createDirectoryIfNotExists;
const copyFile = (sourcePath, destinationPath) => {
    (0, exports.createDirectoryIfNotExists)(destinationPath);
    (0, fs_1.copyFileSync)(sourcePath, destinationPath);
};
exports.copyFile = copyFile;
const applyPatch = (path, { patch, pattern }) => {
    if (!(0, exports.readFile)(path).includes(patch)) {
        (0, fs_1.writeFileSync)(path, (0, fs_1.readFileSync)(path, 'utf8').replace(pattern, match => `${match}${patch}`));
    }
};
exports.applyPatch = applyPatch;
const replaceInFile = (sourcePath, destinationPath, replacements) => {
    (0, exports.createDirectoryIfNotExists)(destinationPath);
    let fileContent = (0, fs_1.readFileSync)(sourcePath, 'utf8');
    replacements.forEach(({ oldContent, newContent }) => {
        fileContent = fileContent.replace(oldContent, newContent);
    });
    (0, fs_1.writeFileSync)(destinationPath, fileContent);
};
exports.replaceInFile = replaceInFile;
