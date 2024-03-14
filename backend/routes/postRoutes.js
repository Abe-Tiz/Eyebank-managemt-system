const  express =require("express");
const {
  createPostController,
  deletePostController,
  getPostController,
  getSinglePostController,
  postPhotoController,
  updatePostController,

} =require( "../controller/postController.js");
const  formidable =require( "express-formidable");
const router = express.Router();

//routes
router.post(
  "/create-post",
  
  formidable(),
  createPostController
);
//routes
router.put(
  "/update-post/:pid",
 formidable(),
  updatePostController
);


//get post 
router.get("/get-post", getPostController);

//single post
router.get("/get-post/:slug", getSinglePostController);

//get photo
router.get("/post-photo/:pid", postPhotoController);

//delete post 
router.delete("/delete-post/:pid", deletePostController);
//product per page
// router.get("/posts-list/:page", blogListController);

module.exports = router;