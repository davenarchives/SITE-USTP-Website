const cloudinary = require('../lib/cloudinary');
const fs = require('fs');

const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        // Upload to Cloudinary
        let result;
        try {
            result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'officer_pictures', // Optional: Organize in a specific folder
            });
        } catch (cloudinaryError) {
            console.error('Cloudinary Upload Error:', cloudinaryError);
            if (!process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_API_KEY.includes('your_api_key')) {
                throw new Error('Missing or invalid Cloudinary credentials in backend/.env');
            }
            throw cloudinaryError;
        }

        // Update officerProfilePictures.json
        const officerName = req.body.name;
        if (officerName && officerName !== 'Unknown') {
            const path = require('path');
            // Path to: ../../../src/data/officerProfilePictures.json (relative to backend/src/controllers)
            const jsonPath = path.resolve(__dirname, '../../../src/data/officerProfilePictures.json');

            let data = {};
            if (fs.existsSync(jsonPath)) {
                try {
                    const fileContent = fs.readFileSync(jsonPath, 'utf8');
                    data = JSON.parse(fileContent);
                } catch (e) {
                    console.error("Error reading JSON:", e);
                }
            }

            data[officerName] = result.secure_url;

            try {
                fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
            } catch (writeError) {
                console.error("Failed to update JSON file:", writeError);
                // We don't fail the request here, as the image was uploaded successfully? 
                // Alternatively, we could, but let's just log it for now.
            }
        }

        return res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                url: result.secure_url,
                public_id: result.public_id
            }
        });

    } catch (error) {
        console.error('Upload Process Error:', error.message);
        return res.status(500).json({ success: false, message: 'Server error during upload', error: error.message });
    } finally {
        // Clean up local file (always runs)
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, (err) => {
                if (err && err.code !== 'ENOENT') console.error("Failed to delete local file:", err);
            });
        }
    }
};

const updateImage = async (req, res) => {
    // For Cloudinary, "update" is often just uploading a new image and getting a new URL,
    // or overwriting if using the same public_id. 
    // For simplicity in this "basic" requirement, we reuse simple upload.
    // But if we want to delete the old one, we'd need the old public_id.

    // Let's implement a 'delete' or 'replace' logic if public_id is provided?
    // For now, the user just wants "CRUD", so let's stick to simple upload returns URL.
    // The frontend handles associating that URL with the officer.
    return uploadImage(req, res);
}

module.exports = {
    uploadImage,
    updateImage
};
