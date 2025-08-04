"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const uuid_1 = require("uuid");
const SlateNodeSchema = new Schema({
    type: { type: String },
    children: [Schema.Types.Mixed]
}, { _id: false, strict: false });
// strict: false to allow other extra properties like listStyle,color,language etc.
const CardSchema = new Schema({
    note: {
        type: [SlateNodeSchema],
        default: [{ type: 'paragraph', children: [{ text: '' }] }]
    },
    searchableContent: {
        type: String,
        default: ''
    },
    cardId: { type: String, required: true, default: () => (0, uuid_1.v4)() },
    createdAt: { type: Date, required: true, default: Date.now }
});
const ChapterSchema = new Schema({
    chapterId: { type: String, required: true, default: () => (0, uuid_1.v4)() },
    chapterTitle: String,
    cards: [CardSchema],
    createdAt: { type: Date, required: true, default: Date.now }
});
const DeckSchema = new Schema({
    deckId: { type: String, required: true, unique: true, default: () => (0, uuid_1.v4)() },
    title: String,
    cards: [CardSchema],
    chapters: [ChapterSchema],
    pinned: { type: Boolean, default: false },
    email: { type: Schema.Types.ObjectId, ref: "User" },
    date: { type: Date },
    // Soft delete fields
    deletedAt: { type: Date },
    undoExpiresAt: { type: Date } // Only exists when document is deleted
}, { timestamps: true });
// Add TTL(Time To Live)
DeckSchema.index({ undoExpiresAt: 1 }, {
    expireAfterSeconds: 0,
    partialFilterExpression: {
        deletedAt: { $exists: true },
        undoExpiresAt: { $exists: true } // Field exists 
    }
});
const DeckModel = mongoose_1.default.model("Deck", DeckSchema);
exports.default = DeckModel;
