const router = require("express").Router();
const prisma = require("../prisma");
const upload = require("../middleware/uploadMiddleware");
const fs = require("fs");
const path = require("path");

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

// route to download job application file
router.get("/:id/download", async (req, res, next) => {
    try {
        const { id } = req.params;
        const jobApplication = await prisma.jobApplication.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!jobApplication) {
            return res.status(404).json({ message: "Job application not found" });
        }

        const filePath = path.join(__dirname, "../middleware/uploads", jobApplication.cvFile);

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File not found" });
        }

        // Set the appropriate headers for file download
        res.setHeader("Content-Disposition", `attachment; filename=${jobApplication.cvFile}`);
        res.setHeader("Content-Type", "application/octet-stream");

        // Stream the file to the response
        fs.createReadStream(filePath).pipe(res);
    } catch (error) {
        next(error);
    }
});

// route to post new job application
router.post("/", upload.single("cv"), async (req, res, next) => {
    try {
        const { filename } = req.file;

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
