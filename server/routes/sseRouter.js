const Router = require("express");
const router = new Router();
const sseController = require("../controllers/sseController");

function sseCors(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3002");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Cache-Control");
  next();
}

router.get("/sse", sseCors, sseController.sse);

module.exports = router;
