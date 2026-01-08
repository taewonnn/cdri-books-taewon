type ImgProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export default function Img({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  ...rest
}: ImgProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={loading}
      decoding={decoding}
      {...rest}
    />
  );
}
