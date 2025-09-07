import mongoose from 'mongoose';
export type DeckSearchResult = {
    type: 'deck';
    deckId: string;
    title: string;
    pinned: boolean;
    createdAt: Date;
    cardsCount: number;
};
export type ChapterSearchResult = {
    type: 'chapter';
    deckId: string;
    deckTitle: string;
    chapterId: string;
    chapterTitle: string;
    createdAt: Date;
};
export type DeckCardSearchResult = {
    type: 'deck-card';
    deckId: string;
    deckTitle: string;
    cardId: string;
    note: {
        children: any[];
        type?: string | null;
    }[];
    createdAt: Date;
    order: number;
};
export type ChapterCardSearchResult = {
    type: 'chapter-card';
    deckId: string;
    deckTitle: string;
    chapterId: string;
    chapterTitle: string;
    cardId: string;
    note: {
        children: any[];
        type?: string | null;
    }[];
    createdAt: Date;
    order: number;
};
export type CardSearchResult = DeckCardSearchResult | ChapterCardSearchResult;
export type SearchResult = DeckSearchResult | ChapterSearchResult | CardSearchResult;
export interface SearchResponse {
    results: SearchResult[];
    total: number;
    page: number;
    totalPages: number;
    hasMore: boolean;
}
export declare class SearchService {
    static search(query: string, userId: mongoose.Types.ObjectId, page?: number, limit?: number): Promise<SearchResponse>;
    private static getDecks;
    private static getChapters;
    private static getCards;
    static getSearchCounts(query: string, userId: mongoose.Types.ObjectId): Promise<{
        decks: number;
        chapters: number;
        cards: number;
        total: number;
    }>;
}
