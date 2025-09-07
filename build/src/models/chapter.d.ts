import mongoose from "mongoose";
declare const ChapterModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    cardsCount: number;
    email: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    chapterId: string;
    order: number;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
    chapterName?: string | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    cardsCount: number;
    email: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    chapterId: string;
    order: number;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
    chapterName?: string | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    cardsCount: number;
    email: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    chapterId: string;
    order: number;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
    chapterName?: string | null | undefined;
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
    cardsCount: number;
    email: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    chapterId: string;
    order: number;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
    chapterName?: string | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    cardsCount: number;
    email: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    chapterId: string;
    order: number;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
    chapterName?: string | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    cardsCount: number;
    email: mongoose.Types.ObjectId;
    createdAt: NativeDate;
    chapterId: string;
    order: number;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
    chapterName?: string | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default ChapterModel;
