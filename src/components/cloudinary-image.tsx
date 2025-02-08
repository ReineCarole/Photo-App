"use client";
import { Heart } from "lucide-react";
import { CldImage } from "next-cloudinary";
import { useTransition } from "react";
import { setAsFavoriteAction } from "../app/gallery/actions";
import { ImageMenu } from "./image-menu";

type CloudinaryImageProps = {
  publicId: string;
  width?: number;
  height?: number;
  alt?: string;
  isFavorited?: boolean;
};

export function CloudinaryImage({
  publicId,
  width = 400,
  height = 300,
  alt = "an image",
  isFavorited = false,
}: CloudinaryImageProps) {
  const [transition, startTransition] = useTransition();

  return (
    <div className="relative">
      <CldImage src={publicId} width={width} height={height} alt={alt} />
      <Heart
        onClick={() => {
          startTransition(() => {
            setAsFavoriteAction(publicId);
          });
        }}
        className={`absolute top-2 left-2 hover:text-red-500 cursor-pointer ${
          isFavorited ? "fill-red-500 text-red-500" : "fill-none"
        }`}
      />
      <ImageMenu />
    </div>
  );
}
