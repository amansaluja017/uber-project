import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlackListtokenSchema = new Schema(
    {
        token: {
            type: String,
            required: true,
            unique: true
        },
        expiration: {
            type: Date,
            required: true
        }
    }, {timestamps: true});

export const Token = mongoose.model('Token', BlackListtokenSchema );