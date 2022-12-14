import { readdir, readFile } from 'fs';
import { promisify } from 'util';

export const readdirAsync = promisify(readdir);
export const readFileAsync = promisify(readFile);
