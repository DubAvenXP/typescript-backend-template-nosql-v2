import { Request, Response } from "express";

import { err, success } from "../../helpers";

import dbMethods from "../../database/services";

import { User } from "./schema";
import { CreateUserDTO, UpdateUserDTO, GetUserDto } from "./model";

const service = dbMethods(User);

export async function list(req: Request, res: Response) {
    try {
        const { query } = req.query;
        const projection = { password: 0 };
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
        const projection = { password: 0 };
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
        const data = await service.getOne<GetUserDto>(result._id, {
            projection: { password: 0 },
        });
        success(req, res, data, 201);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}

export async function update(req: Request, res: Response) {
    try {
        const payload: UpdateUserDTO = req.body;
        const { id } = req.params;
        await service.put<GetUserDto, UpdateUserDTO>(
            id,
            payload
        );
        const data = await service.getOne<GetUserDto>(id, {
            projection: { password: 0 },
        });
        success(req, res, data, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const { id } = req.params;
        await service.remove<GetUserDto>(id);
        const data = await service.getOne<GetUserDto>(id, {
            projection: { password: 0 },
        });
        success(req, res, data, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}
