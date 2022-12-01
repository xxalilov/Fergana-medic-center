import {asyncHandler, BadRequestError, deleteFile, Password, Request, Response, Statistic, User} from "./controller";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const currentUser = await User.findOne({where: {login: req.body.login}});
    if (currentUser) {
        throw new BadRequestError("Login already existing.")
    }
    if (req.file) {
        req.body.image = req.file.path;
    }

    const user = await User.create(req.body);
    await user.save();
    const statistic = await Statistic.findOne();
    if(!statistic) await Statistic.create({users: 1});
    statistic?.update({users: statistic.users + 1})
    res.status(201).json({
        status: 201,
        data: user
    })
})

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query;
    const user = await User.findAll({where: query, attributes: {exclude: ['password']}});
    res.status(200).json({
        status: 200,
        data: user
    })
})

export const getUsersForAdmin = asyncHandler(async (req: Request, res: Response) => {
    const query = req.query;
    const user = await User.findAll({where: query,attributes: {exclude: ['password', 'login', 'image']}});
    res.status(200).json({
        status: 200,
        data: user
    })
})

// Update User Details
export const updateUserDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const user = await User.findOne({where: {id: req.params.id}});
        if (!user) throw new BadRequestError('User not found');
        if (req.body.password) {
            req.body.password = await Password.toHash(req.body.password);
        }

        if (req.file) {
            if (user.image) deleteFile(user.image);
            req.body.image = req.file.path;
        }

        if(req.body.role === 'superadmin') req.body.role=undefined;

        const updatedUser = await user.update(req.body);
        await updatedUser.save();

        res.status(200).json({
            status: 200,
            data: updatedUser,
        });
    },
);

export const updateUsersLoginAndPassword = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({where: {id: req.user?.id}});
    if (!user) throw new BadRequestError('User not found.');
    if (req.body.password) {
        if (!req.body.currentPassword) throw new BadRequestError("Please input current password.");
        const password = user.password;
        const currentPassword = req.body.currentPassword
        const matchPassword = await Password.compare(
            password,
            currentPassword,
        );
        if (matchPassword) {
            req.body.password = await Password.toHash(req.body.password);
            const updatedUser = await user.update({password: req.body.password});
            await updatedUser.save();
        } else {
            throw new BadRequestError('Password is incorrect!');
        }
    }

    if (req.body.login) {
        const currentLogin = await User.findOne({where: {login: req.body.login}});
        if (currentLogin?.login && currentLogin.login !== req.body.login) {
            throw new BadRequestError("Login already existing.")
        }
        await user.update({login: req.body.login});
        await user.save();
    }

    if (req.file) {
        if (user.image) deleteFile(user.image);
        req.body.image = req.file.path;
    }

    await user.update(req.body);
    await user.save();

    

    res.status(200).json({
        status: 200,
        data: user,
    });
})

// Delete User
export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({where: {id: req.params.id}});
    if(user?.role === 'superadmin') throw new BadRequestError("You can't delete superadmin");
    if (!user) throw new BadRequestError("Something went wrong.");
    if (user.image) deleteFile(user.image);
    const statistic = await Statistic.findOne();
    statistic?.update({users: statistic.users - 1})
    await user.destroy();
    res.status(200).json({
        status: 200,
        data: {}
    })
})