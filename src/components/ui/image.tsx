import { useMemo } from "react";
import { getPublicUrl } from "@/api/file.api";
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  path?: string;
  bucket?: string;
  fallbackSrc?: string;
}

const Image = ({
  path,
  bucket = "question-bank",
  fallbackSrc,
  src,
  loading = "lazy",
  decoding = "async",
  ...props
}: ImageProps) => {
  const supabaseSrc = useMemo(
    () => (path ? getPublicUrl(path, bucket) : undefined),
    [path, bucket]
  );

  const resolvedSrc = src ?? supabaseSrc ?? fallbackSrc;

  return (
    <img
      src={resolvedSrc}
      loading={loading}
      decoding={decoding}
      onError={(e) => {
        if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
          e.currentTarget.src = fallbackSrc;
        }
      }}
      {...props}
    />
  );
};

export default Image;
