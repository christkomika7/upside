import Image from "next/image";
import React from "react";

type ImageCardProps = {
  image: string;
};

export default function ImageCard({ image }: ImageCardProps) {
  return (
    <div className="rounded-[32px] w-full h-full overflow-hidden">
      <Image
        src={image}
        alt="Image"
        width={400}
        height={400}
        className="w-full h-full object-center object-cover"
      />
    </div>
  );
}
