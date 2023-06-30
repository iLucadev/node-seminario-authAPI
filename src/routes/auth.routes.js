import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { checkExistingRole, checkExistingUser } from "../middlewares/verifySignUp.js";
import { setUserName } from "../middlewares/authJwt.js";

const router = Router();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
  next();
});

router.post("/signup", [checkExistingUser, checkExistingRole, setUserName], signUp);
router.post("/signin", signIn);

export default router;
