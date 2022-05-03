import { Request, Response } from "express";

import { err, success } from "../../helpers";

import dbMethods from "../../database/services";

import { Client } from "./schema";
import { CreateClientDTO, UpdateClientDTO, GetClientDto } from "./model";

const service = dbMethods(Client);

export async function list(req: Request, res: Response) {
    try {
        const { query } = req.query;
        const projection = {};
        const populate: any[] = [];

        const result = await service.get<GetClientDto>({
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

        const result = await service.getOne<GetClientDto>(id, {
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
        const payload: CreateClientDTO = req.body;
        const result = await service.post<GetClientDto, CreateClientDTO>(
            payload
        );
        success(req, res, result, 201);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}

export async function update(req: Request, res: Response) {
    try {
        const payload: UpdateClientDTO = req.body;
        const { id } = req.params;
        const result = await service.put<GetClientDto, UpdateClientDTO>(
            id,
            payload
        );
        success(req, res, result, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await service.remove<GetClientDto>(id);
        success(req, res, result, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}
