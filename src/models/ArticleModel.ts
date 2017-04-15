import { IContent } from '../interfaces/IContent';
import { IDatabase } from '../interfaces/IDatabase';
import { IModel } from '../interfaces/IModel';

export interface IArticle extends IContent {
  description?: string;
}

export class ArticleModel implements IModel {
  public table = `articles`;
  private db: IDatabase;

  constructor(db: IDatabase) {
    this.db = db;
  }

  public getAll(): IArticle[] {
    return this.db.getAll(this.table);
  }

  public getById(id: string|number): IArticle {
    return this.db.getById(id, this.table);
  }
}

export default function articleFactory(db: IDatabase) {
  return new ArticleModel(db);
}
