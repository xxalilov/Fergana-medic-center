import {asyncHandler, NotFoundError, Request, Response, Sore, User} from './controller';

export const createSore = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({where: {id: req.params.id}});
    if (!user) throw new NotFoundError("User not found.");
    const queue = user.soreQueue;
    const setQueue = queue + 1;
    await user.update({soreQueue: setQueue});
    await user.save();
    req.body.queue = setQueue;
    const sore = await user.createSore(req.body);

    res.status(201).json({
        status: 201,
        data: sore
    })
});

export const getSores = asyncHandler(async (req: Request, res: Response) => {
    const sore = await Sore.findAll();

    res.status(200).json({
        status: 200,
        data: sore
    })
});

export const getSore = asyncHandler(async (req: Request, res: Response) => {
    const sore = await Sore.findOne({where: {id: req.params.id}});
    if (!sore) throw new NotFoundError("Berilgan Id orqali bemor topilmadi.");

    res.status(200).json({
        status: 200,
        data: sore
    })
});

export const updateSore = asyncHandler(async (req: Request, res: Response) => {
    const sore = await Sore.findOne({where: {id: req.params.id}});
    if (!sore) throw new NotFoundError("Berilgan Id orqali bemor topilmadi.");

    await sore.update(req.body);
    await sore.save();

    res.status(200).json({
        status: 200,
        data: sore
    })
});

export const deleteSore = asyncHandler(async (req: Request, res: Response) => {
    const sore = await Sore.findOne({where: {id: req.params.id}});
    if (!sore) throw new NotFoundError("Berilgan Id orqali bemor topilmadi.");
    await sore.destroy();

    res.status(200).json({
        status: 200,
        data: {}
    })
})