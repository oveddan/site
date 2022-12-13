import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { join } from 'path';
import { readdir, readFile } from 'fs';
import { promisify } from 'util';
import matterReader from 'gray-matter';
import { Fragment } from 'react';
import { remark } from 'remark';
import html from 'remark-html';

const readdirAsync = promisify(readdir);
const readFileAsync = promisify(readFile);

interface Job {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  contents: string;
}

interface Resume {
  name: string;
  title: string;
  summary: string;
  jobs: Job[];
}

interface Props {
  resume: Resume;
}

interface Params extends ParsedUrlQuery {
  slug: string;
}

const resumesFolder = join(process.cwd(), 'content/resumes');

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const folders = await readdirAsync(resumesFolder);
  return {
    paths: folders.map((slug) => ({ params: { slug } })),
    fallback: false, // can also be true or 'blocking'
  };
};

async function parseJobs(slug: string): Promise<Job[]> {
  const jobsFolder = join(resumesFolder, slug, 'jobs');
  const jobsFiles = await readdirAsync(jobsFolder);

  const jobs = await Promise.all(
    jobsFiles.map(async (jobFileName) => {
      const jobFile = await readFileAsync(join(jobsFolder, jobFileName), 'utf8');

      const { data, matter, content } = matterReader(jobFile);

      const processedContent = (await remark().use(html).process(content)).toString();

      const job: Job = {
        company: data.company,
        contents: processedContent,
        endDate: data.endDate,
        startDate: data.startDate,
        role: data.role,
      };

      return job;
    })
  );

  return jobs;
}

const getResumeContent = async (slug: string): Promise<Resume> => {
  const indexFile = await readFileAsync(join(resumesFolder, slug, 'index.md'), 'utf8');

  const { data, content } = matterReader(indexFile);

  const jobs = await parseJobs(slug);

  const processedContent = (await remark().use(html).process(content)).toString();

  const result: Resume = {
    name: slug,
    summary: processedContent,
    title: data.title,
    jobs,
  };

  return result;
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
