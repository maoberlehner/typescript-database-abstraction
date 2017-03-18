import IDatabase from '../interfaces/IDatabase';

export class Database implements IDatabase {
  private driver: IDatabase;

  /**
   * Database
   * @param driver
   */
  constructor(driver: IDatabase) {
    this.driver = driver;
  }

  public getAll(table: string) {
    return this.driver.getAll(table);
  }

  public getById(id: any, table: string) {
    return this.driver.getById(id, table);
  }
}

/**
 * databaseFactory
 * @param driver
 */
export default function databaseFactory(driver: IDatabase) {
  return new Database(driver);
}
