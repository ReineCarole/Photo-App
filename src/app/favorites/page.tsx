import cloudinary from "cloudinary";
import { CloudinaryImage } from "../gallery/cloudinary-image";
import { SearchResult } from "../gallery/page";

export default async function FavoritesPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image AND tags=favorite")
    .with_field("tags")
    .sort_by("created_at", "desc")
    .max_results(15)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">FAVORITES</h1>
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
