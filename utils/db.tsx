import * as SQLite from "expo-sqlite";
import { SQLResultSet } from "expo-sqlite";

const db = SQLite.openDatabase("test.db");
import { repeatOptions } from "../utils/notification";

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS myTodos (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, screen TEXT NOT NULL, important INT NOT NULL, listType TEXT NOT NULL, createdAt TEXT NOT NULL, dueDateId TEXT, reminderDateId TEXT, steps TEXT, reminder DATE, dueDate DATE, repeat INT, note TEXT )",
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

export const addNewTodo = (
  title: string,
  screen: string,
  important: number,
  listType: string,
  reminder?: string,
  dueDate?: string,
  dueDateId?: string,
  reminderDateId?: number,
  repeat?: repeatOptions
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: any) => {
      tx.executeSql(
        "INSERT INTO myTodos (title, screen, important, listType, reminder, dueDate, repeat, createdAt, dueDateId, reminderDateId) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [
          title,
          screen,
          important,
          listType,
          reminder,
          dueDate,
          repeat,
          new Date().toString(),
          dueDateId,
          reminderDateId,
        ],
        (_: SQLTransaction, result: SQLResultSet) => {
          resolve(result);
        },
        (tx: any, err: SQLStatementErrorCallback) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const addNewList = (title: string, color: string) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO lists (title, color) VALUES (?,?)",
        [title, color],
        (_, result) => {
          resolve(result);
        }
      );
    });
  });
  return promise;
};

export const addNewGroup = (title: string) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				"INSERT INTO groups (title) VALUES (?)",
				[title],
				(_, result) => {
					resolve(result)
				}
			)
		})
	})
	return promise;
}

export const fetchTodos = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM myTodos", [], (_, result) => {
        resolve(result);
      });
    });
  });
  return promise;
};

export const toggleFavouriteTodo = (important: number, id: number) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql(
        "UPDATE myTodos SET important = ? WHERE id = ?",
        [important, id],
        (_, result: SQLResultSet) => {
          resolve(result);
        }
      );
    });
  });
  return promise;
};

export const fetchLists = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM lists", [], (_, result) => {
        resolve(result);
      });
    });
  });
  return promise;
};
