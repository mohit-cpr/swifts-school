var express = require("express");
var router = express.Router();
var request = require("request");
var chunks =
router.route("/uploadtest").get(function(req, res, next) {
  req
    .on("data", data => chunks.push(data))
    .on("end", _ => uploadFile(req, Buffer.concat(chunks), res));
});

function uploadFile(req, data, res) {
  request
    .post({
      uri: `http://172.29.21.187:8090/sigma/gateway/provision/experiment/notebook/localfile/124`,
      body: data,
      headers: {
        "Content-Type": req.headers["content-type"],
        Authorization: req.headers["authorization"]
      }
    })
    .pipe(res);
}

module.exports = router;
