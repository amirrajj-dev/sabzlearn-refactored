import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';


interface CloudinaryUploadResult {
  secure_url: string;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


export const uploadToCloudinary = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'auto', 
            folder: 'course_files',
            public_id: `${Date.now()}_${file.name.replace(/\.[^/.]+$/, '')}`,
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result as CloudinaryUploadResult);
          }
        )
        .end(buffer);
    });

    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
};

export async function POST(request: Request) {
  const data = await request.formData();
  const file = data.get('file') as File | null;

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  try {
    const url = await uploadToCloudinary(file);
    return NextResponse.json({ url });
  } catch (error: unknown) {
    let errorMessage = 'File upload failed';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export const deleteCloudinaryFile = async (fileUrl: string | null) => {
  if (fileUrl) {
    try {
      const parts = fileUrl.split('/');
      const publicIdWithExtension = parts.pop(); 
      const publicId = publicIdWithExtension?.split('.')[0];

      if (publicId) {
        await cloudinary.uploader.destroy(publicId, { invalidate: true });
      } else {
        console.error("Public ID extraction failed.");
      }
    } catch (error) {
      console.error("Failed to delete from Cloudinary:", error);
    }
  }
};