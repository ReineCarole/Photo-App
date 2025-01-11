"use client";

import { CldImage } from "next-cloudinary";
import { CldUploadButton } from "next-cloudinary";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <CldUploadButton
          onUpload={(result: any) => {
            console.log(result);
          }}
          uploadPreset="giomsr4s"
        />

        <CldImage
          width="960"
          height="600"
          src="samples/animals/kitten-playing"
          sizes="100vw"
          alt="Description of my image"
        />
      </main>
    </div>
  );
}
