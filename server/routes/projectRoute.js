const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");
const {
  addProject,
  fetchProjects,
  fetchOneProject,
} = require("../controllers/projectController");

//to add project
router.post("/add", verifyToken, addProject);

//to fetch projects
router.get("/fetch", verifyToken, fetchProjects);

//to fetch one project
router.get("/fetch/:id", verifyToken, fetchOneProject);

//sample image upload
// router.post("/upload", async (req, res) => {
//   try {
//     const image =
//       "A:/My Projects/React-Learning/PictureGallery/server/image (1).png";
//     const result = await cloudinary.uploader.upload(image);

//     res.status(201).json({ message: "image successfully uploaded", result });
//   } catch (error) {
//     console.log(error);
//   }
// });

// //sample multi image upload
// router.post("/multi-upload", async (req, res) => {
//   try {
//     const images = [
//       "A:/My Projects/React-Learning/PictureGallery/server/apple-website.png",
//       "A:/My Projects/React-Learning/PictureGallery/server/chatApp.png",
//     ];
//     let results = [];
//     for (const image of images) {
//       const result = await cloudinary.uploader.upload(image);
//       results.push(result);
//     }
//     // const result = await cloudinary.uploader.upload(image);

//     res
//       .status(201)
//       .json({ message: "images are successfully uploaded", results });
//   } catch (error) {
//     console.log(error);
//   }
// });

module.exports = router;
