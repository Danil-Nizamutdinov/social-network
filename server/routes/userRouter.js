const Router = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = new Router();

router.post("/registration/start", userController.startRegistration);
router.post("/registration/resend_code", userController.resendVerificationCode);
router.post("/registration/verify", userController.verifyRegistration);
router.post("/login/start", userController.startLogin);
router.post("/login/verify", userController.verifyLogin);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware(), userController.getUsers);

module.exports = router;
