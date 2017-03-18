import IDatabase from './IDatabase';

interface IModel extends IDatabase {
  table: string;
}

export default IModel;
