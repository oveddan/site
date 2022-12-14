import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { Fragment } from 'react';
import { Resume, getResumeContent, getResumes } from '@/api/resume';

interface Props {
  resume: Resume;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const resumes = await getResumes();
  return {
    paths: resumes.map((slug) => ({ params: { slug } })),
    fallback: false, // can also be true or 'blocking'
  };
};
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  const { slug } = context.params!;
  // const res = await fetch(`https://swapi.dev/api/people/${slug}`);
  const resume = await getResumeContent(slug);
  return {
    props: {
      resume: resume,
    },
  };
};

const Resume: NextPage<Props> = ({ resume }) => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">{resume.name}</h1>
      <div dangerouslySetInnerHTML={{ __html: resume.summary }} />
      <ul>
        {resume.jobs.map((job) => (
          <Fragment key={job.company}>
            <li>
              <b>{job.company}</b>
              <b>{job.startDate}</b>
              <b>{job.endDate}</b>

              <br />
              <div dangerouslySetInnerHTML={{ __html: job.contents }} />
            </li>
          </Fragment>
        ))}
      </ul>
    </>
  );
};

export default Resume;
