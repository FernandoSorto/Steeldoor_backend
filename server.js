const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res, next) => {
    res.send({ message: "it Works" });
});

app.use("/companies", require("./routes/company.route"));
app.use("/jobs", require("./routes/job.route"));
app.use("/applicant", require("./routes/applicant.route"));
app.use("/jobApplication", require("./routes/jobApplication.route"));

app.use((req, res, next) => {
    next(createError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status || 500,
        message: err.message,
    });
});

app.listen(5000);

module.exports = app;
