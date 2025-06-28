import {model, Schema} from 'mongoose';

export const UserStruct = new Schema (
{
    name: {type: String, required: true},
    email: {type: String, required:true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false},
    // Will Need to Add Number -> Figure out where to take that input
},
{
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});

export const UserModel = model('user', UserStruct);
