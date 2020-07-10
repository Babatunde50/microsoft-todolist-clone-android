import * as SQLite from "expo-sqlite";
import { SQLResultSet } from "expo-sqlite";

const db = SQLite.openDatabase("tests.db");
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
          resolve(result);
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
      });
    });
  });
  return promise;
};

export const fetchGroups = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM groups", [], (_, result) => {
        resolve(result);
      });
    });
  });
  return promise;
};

export const removeGroup = (id: number) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM groups WHERE id = ?",
      [id],
      (_, result: SQLResultSet) => {
        resolve(result)
      }
      )
    })
  })
  return promise;
}

export const ungroupList = async (groupId: number) => {
  await removeGroup(groupId);
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE lists SET groupId = ? WHERE groupId = ?",
        [null, groupId],
        (_, result: SQLResultSet) => {
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

export const addListToGroup = (listId: number, groupId: number) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql(
        "UPDATE lists SET groupId = ? WHERE id = ?",
        [groupId, listId],
        (_, result: SQLResultSet) => {
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

export const removeListFromGroup = (listId: number) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx: SQLTransaction) => {
      tx.executeSql(
        "UPDATE lists SET groupId = ? WHERE id = ?",
        [null, listId],
        (_, result: SQLResultSet) => {
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