import Image from 'next/image';
import { CSSProperties } from 'react';
import { InstagramEmbed, TwitterEmbed } from 'react-social-media-embed';

const videoWrapperStyles: CSSProperties = {
  position: 'relative',
  paddingBottom: '56.25%',
  height: 0,
  overflow: 'hidden',
};
const videoStyles: CSSProperties = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 };

export const Vimeo = ({ videoId }: { videoId: string }) => (
  <div style={videoWrapperStyles}>
    <iframe
      src={`https://player.vimeo.com/video/${videoId}`}
      style={videoStyles}
      title="vimeo video"
      allowFullScreen
    ></iframe>
  </div>
);

export const YouTube = ({ videoId }: { videoId: string }) => (
  <div style={videoWrapperStyles}>
    <iframe
      src={`https://www.youtube.com/embed/${videoId}`}
      style={videoStyles}
      allowFullScreen
      title="YouTube Video"
    ></iframe>
  </div>
);

export const Instagram = ({ postId }: { postId: string }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }} className="my-8">
    <InstagramEmbed url={`https://www.instagram.com/p/${postId}/`} width={700} captioned />
  </div>
);

export const Twitter = ({ userId, tweetId }: { userId: string; tweetId: string }) => (
  <div style={{ display: 'flex', justifyContent: 'center' }} className="my-8">
    <TwitterEmbed url={`https://twitter.com/${userId}/status/${tweetId}`} width={700} />
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
