const { Router } = require("express")
const express = require("express")

//middleware to check the user logged in or not
const protect = require("../middleware/authMiddleware")


const postController = require("../controller/postController")

const router = express.Router()

router
  .route("/")
  .get(postController.getAllPosts)
  .post(protect, postController.createPost);

router
  .route("/:id")
  .get(postController.getOnePost)
  .patch(postController.updatePost)
  .delete(postController.deletePost)

module.exports = router;