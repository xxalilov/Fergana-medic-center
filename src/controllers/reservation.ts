import {
  asyncHandler,
  BadRequestError,
  Category,
  NotFoundError,
  Request,
  Reservation,
  Response,
  Sore,
  Statistic,
  User,
} from "./controller";

export const getReservations = asyncHandler(
  async (req: Request, res: Response) => {
    const reservation = await Reservation.findAll({
      where: { soreId: req.params.id },
    });

    res.status(200).json({
      status: 200,
      data: reservation,
    });
  }
);

export const getReservationForDoctor = asyncHandler(
  async (req: Request, res: Response) => {
    const reservation = await Reservation.findAll({
      where: { doctor: req.user?.id, isPaid: true, isQueue: true },
      include: [{ model: Sore, as: "sore", attributes: ["name", "phone"] }],
      order: [["queue", "ASC"]],
    });
    res.status(200).json({
      status: 200,
      data: reservation,
    });
  }
);

export const updateReservationForDoctor = asyncHandler(
  async (req: Request, res: Response) => {
    const reservation = await Reservation.findOne({
      where: { id: req.params.id },
    });
    if (!reservation) throw new BadRequestError("Something went wrong.");
    let statistic = await Statistic.findOne();
    if (!statistic) {
      statistic = await Statistic.create({ balance: 1 });
      await statistic.save();
    }
    statistic.update({ balance: statistic.balance + reservation.fee });
    await reservation.update(req.body);
    await reservation.save();

    res.status(200).json({
      status: 200,
      data: reservation,
    });
  }
);

export const getStatistics = asyncHandler(
  async (req: Request, res: Response) => {
    const statistic = await Statistic.findOne();
    const category = await Category.findAll();
    let categories: any = [];
    let catDatas: any = [];
    category.map(async (cat) => {
      await categories.push(cat.category);
    });

    for (let index in categories) {
      const length = await Reservation.count({
        where: { type: categories[index] },
      });
      await catDatas.push(length);
    }

    res.status(200).json({
      status: 200,
      data: { statistic, categories, catDatas },
    });
  }
);

export const updateReservation = asyncHandler(
  async (req: Request, res: Response) => {
    const reservation = await Reservation.findOne({
      where: { id: req.params.id },
    });
    if (!reservation) throw new BadRequestError("Something went wrong.");
    const user = await User.findOne({ where: { id: reservation.doctor } });
    if (!user) throw new NotFoundError("User not found.");
    const queue = user.soreQueue;
    const setQueue = queue + 1;
    await user.update({ soreQueue: setQueue });
    await user.save();
    req.body.queue = setQueue;
    await reservation.update(req.body);
    await reservation.save();

    res.status(200).json({
      status: 200,
      data: reservation,
    });
  }
);
