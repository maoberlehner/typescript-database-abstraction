import IDatabase from '../interfaces/IDatabase';
import IModel from '../interfaces/IModel';

export class Article implements IModel {
  public table: string = `articles`;
  private db: IDatabase;

  constructor(db: IDatabase) {
    this.db = db;
  }

  public getAll() {
    return this.db.getAll(this.table);
  }

  public getById(id: any) {
    return this.db.getById(id, this.table);
  }
}

export default function articleFactory(db: IDatabase): Article {
  return new Article(db);
}
