"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tweetSchema = new mongoose_1.Schema({
    tweet: {
        type: String,
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    retweets: {
        type: Number,
        default: 0,
    },
    saves: {
        type: Number,
        default: 0,
    },
    comments: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    madeBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    image: String,
    preference: String,
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Tweet", tweetSchema);
//# sourceMappingURL=tweet.js.map