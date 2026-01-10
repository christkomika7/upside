"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";

interface ImageWithSkeletonProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
  style?: React.CSSProperties;
  unoptimized?: boolean;
  loading?: "lazy" | "eager";
}

export default function ImageWithSkeleton({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  onLoad,
  onError,
  style,
  unoptimized = true,
  loading = "eager",
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
    if (onLoad) onLoad();
  };

  const handleImageError = () => {
    setIsLoading(false);
    if (onError) onError();
  };

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div
          className={clsx(
            "absolute inset-0 bg-neutral-200 animate-pulse rounded-inherit",
            className?.includes("rounded-") ? "" : "rounded-[32px]",
          )}
        />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={clsx(className, isLoading ? "opacity-0" : "opacity-100")}
        style={style}
        priority={priority}
        onLoad={handleImageLoad}
        onError={handleImageError}
        unoptimized={unoptimized}
        loading={loading}
      />
    </div>
  );
}
