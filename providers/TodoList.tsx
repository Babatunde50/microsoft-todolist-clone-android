import React, { useState, createContext, useEffect } from 'react';
import { addNewList, addNewTodo, fetchTodos, fetchLists } from '../utils/db';

interface todo {
    title: string,
	type: string,
	category: string,
	dueDate?: string,
	reminder?: string,
	favourite?: boolean
}

interface list {
    title: string,
    color: string
}


export const TodoListContext = createContext<any | null>(null);

const TodoListProvider: React.FC = ({ children }) => {
    const [todos, setTodos] = useState<todo[]>([]);
    const [lists, setLists] = useState<list[]>([]);

    const addTodo = async (title: string, type: string, category: string, favourite: boolean, dueDate?: string, reminder?: string) => {
        const newTodo: any = await addNewTodo(title, type, category, favourite, dueDate, reminder );
        setTodos(todos => ([newTodo, ...todos]));
    }

    const addList = async (title: string, color: string) => {
        const newList: any = await addNewList(title, color);
        setLists(lists => ([{ id: newList.insertId, title: title, color: color }, ...lists]));
    }

    const deleteTodo = () => {
        // to be added later
    }

    const deleteList = () => {
        // to be added later
    }

    useEffect(() => {
        const fetchData = async () => {
            const todos: any = await fetchTodos();
            const lists: any = await fetchLists();
            setTodos(todos);
            setLists(lists)
        }
        fetchData();
    }, [])


	return <TodoListContext.Provider value={{todos, lists, addTodo, addList, deleteTodo, deleteList}}>{children}</TodoListContext.Provider>;
};

export default TodoListProvider;
