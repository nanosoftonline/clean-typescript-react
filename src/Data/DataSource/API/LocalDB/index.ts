
function db<T>(table: string) {
  if (window) {
    const setTable = (value: any) => window.localStorage.setItem(table, value);
    const getTable = () => window.localStorage.getItem(table)

    if (!getTable()) {
      setTable(JSON.stringify([]))
    }

    const allLocal = () => JSON.parse(getTable()!);

    return {
      // db('todos').getAll()
      getAll() {
        return allLocal() as T[];
      },

      // db('todos').create({aoskdoqwkd})
      create<T>(params: T) {
        console.log('alllocal', allLocal)
        const stringified = JSON.stringify([...allLocal(), params]);
        setTable(stringified);
      },
    };
  }

  return {
    getAll() {
      return [] as T[]
    },
    create<T>(params: T) {
    },
  }
}

export default db
