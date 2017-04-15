import * as yaml from 'js-yaml';

import { IExtractor } from '../interfaces/IExtractor';

type yaml = typeof yaml;

export interface IDependencies {
  yaml: yaml;
}

export class MarkdownExtractor implements IExtractor {
  private yaml: yaml;
  private fileContent: string;
  private headerRegex: RegExp;

  /**
   * MarkdownExtractor
   * @param yaml
   * @param fileContent
   */
  constructor({ yaml }: IDependencies, fileContent: string) {
    this.yaml = yaml;
    this.fileContent = fileContent;
    this.headerRegex = /^---([\s\S]*?)---/i;
  }

  public extractData(): object {
    const headerData = this.extractHeader();
    const content = this.extractContent();

    return Object.assign(headerData, { content });
  }

  public extractHeader() {
    const header = this.matchHeader()[1].trim();

    return this.yaml.safeLoad(header);
  }

  public extractContent() {
    return this.fileContent.replace(this.headerRegex, ``).trim();
  }

  private matchHeader() {
    return this.fileContent.match(this.headerRegex) || [``];
  }
}

/**
 * markdownExtractorFactory
 * @param fileContent
 */
export default function markdownExtractorFactory(fileContent: string) {
  return new MarkdownExtractor({ yaml }, fileContent);
}
