// const v1Router = require("./v1/index.js");

const apiRouter = require("express").Router();

// apiRouter.use("/v1", v1Router);

apiRouter.get('/ping', function (req, res) {
    return res.json({
        "sucess": true,
        "msg": "msg details"
    })
})

module.exports = apiRouter;