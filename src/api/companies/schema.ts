import { Schema, model } from 'mongoose';
import { CompanyMoongose } from './model'

const companySchema = new Schema<CompanyMoongose>({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
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

export const Company = model<CompanyMoongose>('Company', companySchema);