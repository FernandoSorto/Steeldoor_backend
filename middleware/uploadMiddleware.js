const multer = require("multer");
const path = require("path");

// Set up the storage location and filename
const storage = multer.diskStorage({
    destination: path.join(__dirname, "../middleware/uploads"),
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const extension = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    },
});

// Create the multer instance
const upload = multer({ storage });

// Export the upload middleware
module.exports = upload;
