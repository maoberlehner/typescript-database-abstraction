import * as fs from 'fs';
import * as glob from 'glob';
import * as path from 'path';

import IDatabase from '../interfaces/IDatabase';
import IExtractor from '../interfaces/IExtractor';

export class FileDriver implements IDatabase {
  private glob: any;
  private path: any;
  private fs: any;
  private extractor: (fileContent: string) => IExtractor;
  private cwd: string;

  /**
   * FileDriver
   * @param glob
   * @param path
   * @param fs
   * @param extractor
   * @param cwd
   */
  constructor(
    glob,
    path,
    fs,
    extractor,
    cwd: string,
  ) {
    this.glob = glob;
    this.path = path;
    this.fs = fs;
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
  extractor,
  cwd: string,
): FileDriver {
  return new FileDriver(
    glob,
    path,
    fs,
    extractor,
    cwd,
  );
}
