import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('todoList.db');

export const init = () => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, type TEXT NOT NULL, dueDate TEXT, reminder TEXT, category TEXT NOT NULL, favourite INT NOT NULL  )',
				[],
				() => {
					resolve();
				}
			);
		});
		db.transaction((tx) => {
			tx.executeSql(
				'CREATE TABLE IF NOT EXISTS lists (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, color TEXT NOT NULL)',
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
	type: string,
	category: string,
	favourite: boolean,
	dueDate?: string,
	reminder?: string,
) => {
	const promise = new Promise((resolve, reject) => {
		db.transaction((tx) => {
			tx.executeSql(
				'INSERT INTO todos (title, type, dueDate, reminder, category, favourite) VALUES (?,?,?,?,?,?)',
				[title, type, dueDate, reminder, category, +favourite],
				(_, result) => {
					resolve(result);
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
				'INSERT INTO lists (title, color) VALUES (?,?)',
				[title, color],
				(_, result) => {
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
			tx.executeSql(
				'SELECT * FROM todos',
				[],
				(_, result) => {
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
			tx.executeSql(
				'SELECT * FROM lists',
				[],
				(_, result) => {
					resolve(result);
				}
			);
		});
	});
	return promise;
};