"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackTask = void 0;
const universal_analytics_1 = __importDefault(require("universal-analytics"));
const analytics = (0, universal_analytics_1.default)('UA-145385834-2');
const trackTask = (pageName, task) => (argv, config, args) => {
    analytics.pageview(pageName).send();
    return task(argv, config, args);
};
exports.trackTask = trackTask;
