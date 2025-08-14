"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const uuid_1 = require("uuid");
const SlateNodeSchema = new Schema({
    type: { type: String },
    children: [Schema.Types.Mixed]
}, { _id: false, strict: false });
const chapterIdField = {
    type: String,
    validate: {
        validator: (v) => v === null || typeof v === 'string',
        message: (props) => `${props.path} must be a string or null`
    },
    default: null
};
const CardSchema = new Schema({
    cardId: { type: String, required: true, default: () => (0, uuid_1.v4)(), index: true },
    note: {
        type: [SlateNodeSchema],
        default: [{ type: 'paragraph', children: [{ text: '' }] }]
    },
    searchableContent: { type: String, default: '' },
    order: { type: Number, required: true },
    deckId: { type: String, required: true, index: true },
    chapterId: chapterIdField, //index for faster query
}, { timestamps: true });
// Create a compound unique index on deckId and order to ensure 
// that each card's order value is unique within the same deck.
// This prevents duplicate order numbers for cards in one deck.
CardSchema.index({ deckId: 1, order: 1 }, { unique: true });
exports.CardModel = mongoose_1.default.model("Card", CardSchema);
