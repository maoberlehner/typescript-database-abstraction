import { IContent } from '../interfaces/IContent';

export interface IExtractor {
  extractData: () => IContent;
}
