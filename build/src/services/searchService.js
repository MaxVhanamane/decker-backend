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
class SearchService {
    static search(query, userId, page = 1, limit = 20) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (page - 1) * limit;
            const cleanQuery = query.replace(/['"]+/g, '');
            const searchRegex = new RegExp(cleanQuery, 'i');
            // Find matching decks
            const decks = yield deck_1.default.find({
                email: userId,
                deletedAt: { $exists: false },
                $or: [
                    { title: searchRegex },
                    { 'chapters.chapterTitle': searchRegex },
                    { 'chapters.cards.searchableContent': searchRegex },
                    { 'cards.searchableContent': searchRegex }
                ]
            }).lean();
            const allResults = [];
            for (const deck of decks) {
                if (!deck.deckId || !deck.title)
                    continue;
                // Match deck
                if (searchRegex.test(deck.title)) {
                    allResults.push({
                        type: 'deck',
                        deckId: deck.deckId,
                        title: deck.title,
                        pinned: deck.pinned,
                        cardsCount: deck.cards.length,
                        createdAt: deck.createdAt
                    });
                }
                // Match chapters and chapter cards
                for (const chapter of deck.chapters || []) {
                    if (!chapter.chapterId || !chapter.chapterTitle)
                        continue;
                    if (searchRegex.test(chapter.chapterTitle)) {
                        allResults.push({
                            type: 'chapter',
                            deckId: deck.deckId,
                            deckTitle: deck.title,
                            chapterId: chapter.chapterId,
                            chapterTitle: chapter.chapterTitle,
                            createdAt: chapter.createdAt
                        });
                    }
                    for (let i = 0; i < (chapter.cards || []).length; i++) {
                        const card = chapter.cards[i];
                        if (!card.cardId || !card.searchableContent)
                            continue;
                        if (searchRegex.test(card.searchableContent)) {
                            allResults.push({
                                type: 'chapter-card',
                                deckId: deck.deckId,
                                deckTitle: deck.title,
                                chapterId: chapter.chapterId,
                                chapterTitle: chapter.chapterTitle,
                                cardId: card.cardId,
                                note: card.note,
                                createdAt: chapter.createdAt,
                                cardIndex: i
                            });
                        }
                    }
                }
                // Match direct deck cards
                for (let i = 0; i < (deck.cards || []).length; i++) {
                    const card = deck.cards[i];
                    if (!card.cardId || !card.searchableContent)
                        continue;
                    if (searchRegex.test(card.searchableContent)) {
                        allResults.push({
                            type: 'deck-card',
                            deckId: deck.deckId,
                            deckTitle: deck.title,
                            cardId: card.cardId,
                            note: card.note,
                            createdAt: card.createdAt,
                            cardIndex: i
                        });
                    }
                }
            }
            // Sort by relevance (deck > chapter > deck-card > chapter-card)
            const typeOrder = {
                deck: 0,
                chapter: 1,
                'deck-card': 2,
                'chapter-card': 3
            };
            allResults.sort((a, b) => typeOrder[a.type] - typeOrder[b.type]);
            const paginatedResults = allResults.slice(skip, skip + limit);
            return {
                results: paginatedResults,
                total: allResults.length,
                page,
                totalPages: Math.ceil(allResults.length / limit),
                hasMore: page < Math.ceil(allResults.length / limit)
            };
        });
    }
}
exports.SearchService = SearchService;
