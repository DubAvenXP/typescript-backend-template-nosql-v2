
import { Request, Response } from 'express';
import { err, success } from '../helpers';
import service from './../database/methods';

export default function (Model: any) {
  const { get, getOne, post, put, removes } = service(Model);

  async function list(req: Request, res: Response) {
    try {
      const result = await get(req);
      success(req, res, result, 200);
    } catch (error) {
      console.error(error);
      err(req, res, error, 500);
    }
  }

  async function listOne(req: Request, res: Response) {
    try {
      const result = await getOne(req);
      success(req, res, result, 200);
    } catch (error) {
      console.error(error);
      err(req, res, error, 500);
    }
  }

  async function add(req: Request, res: Response) {
    try {
      const result = await post(req);
      success(req, res, result, 201);
    } catch (error) {
      console.error(error);
      err(req, res, error, 500);
    }
  }

  async function update(req: Request, res: Response) {
    try {
      const result = await put(req);
      success(req, res, result, 200);
    } catch (error) {
      console.error(error);
      err(req, res, error, 500);
    }
  }

  async function remove(req: Request, res: Response) {
    try {
      const result = await removes(req);
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

