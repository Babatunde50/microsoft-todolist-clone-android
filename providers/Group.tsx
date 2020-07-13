import React, { createContext, useEffect, useReducer, useContext } from "react";

import { editGroupTitle, fetchGroups, addNewGroup, removeGroup } from '../utils/DB/groups'

const ADD_GROUP = "ADD_GROUP"
const ERROR = "SET_ERROR";
const LOAD_GROUPS= "LOAD_GROUPS"
const EDIT = "EDIT_GROUP"

type Action =
  | {
      type: "ADD_GROUP"
      payload: group
    }
  | { type: "SET_ERROR", payload: { message: string} }
  | { type: "LOAD_GROUPS", payload: GroupState }
  | { type: "EDIT_GROUP", payload: GroupState }

export interface group {
    id: number;
    title: string;
  }

type GroupState = group[]

type GroupActions = {
    addGroup: (title: string) => void;
    editGroup: (title: string, id: number) => void;
    deleteGroup: (id: number) => void;
    setGroups: (groups: GroupState) => void;
}

const GroupStateContext = createContext<GroupState | null>(null);
const GroupDispatchContext = createContext<GroupActions | null>(null); 

const reducer = (state: GroupState, action: Action): GroupState  => {
    switch(action.type) {
        case ADD_GROUP:
            return [ action.payload, ...state ]
        case LOAD_GROUPS:
            return action.payload;
        case EDIT: 
            return action.payload
        case ERROR:
            console.log(action.payload.message) 
            return state;
        default:
            return state
    }
}

const GroupProvider: React.FunctionComponent = ({ children }) => {
    const [ groups, dispatch] = useReducer(reducer, [])

    useEffect(() => {
        (async () => {
            const groups = await fetchGroups() as any;
            dispatch({ type: LOAD_GROUPS, payload: groups.rows._array })
          })();
    }, [])

    const addGroup = async (title: string) => {
        try {
            const newGroup: any = await addNewGroup(title);
            dispatch({ type: ADD_GROUP, payload:  { id: newGroup.insertId, title: title } } )
        } catch(err) {
            dispatch({ type: ERROR, payload: { message: err.message}})
        }
      };

      const editGroup = async (title: string, id: number) => {
          try {
            await editGroupTitle(title, id);
            const index = groups.findIndex((group) => group.id === id);
            const copiedGroups = [...groups];
            copiedGroups[index] = { ...groups[index], title };
            dispatch({ type: EDIT, payload: copiedGroups})
          } catch(err) {
            dispatch({ type: ERROR, payload: { message: err.message}})
          }
      };

      const deleteGroup = async (id: number) => {
          try {
            await removeGroup(id);
            const filteredGroup = groups.filter((group) => group.id !== id);
            dispatch({ type: EDIT, payload: filteredGroup})
          } catch(err) {
            dispatch({ type: ERROR, payload: { message: err.message}})
          }
      };

      const setGroups = (groups: group[]) => {
          dispatch({ type: EDIT, payload: groups })
      }
    
    return (
        <GroupDispatchContext.Provider value={{ setGroups, deleteGroup, editGroup, addGroup }}>
        <GroupStateContext.Provider value={groups}>
          {children}
        </GroupStateContext.Provider>
      </GroupDispatchContext.Provider>
    )
}

export const useGroups = () => useContext(GroupStateContext)
export const useDispatchGroups = () => useContext(GroupDispatchContext)
export default GroupProvider;