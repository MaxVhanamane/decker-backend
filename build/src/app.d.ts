import mongoose from "mongoose";
import type { UserDetails } from "./types/UserDetails";
declare module 'express-session' {
    interface SessionData {
        state?: string;
    }
}
declare const app: import("express-serve-static-core").Express;
declare global {
    namespace Express {
        interface Request {
            userDetails: UserDetails | null;
        }
        interface User {
            _id?: mongoose.Types.ObjectId;
            email: string;
            profile_picture?: string | undefined | null;
            username: string;
        }
    }
}
export default app;
