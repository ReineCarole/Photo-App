import cloudinary from "cloudinary";
import { SearchResult } from "../gallery/page";
import { ForceRefresh } from "@/components/force-refresh";
import { ImageGrid } from "@/components/image-grid";

export default async function FavoritesPage() {
  const results = (await cloudinary.v2.search
    .expression("resource_type:image AND tags=favorite")
    .with_field("tags")
    .sort_by("created_at", "desc")
    .max_results(15)
    .execute()) as { resources: SearchResult[] };

  return (
    <section>
      <ForceRefresh />
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold">FAVORITES</h1>
        </div>
        <ImageGrid images={results.resources} />
      </div>
    </section>
  );
}
