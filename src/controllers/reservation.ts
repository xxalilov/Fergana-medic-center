import { asyncHandler, BadRequestError, Category, NotFoundError, Request, Reservation, Response, Sore, Statistic, User } from "./controller";

export const getReservations = asyncHandler(async (req: Request, res: Response) => {
    const reservation = await Reservation.findAll();

    res.status(200).json({
        status: 200,
        data: reservation
    })
})

export const getReservationForDoctor = asyncHandler(async (req: Request, res: Response) => {
    const reservation = await Reservation.findAll({where: {doctor: req.user?.id, isPaid: true, isQueue: true}, include: [{model: Sore, as: "sore", attributes: ["name", "phone"]}], order: [
        ['queue', 'ASC']
    ]});
    res.status(200).json({
        status: 200,
        data: reservation
    })
});

export const updateReservationForDoctor = asyncHandler(async (req: Request, res: Response) => {
    const reservation = await Reservation.findOne({where: {id: req.params.id}});
    if(!reservation)throw new BadRequestError("Berilgan Id orqali reservetsiya topilmadi.");
    const statistic = await Statistic.findOne();
    if(!statistic) await Statistic.create({balance: 1});
    statistic?.update({balance: statistic.balance + reservation.fee})
    await reservation.update(req.body);
    await reservation.save();

    res.status(200).json({
        status: 200,
        data: reservation
    })
});

export const getStatistics = asyncHandler(async (req: XMLHttpRequestUpload, res: Response) => {
    const statistic = await Statistic.findOne();
    const categories = await Category.findAll({attributes: ["category"], include: [{model: Reservation, as: 'reservation'}]});
    
    res.status(200).json({
        status: 200,
        data: {statistic, categories}
    })
})

export const updateReservation = asyncHandler(async (req: Request, res: Response) => {
    const reservation = await Reservation.findOne({where: {id: req.params.id}});
    if(!reservation)
        throw new BadRequestError("Berilgan Id orqali reservation topilmadi.");
    const user = await User.findOne({where: {id: reservation.doctor}});
    if (!user) throw new NotFoundError("User not found.");
    const queue = user.soreQueue;
    const setQueue = queue + 1;
    await user.update({soreQueue: setQueue});
    await user.save();
    req.body.queue = setQueue;    
    await reservation.update(req.body);
    await reservation.save();
    
    res.status(200).json({
        status: 200,
        data: reservation
    })
});