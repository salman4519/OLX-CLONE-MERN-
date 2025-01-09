const path = require('path');
const fs = require('fs');

const uploadDirectory = path.join(__dirname, '../uploads'); // Directory where files are stored

/**
 * Get the URL for accessing an uploaded image.
 * @param {string} filename - Name of the file.
 * @returns {string} - Public URL to access the file.
 */
const getImageUrl = (filename) => {
  return `http://localhost:5000/uploads/${filename}`; // Public URL to access the file
};

/**
 * Serve the requested image file.
 * @param {string} filename - Name of the file to retrieve.
 * @param {object} res - Express response object.
 */
const getImage = (filename, res) => {
  const filePath = path.join(uploadDirectory, filename);

  // Check if the file exists in the upload directory
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath); // Send the file to the client
  } else {
    res.status(404).json({ message: 'File not found' });
  }
};

module.exports = {
  getImageUrl,
  getImage,
};
