function db<T>(table: string) {
  if (window) {
    const setTable = (value: any) => window.localStorage.setItem(table, value);
    const getTable = () => window.localStorage.getItem(table);

    if (!getTable()) {
      setTable(JSON.stringify([]));
    }

    const allLocal = () => JSON.parse(getTable()!);

    return {
      // db('todos').getAll()
      getAll() {
        return allLocal() as T[];
      },

      getById(columnId: string) {
        const item = (this.getAll() as any[]).find(
          (i: { id: string }) => i.id === columnId
        )!;
        return item as T;
      },

      removeById(columnId: string) {
        const idx = (this.getAll() as any[]).findIndex(
          (i: { id: string }) => i.id === columnId
        )!;

        if (idx > -1) {
          setTable(
            JSON.stringify([
              ...(allLocal() as any[]).filter((i) => i.id !== columnId),
            ])
          );
          return true;
        }
        return false;
      },

      // db('todos').create({aoskdoqwkd})
      create<T>(params: T) {
        const stringified = JSON.stringify([...allLocal(), params]);
        setTable(stringified);
      },

      updateByField(columnId: string, field: any, newValue: any) {
        const item = (this.getAll() as any[]).find(
          (i: { id: string }) => i.id === columnId
        ) as T;
        let newItem = { ...item, [field]: newValue } as T;

        if (newValue === "toggle") {
          newItem = { ...item, [field]: !item[field as keyof T] };
        }

        const stringified = JSON.stringify([
          ...(allLocal() as { id: string }[]).map((i) => {
            const isChanged = i.id === columnId;
            return {
              ...i,
              ...(isChanged ? newItem : {}),
            };
          }),
        ]);
        setTable(stringified);
        return newItem;
      },
    };
  }

  return {
    getAll() {
      return [] as T[];
    },
    getById(columnId: string) {
      return {} as T;
    },
    removeById(columnId: string) {
      return false;
    },
    create<T>(params: T) {},
    // update(id: string, newModel: Todo): Promise<Todo>
    updateByField(columnId: string, field: any, newValue: any) {
      return {} as T;
    },
  };
}

export default db;
