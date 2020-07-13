import db from "./db";

export const addNewGroup = (title: string) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO groups (title) VALUES (?)",
        [title],
        (_, result) => {
          resolve(result);
        },
        (_, err: SQLError) => {
          reject(err);
          return true;
        }
      );
    });
  });
  return promise;
};

export const editGroupTitle = (title: string, id: number) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql(
        "UPDATE groups SET title = ? WHERE id = ?",
        [title, id],
        (_, result: SQLResultSet) => {
          resolve(result);
        },
        (_, err: SQLError) => {
          reject(err);
          return true;
        }
      );
    });
  });
  return promise;
};

export const fetchGroups = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM groups",
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err: SQLError) => {
          reject(err);
          return true;
        }
      );
    });
  });
  return promise;
};

export const removeGroup = (id: number) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM groups WHERE id = ?",
        [id],
        (_, result: SQLResultSet) => {
          resolve(result);
        },
        (_, err: SQLError) => {
          reject(err);
          return true;
        }
      );
    });
  });
  return promise;
};