const router = require("express").Router();
const prisma = require("../prisma");
const upload = require("../middleware/uploadMiddleware");

// route to get all jobApplication
router.get("/", async (req, res, next) => {
    try {
        const jobApplication = await prisma.jobApplication.findMany();
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
        });
        res.json(jobApplication);
    } catch (error) {
        next(error);
    }
});

router.post("/", upload.single("cv"), async (req, res, next) => {
    try {
        const { filename } = req.file;

        console.log(filename);
        const jobApplication = await prisma.jobApplication.create({
            data: {
                cvFile: filename,
                applicant: {
                    connect: { id: Number(req.body.applicantId) },
                },
                Job: {
                    connect: { id: Number(req.body.jobId) },
                },
            },
        });

        console.log(jobApplication);

        res.json(jobApplication);
    } catch (error) {
        console.log(error);
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
        });
        res.json(jobApplication);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
