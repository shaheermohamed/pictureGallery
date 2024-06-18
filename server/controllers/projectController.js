const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");
const addProject = async (req, res) => {
  try {
    const { projectName, allImages } = req.body;
    // const images = [
    //   "A:/My Projects/React-Learning/PictureGallery/server/apple-website.png",
    //   "A:/My Projects/React-Learning/PictureGallery/server/chatApp.png",
    // ];
    let results = [];
    for (const image of allImages) {
      const result = await cloudinary.uploader.upload(image);
      results.push(result);
    }
    const newProject = new Project({ projectName, images: results });
    await newProject.save();
    res.status(201).json({ message: "Project added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Project addition failed" });
  }
};

const fetchProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ error: "Fetching projects failed" });
  }
};

const fetchOneProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ error: "Fetching project" });
  }
};

const addImagesToProject = async (req, res) => {
  try {
    const { id, allImages } = req.body;
    // const images = [
    //   "A:/My Projects/React-Learning/PictureGallery/server/apple-website.png",
    //   "A:/My Projects/React-Learning/PictureGallery/server/chatApp.png",
    // ];
    let results = [];
    for (const image of allImages) {
      const result = await cloudinary.uploader.upload(image);
      results.push({ url: result.url });
    }
    const updateResult = await Project.updateOne(
      { _id: id },
      { $push: { images: { $each: results } } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({
        message: "Project not found or no images added",
        updatedProject,
      });
    }

    res
      .status(201)
      .json({ message: "Images added successfully", updateResult });
  } catch (error) {
    res.status(500).json({ error: "Images addition failed", error });
  }
};

module.exports = {
  addProject,
  fetchProjects,
  fetchOneProject,
  addImagesToProject,
};
