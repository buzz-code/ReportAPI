const { Router } = require("express");
const apiPipeline = require("./functions");

const router = Router();

router.use("/", (req, res) => {
    prom = Promise.resolve(req.body);
    apiPipeline.forEach((item) => (prom = prom.then(item)));

    prom.then(handleResolve.bind(null, req, res)).catch(handleReject.bind(null, req, res));
});

function handleResolve(req, res, resolve) {
    console.log(resolve);
    res.send(`id_list_message=t-הסתיים בהצלחה.`);
}

function handleReject(req, res, reject) {
    console.log(reject)
    const messge = getReturnMessage(reject);
    res.send(messge);
}

function getReturnMessage(def) {
    if (Array.isArray(def)) {
        return def.map(getReturnMessage).join("&");
    }
    switch (def.type) {
        case "hangup":
            return "hangup";
        case "say":
            return `id_list_message=t-${def.payload}.`;
        case "ask":
            return `read=t-${def.payload.text}=${def.payload.params}`;
    }
}

module.exports = router;
