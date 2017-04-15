import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';

import IDatabase from '../interfaces/IDatabase';

import { IExtractor } from '../interfaces/IExtractor';

type fs = typeof fs;
type glob = typeof glob;
type path = typeof path;
type extractorFactory = (fileContent: string) => IExtractor;

export interface IDependencies {
  fs: fs;
  glob: glob;
  path: path;
}

export class FileDriver implements IDatabase {
  private fs: fs;
  private glob: glob;
  private path: path;
  private extractor: extractorFactory;
  private cwd: string;

  /**
   * FileDriver
   * @param fs
   * @param glob
   * @param path
   * @param extractor
   * @param cwd
   */
  constructor(
    { fs, glob, path }: IDependencies,
    extractor: extractorFactory,
    cwd: string,
  ) {
    this.fs = fs;
    this.glob = glob;
    this.path = path;
    this.extractor = extractor;
    this.cwd = cwd;
  }

  public getAll(table: string): Array<object> {
    const globPattern = path.resolve(this.cwd, `resources/${table}/*`);
    return this.glob.sync(globPattern)
      .map((file) => {
        const fileContent: string = this.readFile(file);
        return this.extractData(fileContent);
      });
  }

  public getById(id: string, table: string): object {
    const file = this.path.resolve(this.cwd, `resources/${table}/${id}`);
    const fileContent: string = this.readFile(file);

    return this.extractData(fileContent);
  }

  private readFile(file: string): string {
    return this.fs.readFileSync(file, `utf8`);
  }

  private extractData(fileContent: string): object {
    return this.extractor(fileContent).extractData();
  }
}

/**
 * fileDriverFactory
 * @param extractor
 * @param cwd
 */
export default function fileDriverFactory(
  extractor: extractorFactory,
  cwd: string,
) {
  return new FileDriver(
    { fs, glob, path },
    extractor,
    cwd,
  );
}
