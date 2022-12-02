import {
  asyncHandler,
  NotFoundError,
  Request,
  Response,
  Sore,
  User,
  Reservation,
  Statistic,
} from "./controller";

export const createSore = asyncHandler(async (req: Request, res: Response) => {
  const sore = await Sore.findOne({ where: { phone: req.body.phone } });
  const user = await User.findOne({ where: { id: req.params.id } });
  if (!user) throw new NotFoundError("User not found.");
  const soreCount = await Sore.count();
  req.body.idNumber = soreCount + 1;
  req.body.room = user.room;
  req.body.fee = user.consultationFee;
  req.body.doctor = user.id;
  req.body.doctorName = user.name;
  req.body.type = user.profession;
  req.body.room = user.room;

  let currentSore;
  if (sore) {
    const reservation = await sore.createReservation(req.body);
    await reservation.save();
    currentSore = sore;
  } else {
    const newSore = await Sore.create(req.body);
    await newSore.save();
    const statistic = await Statistic.findOne();
    if (!statistic) await Statistic.create({ patients: 1 });
    statistic?.update({ patients: statistic.patients + 1 });
    const reservation = await newSore.createReservation(req.body);
    await reservation.save();
    currentSore = newSore;
  }

  const data = await Sore.findOne({
    where: { id: currentSore.id },
    include: [
      { model: Reservation, as: "reservation", where: { isPaid: false } },
    ],
  });

  res.status(201).json({
    status: 201,
    data,
  });
});

export const getSores = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;
  const limit = Number(query.limit) || 3;
  const page = Number(query.page) || 1;
  let patients, allPages: number;
  let countData = 0;

  if (query.phone) {
    const { count, rows } = await Sore.findAndCountAll({
      where: { phone: query.phone },
      offset: limit * page - limit,
      limit: limit,
    });
    countData = countData + count;
    allPages = Math.ceil(count / limit);
    patients = rows;
  } else {
    const { count, rows } = await Sore.findAndCountAll({
      offset: limit * page - limit,
      limit: limit,
    });

    countData = countData + count;
    allPages = Math.ceil(count / limit);
    patients = rows;
  }

  res.status(200).json({
    status: 200,
    allPages,
    count: countData,
    page,
    data: patients,
  });
});

export const getSoresForCachier = asyncHandler(
  async (req: Request, res: Response) => {
    let query;
    if (req.query) {
      query = req.query;
    }
    let sore = await Sore.findOne({
      where: query,
      include: [
        { model: Reservation, as: "reservation", where: { isPaid: false } },
      ],
    });

    if (!sore) {
      sore = await Sore.findOne({ where: query });
    }

    if (!sore) throw new NotFoundError("Bemor topilmadi.");

    res.status(200).json({
      status: 200,
      data: sore,
    });
  }
);

export const getSoresForDoctors = asyncHandler(
  async (req: Request, res: Response) => {
    let query;
    if (req.query) {
      query = req.query;
    }
    let sore = await Sore.findAll({
      include: [
        {
          model: Reservation,
          as: "reservation",
          where: { doctor: req.user?.id, isPaid: true, isQueue: true },
        },
      ],
    });

    if (!sore) throw new NotFoundError("Bemor topilmadi.");

    res.status(200).json({
      status: 200,
      data: sore,
    });
  }
);

export const getSore = asyncHandler(async (req: Request, res: Response) => {
  const sore = await Sore.findOne({ where: { id: req.params.id } });
  if (!sore) throw new NotFoundError("Bemor topilmadi.");

  res.status(200).json({
    status: 200,
    data: sore,
  });
});

export const updateSore = asyncHandler(async (req: Request, res: Response) => {
  const sore = await Sore.findOne({ where: { id: req.params.id } });
  if (!sore) throw new NotFoundError("Berilgan Id orqali bemor topilmadi.");

  await sore.update(req.body);
  await sore.save();

  res.status(200).json({
    status: 200,
    data: sore,
  });
});

export const deleteSore = asyncHandler(async (req: Request, res: Response) => {
  const sore = await Sore.findOne({ where: { id: req.params.id } });
  if (!sore) throw new NotFoundError("Berilgan Id orqali bemor topilmadi.");
  await sore.destroy();

  const statistic = await Statistic.findOne();
  statistic?.update({ patients: statistic.patients - 1 });

  res.status(200).json({
    status: 200,
    data: {},
  });
});
