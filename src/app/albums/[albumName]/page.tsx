import cloudinary from "cloudinary";
import { SearchResult } from "@/app/gallery/page";
import { ImageGrid } from "@/components/image-grid";

export default async function GalleryPage({
  params: { albumName },
}: {
  params: {
    albumName: string;
  };
}) {
  const results = (await cloudinary.v2.search
    .expression(`resource_type:image AND folder=${albumName}`)
    .with_field("tags")
    .sort_by("created_at", "desc")
    .max_results(15)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">Album {albumName}</h1>
        </div>
        <ImageGrid images={results.resources} />
      </div>
    </section>
  );
}
