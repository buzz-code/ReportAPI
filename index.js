const express = require("express");
const path = require("path");
const winston = require("winston"),
    expressWinston = require("express-winston");
const routes = require("./routes");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const config = require("./config/key");

const mongoose = require("mongoose");
const connect = mongoose
    .connect(config.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => console.log("MongoDB Connected..."))
    .catch((err) => console.log("MongoDB connect error", err));

// expressWinston.requestWhitelist.splice(expressWinston.requestWhitelist.indexOf("headers"), 1);
// app.use(
//     expressWinston.logger({
//         transports: [new winston.transports.Console()],
//         format: winston.format.combine(winston.format.colorize(), winston.format.json()),
//     })
// );

// app.use(
//     fileUpload({
//         useTempFiles: true,
//         tempFileDir: "/tmp/",
//     })
// );
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", routes);

// app.use(
//     expressWinston.errorLogger({
//         transports: [new winston.transports.Console()],
//         format: winston.format.combine(winston.format.colorize(), winston.format.json()),
//     })
// );

// if (process.env.NODE_ENV === "production") {
//     app.use(express.static(path.join(__dirname, "client/build")));
//     app.get("*", (req, res) => {
//         res.sendFile(path.join(__dirname + "/client/build/index.html"));
//     });
// }

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, function () {
    console.log("Express server listening on port ", PORT);
});
