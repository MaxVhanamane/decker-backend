import mongoose from "mongoose";
declare const DeckModel: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    cards: mongoose.Types.DocumentArray<{
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
        cardId: string;
        createdAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        cardId: string;
        createdAt: NativeDate;
    }> & {
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
        cardId: string;
        createdAt: NativeDate;
    }>;
    deckId: string;
    chapters: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }>;
    pinned: boolean;
    date?: NativeDate | null | undefined;
    title?: string | null | undefined;
    email?: mongoose.Types.ObjectId | null | undefined;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    cards: mongoose.Types.DocumentArray<{
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
        cardId: string;
        createdAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        cardId: string;
        createdAt: NativeDate;
    }> & {
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
        cardId: string;
        createdAt: NativeDate;
    }>;
    deckId: string;
    chapters: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }>;
    pinned: boolean;
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
    cards: mongoose.Types.DocumentArray<{
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
        cardId: string;
        createdAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        cardId: string;
        createdAt: NativeDate;
    }> & {
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
        cardId: string;
        createdAt: NativeDate;
    }>;
    deckId: string;
    chapters: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }>;
    pinned: boolean;
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
    cards: mongoose.Types.DocumentArray<{
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
        cardId: string;
        createdAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        cardId: string;
        createdAt: NativeDate;
    }> & {
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
        cardId: string;
        createdAt: NativeDate;
    }>;
    deckId: string;
    chapters: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }>;
    pinned: boolean;
    date?: NativeDate | null | undefined;
    title?: string | null | undefined;
    email?: mongoose.Types.ObjectId | null | undefined;
    deletedAt?: NativeDate | null | undefined;
    undoExpiresAt?: NativeDate | null | undefined;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    cards: mongoose.Types.DocumentArray<{
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
        cardId: string;
        createdAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        cardId: string;
        createdAt: NativeDate;
    }> & {
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
        cardId: string;
        createdAt: NativeDate;
    }>;
    deckId: string;
    chapters: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }>;
    pinned: boolean;
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
    cards: mongoose.Types.DocumentArray<{
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
        cardId: string;
        createdAt: NativeDate;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
        cardId: string;
        createdAt: NativeDate;
    }> & {
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
        cardId: string;
        createdAt: NativeDate;
    }>;
    deckId: string;
    chapters: mongoose.Types.DocumentArray<{
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }> & {
        createdAt: NativeDate;
        chapterId: string;
        cards: mongoose.Types.DocumentArray<{
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
            cardId: string;
            createdAt: NativeDate;
        }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
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
            cardId: string;
            createdAt: NativeDate;
        }> & {
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
            cardId: string;
            createdAt: NativeDate;
        }>;
        chapterTitle?: string | null | undefined;
    }>;
    pinned: boolean;
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
