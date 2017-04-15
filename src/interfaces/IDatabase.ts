import { IContent } from './IContent';

export interface IDatabase {
  getAll: (table: string) => IContent[];
  getById: (id: string|number, table: string) => IContent;
}
