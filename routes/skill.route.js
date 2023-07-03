const router = require("express").Router();
const prisma = require("../prisma");

// route to get all jobApplication
router.get("/", async (req, res, next) => {
    try {
        const skill = await prisma.skill.findMany({
            //include: {classname}
        });
        res.json(skill);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
