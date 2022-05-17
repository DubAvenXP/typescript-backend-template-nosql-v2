import { Request, Response } from "express";

import { err, success } from "../../helpers";

import dbMethods from "../../database/services";

import { Company } from "./schema";
import { CreateCompanyDTO, UpdateCompanyDTO, GetCompanyDto } from "./model";

const service = dbMethods(Company);

export async function list(req: Request, res: Response) {
    try {
        const { query } = req.query;
        const projection = {};
        const populate: any[] = [];

        const result = await service.get<GetCompanyDto>({
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

        const result = await service.getOne<GetCompanyDto>(id, {
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
        const payload: CreateCompanyDTO = req.body;
        const result = await service.post<GetCompanyDto, CreateCompanyDTO>(
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
        const payload: UpdateCompanyDTO = req.body;
        const { id } = req.params;
        const result = await service.put<GetCompanyDto, UpdateCompanyDTO>(
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
        const result = await service.remove<GetCompanyDto>(id);
        success(req, res, result, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}
