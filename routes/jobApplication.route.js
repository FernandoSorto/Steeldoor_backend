const router = require("express").Router();
const prisma = require("../prisma");

// route to get all jobApplication
router.get("/", async (req, res, next) => {
    try {
        const jobApplication = await prisma.jobApplication.findMany({
            //include: {classname}
        });
        res.json(jobApplication);
    } catch (error) {
        next(error);
    }
});

// route to get single jobApplication
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const jobApplication = await prisma.jobApplication.findUnique({
            where: {
                id: Number(id),
            },
            // include: {classname: true}
        });
        res.json(jobApplication);
    } catch (error) {
        next(error);
    }
});

// route to create new jobApplication
router.post("/", async (req, res, next) => {
    try {
        const jobApplication = await prisma.jobApplication.create({
            data: req.body,
        });
        res.json(jobApplication);
    } catch (error) {
        next(error);
    }
});

// route to delete jobApplication
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedjobApplication = await prisma.jobApplication.delete({
            where: {
                id: Number(id),
            },
            // include: {classname: true}
        });
        res.json(deletedjobApplication);
    } catch (error) {
        next(error);
    }
});

// route to update jobApplication
router.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const jobApplication = await prisma.jobApplication.update({
            where: {
                id: Number(id),
            },
            data: req.body,
            //include:{ className: true }
        });
        res.json(jobApplication);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
