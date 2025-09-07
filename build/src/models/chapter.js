"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const uuid_1 = require("uuid");
const { Schema } = mongoose_1.default;
const ChapterSchema = new Schema({
    email: { type: Schema.Types.ObjectId, ref: "User", required: true },
    chapterId: { type: String, required: true, default: () => (0, uuid_1.v4)(), index: true },
    deckId: { type: String, required: true, index: true },
    chapterName: String,
    createdAt: { type: Date, default: Date.now },
    cardsCount: { type: Number, default: 0 },
    order: { type: Number, required: true, },
    // Soft delete fields
    deletedAt: { type: Date },
    undoExpiresAt: { type: Date }
}, { timestamps: true });
// TTL index for auto-hard-delete
ChapterSchema.index({ undoExpiresAt: 1 }, {
    expireAfterSeconds: 0,
    partialFilterExpression: {
        deletedAt: { $exists: true },
        undoExpiresAt: { $exists: true }
    }
});
const ChapterModel = mongoose_1.default.model("Chapter", ChapterSchema);
exports.default = ChapterModel;
