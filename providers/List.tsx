import React, { createContext, useEffect, useReducer, useContext } from "react";

import { fetchLists, addNewList, ungroupList, removeListFromGroup, addListToGroup  } from '../utils/DB/list'
import getEdittedState from "../utils/editState";
import { useGroups, useDispatchGroups } from './Group'

const ADD_LIST = "ADD_LIST"
const ERROR = "SET_ERROR";
const LOAD_LISTS = "LOAD_LISTS"
const EDIT_LIST = "EDIT_LIST"

type Action =
  | {
      type: "ADD_LIST"
      payload: list
    }
  | { type: "SET_ERROR", payload: { message: string} }
  | { type: "LOAD_LISTS", payload: ListState }
  | { type: "EDIT_LIST", payload: ListState}

export interface list {
    title: string;
    color: string;
    id: number;
    groupId?: number;
  }

type ListState = list[]

type ListActions = {
    addList: (title: string, color: string) => void;
    addListGroup: (groupId: number, listId: number) => void;
    removeListGroup:  (listId: number) => void;
    listUngroup: (groupId: number) => void
}

const ListStateContext = createContext<ListState | null>(null);
const ListDispatchContext = createContext<ListActions | null>(null);

const reducer = (state: ListState, action: Action): ListState => {
    switch(action.type) {
        case ADD_LIST:
            return [ action.payload, ...state ]
        case LOAD_LISTS:
            return action.payload;
        case ERROR:
            console.log(action.payload.message) 
            return state;
        default:
            return state
    }
}

const ListProvider: React.FunctionComponent = ({ children }) => {
    const [ lists, dispatch] = useReducer(reducer, [])
    const groups = useGroups();
    const groupDispatch = useDispatchGroups()

    useEffect(() => {
        (async () => {
            const lists = await fetchLists() as any;
            dispatch({ type: LOAD_LISTS, payload: lists.rows._array })
          })();
    }, [])

    const addList = async (title: string, color: string) => {
        try {
            const newList: any = await addNewList(title, color);
            dispatch({ type: ADD_LIST, payload: { id: newList.insertId, title: title, color: color }  })
        } catch(err) {
            dispatch({ type: ERROR, payload: { message: err.message }})
        }
      };

    const addListGroup = async (groupId: number, listId: number) => {
        try {
          await addListToGroup(listId, groupId);
          dispatch({ type: EDIT_LIST, payload: getEdittedState(lists, listId, groupId, "groupId") })
        } catch (err) {
            dispatch({ type: ERROR, payload: { message: err.message }})
        }
      };

      const removeListGroup = async (listId: number) => {
        try {
          await removeListFromGroup(listId);
          dispatch({ type: EDIT_LIST, payload: getEdittedState(lists, listId, undefined, "groupId") })
        } catch (err) {
          dispatch({ type: ERROR, payload: { message: err.message }})
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
          const filteredGroup = groups!.filter((group) => group.id !== groupId);
          dispatch({ type: EDIT_LIST, payload: newList})
          groupDispatch?.setGroups(filteredGroup);
        } catch (err) {
          console.log(err);
        }
      };
    
    return (
        <ListDispatchContext.Provider value={{ addList, addListGroup, removeListGroup, listUngroup}}>
        <ListStateContext.Provider value={lists}>
          {children}
        </ListStateContext.Provider>
      </ListDispatchContext.Provider>
    )
}

export const useLists = () => useContext(ListStateContext)
export const useDispatchLists = () => useContext(ListDispatchContext)
export default ListProvider