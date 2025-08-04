"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.set("strictQuery", true);
let cached = global.mongooseCache;
if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}
// const MONGODB_OPTIONS = {
//     serverSelectionTimeoutMS: 5000,
//     socketTimeoutMS: 45000,
//     connectTimeoutMS: 10000,
//     maxPoolSize: 10,
//     minPoolSize: 1,
//     bufferCommands: false,
// } as const;
function connectWithRetry(maxRetries = 2) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                const connection = yield mongoose_1.default.connect(process.env.MONGO_URI);
                console.log("MongoDB connected successfully");
                return connection;
            }
            catch (error) {
                console.error(`Connection attempt ${attempt} failed:`, error.message);
                if (attempt === maxRetries) {
                    throw error;
                }
                // Shorter delay for free tier
                yield new Promise(resolve => setTimeout(resolve, 500 * attempt));
            }
        }
        throw new Error("Max retries exceeded");
    });
}
function connectToMongoDB() {
    return __awaiter(this, void 0, void 0, function* () {
        // Ensure cached is initialized
        if (!cached) {
            cached = global.mongooseCache = { conn: null, promise: null };
        }
        // Check if connection exists and is healthy
        if (cached.conn && mongoose_1.default.connection.readyState === 1) {
            return cached.conn;
        }
        // Reset stale connections
        if (cached.conn && mongoose_1.default.connection.readyState !== 1) {
            cached.conn = null;
            cached.promise = null;
        }
        if (!cached.promise) {
            cached.promise = connectWithRetry().catch((error) => {
                if (cached)
                    cached.promise = null;
                throw error;
            });
        }
        try {
            cached.conn = yield cached.promise;
            return cached.conn;
        }
        catch (error) {
            if (cached)
                cached.promise = null;
            console.error("MongoDB connection failed:", error.message);
            throw new Error("Database connection failed");
        }
    });
}
exports.connectToMongoDB = connectToMongoDB;
