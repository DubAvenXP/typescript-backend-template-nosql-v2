import { Model, UpdateQuery } from "mongoose";

export default function (model: Model<any>) {
    const get = async <T>({
        query = {},
        projection = {},
        populate = [],
    }: any): Promise<T[]> => {
        const filter = query || {};
        filter.status = true;
        if (filter.name) filter.name = { $regex: filter.name, $options: "i" };

        projection.status === 1
            ? delete projection.status
            : (projection.status = 0);
        projection.createdAt === 1
            ? delete projection.createdAt
            : (projection.createdAt = 0);
        projection.updatedAt === 1
            ? delete projection.updatedAt
            : (projection.updatedAt = 0);
        projection.__v === 1 ? delete projection.__v : (projection.__v = 0);

        const data: T[] = await model
            .find(filter, projection)
            .populate(populate);
        return data;
    };

    const getOne = async <T>(
        id: string,
        { projection, populate }: any
    ): Promise<T> => {
        projection.status === 1
            ? delete projection.status
            : (projection.status = 0);
        projection.createdAt === 1
            ? delete projection.createdAt
            : (projection.createdAt = 0);
        projection.updatedAt === 1
            ? delete projection.updatedAt
            : (projection.updatedAt = 0);
        projection.__v === 1 ? delete projection.__v : (projection.__v = 0);

        const item: T = await model.findById(id, projection).populate(populate);

        return item;
    };

    const post = async <T, U>(payload: U): Promise<T> => {
        const item = new model(payload);
        const data: T = await item.save();
        return data;
    };

    const put = async <T, U>(id: string, payload: UpdateQuery<U>): Promise<T> => {
        await model.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
        });
        return getOne<T>(id, { projection: {}, populate: [] });
    };

    const remove = async <T>(id: string): Promise<T> => {
        await model.findByIdAndUpdate(id, { status: false }, { new: true });
        return getOne<T>(id, { projection: {}, populate: [] });
    };

    return {
        get,
        getOne,
        post,
        put,
        remove,
    };
}
