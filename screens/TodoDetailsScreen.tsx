import React, { useContext, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform
} from "react-native";
import {
  FontAwesome,
  Feather,
  AntDesign,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";

import { TodoDetailsProp } from "../navigation/TodoNavigation";
import { useDispatchTodos, useTodos } from '../providers/Todo'
import { dueDateActions, remindMeActions, repeatActions } from '../utils/days';
import { repeatOptions } from '../utils/notification';
import TimeTask from '../components/TimeTask'

function TodoDetailsScreen({ route, navigation }: TodoDetailsProp) {
  const dispatchTodo = useDispatchTodos()
  const todos = useTodos()
  // const {
  //   todos,
  //   toggleImportant,
  //   toggleMyDayTodo,
  //   todoTitleEdit,
  //   addNote,
  // } = useContext(TodoListContext) as todoContext;
  const { id } = route.params;
  const foundTodo = todos!.find((todo) => todo.id === id);
  const [todoTitle, setTodoTitle] = useState(foundTodo?.title);
  const [note, setNote] = useState(foundTodo?.note)
  const [step, setStep] = useState("")
  const [showDueDate, setShowDueDate] = useState(false);
  const [showReminder, setShowReminder] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [ dueDate, setDueDate] = useState<Date | undefined>();
  const [reminderDate, setReminderDate] = useState<Date | undefined>()
  const [ repeatType, setRepeatType] = useState<repeatOptions>();

  const handleTitleChange = (text: string) => {
    setTodoTitle(text);
    dispatchTodo!.todoTitleEdit(id, text);
  };

  const dueDateHandler = (date: Date | string) => {
    // setDueDate(date as Date);
    console.log(date as Date)
  };
  
  const addReminderDate = (date: Date | string) => {
		setReminderDate(date as Date);
  }
  
  const addRepeatHandler = (repeatType: string | Date ) => {
		console.log(repeatType as repeatOptions);
	}

  const handleNoteChange = (text: string) => {
    setNote(text);
    dispatchTodo!.addNote(id, text)
  }

  const handleStepChange = (text: string) => {
	  // setStep(text)
  }

  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <View style={styles.header}>
        <View style={styles.input}>
          <FontAwesome name="circle-thin" size={35} color="#868a8f" />
          <TextInput
            value={todoTitle}
            onChangeText={handleTitleChange}
            style={styles.textInput}
          />
        </View>
        <FontAwesome
          name="star"
          size={28}
          color={foundTodo?.important === 1 ? "red" : "#ccc"}
          onPress={() => {
            dispatchTodo!.toggleImportant(id, +!foundTodo?.important);
          }}
        />
      </View>
      <ScrollView>
        <ScrollView style={styles.stepList}>
          {"This is good".split("\n").map((step) => (
            <View style={styles.stepContainer}>
              <View style={styles.input}>
                <FontAwesome name="circle-thin" size={25} color="#868a8f" />
                <TextInput
                  value={step}
                  onChangeText={(text) => console.log(text)}
                  style={{ ...styles.textInput, ...styles.stepInput }}
                />
              </View>
              <FontAwesome name="times" size={18} color="#ccc" />
            </View>
          ))}
          <View style={{ ...styles.input, paddingHorizontal: 12}}>
            <FontAwesome name="circle-thin" size={25} color="#868a8f" />
            <TextInput
              placeholder="Next step"
			  value={step}
			  onSubmitEditing={() => console.log("Enter is pressed!!!")}
              onChangeText={handleStepChange}
              style={{ ...styles.textInput, ...styles.stepInput }}
            />
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            const screen = foundTodo?.screen !== "myDay" ? "myDay" : "tasks";
            dispatchTodo!.toggleMyDayTodo(id, screen);
          }}
        >
          <View style={styles.addToDay}>
            <Feather
              name="sun"
              size={24}
              color={foundTodo?.screen === "myDay" ? "#4267e3" : "black"}
            />
            <Text
              style={{
                ...styles.addToDayText,
                color: foundTodo?.screen === "myDay" ? "#4267e3" : "#2c2f33",
              }}
            >
              {foundTodo?.screen === "myDay"
                ? "Added to My Day"
                : "Add to My Day"}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.time}>
          <View style={styles.timeItem}>
            <AntDesign name="bells" size={24} color="black" />
            <View style={styles.timeItemText}>
              <Text onPress={() => setShowReminder(prev => !prev)}> Remind me </Text>
            </View>
            <TimeTask
					    show={showReminder}
					    close={() => setShowReminder(false)}
					    getDateHandler={addReminderDate}
					    actions={remindMeActions(new Date().getDay())}
				    />
          </View>
          <View style={styles.timeItem}>
            <AntDesign name="calendar" size={24} color="black" />
            <View style={styles.timeItemText}>
              <Text onPress={() => setShowDueDate(prev => !prev)}> Add due date </Text>
            </View>
            <TimeTask
					    show={showDueDate}
					    close={() => setShowDueDate(false)}
					    getDateHandler={dueDateHandler}
					    actions={dueDateActions(new Date().getDay())}
				    />
          </View>
          <View style={styles.timeItem}>
            <Entypo name="loop" size={24} color="black" />
            <View style={styles.timeItemText}>
              <Text onPress={() => setShowRepeat(prev => !prev)} > Repeat </Text>
            </View>
            <TimeTask
					    show={showRepeat}
					    close={() => setShowRepeat(false)}
					    getDateHandler={addRepeatHandler}
					    actions={repeatActions()}
				    />
          </View>
        </View>
        <View style={styles.addToDay}>
          <MaterialIcons name="attach-file" size={24} color="black" />
          <Text>Add file</Text>
        </View>
        <View style={styles.noteContainer}>
          {/* <Text> Cool... </Text> */}
          <TextInput
            style={styles.noteText}
            onChangeText={handleNoteChange}
            value={note}
            multiline={true}
            numberOfLines={2}
            placeholder="Add note"
          />
        </View>
      </ScrollView>
      <View style={styles.dateCreatedContainer}>
        <Text> Created on {foundTodo?.createdAt?.slice(0, 10)} </Text>
        <AntDesign name="delete" size={24} color="black" onPress={() => {
          dispatchTodo!.removeTodo(id)
          navigation.goBack()
        }} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    elevation: 3,
    backgroundColor: "white",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    width: "80%",
    height: 40,
    padding: 6,
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    color: "black",
    textDecorationLine: "none",
  },
  stepList: {
    // paddingHorizontal: 20,
    elevation: 5,
  },
  stepContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  stepInput: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  nextStep: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 20,
    elevation: 2,
    backgroundColor: "white",
    marginBottom: 2,
  },
  nextStepText: {
    color: "#4267e3",
    paddingHorizontal: 10,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  addToDay: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    elevation: 2,
    margin: 5,
    zIndex: -20
  },
  addToDayText: {
    color: "#2c2f33",
    paddingHorizontal: 20,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
  },
  time: {
    padding: 20,
    paddingRight: 0,
    elevation: 5,
    margin: 5,
    backgroundColor: "white",
    zIndex: 1,
  },
  timeItem: {
    flexDirection: "row",
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  timeItemText: {
    marginHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#2c2f33",
    width: "85%",
    color: "#524e5c",
    zIndex: -20
  },
  noteContainer: {
    height: 120,
    padding: 15,
    elevation: 5,
    backgroundColor: "white",
    margin: 5,
    justifyContent: "flex-start",
    zIndex: -20
  },
  noteText: {
    margin: 0,
    padding: 0,
  },
  dateCreatedContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  createdText: {
    color: "#2c2f33",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    letterSpacing: 2,
  },
});

export default TodoDetailsScreen;
