import { BaseModel } from "./../../utils/base.models";

export interface ClientI extends BaseModel {
    name: string;
    description: string;
    url: string;
    image: string;
    logo?: string;
}

export interface ClientMoongose extends Omit<ClientI, "id"> {}

export interface CreateClientDTO
    extends Omit<ClientI, "id" | "status" | "createdAt" | "updatedAt"> {}
