import sequelize from "../config/database.js";
import cloudinary from "../config/cloudinary.js";

export const addActivity = async (req, res) => {
    try {
        console.log("🔥 ADD ACTIVITY WITH IMAGES");
        console.log("FILES:", req.body);

        const {
            batch,
            title,
            description,
            start_date,
            end_date,
            participants,
            resource_person_name,
            resource_person_description,
            testimonials_name,
            testimonials_class,
            testimonials_feedback
        } = req.body;

        // ✅ Validate required fields
        if (
            !batch ||
            !title ||
            !description ||
            !start_date ||
            !participants ||
            !testimonials_name ||
            !testimonials_class ||
            !testimonials_feedback
        ) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        // 🔥 Upload helper (SAFE)
        const uploadToCloudinary = async (file) => {
            return new Promise((resolve, reject) => {
                if (!file || !file.buffer) return resolve(null);

                cloudinary.uploader.upload_stream(
                    { folder: "activities" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result.secure_url);
                    }
                ).end(file.buffer);
            });
        };

        // 🔥 SAFE FILE FETCHER
        const getFileUrl = async (fieldName) => {
            if (
                req.files &&
                req.files[fieldName] &&
                req.files[fieldName].length > 0 &&
                req.files[fieldName][0].buffer
            ) {
                return await uploadToCloudinary(req.files[fieldName][0]);
            }
            return null;
        };

        // ✅ Single file uploads
        const brochure_url = await getFileUrl("brochure");
        const resource_person_image_url = await getFileUrl("resource_person_image");
        const winner_image = await getFileUrl("winner_image");

        // 🔥 MULTIPLE EVENT IMAGES
        let event_images = [];

        if (req.files && req.files["event_images"]) {
            for (let file of req.files["event_images"]) {
                if (file && file.buffer) {
                    const url = await uploadToCloudinary(file);
                    if (url) event_images.push(url);
                }
            }
        }

        const event_image_url = event_images.length > 0 ? event_images.join(",") : null;

        // ✅ FINAL QUERY
        const query = `
            INSERT INTO activities (
                batch,
                brochure_url,
                title,
                description,
                start_date,
                end_date,
                participants,
                resource_person_image_url,
                resource_person_name,
                resource_person_description,
                event_image_url,
                winner_image,
                testimonials_name,
                testimonials_class,
                testimonials_feedback
            )
            VALUES (
                :batch,
                :brochure_url,
                :title,
                :description,
                :start_date,
                :end_date,
                :participants,
                :resource_person_image_url,
                :resource_person_name,
                :resource_person_description,
                :event_image_url,
                :winner_image,
                :testimonials_name,
                :testimonials_class,
                :testimonials_feedback
            )
        `;

        await sequelize.query(query, {
            replacements: {
                batch,
                brochure_url: brochure_url || null,
                title,
                description,
                start_date,
                end_date: end_date || null,
                participants,
                resource_person_image_url: resource_person_image_url || null,
                resource_person_name: resource_person_name || null,
                resource_person_description: resource_person_description || null,
                event_image_url: event_image_url || null,
                winner_image: winner_image || null,
                testimonials_name,
                testimonials_class,
                testimonials_feedback
            }
        });

        return res.status(201).json({
            success: true,
            message: "Activity added successfully 🚀"
        });

    } catch (error) {
        console.error("❌ FULL ERROR:", error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};