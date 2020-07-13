import {repeatOptions } from "../../utils/notification";
import db from './db';

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

  export const fetchTodos = () => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql("SELECT * FROM myTodos", [], (_, result) => {
          resolve(result);
        },
        (tx: any, err: SQLError) : boolean => {
            reject(err);
            return true
          }
        );
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
          },
          (tx: any, err: SQLError) : boolean => {
              reject(err)
              return true
          }
        );
      });
    });
    return promise;
  };
  
  export const editTodoTitle = (id: number, title: string) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          "UPDATE myTodos SET title = ? WHERE id = ?",
          [title, id],
          (_, result: SQLResultSet) => {
            console.log(result, "EDIT TODO TITLE")
            resolve(result);
          },
          (_, err: SQLError) => {
            reject(err);
            return true
          }
        );
      });
    });
    return promise;
  };

  export const editTodoRepeat = (id: number, repeat: repeatOptions) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          "UPDATE myTodos SET repeat = ? WHERE id = ?",
          [repeat, id],
          (_, result: SQLResultSet) => {
            resolve(result);
          },
          (_, err: SQLError) => {
            reject(err);
            return true
          }
        );
      });
    });
    return promise;
  };

  export const editTodoReminder = (id: number, reminder: string, reminderDateId: number) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          "UPDATE myTodos SET reminder = ? reminderDateId = ? WHERE id = ?",
          [reminder, reminderDateId, id ],
          (_, result: SQLResultSet) => {
            resolve(result);
          }
        );
      });
    });
    return promise;
  };
  
  export const editTodoDueDate = (id: number, dueDate: string, dueDateId: number) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          "UPDATE myTodos SET dueDate = ? dueDateId = ? WHERE id = ?",
          [dueDate, dueDateId, id ],
          (_, result: SQLResultSet) => {
            resolve(result);
          },
          (_, err: SQLError) => {
            reject(err);
            return true
          }
        );
      });
    });
    return promise;
  };
  
  
  
  export const toggleTodoToMyDay = (id: number, screen: string) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          "UPDATE myTodos SET screen = ? WHERE id = ?",
          [screen, id],
          (_, result: SQLResultSet) => {
            console.log(result, "ADDTOMYDAYTODO")
            resolve(result)
          },
          (_, err: SQLError) => {
            reject(err);
            return true
          }
        )
      })
    })
    return promise;
  }

  export const addRemoveNote = (id: number, note: string) => {
    const promise = new Promise((resolve, reject) => {
      db.transaction((tx: SQLTransaction) => {
        tx.executeSql(
          "UPDATE myTodos SET note = ? WHERE id = ?",
          [note, id],
          (_, result: SQLResultSet) => {
            resolve(result);
          },
          (_, err: SQLError) => {
            reject(err);
            return true
          }
        );
      });
    });
    return promise;
  }
  