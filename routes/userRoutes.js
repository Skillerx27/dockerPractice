const express = require("express")

const authController = require("../controller/authController")

//middleware to check the user logged in or not
const protect = require("../middleware/authMiddleware")


const router = express.Router()

router.post("/signup",authController.signUp)
router.post("/login",authController.login)

module.exports = router