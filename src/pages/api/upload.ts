import type { APIRoute } from 'astro';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
    api_key: import.meta.env.CLOUDINARY_API_KEY,
    api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const officerName = formData.get('name') as string;

    if (!file) {
        return new Response(JSON.stringify({
            success: false,
            message: 'No file uploaded'
        }), { status: 400 });
    }

    // Convert File to ArrayBuffer then to Buffer (Node.js) or Base64 for Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    try {
        // Upload to Cloudinary using a stream or base64
        // Since we are in a serverless context, standard stream upload is safer
        // But direct upload_stream is cleaner with Buffers.

        const result: any = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'officer_pictures' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(buffer);
        });

        return new Response(JSON.stringify({
            success: true,
            message: 'Image uploaded successfully',
            data: {
                url: result.secure_url,
                public_id: result.public_id
            }
        }), { status: 200 });

    } catch (error: any) {
        console.error('Cloudinary Upload Error:', error);
        return new Response(JSON.stringify({
            success: false,
            message: 'Server error during upload',
            error: error.message
        }), { status: 500 });
    }
}
