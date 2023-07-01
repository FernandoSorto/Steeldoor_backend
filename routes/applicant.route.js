const router = require("express").Router();
const prisma = require("../prisma");

// route to get all applicant
router.get("/", async (req, res, next) => {
    try {
        const applicant = await prisma.applicant.findMany({
            //include: {classname}
        });
        res.json(applicant);
    } catch (error) {
        next(error);
    }
});

// route to get single applicant (MAYBE NOT USED)
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const applicant = await prisma.applicant.findUnique({
            where: {
                id: Number(id),
            },
            // include: {classname: true}
        });
        res.json(applicant);
    } catch (error) {
        next(error);
    }
});

// route to create new applicant
router.post("/", async (req, res, next) => {
    try {
        const applicant = await prisma.applicant.create({
            data: req.body,
        });
        res.json(applicant);
    } catch (error) {
        next(error);
    }
});

// route to delete applicant
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedApplicant = await prisma.applicant.delete({
            where: {
                id: Number(id),
            },
            // include: {classname: true}
        });
        res.json(deletedApplicant);
    } catch (error) {
        next(error);
    }
});

// route to update applicant
router.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        const applicant = await prisma.applicant.update({
            where: {
                id: Number(id),
            },
            data: req.body,
            //include:{ className: true }
        });
        res.json(applicant);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
