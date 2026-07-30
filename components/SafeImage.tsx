"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { PLACEHOLDER_IMAGE, safeImage } from "@/lib/utils";

type SafeImageProps = Omit<ImageProps, "src" | "onError"> & {
  src: string | undefined | null;
};

export function SafeImage({ src, alt, ...rest }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(() => safeImage(src));

  return (
    <Image
      {...rest}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(PLACEHOLDER_IMAGE)}
    />
  );
}
