import cloudinary from "cloudinary";
import { CloudinaryImage } from "./cloudinary-image";
import UploadButton from "./upload-button";

type SearchResult = {
  public_id: string;
  tags: string[];
};

export default async function GalleryPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image")
    .with_field("tags")
    .sort_by("created_at", "desc")
    .max_results(15)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">GALLERY</h1>
          <UploadButton />
        </div>
        <div className="grid grid-cols-4 gap-4">
          {results.resources.map((result) => (
            <CloudinaryImage
              key={result.public_id}
              publicId={result.public_id}
              isFavorited={result.tags.includes("favorite")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
