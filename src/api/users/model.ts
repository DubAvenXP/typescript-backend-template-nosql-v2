import { BaseModel } from "../../interfaces";
import { CompanyI } from "../companies/model";

export enum Roles {
    USER_ROLE = "user_role",
    ADMIN_ROLE = "admin_role",
}

export interface UserI extends BaseModel {
    name: string;
    email: string;
    password: string;
    role: 'user_role' | 'admin_role';
    company: CompanyI;
}

export interface UserMoongose extends Omit<UserI, "id"> {}

export interface GetUserDto
    extends Omit<UserI, "createdAt" | "status" | "updatedAt"> {}

export interface CreateUserDTO
    extends Omit<UserI, "id" | "status" | "createdAt" | "updatedAt"> {}

export interface UpdateUserDTO
    extends Partial<Omit<UserI, "id" | "status" | "updatedAt" | "createdAt">> {}
