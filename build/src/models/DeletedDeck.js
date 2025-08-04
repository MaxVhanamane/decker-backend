"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const DeletedDeckSchema = new mongoose_1.Schema({
    token: { type: String, required: true, unique: true },
    deck: { type: Object, required: true },
    originalIndex: { type: Number, required: true },
    deletedAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true }
});
// TTL: Mongo will remove expired documents automatically
DeletedDeckSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const DeletedDeck = (0, mongoose_1.model)("DeletedDeck", DeletedDeckSchema);
exports.default = DeletedDeck;
