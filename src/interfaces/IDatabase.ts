interface IDatabase {
  getAll: (table: string) => Array<object>;
  getById: (id: any, table: string) => object;
}

export default IDatabase;
