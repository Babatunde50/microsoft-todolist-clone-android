import React, { useState, createContext, useEffect } from "react";

import {
  addNewList,
  addNewTodo,
  fetchTodos,
  fetchLists,
  toggleFavouriteTodo,
  addNewGroup,
  editGroupTitle,
  fetchGroups,
  removeGroup,
  addListToGroup,
  removeListFromGroup,
  ungroupList,
  toggleTodoToMyDay,
  addRemoveNote,
  editTodoDueDate,
  editTodoReminder,
  editTodoRepeat,
  editTodoTitle,
} from "../utils/db";
import { createEventDueDate } from "../utils/calendars";
import { createNewReminder, repeatOptions } from "../utils/notification";

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
  createdAt?: string;
}

export interface list {
  title: string;
  color: string;
  id: number;
  groupId?: number;
}

export interface group {
  id: number;
  title: string;
}

export type todoContext = {
  todos: todo[];
  lists: list[];
  groups: group[];
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
  addGroup: (title: string) => void;
  editGroup: (title: string, id: number) => void;
  deleteGroup: (id: number) => void;
  addListGroup: (groupId: number, listId: number) => void;
  removeListGroup: (listId: number) => void;
  listUngroup: (groupId: number) => void;
  todoTitleEdit: (id: number, title: string) => void;
  toggleMyDayTodo: (id: number, screen: string) => void;
  addNote: (id: number, note: string) => void;
  // deleteTodo: (id: number) => void;
  // deleteList: (id: number) => void;
};

export const TodoListContext = createContext<todoContext | null>(null);

const TodoListProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<todo[]>([]);
  const [lists, setLists] = useState<list[]>([]);
  const [groups, setGroups] = useState<group[]>([]);

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
      };
      setTodos((todos: any) => [insertedTodo, ...todos]);
    } catch (err) {
      console.log(err.message);
    }
  };

  const addList = async (title: string, color: string) => {
    const newList: any = await addNewList(title, color);
    setLists((lists) => [
      { id: newList.insertId, title: title, color: color },
      ...lists,
    ]);
  };

  const addGroup = async (title: string) => {
    const newGroup: any = await addNewGroup(title);
    setGroups((groups) => [...groups, { id: newGroup.insertId, title: title }]);
  };

  const editGroup = async (title: string, id: number) => {
    await editGroupTitle(title, id);
    const index = groups.findIndex((group) => group.id === id);
    const copiedGroups = [...groups];
    copiedGroups[index] = { ...groups[index], title };
    setGroups(copiedGroups);
  };

  const todoTitleEdit = async (id: number, title: string) => {
    try {
      await editTodoTitle(id, title);
      const index = todos.findIndex((todo) => todo.id === id);
      const copiedTodos = [...todos];
      copiedTodos[index] = { ...todos[index], title };
      setTodos(copiedTodos);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteGroup = async (id: number) => {
    await removeGroup(id);
    const filteredGroup = groups.filter((group) => group.id !== id);
    setGroups(filteredGroup);
  };

  const toggleImportant = async (id: number, imp: number) => {
    await toggleFavouriteTodo(imp, id);
    const index = todos.findIndex((todo) => todo.id === id);
    const copiedTodos = [...todos];
    copiedTodos[index] = { ...todos[index], important: imp };
    setTodos(copiedTodos);
  };

  const toggleMyDayTodo = async (id: number, screen: string) => {
    try {
      await toggleTodoToMyDay(id, screen)
      const index = todos.findIndex((todo) => todo.id === id);
      const copiedTodos = [...todos];
      copiedTodos[index] = { ...todos[index], screen };
      setTodos(copiedTodos);
    } catch(err) {
      console.log(err)
    }
  }

  const addNote = async (id: number, note: string) => {
    try {
      await addRemoveNote(id, note)
      const index = todos.findIndex((todo) => todo.id === id);
      const copiedTodos = [...todos];
      copiedTodos[index] = { ...todos[index], note };
      setTodos(copiedTodos);
    } catch(err){
      console.log(err);
    }
  }

  const addListGroup = async (groupId: number, listId: number) => {
    try {
      await addListToGroup(listId, groupId);
      const index = lists.findIndex((list) => list.id === listId);
      const copiedLists = [...lists];
      copiedLists[index] = { ...lists[index], groupId };
      setLists(copiedLists);
      console.log(copiedLists);
    } catch (err) {
      console.log(err);
    }
  };

  const removeListGroup = async (listId: number) => {
    try {
      await removeListFromGroup(listId);
      const index = lists.findIndex((list) => list.id === listId);
      const copiedLists = [...lists];
      copiedLists[index] = { ...lists[index], groupId: undefined };
      setLists(copiedLists);
      console.log(copiedLists);
    } catch (err) {
      console.log(err);
    }
  };

  const listUngroup = async (groupId: number) => {
    try {
      await ungroupList(groupId);
      const newList = lists.map((list) => {
        if (list.groupId === groupId) {
          list.groupId = undefined;
        }
        return list;
      });
      const filteredGroup = groups.filter((group) => group.id !== groupId);
      setLists(newList);
      setGroups(filteredGroup);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      const todos: any = await fetchTodos();
      const lists: any = await fetchLists();
      const groups: any = await fetchGroups();
      setTodos(todos.rows._array);
      setLists(lists.rows._array);
      setGroups(groups.rows._array);
    })();
  }, []);

  return (
    <TodoListContext.Provider
      value={{
        todos,
        groups,
        lists,
        addTodo,
        addList,
        toggleImportant,
        addGroup,
        editGroup,
        deleteGroup,
        addListGroup,
        removeListGroup,
        listUngroup,
        todoTitleEdit,
        toggleMyDayTodo,
        addNote
      }}
    >
      {children}
    </TodoListContext.Provider>
  );
};

export default TodoListProvider;
