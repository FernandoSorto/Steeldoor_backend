const router = require("express").Router();
const prisma = require("../prisma");

// route to get all companies
router.get("/", async (req, res, next) => {
    try {
        const companies = await prisma.company.findMany({
            //include: {classname}
        });
        res.json(companies);
    } catch (error) {
        next(error);
    }
});

// route to get single company (MAYBE NOT USED)
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const company = await prisma.company.findUnique({
            where: {
                id: Number(id),
            },
            // include: {classname: true}
        });
        res.json(company);
    } catch (error) {
        next(error);
    }
});

// route to create new company
router.post("/", async (req, res, next) => {
    try {
        const company = await prisma.company.create({
            data: req.body,
        });
        res.json(company);
    } catch (error) {
        next(error);
    }
});

// route to delete company
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCompany = await prisma.company.delete({
            where: {
                id: Number(id),
            },
            // include: {classname: true}
        });
        res.json(deletedCompany);
    } catch (error) {
        next(error);
    }
});

// route to update company
router.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const company = await prisma.company.update({
            where: {
                id: Number(id),
            },
            data: req.body,
            //include:{ className: true }
        });
        res.json(company);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
