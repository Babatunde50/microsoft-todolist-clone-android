import db from "./db";

import { removeGroup } from './groups'

export const addNewList = (title: string, color: string) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO lists (title, color) VALUES (?,?)",
        [title, color],
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

export const fetchLists = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM lists",
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

export const ungroupList = async (groupId: number) => {
    await removeGroup(groupId);
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          "UPDATE lists SET groupId = ? WHERE groupId = ?",
          [null, groupId],
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
  
  export const addListToGroup = (listId: number, groupId: number) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          "UPDATE lists SET groupId = ? WHERE id = ?",
          [groupId, listId],
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
  
  export const removeListFromGroup = (listId: number) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          "UPDATE lists SET groupId = ? WHERE id = ?",
          [null, listId],
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
  