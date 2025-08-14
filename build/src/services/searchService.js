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
exports.SearchService = void 0;
const deck_1 = __importDefault(require("../models/deck"));
const card_1 = require("../models/card");
// Escape user input for regex
function escapeRegex(input) {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
class SearchService {
    static search(query, userId, page = 1, limit = 20) {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const clean = escapeRegex(query.replace(/['"]+/g, ''));
            const searchRegex = new RegExp(clean, 'i');
            const allResults = [];
            // 1) Load all decks for this user (not deleted)
            const deckDocs = yield deck_1.default.find({ email: userId, deletedAt: { $exists: false } }, { deckId: 1, title: 1, pinned: 1, createdAt: 1, cardsCount: 1, chapters: 1, _id: 0 })
                .lean()
                .exec();
            // Build maps for quick lookups
            const deckMap = new Map();
            const deckIds = [];
            for (const d of deckDocs) {
                if (!(d === null || d === void 0 ? void 0 : d.deckId))
                    continue;
                deckMap.set(d.deckId, d);
                deckIds.push(d.deckId);
                // Deck title match
                if (d.title && searchRegex.test(d.title)) {
                    allResults.push({
                        type: 'deck',
                        deckId: d.deckId,
                        title: d.title,
                        pinned: d.pinned,
                        createdAt: d.createdAt,
                        cardsCount: (_a = d.cardsCount) !== null && _a !== void 0 ? _a : 0,
                    });
                }
                // Chapter title match
                if (Array.isArray(d.chapters)) {
                    for (const ch of d.chapters) {
                        if ((ch === null || ch === void 0 ? void 0 : ch.chapterId) && ch.chapterTitle && searchRegex.test(ch.chapterTitle)) {
                            allResults.push({
                                type: 'chapter',
                                deckId: d.deckId,
                                deckTitle: (_b = d.title) !== null && _b !== void 0 ? _b : '',
                                chapterId: ch.chapterId,
                                chapterTitle: ch.chapterTitle,
                                createdAt: ch.createdAt,
                            });
                        }
                    }
                }
            }
            if (deckIds.length === 0) {
                // No decks for this user -> empty results
                return {
                    results: [],
                    total: 0,
                    page,
                    totalPages: 0,
                    hasMore: false,
                };
            }
            // 2) Load cards from the separate collection, for those decks, matching the regex
            const cardDocs = yield card_1.CardModel.find({ deckId: { $in: deckIds }, searchableContent: searchRegex }, { cardId: 1, note: 1, createdAt: 1, deckId: 1, chapterId: 1, order: 1, _id: 0 })
                .lean()
                .exec();
            // Optional: Build chapter lookup per deck for nicer labels
            const chapterTitleMap = new Map();
            for (const d of deckDocs) {
                if (!((_c = d.chapters) === null || _c === void 0 ? void 0 : _c.length))
                    continue;
                const inner = new Map();
                for (const ch of d.chapters) {
                    if (ch.chapterId) {
                        inner.set(ch.chapterId, { title: (_d = ch.chapterTitle) !== null && _d !== void 0 ? _d : '', createdAt: ch.createdAt });
                    }
                }
                chapterTitleMap.set(d.deckId, inner);
            }
            // 3) Convert cards to results
            for (const c of cardDocs) {
                const deck = deckMap.get(c.deckId);
                if (!deck)
                    continue;
                if (c.chapterId) {
                    const chMap = chapterTitleMap.get(c.deckId);
                    const chInfo = chMap === null || chMap === void 0 ? void 0 : chMap.get(c.chapterId);
                    allResults.push({
                        type: 'chapter-card',
                        deckId: deck.deckId,
                        deckTitle: (_e = deck.title) !== null && _e !== void 0 ? _e : '',
                        chapterId: c.chapterId,
                        chapterTitle: (_f = chInfo === null || chInfo === void 0 ? void 0 : chInfo.title) !== null && _f !== void 0 ? _f : '',
                        cardId: c.cardId,
                        note: c.note,
                        createdAt: c.createdAt,
                        order: c.order,
                    });
                }
                else {
                    allResults.push({
                        type: 'deck-card',
                        deckId: deck.deckId,
                        deckTitle: (_g = deck.title) !== null && _g !== void 0 ? _g : '',
                        cardId: c.cardId,
                        note: c.note,
                        createdAt: c.createdAt,
                        order: c.order,
                    });
                }
            }
            // 4) Sort by deck,chapter,deck-card,chapter-card
            const typeOrder = {
                deck: 0,
                chapter: 1,
                'deck-card': 2,
                'chapter-card': 3,
            };
            allResults.sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);
            // 5) Paginate
            const total = allResults.length;
            const paginated = allResults.slice(skip, skip + limit);
            return {
                results: paginated,
                total,
                page,
                totalPages: Math.ceil(total / limit),
                hasMore: page < Math.ceil(total / limit),
            };
        });
    }
}
exports.SearchService = SearchService;
