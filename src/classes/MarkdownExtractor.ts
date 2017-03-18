import * as yaml from 'js-yaml';

import IExtractor from '../interfaces/IExtractor';

export class MarkdownExtractor implements IExtractor {
  private yaml: any;
  private fileContent: string;
  private headerRegex: RegExp;

  /**
   * MarkdownExtractor
   * @param yaml
   * @param fileContent
   */
  constructor(yaml, fileContent: string) {
    this.yaml = yaml;
    this.fileContent = fileContent;
    this.headerRegex = /^---([\s\S]*?)---/i;
  }

  public extractData(): object {
    const headerData = this.extractHeader();
    const content = this.extractContent();

    return Object.assign(headerData, { content });
  }

  public extractHeader(): object {
    const header: string = this.fileContent.match(this.headerRegex)[1].trim();

    return this.yaml.safeLoad(header);
  }

  public extractContent(): string {
    return this.fileContent.replace(this.headerRegex, ``).trim();
  }
}

/**
 * markdownExtractorFactory
 * @param fileContent
 */
export default function markdownExtractorFactory(fileContent: string): MarkdownExtractor {
  return new MarkdownExtractor(yaml, fileContent);
}
