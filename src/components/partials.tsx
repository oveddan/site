import Image from 'next/image';

export const Vimeo = ({ videoId }: { videoId: string }) => (
  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
    <iframe
      src={`https://player.vimeo.com/video/${videoId}`}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
      title="vimeo video"
      allowFullScreen
    ></iframe>
  </div>
);

export const ResizedImageWithCaption = ({
  src,
  caption,
  captionLink,
}: {
  src: string;
  caption?: string;
  captionLink?: string;
}) => (
  <figure>
    {/* <a href='{{ $original.RelPermalink }}' data-modal>
      <img src="{{ $image.RelPermalink }}" style={{ width: "100%" }} />
    </a> */}
    <Image
      className="w-full rounded-lg"
      src={src}
      alt={caption || ''}
      // width={500} automatically provided
      // height={500} automatically provided
      // blurDataURL="data:..." automatically provided
      // placeholder="blur" // Optional blur-up while loading
    />
    {caption && (
      <figcaption>
        {captionLink && <a href={captionLink}>{caption}</a>}
        {!captionLink && caption}
      </figcaption>
    )}
  </figure>
);
