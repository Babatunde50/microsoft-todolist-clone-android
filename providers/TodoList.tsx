import React, { useState, createContext, useEffect } from 'react';

import { addNewList, addNewTodo, fetchTodos, fetchLists, toggleFavouriteTodo } from '../utils/db';
import { createEventDueDate } from '../utils/calendars';
import { createNewReminder, repeatOptions } from '../utils/notification';

export interface todo {
	id: number;
	title: string;
	screen: string;
	important: number;
	listType: string;
	reminder?: string;
	dueDate?: string;
	repeat?: number;
	note?: string;
	steps?: string | null;
	createdAt?: string
}

export interface list {
	title: string;
	color: string;
	id: number;
}

export type todoContext = {
	todos: todo[];
	lists: list[];
	addTodo: (
		title: string,
		screen: string,
		important: number,
		listType: string,
		reminder?: string,
		dueDate?: string,
		repeat?: repeatOptions
	) => void;
	addList: (title: string, color: string) => void;
	toggleImportant: (id: number, imp: number) => void;
	// deleteTodo: (id: number) => void;
	// deleteList: (id: number) => void;
};

export const TodoListContext = createContext<todoContext | null>(null);

const TodoListProvider: React.FC = ({ children }) => {
	const [todos, setTodos] = useState<todo[]>([]);
	const [lists, setLists] = useState<list[]>([]);

	const addTodo = async (
		title: string,
		screen: string,
		important: number,
		listType: string,
		reminder?: string,
		dueDate?: string,
		repeat?: repeatOptions
	) => {
		try {
			let dueDateId;
			let reminderDateId;
			if (dueDate) {
				dueDateId = await createEventDueDate(dueDate, title);
			}
			if (reminder) {
				reminderDateId = (await createNewReminder(title, reminder, repeat)) as number;
			}
			const newTodo: SQLResultSet = (await addNewTodo(
				title,
				screen,
				important,
				listType,
				reminder,
				dueDate,
				dueDateId,
				reminderDateId,
				repeat
			)) as SQLResultSet;
			const insertedTodo = {
				id: newTodo.insertId,
				title,
				important,
				listType,
				reminder,
				dueDate,
				repeat,
				screen,
			};
			setTodos((todos: any) => [insertedTodo, ...todos]);
		} catch (err) {
			console.log(err.message);
		}
	};

	const addList = async (title: string, color: string) => {
		const newList: any = await addNewList(title, color);
		setLists((lists) => [{ id: newList.insertId, title: title, color: color }, ...lists]);
	};

	const toggleImportant = async (id: number, imp: number) => {
		const toggled: any = await toggleFavouriteTodo(imp, id);
		const index = todos.findIndex((todo) => todo.id === id);
		const copiedTodos = [...todos];
		copiedTodos[index] = { ...todos[index], important: imp };
		setTodos(copiedTodos);
	};

	useEffect(() => {
		(async () => {
			const todos: any = await fetchTodos();
			const lists: any = await fetchLists();
			setTodos(todos.rows._array);
			setLists(lists.rows._array);
		})();
	}, []);

	return (
		<TodoListContext.Provider value={{ todos, lists, addTodo, addList, toggleImportant }}>
			{children}
		</TodoListContext.Provider>
	);
};

export default TodoListProvider;
