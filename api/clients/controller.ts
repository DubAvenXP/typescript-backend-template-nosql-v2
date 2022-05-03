import { Request, Response } from "express";

import { err, success } from "../../helpers";
import dbMethods from "../../database/service";
import { Client } from "./schema";


const service = dbMethods(Client);

export async function list(req: Request, res: Response) {
    try {
        const result = await service.get(req);
        success(req, res, result, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}

export async function listOne(req: Request, res: Response) {
    try {
        const result = await service.getOne(req);
        success(req, res, result, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}

export async function add(req: Request, res: Response) {
    try {
        const result = await service.post(req);
        success(req, res, result, 201);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}

export async function update(req: Request, res: Response) {
    try {
        const result = await service.put(req);
        success(req, res, result, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const result = await service.remove(req);
        success(req, res, result, 200);
    } catch (error) {
        console.error(error);
        err(req, res, error, 500);
    }
}
