import { Schema, model } from 'mongoose';
import { ClientMoongose } from './model'

const clientSchema = new Schema<ClientMoongose>({
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
    },
    status: {
        type: Boolean,
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

export const Client = model<ClientMoongose>('Client', clientSchema);