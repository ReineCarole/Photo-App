"use server";

import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";

export async function setAsFavoriteAction(publicId: string) {
  try {
    const result = await cloudinary.v2.api.resource(publicId);
    const existingTags = result.tags || [];

    const shouldAddTag = !existingTags.includes("favorite");

    if (shouldAddTag) {
      await cloudinary.v2.uploader.add_tag("favorite", [publicId]);
    } else {
      await cloudinary.v2.uploader.remove_tag("favorite", [publicId]);
    }

    revalidatePath("/gallery");
  } catch (error) {
    console.error("Error in setAsFavoriteAction:", error);
    throw new Error("Failed to toggle favorite status");
  }
}
