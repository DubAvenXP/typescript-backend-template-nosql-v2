import { Request, Response } from "express";

import { err, success } from "../../helpers";

import dbMethods from "../../database/services";

import { User } from "./schema";
import { CreateUserDTO, UpdateUserDTO, GetUserDto } from './model';

const service = dbMethods(User);

export async function list(req: Request, res: Response) {
    try {
        const { query } = req.query;
        const projection = {};
        const populate: any[] = [];

        const result = await service.get<GetUserDto>({
            query,
            projection,
            populate,
        });

        success(req, res, result, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}

export async function listOne(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const projection = {};
        const populate: any[] = [];

        const result = await service.getOne<GetUserDto>(id, {
            projection,
            populate,
        });
        success(req, res, result, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}

export async function add(req: Request, res: Response) {
    try {
        const payload: CreateUserDTO = req.body;
        const result = await service.post<GetUserDto, CreateUserDTO>(payload);
        success(req, res, result, 201);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}

export async function update(req: Request, res: Response) {
    try {
        const payload: UpdateUserDTO = req.body;
        const { id } = req.params;
        const result = await service.put<GetUserDto, UpdateUserDTO>(id, payload);
        success(req, res, result, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await service.remove<GetUserDto>(id);
        success(req, res, result, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}
