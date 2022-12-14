import { join } from 'path';

import matterReader from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { readdirAsync, readFileAsync } from './util';

export interface Job {
  role: string;
  company: string;
  startDate: string;
  endDate: string;
  contents: string;
}

export interface Resume {
  name: string;
  title: string;
  summary: string;
  jobs: Job[];
}

const resumesFolder = join(process.cwd(), 'content/resumes');

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

export const getResumeContent = async (slug: string): Promise<Resume> => {
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

export const getResumes = async (): Promise<string[]> => {
  return await readdirAsync(resumesFolder);
};
