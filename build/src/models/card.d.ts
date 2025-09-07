import mongoose from "mongoose";
declare const CardModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    chapterId: string;
    cardId: string;
    note: mongoose.Types.DocumentArray<{
        children: any[];
        type?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        children: any[];
        type?: string | null | undefined;
    }> & {
        children: any[];
        type?: string | null | undefined;
    }>;
    searchableContent: string;
    order: number;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    chapterId: string;
    cardId: string;
    note: mongoose.Types.DocumentArray<{
        children: any[];
        type?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        children: any[];
        type?: string | null | undefined;
    }> & {
        children: any[];
        type?: string | null | undefined;
    }>;
    searchableContent: string;
    order: number;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    chapterId: string;
    cardId: string;
    note: mongoose.Types.DocumentArray<{
        children: any[];
        type?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        children: any[];
        type?: string | null | undefined;
    }> & {
        children: any[];
        type?: string | null | undefined;
    }>;
    searchableContent: string;
    order: number;
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
    chapterId: string;
    cardId: string;
    note: mongoose.Types.DocumentArray<{
        children: any[];
        type?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        children: any[];
        type?: string | null | undefined;
    }> & {
        children: any[];
        type?: string | null | undefined;
    }>;
    searchableContent: string;
    order: number;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    chapterId: string;
    cardId: string;
    note: mongoose.Types.DocumentArray<{
        children: any[];
        type?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        children: any[];
        type?: string | null | undefined;
    }> & {
        children: any[];
        type?: string | null | undefined;
    }>;
    searchableContent: string;
    order: number;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    deckId: string;
    chapterId: string;
    cardId: string;
    note: mongoose.Types.DocumentArray<{
        children: any[];
        type?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        children: any[];
        type?: string | null | undefined;
    }> & {
        children: any[];
        type?: string | null | undefined;
    }>;
    searchableContent: string;
    order: number;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default CardModel;
