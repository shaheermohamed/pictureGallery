const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "deagxexgl" || process.env.CLOUD_NAME,
  api_key: "757939551258166" || process.env.API_KEY,
  api_secret: "cDt6xLmB7OmR0n229ZsXw8_CyL4" || process.env.API_SECRET,
});

module.exports = cloudinary;
