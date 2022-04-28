import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: false,
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

export const Client = model('Client', clientSchema);