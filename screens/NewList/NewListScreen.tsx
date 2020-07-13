import React, { useState, useContext, useEffect, Fragment } from "react";
import { View, Text, StyleSheet, TextInput, FlatList } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { ColorPicker } from "react-native-status-color-picker";

import Modal from "../../components/Modal";
import MyButton from "../../components/MyButton";
import Colors from "../../utils/colors";
import FabButton from "../../components/FabButton";
import { NewListProp } from "../../navigation/TodoNavigation";
import AddTask from "../../components/AddTask";
import TimeTask from "../../components/TimeTask";
import TodoCard from "../../components/TodoCard";
import {
  dueDateActions,
  remindMeActions,
  repeatActions,
} from "../../utils/days";

import { useDispatchLists } from "../../providers/List";
import { useTodos, useDispatchTodos } from '../../providers/Todo'
import useAddTodo from "../../hooks/useAddTodo";

type todoModel = {
  screen: string;
  important: number;
  title: string;
  id: string;
  listType: string;
};

function NewListScreen({ route, navigation }: NewListProp) {
  const { listName, newList, color } = route.params;
  const [groupName, setGroupName] = useState("");
  const [title, setTitle] = useState(listName);
  const [showModal, setShowModal] = useState(newList);
  const todos = useTodos();
  const todosDispatch = useDispatchTodos();
  const listsDispatch = useDispatchLists();
  const [selectedColor, setSelectedColor] = useState(color);
  const {
    task,
    showAddTask,
    showDueDate,
    showReminder,
    taskInputHandler,
    dueDateHandler,
    closeDueDateHandler,
    addTaskShow,
    cancelAllShows,
    repeatShow,
    reminderShow,
    dueDateShow,
    showRepeat,
    dueDate,
    removeDueDate,
    addReminderDate,
    removeReminderDate,
    reminderDate,
    closeReminderHandler,
    closeRepeatHandler,
    addRepeatHandler,
    removeRepeatHandler,
    repeatType,
  } = useAddTodo();
  const [listTodos, setListTodos] = useState<null | todoModel[]>(null);

  let disabled = groupName.length < 1 ? true : false;

  useEffect(() => {
    const transformedTodos: todoModel[] = todos!
      .filter((todo: any) => todo.listType === title)
      .map((filteredTodo: any) => {
        const transformedTodo: todoModel = {
          id: filteredTodo.id.toString(),
          ...filteredTodo,
        };
        return transformedTodo;
      });
    console.log(transformedTodos);
    setListTodos(transformedTodos);
  }, [todos]);

  const addNewTask = () => {
    todosDispatch!.addTodo(
      task,
      title,
      0,
      title,
      reminderDate?.toString(),
      dueDate?.toString(),
      repeatType
    );
    cancelAllShows();
  };
  return (
    <View style={{ flex: 1, backgroundColor: selectedColor }}>
      <Modal isOpen={showModal}>
        <Fragment>
        <Text style={styles.modalTitle}> New list </Text>
        <View style={styles.inputContainer}>
          <Entypo name="emoji-happy" size={20} color={selectedColor} />
          <TextInput
            value={groupName}
            onChangeText={(text) => setGroupName(text)}
            placeholder="Enter list title"
            placeholderTextColor="#ccc"
            style={styles.modalInput}
            underlineColorAndroid={selectedColor}
          />
        </View>
        {/* <View style={styles.colorButtonContainer}> 
                    <MyButton style={styles.colorButton}>
                        <Text> Color </Text>
                    </MyButton>
                    <MyButton  style={styles.colorButton}>
                        <Text> Photo </Text> 
                    </MyButton>
                </View> */}
        <View>
          <ColorPicker
            colors={Colors}
            selectedColor={selectedColor}
            onSelect={(color: string) => {
              setSelectedColor(color);
              navigation.setOptions({
                headerStyle: {
                  backgroundColor: color,
                  elevation: 0,
                },
              });
            }}
          />
        </View>
        <View style={styles.modalActions}>
          <MyButton
            onPress={() => {
              navigation.goBack();
              setShowModal(false);
            }}
          >
            <Text> CANCEL </Text>
          </MyButton>
          <MyButton
            onPress={() => {
              listsDispatch!.addList(groupName, selectedColor);
              setShowModal(false);
              setTitle(groupName);
            }}
            disabled={disabled}
            style={{ opacity: disabled ? 0.2 : 1 }}
          >
            <Text> CREATE LIST </Text>
          </MyButton>
        </View>
        </Fragment>
      </Modal>

      <Text style={styles.title}> {title} </Text>
      <FlatList
        data={listTodos}
        renderItem={({ item }) => (
          <TodoCard
            color={selectedColor}
            title={item.title}
            id={+item.id}
            isFav={item.important}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.id}
      />
      <FabButton style={{ backgroundColor: "white" }} onPress={addTaskShow}>
        <Entypo name="plus" size={32} color={selectedColor} />
      </FabButton>
      <TimeTask
        show={showDueDate}
        close={closeDueDateHandler}
        getDateHandler={dueDateHandler}
        actions={dueDateActions(new Date().getDay())}
      />
      <TimeTask
        show={showReminder}
        close={closeReminderHandler}
        getDateHandler={addReminderDate}
        actions={remindMeActions(new Date().getDay())}
      />
      <TimeTask
        show={showRepeat}
        close={closeRepeatHandler}
        getDateHandler={addRepeatHandler}
        actions={repeatActions()}
      />
      <AddTask
        show={showAddTask}
        task={task}
        dueDate={dueDate}
        reminderDate={reminderDate}
        repeatType={repeatType}
        removeDueDate={removeDueDate}
        removeReminderDate={removeReminderDate}
        removeRepeatType={removeRepeatHandler}
        taskInputHandler={taskInputHandler}
        submitTaskHandler={addNewTask}
        showDueDateHandler={dueDateShow}
        showReminderHandler={reminderShow}
        showRepeatHandler={repeatShow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontFamily: "Roboto-Bold",
    color: "white",
    paddingVertical: 15,
  },
  modalTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    paddingBottom: 20,
  },
  colorButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  colorButton: {
    borderWidth: 2,
    borderColor: "red",
    backgroundColor: "white",
    padding: 5,
    margin: 2,
    borderRadius: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  modalInput: {
    height: 40,
    fontSize: 18,
    paddingLeft: 6,
    width: "95%",
    marginLeft: 5,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
  },
});

export default NewListScreen;
