import React, { createContext, useEffect, useReducer, useContext } from "react";

import { createNewReminder, repeatOptions } from "../utils/notification";
import { createEventDueDate } from "../utils/calendars";
import { addNewTodo, editTodoTitle, toggleFavouriteTodo, addRemoveNote, toggleTodoToMyDay, fetchTodos, deleteTodo } from '../utils/DB/todos'
import getEdittedState from '../utils/editState'

const ADD_TODO = "ADD_TODO"
const ERROR = "SET_ERROR";
const EDIT = "EDIT_TODO";
const LOAD_TODOS = "LOAD_TODOS"
const DELETE_TODO = "DELETE_TODO"

type Action =
  | {
      type: "ADD_TODO"
      payload: todo
    }
  | { type: "SET_ERROR", payload: { message: string} }
  | { type: "EDIT_TODO", payload: TodoState }
  | { type: "LOAD_TODOS", payload: TodoState}
  | { type: "DELETE_TODO", payload: { id: number }}

export interface todo {
    id: number;
    title: string;
    screen: string;
    important: number;
    listType: string;
    reminder?: string;
    dueDate?: string;
    repeat?: repeatOptions;
    note?: string;
    steps?: string | null;
    createdAt?: string;
  }

type TodoState = todo[]
type TodoActions = {
    addTodo: (
        title: string,
        screen: string,
        important: number,
        listType: string,
        reminder?: string,
        dueDate?: string,
        repeat?: repeatOptions
      ) => void;
    toggleImportant: (id: number, imp: number) => void;
    todoTitleEdit: (id: number, title: string) => void;
    toggleMyDayTodo: (id: number, screen: string) => void;
    addNote: (id: number, note: string) => void;
    removeTodo: (id: number) => void;
}

const TodoStateContext = createContext<TodoState | null>(null)
const TodoDispatchContext = createContext<TodoActions | null>(null)

const reducer = (state: TodoState, action: Action): TodoState => {
    switch(action.type) {
        case ADD_TODO:
            return [ action.payload, ...state ]
        case EDIT:
            return action.payload;
        case LOAD_TODOS:
            return action.payload;
        case DELETE_TODO:
            return state.filter(todo => todo.id !== action.payload.id)
        case ERROR:
            console.log(action.payload.message) 
            return state;
        default:
            return state
    }
}

const TodoProvider: React.FunctionComponent = ({ children }) => {
    const [ todos, dispatch] = useReducer(reducer, [])

    useEffect(() => {
        (async () => {
            const todos = await fetchTodos() as any
            dispatch({ type: LOAD_TODOS, payload: todos.rows._array })
          })();
    }, [])

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
            reminderDateId = (await createNewReminder(
              title,
              reminder,
              repeat
            )) as number;
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
            createdAt: new Date().toString()
          };
          dispatch({ type: ADD_TODO, payload: insertedTodo })
        } catch (err) {
            dispatch({ type: ERROR, payload: { message: err.message}})
        }
      };
    
      const todoTitleEdit = async (id: number, title: string) => {
        try {
          await editTodoTitle(id, title);
          dispatch({ type: EDIT, payload:  getEdittedState(todos, id, title, "title")  })
        } catch (err) {
            dispatch({ type: ERROR, payload: { message: err.message}})
        }
      };

      const toggleImportant = async (id: number, imp: number) => {
          try {
            await toggleFavouriteTodo(imp, id);
            dispatch({ type: EDIT, payload: getEdittedState(todos, id, imp, "important" )})
          } catch(err) {
            dispatch({ type: ERROR, payload: { message: err.message}})
          }
      };
    
      const toggleMyDayTodo = async (id: number, screen: string) => {
        try {
          await toggleTodoToMyDay(id, screen)
          dispatch({ type: EDIT, payload: getEdittedState( todos, id, screen, "screen")})
        } catch(err) {
            dispatch({ type: ERROR, payload: { message: err.message}})
        }
      }
    
      const addNote = async (id: number, note: string) => {
        try {
          await addRemoveNote(id, note)
          dispatch({ type: EDIT, payload: getEdittedState(todos, id, note, "note")})
        } catch(err){
            dispatch({ type: ERROR, payload: { message: err.message}})
        }
      }

      const removeTodo = async (id: number) => {
        try {
          await deleteTodo(id)
          dispatch({ type: DELETE_TODO, payload: { id} })
        } catch(err) {
          dispatch({ type: ERROR, payload: { message: err.message }})
        }
      }
    
    return (
        <TodoDispatchContext.Provider value={{ addNote, removeTodo, toggleImportant, toggleMyDayTodo, todoTitleEdit, addTodo }}>
        <TodoStateContext.Provider value={todos}>
          {children}
        </TodoStateContext.Provider>
      </TodoDispatchContext.Provider>
    )
}

export const useTodos = () => useContext(TodoStateContext)
export const useDispatchTodos = () => useContext(TodoDispatchContext)
export default TodoProvider