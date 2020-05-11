import React, { useState, createContext, useEffect } from 'react';
import { addNewList, addNewTodo, fetchTodos, fetchLists } from '../utils/db';

export interface todo {
	id: number;
	title: string;
	screen: string;
	important: number;
	listType: string;
	reminder: string;
	dueDate?: string;
	repeat?: number;
	note?: string;
}

export interface list {
	title: string;
	color: string;
	id: number
}

export type todoContext = {
	todos: todo[]; 
	lists: list[];
	addTodo: (title: string, screen: string, important: number, listType: string, reminder: string, dueDate?: string, repeat?: number) => void;
	addList: (title: string, color: string) => void;
	// deleteTodo: (id: number) => void; 
	// deleteList: (id: number) => void;
}

export const TodoListContext = createContext<todoContext | null>(null);

const TodoListProvider: React.FC = ({ children }) => {
	const [todos, setTodos] = useState<todo[]>([]);
	const [lists, setLists] = useState<list[]>([]);

	const addTodo = async (title: string, screen: string, important: number, listType: string, reminder: string, dueDate?: string, repeat?: number) => {
			const newTodo: SQLResultSet = await addNewTodo(title, screen, important, listType, reminder, dueDate, repeat) as SQLResultSet;
			const insertedTodo = {
				id: newTodo.insertId,
				title,
				important,
				listType,
				reminder,
				dueDate,
				repeat, 
			}
			setTodos((todos: any) => ( [insertedTodo, ...todos] ) );
	};

	const addList = async (title: string, color: string) => {
		const newList: any = await addNewList(title, color);
		setLists((lists) => [{ id: newList.insertId, title: title, color: color }, ...lists]);
	};

	// const deleteTodo = () => {
	// 	// to be added later
	// };

	// const deleteList = () => {
	// 	// to be added later
	// };

	useEffect(() => {
		const fetchData = async () => {
			const todos: any = await fetchTodos();
			const lists: any = await fetchLists();
			// console.log(todos, 'PROVIDER');
			setTodos(todos.rows._array);
			setLists(lists.rows._array);
		};
		fetchData();
	}, []);

	return (
		<TodoListContext.Provider value={{ todos, lists, addTodo, addList }}>
			{children}
		</TodoListContext.Provider>
	);
};

export default TodoListProvider;
