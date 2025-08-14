import mongoose from "mongoose";
export declare const CardModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    chapterId: string;
    deckId: string;
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
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    chapterId: string;
    deckId: string;
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
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    chapterId: string;
    deckId: string;
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
    chapterId: string;
    deckId: string;
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
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    chapterId: string;
    deckId: string;
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
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    chapterId: string;
    deckId: string;
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
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
