import { BaseModel } from "../../interfaces";

export interface CompanyI extends BaseModel {
    name: string;
    address: string;
    phone: string;
    url: string;
    image: string;
}

export interface CompanyMoongose extends Omit<CompanyI, "id"> {}

export interface GetCompanyDto
    extends Omit<CompanyI, "createdAt" | "status" | "updatedAt"> {}
export interface CreateCompanyDTO
    extends Omit<CompanyI, "id" | "status" | "createdAt" | "updatedAt" > {}

export interface UpdateCompanyDTO
    extends Partial<
        Omit<CompanyI, "id" | "status" | "updatedAt" | "createdAt">
    > {}
