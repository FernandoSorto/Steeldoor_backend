const express = require("express");
const createError = require("http-errors");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res, next) => {
    res.send({ message: "it Works" });
});

app.use("/companies", require("./routes/company.route"));

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

app.listen(3000, () => {
    console.log("Running server on localhost:3000...");
});

module.exports = app;
