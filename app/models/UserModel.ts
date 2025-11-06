import { model, Schema } from "mongoose";
import { UserInterface } from "../interface/user.interface";
import Joi from 'joi';

// Validation schema for User
export const UserSchemaValidate = Joi.object({
    name: Joi.string().required().min(2),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
});

const userSchema = new Schema<UserInterface>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'author'],
        default: 'user'
    },
    is_verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const UserModel = model<UserInterface>('User', userSchema);