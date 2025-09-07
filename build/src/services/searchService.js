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
const card_1 = __importDefault(require("../models/card"));
const chapter_1 = __importDefault(require("../models/chapter"));
// Escape user input for regex
function escapeRegex(input) {
    return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
class SearchService {
    // Optimized approach: Separate queries with proper pagination
    static search(query, userId, page = 1, limit = 20) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const cleanQuery = escapeRegex(query.replace(/['"]+/g, ''));
            const searchRegex = new RegExp(cleanQuery, 'i');
            // First, get valid deck IDs for this user to optimize card queries
            const validDeckIds = yield deck_1.default.distinct('deckId', {
                email: userId,
                deletedAt: { $exists: false }
            });
            if (validDeckIds.length === 0) {
                return { results: [], total: 0, page, totalPages: 0, hasMore: false };
            }
            // Count totals for each type
            const [deckCount, chapterCount, cardCount] = yield Promise.all([
                deck_1.default.countDocuments({
                    email: userId,
                    deletedAt: { $exists: false },
                    title: searchRegex
                }),
                chapter_1.default.countDocuments({
                    email: userId,
                    deletedAt: { $exists: false },
                    deckId: { $in: validDeckIds },
                    chapterName: searchRegex
                }),
                card_1.default.countDocuments({
                    deckId: { $in: validDeckIds },
                    deletedAt: { $exists: false },
                    searchableContent: searchRegex
                })
            ]);
            const total = deckCount + chapterCount + cardCount;
            const totalPages = Math.ceil(total / limit);
            // Determine which types to query based on pagination
            const results = [];
            let remaining = limit;
            let currentSkip = skip;
            // Decks first (priority 0)
            if (currentSkip < deckCount && remaining > 0) {
                const deckResults = yield this.getDecks(searchRegex, userId, Math.max(0, currentSkip), Math.min(remaining, deckCount - currentSkip));
                results.push(...deckResults);
                remaining -= deckResults.length;
            }
            currentSkip = Math.max(0, currentSkip - deckCount);
            // Chapters second (priority 1)
            if (currentSkip < chapterCount && remaining > 0) {
                const chapterResults = yield this.getChapters(searchRegex, userId, validDeckIds, Math.max(0, currentSkip), Math.min(remaining, chapterCount - currentSkip));
                results.push(...chapterResults);
                remaining -= chapterResults.length;
            }
            currentSkip = Math.max(0, currentSkip - chapterCount);
            // Cards last (priority 2 & 3)
            if (currentSkip < cardCount && remaining > 0) {
                const cardResults = yield this.getCards(searchRegex, validDeckIds, Math.max(0, currentSkip), remaining);
                results.push(...cardResults);
            }
            return {
                results,
                total,
                page,
                totalPages,
                hasMore: page < totalPages,
            };
        });
    }
    static getDecks(searchRegex, userId, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const decks = yield deck_1.default.find({
                email: userId,
                deletedAt: { $exists: false },
                title: searchRegex
            }, {
                deckId: 1,
                title: 1,
                pinned: 1,
                createdAt: 1,
                cardsCount: 1
            })
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean();
            return decks.map(deck => ({
                type: 'deck',
                deckId: deck.deckId,
                title: deck.title || '',
                pinned: deck.pinned,
                createdAt: deck.createdAt,
                cardsCount: deck.cardsCount || 0,
            }));
        });
    }
    static getChapters(searchRegex, userId, validDeckIds, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = [
                {
                    $match: {
                        email: userId,
                        deletedAt: { $exists: false },
                        deckId: { $in: validDeckIds },
                        chapterName: searchRegex
                    }
                },
                {
                    $lookup: {
                        from: 'decks',
                        let: { deckId: '$deckId' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ['$deckId', '$$deckId'] },
                                    email: userId,
                                    deletedAt: { $exists: false }
                                }
                            },
                            { $project: { title: 1, _id: 0 } }
                        ],
                        as: 'deckInfo'
                    }
                },
                {
                    $project: {
                        chapterId: 1,
                        deckId: 1,
                        chapterName: 1,
                        createdAt: 1,
                        deckTitle: {
                            $ifNull: [
                                { $arrayElemAt: ['$deckInfo.title', 0] },
                                ''
                            ]
                        }
                    }
                },
                { $sort: { createdAt: -1 } },
                { $skip: skip },
                { $limit: limit }
            ];
            const chapters = yield chapter_1.default.aggregate(pipeline);
            return chapters.map(chapter => ({
                type: 'chapter',
                deckId: chapter.deckId,
                deckTitle: chapter.deckTitle,
                chapterId: chapter.chapterId,
                chapterTitle: chapter.chapterName,
                createdAt: chapter.createdAt,
            }));
        });
    }
    static getCards(searchRegex, validDeckIds, skip, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const pipeline = [
                {
                    $match: {
                        deckId: { $in: validDeckIds },
                        deletedAt: { $exists: false },
                        searchableContent: searchRegex
                    }
                },
                {
                    $lookup: {
                        from: 'decks',
                        let: { deckId: '$deckId' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: { $eq: ['$deckId', '$$deckId'] },
                                    deletedAt: { $exists: false }
                                }
                            },
                            { $project: { title: 1, _id: 0 } }
                        ],
                        as: 'deckInfo'
                    }
                },
                {
                    $lookup: {
                        from: 'chapters',
                        let: {
                            chapterId: '$chapterId',
                            deckId: '$deckId'
                        },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ['$chapterId', '$$chapterId'] },
                                            { $eq: ['$deckId', '$$deckId'] },
                                            { $ne: ['$chapterId', null] }
                                        ]
                                    },
                                    deletedAt: { $exists: false }
                                }
                            },
                            { $project: { chapterName: 1, _id: 0 } }
                        ],
                        as: 'chapterInfo'
                    }
                },
                {
                    $project: {
                        cardId: 1,
                        deckId: 1,
                        chapterId: 1,
                        note: 1,
                        createdAt: 1,
                        order: 1,
                        deckTitle: {
                            $ifNull: [
                                { $arrayElemAt: ['$deckInfo.title', 0] },
                                ''
                            ]
                        },
                        chapterTitle: {
                            $ifNull: [
                                { $arrayElemAt: ['$chapterInfo.chapterName', 0] },
                                ''
                            ]
                        },
                        // Add sort priority: deck-card = 2, chapter-card = 3
                        sortOrder: {
                            $cond: {
                                if: { $and: [{ $ne: ['$chapterId', null] }, { $ne: ['$chapterId', ''] }] },
                                then: 3,
                                else: 2
                            }
                        }
                    }
                },
                { $sort: { sortOrder: 1, createdAt: -1 } },
                { $skip: skip },
                { $limit: limit }
            ];
            const cards = yield card_1.default.aggregate(pipeline);
            return cards.map(card => {
                const baseCard = {
                    deckId: card.deckId,
                    deckTitle: card.deckTitle,
                    cardId: card.cardId,
                    note: card.note,
                    createdAt: card.createdAt,
                    order: card.order,
                };
                // Check if card belongs to a chapter
                if (card.chapterId && card.chapterId !== null && card.chapterId !== '') {
                    return Object.assign(Object.assign({ type: 'chapter-card' }, baseCard), { chapterId: card.chapterId, chapterTitle: card.chapterTitle });
                }
                else {
                    return Object.assign({ type: 'deck-card' }, baseCard);
                }
            });
        });
    }
    // Optional: Method to get search counts without results (useful for UI)
    static getSearchCounts(query, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cleanQuery = escapeRegex(query.replace(/['"]+/g, ''));
            const searchRegex = new RegExp(cleanQuery, 'i');
            const validDeckIds = yield deck_1.default.distinct('deckId', {
                email: userId,
                deletedAt: { $exists: false }
            });
            if (validDeckIds.length === 0) {
                return { decks: 0, chapters: 0, cards: 0, total: 0 };
            }
            const [deckCount, chapterCount, cardCount] = yield Promise.all([
                deck_1.default.countDocuments({
                    email: userId,
                    deletedAt: { $exists: false },
                    title: searchRegex
                }),
                chapter_1.default.countDocuments({
                    email: userId,
                    deletedAt: { $exists: false },
                    deckId: { $in: validDeckIds },
                    chapterName: searchRegex
                }),
                card_1.default.countDocuments({
                    deckId: { $in: validDeckIds },
                    deletedAt: { $exists: false },
                    searchableContent: searchRegex
                })
            ]);
            return {
                decks: deckCount,
                chapters: chapterCount,
                cards: cardCount,
                total: deckCount + chapterCount + cardCount
            };
        });
    }
}
exports.SearchService = SearchService;
