"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importStar(require("mongoose"));
const deck_1 = __importDefault(require("./models/deck"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
const user_1 = __importDefault(require("./models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const passport_local_1 = __importDefault(require("passport-local"));
const verifyemail_1 = __importDefault(require("./models/verifyemail"));
const forgotpasswordotps_1 = __importDefault(require("./models/forgotpasswordotps"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const accountdeletionotps_1 = __importDefault(require("./models/accountdeletionotps"));
const cookieParser = require('cookie-parser');
const LocalStrategy = passport_local_1.default.Strategy;
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const dbConnection_1 = require("./DB/dbConnection");
const fetchUserDetails_1 = require("./middlewares/fetchUserDetails");
const GoogleStrategy = require("passport-google-oauth20");
const compression_1 = __importDefault(require("compression"));
const searchService_1 = require("./services/searchService");
const extractTextFromSlateNodes_1 = require("./utils/extractTextFromSlateNodes");
const card_1 = require("./models/card");
(0, dotenv_1.config)();
let PORT = 5000;
const isProduction = process.env.NODE_ENV === 'production';
const app = (0, express_1.default)();
app.use((0, compression_1.default)());
// here app.use() acts as middleware. as we have not specified the path here it will run on every request. If you want to run it on a specific path add the path then it will run on that path only. eg. app.use("/add",express.json())
// express.json() is used to get the content in the body.
app.use(express_1.default.json({ limit: '5mb' }));
// cors is used to get request from different origin. eg. If your backend is running on http://localhost:5000 you can't request from 
// http://localhost:3000 it gives you cross-origin error. to avoid that error we use cors.
app.use((0, cors_1.default)({ origin: process.env.ORIGIN, credentials: true }));
app.set('trust proxy', 1);
// create session
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: process.env.MONGO_URI,
        autoRemove: "interval",
        autoRemoveInterval: 60,
        collectionName: "sessions"
    }),
    // Comment out these keys - httpOnly,secure - from the cookie object while working on localhost. If you don't comment them out, cookies will not be sent to the frontend, and authentication will not work properly.
    // uncomment it while deploying
    cookie: {
        httpOnly: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        secure: isProduction,
        maxAge: 1000 * 60 * 60 * 24 * 30 //cookie expires in 30 days
    }
}));
app.use(cookieParser());
// using passport to handle login
app.use(passport_1.default.initialize());
// allow passport to use "express-session".
app.use(passport_1.default.session());
(0, dbConnection_1.connectToMongoDB)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
    .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit process if DB connection fails
});
// local strategy 
passport_1.default.use(new LocalStrategy(
//By default, Passport checks for the username in req.body.username. However, if you are sending it with a different name, such as 'email,' you must explicitly define it in the object like this { usernameField: "email" }. Otherwise, Passport will not recognize the username.
{ usernameField: "email" }, 
// Passport.js automatically extracts the username and password from req.body and places them into this function.
function (username, password, done) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ email: username });
        // If we don't find any user then we will throw an error. we can receive this error using error.message in login route.
        if (!user) {
            return done(new mongoose_1.Error("User with this email doesn't exist!"));
        }
        // check if user is registered with Google Auth
        if (!(user === null || user === void 0 ? void 0 : user.password)) {
            return done(new mongoose_1.Error("You can't log in with your username and password, you signed up with Google. Please use the 'Continue with Google' button to log in."));
        }
        // If we reach this line it means we found the user now let's compare the passoword.
        bcryptjs_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password, (err, result) => {
            if (err)
                throw err; // If some error occures while decrypting we will throw an error. very less likely but still...
            if (result === true) {
                done(null, user); // If password matches we will send the user
            }
            else {
                return done(new mongoose_1.Error("Incorrect password!")); // If password doesn't match then we will throw an error.we can receive this error using error.message in login route.
            }
        });
    });
}));
//gooogle strategy 
passport_1.default.use(new GoogleStrategy({
    callbackURL: "/auth/google/callback",
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // This function runs upon successful authentication.
    //extracting required user information from the profile that is given by google
    const userInfo = {
        email: (profile === null || profile === void 0 ? void 0 : profile.emails) ? (_a = profile === null || profile === void 0 ? void 0 : profile.emails[0]) === null || _a === void 0 ? void 0 : _a.value : "",
        profile_picture: (profile === null || profile === void 0 ? void 0 : profile.photos) ? (_b = profile === null || profile === void 0 ? void 0 : profile.photos[0]) === null || _b === void 0 ? void 0 : _b.value : "",
        username: profile.displayName
    };
    try {
        // now we will check if the user exist in the database. if not we will create new user.
        const user = yield user_1.default.findOne({ email: userInfo.email });
        if (!user) {
            const newUser = new user_1.default(userInfo);
            yield newUser.save();
            return done(null, newUser);
        }
        return done(null, user);
        //If some error occures while connecting to db of something else we will catch it here
    }
    catch (error) {
        return done(error);
    }
})));
// serializeUser to store only id in session. (This runs only once during authentication)
passport_1.default.serializeUser((user, done) => {
    // The function call done(null, user?._id) attaches the user's ID to the session object like this. It automatically stores the information you pass to the done function in a key called 'user' in session.passport.user.
    //   session: {
    //   "cookie": {
    //     "originalMaxAge": 480000,
    //     "expires": "2023-11-05T15:44:12.151Z",
    //     "httpOnly": true,
    //     "path": "/"
    //   },
    //   "passport": {
    //     "user": "63aefb77b11ddfcc0d6361e2"
    //   }
    // }
    return done(null, user === null || user === void 0 ? void 0 : user._id);
});
// deserializeUser extracts user using id given by serializeUser and adds that user to req.user object. (runs on every request for authenticated users).
//about id parameter deserializeUser function: On subsequent requests from the authenticated user, Passport's session management middleware automatically retrieves the user's session data, including the serialized user ID. When your route handlers are executed, and passport.deserializeUser is called, Passport provides the user's ID as the id parameter, which you can then use to fetch the user's complete information from your database.
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserDetails = yield user_1.default.findById(id);
        if (UserDetails) {
            const userInfo = {
                _id: UserDetails._id,
                username: UserDetails.username,
                email: UserDetails.email,
                profile_picture: UserDetails.profile_picture,
            };
            done(null, userInfo);
        }
        else {
            done(null, null);
        }
    }
    catch (error) {
        done(error);
    }
}));
app.get('/checkonlinestatus', (0, cors_1.default)({ origin: true }), function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.status(200).json({ online: true });
    });
});
//Deck routes 
app.get('/decks', fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req === null || req === void 0 ? void 0 : req.user;
        // .sort({ date: -1 }): This part of the query sorts the results in descending order based on the date field. The -1 indicates that the results should be sorted in descending order, while a 1 would indicate ascending order.
        // as there is a relation defined between two collection DeckModel and User 
        // I have to use DeckModel.find({ email: user.id }) not DeckModel.find({ email: user.email })
        // To retrieve only certain fields from the documents, you can pass a projection object as the second argument to the find() method. The projection object should contain the fields that you want to include (set to 1) or exclude (set to 0) from the result set. For example, if you want to retrieve only the title and pinned fields, you can pass the projection object as follows: { title: 1, pinned: 1 }
        // const deck = await DeckModel.find({ email: user?._id }, { title: 1, pinned: 1, date: 1 }).sort({ date: -1 });
        const decks = yield deck_1.default.aggregate([
            { $match: { email: user === null || user === void 0 ? void 0 : user._id, deletedAt: { $exists: false } } },
            { $sort: { date: -1 } },
            {
                $project: {
                    title: 1, pinned: 1, createdAt: 1, deckId: 1, cardsCount: 1, _id: 0,
                }
            }
        ]);
        res.status(200).json(decks);
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error!" });
    }
}));
app.post("/reorder-deck", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const { currentIndex, newIndex } = req.body;
    const userId = (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c._id;
    try {
        // Fetch decks sorted by date (newest to oldest)
        const decks = yield deck_1.default.aggregate([
            { $match: { email: userId } },
            { $sort: { date: -1 } },
            { $project: { title: 1, pinned: 1, _id: 1, date: 1 } }
        ]);
        if (currentIndex < 0 || currentIndex >= decks.length || newIndex < 0 || newIndex >= decks.length) {
            return res.status(400).json({ message: 'Invalid index positions' });
        }
        const movedDeck = decks[currentIndex];
        // Moving Up (newIndex < currentIndex)
        if (newIndex < currentIndex) {
            const targetDeck = decks[newIndex];
            const prevDeck = newIndex > 0 ? decks[newIndex - 1] : null; // Get deck before target
            const newDate = prevDeck
                ? new Date((targetDeck.date.getTime() + prevDeck.date.getTime()) / 2) // Midpoint
                : new Date(targetDeck.date.getTime() + 1); // If no previous deck, just slightly newer
            yield deck_1.default.updateOne({ _id: movedDeck._id }, { $set: { date: newDate } });
        }
        // Moving Down (newIndex > currentIndex)
        else if (newIndex > currentIndex) {
            const targetDeck = decks[newIndex];
            const nextDeck = newIndex < decks.length - 1 ? decks[newIndex + 1] : null; // Get deck after target
            const newDate = nextDeck
                ? new Date((targetDeck.date.getTime() + nextDeck.date.getTime()) / 2) // Midpoint
                : new Date(targetDeck.date.getTime() - 1); // If no next deck, just slightly older
            yield deck_1.default.updateOne({ _id: movedDeck._id }, { $set: { date: newDate } });
        }
        res.status(200).json({ message: 'Deck moved and saved successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error moving deck', error });
    }
}));
app.get("/search", fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { q: query, page = '1', limit = '20' } = req.query;
        const userId = (_d = req.user) === null || _d === void 0 ? void 0 : _d._id;
        if (!query || query.trim().length < 2) {
            return res.status(400).json({
                error: 'Search query must be at least 2 characters'
            });
        }
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const results = yield searchService_1.SearchService.search(query.trim(), userId, parseInt(page), Math.min(parseInt(limit), 50) // Max 50 per page
        );
        res.json({
            success: true,
            data: results
        });
    }
    catch (error) {
        res.status(500).json({
            error: 'Search failed'
        });
    }
}));
app.post('/deck', fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f;
    const user = req === null || req === void 0 ? void 0 : req.user;
    try {
        const newDeck = new deck_1.default({
            email: user === null || user === void 0 ? void 0 : user._id,
            title: (_e = req.body) === null || _e === void 0 ? void 0 : _e.title,
            deckId: (_f = req.body) === null || _f === void 0 ? void 0 : _f.deckId,
            date: new Date()
        });
        const createdDeck = yield newDeck.save();
        res.status(201).json({ _id: createdDeck._id, title: createdDeck.title, pinned: createdDeck.pinned });
    }
    catch (error) {
        res.status(500).json({ message: "An unexpected error occurred while creating the deck. Please try again later." });
    }
}));
app.patch('/deck/togglepin/:deckId', fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //I have updated date here using date:new Date(). so that I can sort it and show the recently pinned decks first.
        const updatedDeck = yield deck_1.default.findOneAndUpdate({ deckId: req.params.deckId }, // Find by deckId instead of _id
        { pinned: req.body.pinned, date: new Date() });
        res.status(200).json(updatedDeck);
    }
    catch (error) {
        res.status(500).json({ message: "An unexpected error occurred while pinning the deck. Please try again later!", isError: true });
    }
}));
// app.put('/deck/undodeck', fetchUserDetails, async (req: Request, res: Response) => {
//   const deck = req.body
//   try {
//     const newDeck = new DeckModel({
//       ...deck
//     })
//     await newDeck.save()
//     res.status(200).json({ success: true })
//   }
//   catch (error) {
//     res.status(500).json({ message: "An unexpected error occurred while undoing the deck deletion." });
//   }
// })
app.put('/deck/undodeck', fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const { deckId } = req.body;
        const userId = (_g = req.user) === null || _g === void 0 ? void 0 : _g._id;
        const result = yield deck_1.default.findOneAndUpdate({
            deckId,
            email: userId,
            deletedAt: { $exists: true },
            undoExpiresAt: { $gt: new Date() }
        }, {
            $unset: {
                deletedAt: 1,
                undoExpiresAt: 1 // Remove the field completely
            }
        }, { new: true });
        if (!result) {
            return res.status(410).json({ error: "Undo expired or deck not found" });
        }
        res.json({ success: true });
    }
    catch (err) {
        console.error("Undo Restore Error:", err);
        res.status(500).json({ error: "Failed to restore deck" });
    }
}));
app.put('/deck/editdeck/:deckId', fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield deck_1.default.findOneAndUpdate({ deckId: req.params.deckId }, { title: req.body.title });
        res.status(200).json({ success: true });
    }
    catch (error) {
        res.status(500).json({ message: "An unexpected error occurred while saving the edited deck. Please try again later!" });
    }
}));
app.delete('/deck/:deckId', fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    try {
        const { deckId } = req.params;
        const userId = (_h = req.user) === null || _h === void 0 ? void 0 : _h._id;
        const result = yield deck_1.default.findOneAndUpdate({
            deckId,
            email: userId,
            deletedAt: { $exists: false } // Only delete if deletedAt field doesn't exist
        }, {
            deletedAt: new Date(),
            undoExpiresAt: new Date(Date.now() + 20 * 1000)
        }, { new: true });
        if (!result) {
            return res.status(404).json({ error: "Deck not found or already deleted" });
        }
        res.json({
            success: true,
            deletedDeckInfo: {
                title: result.title,
                deckId: result.deckId,
                cardCount: result.cardsCount
            }
        });
    }
    catch (err) {
        console.error("Delete Deck Error:", err);
        res.status(500).json({ error: "Failed to delete deck" });
    }
}));
// Card routes
app.get('/cards/:deckId', fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield card_1.CardModel.find({ deckId: req.params.deckId }, { cardId: 1, note: 1, createdAt: 1, order: 1, _id: 0 } // include order in projection if you want
        )
            .sort({ order: -1 })
            .exec();
        const maxOrder = data.length > 0 ? data[0].order : -1;
        if (data) {
            res.status(200).json({ cards: data, maxOrder: maxOrder });
        }
        else {
            res.status(404).json({ message: "No cards found!" });
        }
    }
    catch (error) {
        if (error.name === "CastError") {
            // Handle the error specifically when an invalid ID is provided
            res.status(400).json({ message: "Invalid deck ID" });
        }
        else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}));
app.post('/card/:deckId', fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _j, _k, _l, _m;
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const deckId = req.params.deckId;
        const newOrder = Number(req.body.maxOrder) + 10;
        let searchableContent = "";
        if ((_k = (_j = req.body) === null || _j === void 0 ? void 0 : _j.content) === null || _k === void 0 ? void 0 : _k.note) {
            searchableContent = (0, extractTextFromSlateNodes_1.extractTextFromSlateNodes)((_m = (_l = req.body) === null || _l === void 0 ? void 0 : _l.content) === null || _m === void 0 ? void 0 : _m.note);
        }
        // 1. Create the new card
        const newCard = new card_1.CardModel(Object.assign(Object.assign({}, req.body.content), { searchableContent, order: newOrder, deckId }));
        yield newCard.save({ session });
        // 2. Increment the cardsCount for that deck
        yield deck_1.default.updateOne({ deckId }, { $inc: { cardsCount: 1 } }, { session });
        yield session.commitTransaction();
        session.endSession();
        res.status(201).json({ success: true });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "An unexpected error occurred while creating the card. Please try again later." });
    }
}));
//Edit card
app.patch('/card/:deckId', fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deckId = req.params.deckId;
    const cardId = req.body.cardId;
    const { note } = req.body.newContent;
    let searchableContent = "";
    if (note) {
        searchableContent = (0, extractTextFromSlateNodes_1.extractTextFromSlateNodes)(note);
    }
    try {
        const updatedCard = yield card_1.CardModel.findOneAndUpdate({ deckId, cardId }, {
            $set: {
                note,
                searchableContent,
            },
        }, { new: true });
        if (!updatedCard) {
            return res.status(404).json({ success: false, message: 'Card not found' });
        }
        res.status(200).json({ success: true });
    }
    catch (error) {
        res.status(500).json({ message: "An unexpected error occurred while saving the edited card. Please try again later!" });
    }
}));
app.put('/card/undocard', fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const cardContent = req.body.undoCardDetails;
        const deckId = cardContent.deckId;
        let searchableContent = "";
        if (cardContent === null || cardContent === void 0 ? void 0 : cardContent.note) {
            searchableContent = (0, extractTextFromSlateNodes_1.extractTextFromSlateNodes)(cardContent === null || cardContent === void 0 ? void 0 : cardContent.note);
        }
        const updatedContent = Object.assign(Object.assign({}, cardContent), { searchableContent });
        // 1. Restore the card
        const newCard = new card_1.CardModel(updatedContent);
        yield newCard.save({ session });
        // 2. Increment deck's cardsCount
        yield deck_1.default.updateOne({ deckId }, { $inc: { cardsCount: 1 } }, { session });
        yield session.commitTransaction();
        session.endSession();
        res.status(200).json({ success: true });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        res.status(500).json({
            message: "An unexpected error occurred while undoing the card deletion."
        });
    }
}));
app.delete('/card/:deckId/:cardId/:order', fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        const deckId = req.params.deckId;
        const cardId = req.params.cardId;
        const order = Number(req.params.order);
        // 1. Delete the card
        const deletedCard = yield card_1.CardModel.findOneAndDelete({ deckId, cardId, order }, { session });
        if (!deletedCard) {
            yield session.abortTransaction();
            session.endSession();
            return res.status(404).json({ success: false, message: "Card not found" });
        }
        // 2. Decrement the cardsCount for the deck
        yield deck_1.default.updateOne({ deckId }, { $inc: { cardsCount: -1 } }, { session });
        yield session.commitTransaction();
        session.endSession();
        res.status(200).json({ success: true });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        res.status(500).json({
            message: "An unexpected error occurred while deleting the card.",
            success: false,
        });
    }
}));
app.put('/card/changeposition/:deckId/:cardId/:newOrder', fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deckId = req.params.deckId;
    const cardId = req.params.cardId;
    const newOrder = Number(req.params.newOrder);
    try {
        yield card_1.CardModel.findOneAndUpdate({ deckId, cardId }, { $set: { order: newOrder } });
        res.status(200).json({ success: true });
    }
    catch (error) {
        res.status(500).json({
            message: "An unexpected error occurred while moving the card.",
            success: false
        });
    }
}));
app.post('/login', passport_1.default.authenticate('local', { failWithError: true }), (req, res) => {
    var _a;
    if (req.user) {
        const userInfo = { username: req.user.username, profile_picture: (_a = req.user) === null || _a === void 0 ? void 0 : _a.profile_picture };
        res.status(200).json({ success: true, userInfo });
    }
    else {
        res.status(200).json({ success: false });
    }
}, function (error, req, res, next) {
    return res.status(401).json({ success: false, message: error.message });
});
app.get('/auth/google', (req, res, next) => {
    req.session.state = Math.random().toString(36).substring(7); // Generate random state
    passport_1.default.authenticate('google', {
        scope: ['profile', 'email'],
        state: req.session.state,
        prompt: 'select_account',
    })(req, res, next);
});
// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: `${process.env.REDIRECT_URL}/auth/failure`, failureMessage: true, }), (req, res) => {
//     res.redirect(`${process.env.REDIRECT_URL!}/auth/success`)
//   });
app.get('/auth/google/callback', (req, res, next) => {
    // Validate the state parameter
    if (req.session.state !== req.query.state) {
        return res.redirect(`${process.env.REDIRECT_URL}/auth/failure`); // Handle invalid state
    }
    // Clear the state
    delete req.session.state;
    // Continue with Passport authentication
    next();
}, passport_1.default.authenticate('google', { failureRedirect: `${process.env.REDIRECT_URL}/auth/failure`, failureMessage: true, }), (req, res) => {
    res.redirect(`${process.env.REDIRECT_URL}/auth/success`);
});
app.get("/getuser", fetchUserDetails_1.fetchUserDetails, (req, res) => {
    if (req.user) {
        const _a = req.user, { _id, email } = _a, userInfo = __rest(_a, ["_id", "email"]);
        res.status(200).json(userInfo); // here we get user in req.user because passports deserialize function attaches it automatically
    }
    else {
        res.status(200).json(null);
    }
});
app.get("/user/email", fetchUserDetails_1.fetchUserDetails, (req, res) => {
    if (req.user) {
        const _a = req.user, { _id, email } = _a, userInfo = __rest(_a, ["_id", "email"]);
        res.status(200).json({ email }); // here we get user in req.user because passports deserialize function attaches it automatically
    }
    else {
        res.status(200).json(null);
    }
});
app.post('/auth/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return res.status(401).json({ message: 'Logout failed. Please try again.' });
        }
        // Destroy the session
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: 'Session destruction failed.' });
            }
            // Clear the session cookie
            res.clearCookie('connect.sid', {
                httpOnly: isProduction,
                sameSite: isProduction ? 'none' : 'lax',
                secure: isProduction,
            });
            return res.status(200).json({ isLogoutSuccessful: true });
        });
    });
});
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, otp } = req === null || req === void 0 ? void 0 : req.body;
    if (!username && !password && !email) {
        res.status(400).json({ success: false, message: "Please provide name, email and password" });
        return;
    }
    const verifyUser = yield verifyemail_1.default.findOne({ email });
    if ((verifyUser === null || verifyUser === void 0 ? void 0 : verifyUser.otp) === parseInt(otp)) {
        try {
            const user = yield user_1.default.findOne({ email });
            if (!user) {
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const newUser = new user_1.default({
                    username,
                    email,
                    password: hashedPassword
                });
                yield newUser.save();
                res.status(201).json({ success: true, message: "Account created successfully." });
            }
            else {
                res.status(409).json({ success: false, message: "A user with this email address already exists." });
            }
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Some error occured please try again." });
        }
    }
    else {
        res.status(400).json({ success: false, message: "Invalid Email or OTP" });
    }
}));
function generateOTP() {
    // Declare a variable to store the OTP
    let otp = "";
    // Use a for loop to generate 6 random digits
    for (let i = 0; i < 6; i++) {
        // Generate a random number between 1 and 9
        let digit = Math.floor(Math.random() * 9) + 1;
        // Concatenate the digit to the OTP
        otp += digit;
    }
    // Return the OTP
    return parseInt(otp);
}
// generate otp to verify email address while creating an account.
app.post("/generateotp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield verifyemail_1.default.findOne({ email: req.body.email }); // This is where user with otp stored while creating account. If we find user here then we will update the old otp with new one else we will new user with otp.
        let mainUser = yield user_1.default.findOne({ email: req.body.email }); // This is where the final user is stored
        let oneTimePassword = generateOTP();
        // If the user has already completed signup process then user exist in mainUser variable.
        // so If we find user then we won't allow him to create new one
        if (!mainUser) {
            // if there is no user in mainUser variable then we will check if his email exists in user variable 
            // if it exists it means he has previously asked for otp but for some reason he couldn't complete the signup process.
            // if there is no user then we will create new one else we will update his previous
            if (!user) {
                let generateUserWithOTP = new verifyemail_1.default({
                    email: req.body.email,
                    otp: oneTimePassword,
                    expiresIn: new Date().getTime() + 600 * 1000 // expires in 10 min
                });
                yield generateUserWithOTP.save();
            }
            else {
                yield verifyemail_1.default.findOneAndUpdate({ email: req.body.email }, {
                    otp: oneTimePassword,
                    expiresIn: new Date().getTime() + 600 * 1000
                });
            }
        }
        else {
            return res.status(409).json({ success: false, message: "User with this email already exists! Please Login or use different email address." });
        }
        let email = `
   <p> Dear User,</p>
    <p>We have received a request to verify your account. In order to complete the verification process, please enter the following one-time password (OTP) into the designated field:<span style="color:#38bdf8; font-size: 25px;"> ${oneTimePassword}</span> </p>
   <p>This OTP is only valid for 10 minutes, after which you will need to request a new one.</p>
    <p>Thank you for your cooperation.</p>
    <p>Sincerely,</p>
    <p>Decker</>
      `;
        // Sending a mail using nodemailer (read docs)
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        // send mail with defined transport object
        yield transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: req.body.email,
            subject: "OTP for your account on decker.vercel.app",
            html: email, // html body
        });
        res.status(200).json({ success: true, message: "OTP sent to your email successfully! Please check your email for OTP." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Some error occurred please try again later!" });
    }
}));
app.post("/verifyotp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield verifyemail_1.default.findOne({ email: req.body.email });
    if (user) {
        // Check If the otp is expired or not.
        let difference = user.expiresIn - new Date().getTime();
        if (user.otp === parseInt(req.body.otp)) {
            if (difference > 0) {
                res.status(200).json({ success: true, message: "OTP verification successful!" });
            }
            else {
                res.status(200).json({ success: false, message: "Your OTP has expired! Please request a new one to continue." });
            }
        }
        else {
            res.status(400).json({ success: false, message: "OTP verification failed! Please check the OTP and try again." });
        }
    }
    else {
        res.status(404).json({ success: false, message: "No user found!" });
    }
}));
// forgot password
app.post("/generateforgetpasswordotp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield forgotpasswordotps_1.default.findOne({ email: req.body.email });
        let mainUser = yield user_1.default.findOne({ email: req.body.email }); // We only allow users with existing accounts to reset their password.
        let oneTimePassword = generateOTP();
        if (mainUser && !(mainUser === null || mainUser === void 0 ? void 0 : mainUser.password)) {
            return res.status(403).json({ success: false, message: "Since you logged in using Google, your password is managed by your Google account. Please use Google's account settings to update your password." });
        }
        if (mainUser) {
            //If the user is found in the 'mainUser' variable, we will then check if the user exists in the 'ForgotPasswordOTP' model. If they do, it indicates that they have previously requested an OTP, so we will replace the old OTP with a new one.
            if (!user) {
                let generateUserWithOTP = new forgotpasswordotps_1.default({
                    email: req.body.email,
                    otp: oneTimePassword,
                    expiresIn: new Date().getTime() + 600 * 1000 // expires in 10 min
                });
                yield generateUserWithOTP.save();
            }
            else {
                yield forgotpasswordotps_1.default.findOneAndUpdate({ email: req.body.email }, {
                    otp: oneTimePassword,
                    expiresIn: new Date().getTime() + 600 * 1000
                });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "User with this email doesn't exists! Please create an account first." });
        }
        let email = `
   <p> Dear User,</p>
    <p>We have received a request to verify your account. In order to complete the verification process, please enter the following one-time password (OTP) into the designated field:<span style="color:#38bdf8; font-size: 25px;"> ${oneTimePassword}</span> </p>
    <p>Once you enter the OTP into the designated field you will be redirected to the page where you can change your password.</p>
   <p>This OTP is only valid for 10 minutes, after which you will need to request a new one.</p>
    <p>Thank you for your cooperation.</p>
    <p>Sincerely,</p>
    <p>Decker</>
      `;
        // Sending a mail using nodemailer (read docs)
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        // send mail with defined transport object
        yield transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: req.body.email,
            subject: "OTP for your account on decker.vercel.app to reset the password",
            html: email, // html body
        });
        res.status(200).json({ success: true, message: "OTP sent to your email successfully! Please check your email for OTP." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Some error occurred please try again later!" });
    }
}));
app.post("/verifyforgotpasswordotp", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield forgotpasswordotps_1.default.findOne({ email: req.body.email });
    if (user) {
        // Check If the otp is expired or not.
        let difference = user.expiresIn - new Date().getTime();
        if (user.otp === parseInt(req.body.otp)) {
            if (difference > 0) {
                res.status(200).json({ success: true, message: "OTP verification successful!" });
            }
            else {
                res.status(200).json({ success: false, message: "Your OTP has expired! Please request a new one to continue." });
            }
        }
        else {
            res.status(400).json({ success: false, message: "OTP verification failed! Please check the OTP and try again." });
        }
    }
    else {
        res.status(404).json({ success: false, message: "No user found!" });
    }
}));
app.post("/changepassword", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _o;
    let user = yield forgotpasswordotps_1.default.findOne({ email: req.body.email });
    // Here we will check if the OTP in our db and the otp that we get in our req are the same ones.
    if (((user === null || user === void 0 ? void 0 : user.otp) === parseInt((_o = req === null || req === void 0 ? void 0 : req.body) === null || _o === void 0 ? void 0 : _o.otp))) {
        const newPassword = req.body.newPassword;
        const hashedPassword = yield bcryptjs_1.default.hash(newPassword, 10);
        try {
            let user = yield user_1.default.findOneAndUpdate({ email: req.body.email }, { password: hashedPassword });
            res.status(200).json({ success: true, message: "Password changed successfully!" });
        }
        catch (err) {
            res.status(500).json({ success: false, message: "Some error occured, please try again later!" });
        }
    }
    else {
        res.status(401).json({ success: false, message: "You are unauthorized!" });
    }
}));
app.post("/generateaccountdeletionotp", fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield accountdeletionotps_1.default.findOne({ email: req.body.email });
        let mainUser = yield user_1.default.findOne({ email: req.body.email });
        let oneTimePassword = generateOTP();
        if (mainUser) {
            if (!user) {
                let generateUserWithOTP = new accountdeletionotps_1.default({
                    email: req.body.email,
                    otp: oneTimePassword,
                    expiresIn: new Date().getTime() + 600 * 1000 // expires in 10 min
                });
                yield generateUserWithOTP.save();
            }
            else {
                yield accountdeletionotps_1.default.findOneAndUpdate({ email: req.body.email }, {
                    otp: oneTimePassword,
                    expiresIn: new Date().getTime() + 600 * 1000
                });
            }
        }
        else {
            return res.status(404).json({ success: false, message: "User with this email doesn't exists! Please enter correct email address." });
        }
        let email = `
    <p>Dear User,</p>
    <p>We have received a request to delete your account. Please note that this action is irreversible and all of your data associated with this account will be permanently deleted.</p>
    <p>your OTP is <span style="color:#38bdf8; font-size: 25px;"> ${oneTimePassword}</span></p>
    <p>This OTP is only valid for 10 minutes, after which you will need to request a new one.</p>
    <p>If you did not initiate this request, please contact us immediately.</p>
    <p>Thank you for using our services.</p>
    <p>Sincerely,</p>
    <p>Decker</p>
    
      `;
        // Sending a mail using nodemailer (read docs)
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_ADDRESS,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        // send mail with defined transport object
        yield transporter.sendMail({
            from: process.env.EMAIL_ADDRESS,
            to: req.body.email,
            subject: " OTP for your account on decker.vercel.app to delete your account",
            html: email, // html body
        });
        res.status(200).json({ success: true, message: "OTP sent to your email successfully! Please check your email for OTP." });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Some error occurred please try again later!" });
    }
}));
app.post("/verifyaccountdeletionotp", fetchUserDetails_1.fetchUserDetails, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield accountdeletionotps_1.default.findOne({ email: req.body.email });
    if (user) {
        // Check If the otp is expired or not.
        let difference = user.expiresIn - new Date().getTime();
        if (user.otp === parseInt(req.body.otp)) {
            if (difference > 0) {
                res.status(200).json({ success: true, message: "OTP verification successful!" });
            }
            else {
                res.status(200).json({ success: false, message: "Your OTP has expired! Please request a new one to continue." });
            }
        }
        else {
            res.status(400).json({ success: false, message: "OTP verification failed! Please check the OTP and try again." });
        }
    }
    else {
        res.status(200).json({ success: false, message: "No user found!" });
    }
}));
app.post("/deleteaccount", fetchUserDetails_1.fetchUserDetails, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        try {
            // saving user in userInfo so that I can use the _id of the user to delete the decks. because in DeckModel email field is a foreign key.
            let userInfo = yield user_1.default.findOneAndDelete({ email: req.body.email });
            yield deck_1.default.deleteMany({ email: userInfo === null || userInfo === void 0 ? void 0 : userInfo._id });
            yield accountdeletionotps_1.default.findOneAndDelete({ email: req.body.email });
            yield forgotpasswordotps_1.default.findOneAndDelete({ email: req.body.email });
            yield verifyemail_1.default.findOneAndDelete({ email: req.body.email });
            // once users data is delete we will logout the user and clear his session
            req.logout(function (err) {
                if (err) {
                    throw err; // Throw the error to be caught by the catch block below
                }
                // Explicitly destroy the session
                req.session.destroy(function (err) {
                    if (err) {
                        throw err; // Throw the error to be caught by the catch block below
                    }
                    res.status(200).json({ success: true });
                });
            });
        }
        catch (err) {
            res.status(500).json({ success: false, message: "Some error occured please try again." });
        }
    }
    else {
        return res.status(401).json({ message: "Your session has expired. Please log in again to continue." });
    }
}));
// Exporting the app instance is a requirement for Vercel’s serverless deployment model. It allows Vercel to properly invoke the request handler defined in your Express.js application, ensuring that your server routes and middleware function as expected when deployed. This setup leverages the serverless architecture by dynamically handling requests through the exported handler.
exports.default = app;
// to update multiple fields with the same value.
// here I have updated the value of a cardId
// const decks = await DeckModel.updateMany({}, { $set: { "cards.$[].cardId": uuidv4() } });
// with different value of cardId
// forEach() function does not work well with asynchronous operations like deck.save().
// Doesn't Work properly
// const decks = await DeckModel.find({});
// decks.forEach((deck) => {
//   deck.cards = deck.cards.map((card) => ({
//     ...card,
//     cardId: uuidv4(),
//   }));
//   await deck.save();
// });
// Works properly
// const decks = await DeckModel.find({});
// for (const deck of decks) {
//   deck.cards = deck.cards.map((card) => ({
//     ...card,
//     cardId: uuidv4(),
//   }));
//   await deck.save();
// }
// To check document size: I was gettting this warning Documents larger than 2 MB found in the collection(s) scanned.
// const largestDocumentSize = await DeckModel
// .aggregate([
//   {
//     $addFields: {
//       documentSize: { $bsonSize: '$$ROOT' }
//     }
//   },
//   {
//     $match: {
//       documentSize: { $gt: 2 * 1024 * 1024 } // 2 MB in bytes
//     }
//   }
// ])
// .exec();
// console.log(largestDocumentSize)
// const decks = await DeckModel.find({ title: "Test" });
// let modifiedDecks = 0;
// for (const deck of decks) {
//   let modified = false;
//   for (let i = 0; i < deck.cards.length; i++) {
//     const card = deck.cards[i];
//     // Prevent MongoDB from converting strings into weird objects
//     if (card.note && typeof card.note === "object" && !Array.isArray(card.note)) {
//       console.log("Fixing corrupted note for:", card.title);
//       card.note = Object.values(card.note).join(""); // Convert back to string
//       modified = true;
//     }
//     // Convert only valid string notes into the new array format
//     if (typeof card.note === "string") {
//       card.note = [{ type: "text", content: card.note }]; // Convert
//       modified = true;
//     }
//   }
//   if (modified) {
//     deck.markModified("cards");
//     await deck.save();
//     modifiedDecks++;
//     console.log(`Updated deck: ${deck.deckId}`);
//   }
// }
// console.log(`Total decks updated: ${modifiedDecks}`);
// const deckId = "64e051f20ad1aa3509f879a4";
// // Fetch the deck
// const deck = await DeckModel.findById(deckId);
// if (!deck) {
//   console.log("Deck not found.");
//   return;
// }
// // Update each card's note field while preserving the Mongoose DocumentArray structure
// deck.cards.forEach(card => {
//   card.note = [
//     {
//       type: "paragraph",
//       children: [{ text: card.note || "" }], // Ensure text is never undefined
//     },
//   ];
// });
// // Save the updated document
// await deck.save();
