import { Router } from "express";
import * as userController from "../controllers/users.controller.js";
import { isAdmin, verifyToken, setUserName } from "../middlewares/authJwt.js";
import { checkExistingUser } from "../middlewares/verifySignUp.js";

const router = Router();

// Pokedex routes
router.get("/pokedex", [verifyToken], userController.getPokedex);
router.put("/pokedex/catch-pokemon", [verifyToken], userController.catchPokemon);
router.put("/pokedex/release-pokemon", [verifyToken], userController.releasePokemon);

// Poketeam routes
router.get("/poketeam", [verifyToken], userController.getPoketeam);
router.put("/poketeam/create", [verifyToken], userController.createPoketeam);
router.put("/poketeam/delete", [verifyToken], userController.deletePoketeam);
router.put("/poketeam/add-pokemon", [verifyToken], userController.addPokemonToTeam);
router.put("/poketeam/remove-pokemon", [verifyToken], userController.removePokemonFromTeam);

// User routes
router.post("/", [verifyToken, isAdmin, checkExistingUser, setUserName], userController.storeUser);
router.get("/", userController.getUsers);
router.get("/using-token", [verifyToken], userController.getUserByToken);
router.get("/:id", userController.getUserById);

export default router;
