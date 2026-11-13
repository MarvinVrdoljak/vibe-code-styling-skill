import NextImage, {type ImageProps} from 'next/image'

// Thin wrapper around next/image so image handling stays consistent app-wide.
// `alt` is already required by ImageProps — pass an empty string only for
// purely decorative images.
export type CommonImageProps = ImageProps

export function CommonImage(props: CommonImageProps) {
  return <NextImage {...props} />
}
