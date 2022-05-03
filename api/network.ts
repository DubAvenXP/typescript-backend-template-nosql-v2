
import { Request, Response } from 'express';
import { err, success } from '../helpers';
import dbMethods from '../database/service';

export default function (Model: any) {
  const service = dbMethods(Model);

  async function list(req: Request, res: Response) {
    try {
      const result = await service.get(req);
      success(req, res, result, 200);
    } catch (error) {
      console.error(error);
      err(req, res, error, 500);
    }
  }

  async function listOne(req: Request, res: Response) {
    try {
      const result = await service.getOne(req);
      success(req, res, result, 200);
    } catch (error) {
      console.error(error);
      err(req, res, error, 500);
    }
  }

  async function add(req: Request, res: Response) {
    try {
      const result = await service.post(req);
      success(req, res, result, 201);
    } catch (error) {
      console.error(error);
      err(req, res, error, 500);
    }
  }

  async function update(req: Request, res: Response) {
    try {
      const result = await service.put(req);
      success(req, res, result, 200);
    } catch (error) {
      console.error(error);
      err(req, res, error, 500);
    }
  }

  async function remove(req: Request, res: Response) {
    try {
      const result = await service.remove(req);
      success(req, res, result, 200);
    } catch (error) {
      console.error(error);
      err(req, res, error, 500);
    }
  }

  return {
    list,
    listOne,
    add,
    update,
    remove,
  };
};

