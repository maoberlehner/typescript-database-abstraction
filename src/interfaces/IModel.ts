import { IDatabase } from './IDatabase';

export interface IModel extends IDatabase {
  table: string;
}
