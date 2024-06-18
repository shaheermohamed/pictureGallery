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

module.exports = { addProject, fetchProjects, fetchOneProject };
