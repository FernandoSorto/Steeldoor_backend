const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
    res.json({ message: "Server up and running!" });
});

app.listen(3000);
