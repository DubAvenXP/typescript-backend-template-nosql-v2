import { BaseModel } from "../../interfaces";

export interface ClientI extends BaseModel {
    name: string;
    description: string;
    url: string;
    image: string;
    logo?: string;
}

export interface ClientMoongose extends Omit<ClientI, "id"> {}

export interface GetClientDto
    extends Omit<ClientI, "createdAt" | "status" | "updatedAt"> {}
export interface CreateClientDTO
    extends Omit<ClientI, "id" | "status" | "createdAt" | "updatedAt" > {}

export interface UpdateClientDTO
    extends Partial<
        Omit<ClientI, "id" | "status" | "updatedAt" | "createdAt">
    > {}
