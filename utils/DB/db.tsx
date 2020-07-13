import * as SQLite from "expo-sqlite";
import { SQLResultSet } from "expo-sqlite";

const db = SQLite.openDatabase("tests.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS myTodos (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, screen TEXT NOT NULL, important INT NOT NULL, listType TEXT NOT NULL, createdAt TEXT NOT NULL, dueDateId TEXT, reminderDateId TEXT, reminder DATE, dueDate DATE, repeat INT, note TEXT )",
        [],
        () => {
          resolve();
        },
        (tx: any, err: SQLStatementErrorCallback) => {
          reject(err);
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS steps (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, todoId INTEGER NOT NULL, FOREIGN KEY (todoId) REFERENCES todos (id) )'
      )
    })
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, color TEXT NOT NULL, groupId INTEGER, FOREIGN KEY (groupId) REFERENCES groups (id) )",
        [],
        () => {
          resolve();
        }
      );
    });
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL) ",
        [],
        () => {
          resolve();
        }
      );
    });
  });
  return promise;
};

export default db;

