import sharp from "sharp";

export interface ImageProcessingOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: "jpeg" | "png" | "webp";
}

export const processImage = async (
  buffer: Buffer,
  options: ImageProcessingOptions = {},
): Promise<Buffer> => {
  const { width = 512, height = 512, quality = 60, format = "jpeg" } = options;

  try {
    let sharpInstance = sharp(buffer).resize(width, height, {
      fit: "inside",
      withoutEnlargement: true,
    });

    if (format === "jpeg") {
      sharpInstance = sharpInstance.jpeg({ quality });
    } else if (format === "png") {
      sharpInstance = sharpInstance.png({ quality });
    } else if (format === "webp") {
      sharpInstance = sharpInstance.webp({ quality });
    }

    return await sharpInstance.toBuffer();
  } catch (error) {
    console.error("Image processing error:", error);
    throw new Error("Failed to process image");
  }
};

export const validateImageBuffer = async (buffer: Buffer): Promise<boolean> => {
  try {
    const metadata = await sharp(buffer).metadata();
    return !!metadata.format;
  } catch {
    return false;
  }
};
