import mongoose from "mongoose";
declare const DeckModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    chapters: mongoose.Types.DocumentArray<{
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }> & {
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }>;
    pinned: boolean;
    cardsCount: number;
    date?: NativeDate | null | undefined;
    title?: string | null | undefined;
    email?: mongoose.Types.ObjectId | null | undefined;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    chapters: mongoose.Types.DocumentArray<{
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }> & {
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }>;
    pinned: boolean;
    cardsCount: number;
    date?: NativeDate | null | undefined;
    title?: string | null | undefined;
    email?: mongoose.Types.ObjectId | null | undefined;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    chapters: mongoose.Types.DocumentArray<{
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }> & {
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }>;
    pinned: boolean;
    cardsCount: number;
    date?: NativeDate | null | undefined;
    title?: string | null | undefined;
    email?: mongoose.Types.ObjectId | null | undefined;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    chapters: mongoose.Types.DocumentArray<{
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }> & {
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }>;
    pinned: boolean;
    cardsCount: number;
    date?: NativeDate | null | undefined;
    title?: string | null | undefined;
    email?: mongoose.Types.ObjectId | null | undefined;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    chapters: mongoose.Types.DocumentArray<{
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }> & {
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }>;
    pinned: boolean;
    cardsCount: number;
    date?: NativeDate | null | undefined;
    title?: string | null | undefined;
    email?: mongoose.Types.ObjectId | null | undefined;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    chapters: mongoose.Types.DocumentArray<{
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }> & {
        chapterId: string;
        createdAt: NativeDate;
        chapterTitle?: string | null | undefined;
    }>;
    pinned: boolean;
    cardsCount: number;
    date?: NativeDate | null | undefined;
    title?: string | null | undefined;
    email?: mongoose.Types.ObjectId | null | undefined;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default DeckModel;
