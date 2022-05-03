import { Schema, model } from 'mongoose';
import { UserMoongose } from './model'

const userSchema = new Schema<UserMoongose>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'user_role',
        enum: ['user_role', 'admin_role']
    },
    status: {
        type: Boolean,
        required: true,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        field: 'created_at'
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        field: 'updated_at'
    }
});

export const User = model<UserMoongose>('User', userSchema);