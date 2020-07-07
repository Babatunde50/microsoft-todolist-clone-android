import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

import TaskListButton from "./TaskListButton";
import { TodoListContext, todoContext } from '../providers/TodoList';

const Group: React.FC<{ title: string; id: number }> = ({ title, id }) => {
  const [clicked, setClicked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const todoDB = useContext(TodoListContext) as todoContext;

  console.log(todoDB.lists.filter(list => list.groupId === id ), "LIST FOR GROUP");
  
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => {
        setClicked((prev) => !prev);
      }}
    >
      <View style={styles.button}>
        <Feather name="folder" size={20} color="#0413bf" />
        <Text style={styles.buttonText}>{title}</Text>
      </View>
      <View>
        {clicked ? (
          <View>
            <View style={styles.clickedIcons}>
              <Feather name="more-vertical" size={20} color="#5e6360" onPress={() => setShowOptions(true)} />
              <Feather name="chevron-down" size={20} color="#5e6360" />
            </View>
            {showOptions && (
              <View style={styles.actionsContainer}>
                <TaskListButton
                  title="Add/Remove lists"
                  iconName="list"
                  iconSize={15}
                  iconColor="#5e6360"
                  onPress={() => {
                    console.log("Pressed");
                  }}
                />
                <TaskListButton
                  title="Rename group"
                  iconName="sliders"
                  iconSize={15}
                  iconColor="#5e6360"
                  onPress={() => {
                    console.log("Pressed");
                  }}
                />
                <TaskListButton
                  title="Ungroup lists"
                  iconName="maximize"
                  iconSize={15}
                  iconColor="#5e6360"
                  onPress={() => {
                    console.log("Pressed");
                  }}
                />
              </View>
            )}
          </View>
        ) : (
          <Feather name="chevron-left" size={20} color="#5e6360" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    paddingVertical: 12,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 15,
    paddingHorizontal: 10,
    fontFamily: "Roboto-Bold",
  },
  clickedIcons: {
    flexDirection: "row",
  },
  text: {
    color: "#5e6360",
    fontSize: 15,
    paddingHorizontal: 10,
    fontFamily: "Roboto-Regular",
  },
  actionsContainer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    bottom: 50,
    left: 20,
    zIndex: 200,
  },
});

export default Group;
