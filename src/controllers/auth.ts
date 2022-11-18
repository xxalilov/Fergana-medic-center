import {
  asyncHandler,
  User,
  config,
  Response,
  Request,
  BadRequestError,
  Password,
  jwt,
} from './controller';

// SignIn User
export const signin = asyncHandler(async (req: Request, res: Response) => {
  const currentUser = await User.findOne();

  if (!currentUser) {
    const login = config.ADMIN_LOGIN;
    const password = config.ADMIN_PASSWORD;
    const role = 'superadmin';

    const user = await User.create({ login, password, role });

    await user.save();

    if (user.login !== req.body.login) {
      throw new BadRequestError('Email yoki parol xato!');
    }

    const matchPassword = await Password.compare(
      user.password,
      req.body.password,
    );

    if (!matchPassword) {
      throw new BadRequestError('Email yoki parol xato!');
    }

    return sendTokenResponse(user, 201, res);
  }

  const user = await User.findOne({ where: { login: req.body.login } });

  if (!user) {
    throw new BadRequestError('Email yoki parol xato!');
  }

  const matchPassword = await Password.compare(
    user.password,
    req.body.password,
  );

  if (!matchPassword) {
    throw new BadRequestError('Email yoki parol xato!');
  }

  sendTokenResponse(currentUser, 200, res);
});

// SignOut user
export const signout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.end();
});

// Get Current User
export const currentUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findOne({
    where: { id: req.user?.id },
    attributes: { exclude: ['password'] },
  });
  res.status(200).json({
    status: 200,
    data: user,
  });
});

// Update User Details
export const updateUserDetails = asyncHandler(
  async (req: Request, res: Response) => {
    const user = await User.findOne({ where: { id: req.user?.id } });
    if (!user) throw new BadRequestError('Something went wrong.');
    if (req.body.password) {
      const matchPassword = await Password.compare(
        user.password,
        req.body.currentPassword,
      );
      if (matchPassword) {
        req.body.password = await Password.toHash(req.body.password);
        const updatedUser = await user.update(req.body);
        await updatedUser.save();
      } else {
        throw new BadRequestError('Current Password wrong.');
      }
    }
    const updatedUser = await user.update(req.body);
    await updatedUser.save();

    res.status(200).json({
      status: 200,
      data: updatedUser,
    });
  },
);

const sendTokenResponse = (user: any, statusCode: number, res: Response) => {
  const token = jwt.sign(
    {
      id: user.id,
    },
    config.JWT_SECRET,
    {
      expiresIn: config.JWT_EXPIRE,
    },
  );

  const options = {
    expires: new Date(
      Date.now() + Number(config.JWT_COOKIE_EXPIRE) * 24 * 60 * 1000,
    ),
    httpOnly: true,
    secure: false,
  };

  if (config.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({ status: statusCode, token });
};
