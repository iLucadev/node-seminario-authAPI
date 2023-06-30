import User from "../models/User.js";
import Role from "../models/Role.js";

export const getUsers = async (req, res) => {
  try {
    // Look for users
    const users = await User.find().select("-createdAt -updatedAt -password");

    // Validate presence
    if (!users) {
      return res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "No users were found",
      });
    }

    return res.status(200).json({
      status: "OK",
      code: 200,
      result: users,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error has ocurred while getting users",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    // Catch data
    const { id } = req.params;

    // Look for user
    const user = await User.findById(id).select("-createdAt -updatedAt -password");

    return res.status(200).json({
      status: 200,
      result: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error has ocurred while getting user",
    });
  }
};

export const getUserByToken = async (req, res) => {
  try {
    // Find user using token provided by the verifyToken middleware
    const user = await User.findById(req.userId).select("-createdAt -updatedAt -password");

    return res.status(200).json({
      status: 200,
      result: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error has ocurred while getting user",
    });
  }
};

export const storeUser = async (req, res) => {
  try {
    // Catch user data
    const { name, username, password, email, roles } = req.body;

    // Look for roles
    const rolesFound = await Role.find({ name: { $in: roles } });

    // Create user
    const user = new User({
      name,
      username,
      password,
      email,
      roles: rolesFound.map((role) => role._id),
    });

    // Store user
    await user.save();

    return res.status(201).json({
      status: "Created",
      code: 201,
      message: "User created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error has ocurred while storing user",
    });
  }
};

export const getPokedex = async (req, res) => {
  try {
    // Find user using token provided by the verifyToken middleware
    const user = await User.findById(req.userId);

    const pokedex = user.pokedex;

    return res.status(200).json({
      status: "OK",
      code: 200,
      result: pokedex,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error occurred while getting the pokedex",
    });
  }
};

export const catchPokemon = async (req, res) => {
  try {
    // Find user using token provided by the verifyToken middleware
    const user = await User.findById(req.userId);

    // Validate pokedex restrictions
    if (user.pokemon_owned.length >= 5) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "Your pokedex is full",
      });
    }

    // Add pokemon to pokedex
    user.pokemon_owned.push(pokemonName);

    // Save changes
    await user.save();

    return res.status(200).json({
      status: "OK",
      code: 200,
      message: "Pokemon successfully caught",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error has ocurred when catching pokemon",
    });
  }
};

export const releasePokemon = async (req, res) => {
  try {
    // Find user using token provided by the verifyToken middleware
    const user = await User.findById(req.userId);

    // Remove pokemon from pokedex
    user.pokemon_owned = user.pokemon_owned.filter((pokemon) => pokemon !== pokemonName);

    // Save changes
    await user.save();

    return res.status(200).json({
      status: "OK",
      code: 200,
      message: "Pokemon successfully released",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error occurred while releasing pokemon",
    });
  }
};

export const getPoketeam = async (req, res) => {
  try {
    // Find user using token provided by the verifyToken middleware
    const user = await User.findById(req.userId);

    const pokedex = user.poketeam;

    return res.status(200).json({
      status: "OK",
      code: 200,
      result: pokedex,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error occurred while getting the poketeam",
    });
  }
};

export const createPoketeam = async (req, res) => {
  try {
    // Find user using token provided by the verifyToken middleware
    const user = await User.findById(req.userId);

    // Create team
    const team = {
      name: teamName,
      pokemon: [],
    };

    // Add team
    user.pokemon_team = team;

    await user.save();

    return res.status(201).json({
      status: "Created",
      code: 201,
      message: "Team successfully created",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error occurred while creating the team",
    });
  }
};

export const deletePoketeam = async (req, res) => {
  try {
    // Find user using token provided by the verifyToken middleware
    const user = await User.findById(req.userId);

    // Delete team
    user.pokemon_team = null;

    await user.save();

    return res.status(200).json({
      status: "OK",
      code: 200,
      message: "Team successfully deleted",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error occurred while deleting the team.",
    });
  }
};

export const addPokemonToTeam = async (req, res) => {
  try {
    // Find user using token provided by the verifyToken middleware
    const user = await User.findById(req.userId);

    // Validate team restrictions
    const team = user.pokemon_team.pokemon;
    if (!team) {
      return res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "Team not found",
      });
    }
    const teamMembers = team.pokemon;
    if (teamMembers.length >= 3) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "Your team is full",
      });
    }
    if (teamMembers.includes(pokemonName)) {
      return res.status(400).json({
        status: "Bad Request",
        code: 400,
        message: "You already have this pokemon in your team",
      });
    }

    // Add pokemon to team
    teamMembers.push(pokemonName);

    // Save changes
    await user.save();

    return res.status(200).json({
      status: "OK",
      code: 200,
      message: "Pokemon successfully added to your team",
    });
  } catch (error) {
    res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error has ocurred when adding pokemon to your team",
    });
  }
};

export const removePokemonFromTeam = async (req, res) => {
  try {
    // Find user using token provided by the verifyToken middleware
    const user = await User.findById(req.userId);

    // Look for team
    const team = user.pokemon_team;

    // Validate presence
    if (!team) {
      return res.status(404).json({
        status: "Not Found",
        code: 404,
        message: "Team not found",
      });
    }
    // Remove pokemon from the team.
    const teamMembers = team.pokemon;
    teamMembers = teamMembers.filter((pokemon) => pokemon !== pokemonName);

    // Save changes
    await user.save();

    return res.status(200).json({
      status: "OK",
      code: 200,
      message: "Pokemon successfully removed from the team.",
    });
  } catch (error) {
    return res.status(500).json({
      status: "Internal Server Error",
      code: 500,
      message: "An error occurred while removing the pokemon from the team",
    });
  }
};

export const testRoute = (req, res) => {
  console.log(req.body);
};
export const paramTestRoute = (req, res) => {
  console.log({
    params: req.params,
    body: req.body,
  });
};
