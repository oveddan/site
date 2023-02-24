import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import clsx from 'clsx';

import { Container } from '@/components/Container';
import { TwitterIcon, InstagramIcon, GitHubIcon, LinkedInIcon } from '@/components/shared/SocialIcons';
import portraitImage from '@/images/portrait.jpg';
import Layout from '@/components/Layout';

function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string;
  href: string;
  children: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  );
}

function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  );
}

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About - Dan Oved</title>
        <meta name="description" content="I’m Dan Oved. Polyglot Pioneer at the Intersection of Art and Technology." />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m Dan Oved, Polyglot Pioneer at the Intersection of Art and Technology.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                {`As a polyglot and full-stack engineer with an entrepreneurial spirit, I have always been drawn to the
                challenge of building products from the ground up. I am deeply committed to understanding the needs and
                wants of users and strive to create something that meets their needs in a creative and innovative way. I
                see myself working at the intersection of art and technology, where I can bring my unique perspective
                and ideas to the table. I am always inventing and striving to create things that haven't been done
                before, pushing the boundaries of what is possible. As a founder, I have learned to be resourceful and
                adaptable, with a strong ability to bring together a diverse range of skills and expertise to create
                something unique and delightful.`}
              </p>
              <p>
                {`My main frameworks/languages of choice include Typescript, React, Solidity, Three.js, TouchDesigner,
                Python, Tensorflow, and Tensorflow.js. My areas of interest are web3/the blockchain, the metaverse, and
                machine learning.`}
              </p>
              <p>
                {`I am a graduate of the graduate program at the Interactive Telecommunication Program (ITP) at NYU's
                Tisch School of the Arts. After graduation, I continued on as a research resident and adjunct faculty at
                ITP. I have also worked as a computer vision engineer with the Google Creative Lab and New York Times'
                R&D, and was CTO and Co-Founder of Arium, a browser-based collaborative virtual world builder and events
                platform for NFT artists and curators. I have participated in several Ethereum-based hackathons, leading
                teams and prototyping ideas. I have placed first in some of these hackathons and been selected as a
                finalist in others.`}
              </p>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink href="https://twitter.com/oveddan" icon={TwitterIcon}>
                Follow on Twitter
              </SocialLink>
              <SocialLink href="https://www.instagram.com/dan_oved/" icon={InstagramIcon} className="mt-4">
                Follow on Instagram
              </SocialLink>
              <SocialLink href="https://github.com/oveddan" icon={GitHubIcon} className="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink href="https://www.linkedin.com/in/danoved/" icon={LinkedInIcon} className="mt-4">
                Follow on LinkedIn
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </Layout>
  );
}
