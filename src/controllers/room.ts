import { Op } from "sequelize";
import Room from "../models/Room";
import {
  asyncHandler,
  BadRequestError,
  NotFoundError,
  Request,
  Response,
} from "./controller";

export const createRoom = asyncHandler(async (req: Request, res: Response) => {
  const room = await Room.create(req.body);
  await room.save();

  res.status(201).json({
    status: 201,
    data: room,
  });
});

export const getRooms = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query;
  const limit = Number(query.limit) || 3;
  const page = Number(query.page) || 1;
  let users, allPages: number;
  let countData = 0;

 if (query.isFull) {
    const { count, rows } = await Room.findAndCountAll({
      where: { isFull: query.isFull },
      offset: limit * page - limit,
      limit: limit,
    });
    countData = countData + count;
    allPages = Math.ceil(count / limit);
    users = rows;
  } else if(req.query.notNull) {
    const { count, rows } = await Room.findAndCountAll({
      where: { patientsCount: {[Op.gt]: 0} },
      offset: limit * page - limit,
      limit: limit,
    });
    countData = countData + count;
    allPages = Math.ceil(count / limit);
    users = rows;
  }
  else {
    const { count, rows } = await Room.findAndCountAll({
      offset: limit * page - limit,
      limit: limit,
    });

    countData = countData + count;

    allPages = Math.ceil(count / limit);
    users = rows;
  }

  res.status(200).json({
    status: 200,
    allPages,
    count: countData,
    page,
    data: users,
  });
});

export const updateRoom = asyncHandler(async (req: Request, res: Response) => {
  const room = await Room.findOne({ where: { id: req.params.id } });
  if (!room) throw new NotFoundError("Berilgan id orqali xona topilmadi.");
  await room.update(req.body);

  res.status(200).json({
    status: 200,
    data: room,
  });
});

export const updateRoomForAdmin = asyncHandler(async (req: Request, res: Response) => {
  const room = await Room.findOne({ where: { id: req.params.id } });
  if (!room) throw new NotFoundError("Berilgan id orqali xona topilmadi.");
  await room.update({patientsCount: room.patientsCount-1, isFull: false});

  res.status(200).json({
    status: 200,
    data: room,
  });
});


export const deleteRoom = asyncHandler(async (req: Request, res: Response) => {
  const room = await Room.findOne({ where: { id: req.params.id } });
  if (!room) throw new BadRequestError("Something went wrong");
  await room.destroy();

  res.status(200).json({
    status: 200,
    data: {},
  });
});
