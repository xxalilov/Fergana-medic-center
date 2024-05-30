"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFile = exports.upload = void 0;
const fs_1 = require("fs");
const multer_1 = __importStar(require("multer"));
const fileStorage = (0, multer_1.diskStorage)({
    destination: (req, file, cb) => {
        cb(null, "../static/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime().toString() +
            "-" +
            file.originalname.replace(/\s/g, ""));
    },
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/svg+xml" ||
        file.mimetype === "image/webp") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
const deleteFile = (filePath) => {
    (0, fs_1.unlink)(filePath, (err) => {
        if (!err) {
            return console.log("Deleted File");
        }
        console.log("File didn't delete");
    });
};
exports.deleteFile = deleteFile;
const upload = (0, multer_1.default)({ storage: fileStorage, fileFilter: fileFilter });
exports.upload = upload;
