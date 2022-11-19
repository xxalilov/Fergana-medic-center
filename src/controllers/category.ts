import {asyncHandler, Response, Request, Category, BadRequestError} from "./controller";

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await Category.create(req.body);
    await category.save();

    res.status(201).json({
        status: 201,
        data: category
    })
});

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
    const categories = await Category.findAll();

    res.status(200).json({
        status: 200,
        data: categories
    })
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
    const category = await Category.findOne({where: {id: req.params.id}});
    if (!category) throw new BadRequestError("Category Not Found.");
    await category.destroy();
    res.status(200).json({
        status: 200,
        data: {}
    })
})