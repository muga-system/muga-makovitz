"use client";

import Image, { type ImageProps } from "next/image";
import { useMemo, useState } from "react";

type ImageWithSkeletonProps = ImageProps & {
  wrapperClassName?: string;
};

export default function ImageWithSkeleton({
  wrapperClassName,
  className,
  onLoad,
  alt,
  src,
  ...props
}: ImageWithSkeletonProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  const srcKey = useMemo(() => {
    if (typeof src === "string") {
      return src;
    }

    if ("src" in src && typeof src.src === "string") {
      return src.src;
    }

    if ("default" in src && src.default && typeof src.default.src === "string") {
      return src.default.src;
    }

    return "";
  }, [src]);

  const isLoaded = loadedSrc === srcKey;

  const wrapperClasses = `image-shell ${isLoaded ? "is-loaded" : ""}${wrapperClassName ? ` ${wrapperClassName}` : ""}`;
  const imageClasses = `image-fade${className ? ` ${className}` : ""}`;

  return (
    <div className={wrapperClasses}>
      <span className="image-skeleton" aria-hidden="true" />
      <Image
        {...props}
        src={src}
        alt={alt}
        className={imageClasses}
        onLoad={(event) => {
          setLoadedSrc(srcKey);
          onLoad?.(event);
        }}
      />
    </div>
  );
}
