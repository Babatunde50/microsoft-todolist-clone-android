import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/TodoNavigation";

import TaskListButton from "./TaskListButton";
import { TodoListContext, todoContext } from "../providers/TodoList";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "./Modal";
import MyButton from "./MyButton";

const Group: React.FC<{
  title: string;
  id: number;
  navigation: StackNavigationProp<RootStackParamList, "Home">;
}> = ({ title, id, navigation }) => {
  const [clicked, setClicked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState({ show: false, type: "" });
  const [groupName, setGroupName] = useState(title)
  const todoDB = useContext(TodoListContext) as todoContext;

  const groupList = todoDB.lists.filter((list) => list.groupId === id)
  const ungroupAndGroupList = todoDB.lists.filter((list) => list.groupId === id || !list.groupId )
  let disabled = groupName.length < 1 ? true : false;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={() => {
        setClicked((prev) => !prev);
      }}
    >
      <View style={styles.title}>
        <View style={styles.button}>
          {!clicked && <Feather name="folder" size={20} color="#0413bf" />}
          <Text style={styles.buttonText}>{title}</Text>
        </View>
        <View>
          {clicked ? (
            <View>
              <View style={styles.clickedIcons}>
                <Feather
                  name="more-vertical"
                  size={20}
                  color="#5e6360"
                  onPress={() => {
                    setShowOptions((prev) => !prev);
                  }}
                />
                <Feather name="chevron-down" size={20} color="#5e6360" />
              </View>
            </View>
          ) : (
            <Feather name="chevron-left" size={20} color="#5e6360" />
          )}
        </View>
      </View>
      {clicked && (
        <ScrollView>
          <View style={styles.lists}>
            {groupList.length > 0 ? (
              <FlatList
                data={groupList}
                renderItem={({ item }) => {
                  return (
                    <TaskListButton
                      title={item.title}
                      iconName="menu"
                      iconSize={15}
                      iconColor={item.color}
                      totalItems={todoDB.todos
                        .filter((todo) => todo.listType === item.title)
                        .length.toString()}
                      onPress={() => {
                        navigation.navigate("NewList", {
                          listName: item.title,
                          newList: false,
                        });
                      }}
                    />
                  );
                }}
                keyExtractor={(item) => item.id.toString()}
              />
            ) : (
              <Text style={styles.emptyText}>
                Tap or Drag here to add lists
              </Text>
            )}
          </View>
        </ScrollView>
      )}
      {showOptions && (
        
        <View style={styles.actionsContainer}>
          <TaskListButton
            title="Add/Remove lists"
            iconName="list"
            iconSize={15}
            iconColor="#5e6360"
            onPress={() => {
              setShowModal({ show: true, type: "addRemove" });
              setShowOptions(false);
            }}
          />
          <TaskListButton
            title="Rename group"
            iconName="sliders"
            iconSize={15}
            iconColor="#5e6360"
            onPress={() => {
              setShowModal({ show: true, type: "rename" });
              setShowOptions(false);
            }}
          />
          <TaskListButton
            title={groupList.length > 0 ? "Ungroup list" : "Delete group" }
            iconName={ groupList.length > 0 ? "maximize" : "trash-2" }
            iconSize={15}
            iconColor="#5e6360"
            onPress={() => {
              if(groupList.length > 0) {
                todoDB.listUngroup(id);
              } else {
                todoDB.deleteGroup(id);
              }
              setShowOptions(false);
            }}
          />
        </View>
      )}
      <Modal isOpen={showModal.show && showModal.type === "addRemove"}>
        <View>
          <Text style={styles.addRemoveText}>
            {" "}
            Select lists to add or remove
          </Text>
          {
            ungroupAndGroupList.length === 0 && <Text style={styles.notFound}> No List found </Text>
          }
          <FlatList
            data={ungroupAndGroupList}
            renderItem={({ item }) => {
              return (
                <TaskListButton
                  title={item.title}
                  iconName="menu"
                  iconSize={15}
                  iconColor={item.color}
                  icon={item.groupId === id ? "check" : "plus"}
                  onPress={() => {
                    if(item.groupId === id) {
                      todoDB.removeListGroup(item.id)
                    } else {
                      todoDB.addListGroup(id, item.id)
                    }
                    console.log(todoDB.lists)
                  }}
                />
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
          <View style={styles.modalActions}>
            <MyButton
              onPress={() => {
                setShowModal((prev) => ({ ...prev, show: false }));
              }}
            >
              <Text> DONE </Text>
            </MyButton>
          </View>
        </View>
      </Modal>
      <Modal isOpen={showModal.show && showModal.type === "rename"}>
        <View>
          <Text> Rename </Text>
          <TextInput
            value={groupName}
            onChangeText={(text) => setGroupName(text)}
            placeholder="Name this group"
            placeholderTextColor="#ccc"
            style={styles.modalInput}
            underlineColorAndroid="#313699"
          />
          <View style={styles.modalActions}>
            <MyButton
              onPress={() => {
                setShowModal((prev) => ({ ...prev, show: false }));
              }}
            >
              <Text> CANCEL </Text>
            </MyButton>
            <MyButton disabled={disabled} style={{ opacity: disabled ? 0.2 : 1 }} onPress={ () => { 
              todoDB.editGroup(groupName, id)
              setShowModal((prev) => ({ ...prev, show: false }));
              } }>
              <Text> RENAME </Text>
            </MyButton>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  title: {
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
    alignItems: "flex-start",
    position: "absolute",
    backgroundColor: "white",
    elevation: 1,
    top: 40,
    right: 0,
    shadowColor: "rgba(0,0,0,.27)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1.0,
  },
  lists: {
    paddingHorizontal: 5,
    marginLeft: 10,
    borderLeftColor: "#ccc",
    borderLeftWidth: 2,
  },
  emptyText: {
    color: "#5e6360",
    fontSize: 12,
    textAlign: "center",
  },
  addRemoveText: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    paddingVertical: 5,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  modalInput: {
    height: 40,
    fontSize: 18,
    paddingLeft: 6,
  },
  notFound: {
    fontSize: 12,
    paddingVertical: 12,
    fontFamily: "Roboto-Regular",
    textAlign: "center"
  }
});

export default Group;
