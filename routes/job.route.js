const router = require("express").Router();
const prisma = require("../prisma");

// route to get all jobs with skills
router.get("/", async (req, res, next) => {
    try {
        const job = await prisma.job.findMany({
            include: { SkillsOnJobs: true },
        });
        res.json(job);
    } catch (error) {
        next(error);
    }
});

// route to get single job
router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await prisma.job.findUnique({
            where: {
                id: Number(id),
            },
            include: {
                SkillsOnJobs: {
                    select: {
                        skill: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
                applications: {
                    select: {
                        applicant: true,
                    },
                },
            },
        });
        res.json(job);
    } catch (error) {
        next(error);
    }
});

// route to create new job
router.post("/", async (req, res, next) => {
    try {
        let normalizedSkillsConnect;
        let finalData;
        if (req.body.skills) {
            normalizedSkillsConnect = req.body.skills.map((skill) => {
                return {
                    skill: {
                        connectOrCreate: {
                            where: { name: skill.name.toLocaleLowerCase() },
                            create: { name: skill.name.toLocaleLowerCase() },
                        },
                    },
                };
            });
            finalData = {
                title: req.body.title,
                location: req.body.location,
                description: req.body.description,
                salaryRoof: req.body.salaryRoof,
                salaryBottom: req.body.salaryBottom,
                companyId: req.body.companyId,
                SkillsOnJobs: {
                    create: normalizedSkillsConnect,
                },
            };
        } else {
            finalData = {
                title: req.body.title,
                location: req.body.location,
                description: req.body.description,
                salaryRoof: req.body.salaryRoof,
                salaryBottom: req.body.salaryBottom,
                companyId: req.body.companyId,
            };
        }
        const job = await prisma.job.create({
            data: finalData,
        });

        res.json(job);
    } catch (error) {
        next(error);
    }
});

// route to delete job
router.delete("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedJob = await prisma.job.delete({
            where: {
                id: Number(id),
            },
            include: { SkillsOnJobs: true },
        });
        res.json(deletedJob);
    } catch (error) {
        next(error);
    }
});

// route to update job
router.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;

        let normalizedSkillsConnect;
        let finalData;
        if (req.body.skills) {
            normalizedSkillsConnect = req.body.skills.map((skill) => {
                return {
                    skill: {
                        connectOrCreate: {
                            where: { name: skill.name.toLocaleLowerCase() },
                            create: { name: skill.name.toLocaleLowerCase() },
                        },
                    },
                };
            });
            finalData = {
                title: req.body.title,
                location: req.body.location,
                description: req.body.description,
                salaryRoof: req.body.salaryRoof,
                salaryBottom: req.body.salaryBottom,
                companyId: req.body.companyId,
                SkillsOnJobs: {
                    create: normalizedSkillsConnect,
                },
            };
        } else {
            finalData = {
                title: req.body.title,
                location: req.body.location,
                description: req.body.description,
                salaryRoof: req.body.salaryRoof,
                salaryBottom: req.body.salaryBottom,
                companyId: req.body.companyId,
            };
        }

        await prisma.SkillsOnJobs.deleteMany({
            where: {
                jobId: Number(id),
            },
        });

        const job = await prisma.job.update({
            where: {
                id: Number(id),
            },
            data: finalData,
            include: { SkillsOnJobs: true },
        });
        res.json(job);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
