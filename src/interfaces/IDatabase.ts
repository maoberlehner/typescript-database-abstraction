interface IDatabase {
  getAll: (table: string) => Array<object>;
  getById: (id: string|number, table: string) => object;
}

export default IDatabase;
