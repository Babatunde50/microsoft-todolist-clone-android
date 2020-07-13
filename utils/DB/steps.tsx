import db from "./db";

export const addStep = (text: string, todoId: number) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO steps (text, todoId) VALUES (?)",
        [text, todoId],
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
