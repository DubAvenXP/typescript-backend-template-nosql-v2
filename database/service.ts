import { Model } from 'mongoose';

export default function (model: Model<any>) {

    const get = async (req: any) => {
        const filter = req.query || {};
        filter.status = true;
        if(filter.name) filter.name = { $regex: filter.name, $options: 'i' }

        const projection = req.projections || {};
        const populate = req.dataToPopulate || [];

        projection.status === 1 ? projection.status = 0 : delete projection.status;
        projection.createdAt === 1 ? projection.createdAt = 0 : delete projection.createdAt;
        projection.updatedAt === 1 ? projection.updatedAt = 0 : delete projection.updatedAt;
        projection.__v === 1 ? projection.__v = 0 : delete projection.__v;

        const data = await model.find(filter, projection).populate(populate);
        return {
            data
        };
    };

    const getOne = async (req: any) => {
        const { id } = req.params;
        const projection = req.projections || {};
        const populate = req.dataToPopulate || [];

        if (!projection.status) projection.status = 0;
        if (!projection.createdAt) projection.createdAt = 0;
        if (!projection.updatedAt) projection.updatedAt = 0;
        if (!projection.__v) projection.__v = 0;


        const item = await model.findById(id, projection).populate(populate);
        return item;
    };

    const post = async (req: any) => {
        const { body } = req;
        const item = new model(body);
        await item.save();
        return item;
    };

    const put = async (req: any) => {
        const { id } = req.params;
        const {status, ...payload} = req.body;
        await model.findByIdAndUpdate(id, payload, { new: true, runValidators: true });
        return getOne(req);
    };

    const remove = async (req: any) => {
        const { id } = req.params;
        await model.findByIdAndUpdate(id, { status: false }, { new: true });
        return getOne(req);
    };

    return {
        get,
        getOne,
        post,
        put,
        remove
    };
};

