
import { GoogleGenAI, Modality } from "@google/genai";
import { AspectRatio } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateImage = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: `4K, high resolution, photorealistic, cinematic lighting: ${prompt}`,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    }
    throw new Error('Image generation failed: No images were returned.');
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image. Please check the console for details.');
  }
};

export const editImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType } },
          { text: prompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    throw new Error('Image editing failed: No image was returned in the response.');
  } catch (error) {
    console.error('Error editing image:', error);
    throw new Error('Failed to edit image. Please check the console for details.');
  }
};

export const upscaleImage = async (base64Image: string, mimeType: string): Promise<string> => {
  const upscalePrompt = `Upscale this image to 4K resolution. Enhance details, sharpness, and texture. Remove any compression artifacts, noise, or blurriness. Make the final image look like a professional high-resolution photograph. Do not change the content or composition of the image, only improve its quality.`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType } },
          { text: upscalePrompt },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
    throw new Error('Image upscaling failed: No image was returned in the response.');
  } catch (error) {
    console.error('Error upscaling image:', error);
    throw new Error('Failed to upscale image. Please check the console for details.');
  }
};
