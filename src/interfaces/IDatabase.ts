import { IContent } from './IContent';

interface IDatabase {
  getAll: (table: string) => IContent[];
  getById: (id: string|number, table: string) => IContent;
}

export default IDatabase;
