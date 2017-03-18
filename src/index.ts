import * as path from 'path';

import databaseFactory from './classes/Database';
import fileDriverFactory from './classes/FileDriver';
import markdownExtractorFactory from './classes/MarkdownExtractor';
import articleFactory from './models/Article';

const cwd = path.resolve(__dirname, `../`);

const dbDriver = fileDriverFactory(markdownExtractorFactory, cwd);
const db = databaseFactory(dbDriver);
const article = articleFactory(db);

console.log(article.getAll());
