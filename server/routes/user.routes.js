import { Router } from "express";
import { loginUser, logoutUser, registerUser, updateUser, deleteUser, newTokenOnExpiry, getUserById } from "../controllers/user.controllers.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router=Router();


router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secured routes
router.route("/updateUser/:reqID").put(verifyJWT,updateUser)
router.route("/deleteUser/:reqID").delete(verifyJWT,deleteUser)
router.route("/logout").post(verifyJWT ,logoutUser)
router.route("/refresh_token").post(newTokenOnExpiry)

router.route("/getUser/:reqID").get(verifyJWT, getUserById)

export default router