import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlackListtokenSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        expiration: {
            type: Date,
            required: true
        }
    }, {timestamps: true});

export const Token = mongoose.model('Token', BlackListtokenSchema );