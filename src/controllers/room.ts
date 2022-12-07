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
  const room = await Room.findAll({ where: query });

  res.status(200).json({
    status: 200,
    data: room,
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

export const deleteRoom = asyncHandler(async (req: Request, res: Response) => {
  const room = await Room.findOne({ where: { id: req.params.id } });
  if (!room) throw new BadRequestError("Something went wrong");
  await room.destroy();

  res.status(200).json({
    status: 200,
    data: {},
  });
});
