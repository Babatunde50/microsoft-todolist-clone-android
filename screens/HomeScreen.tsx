import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { Entypo, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";

import TaskListButton from "../components/TaskListButton";
import Modal from "../components/Modal";
import MyButton from "../components/MyButton";
import Group from "../components/Group";
import { HomeProps } from "../navigation/TodoNavigation";

import { useTodos } from "../providers/Todo";
import { useLists } from "../providers/List";
import { useGroups, useDispatchGroups } from "../providers/Group";

function HomeScreen({ route, navigation }: HomeProps) {
  // todos
  const todos = useTodos();
  // lists
  const lists = useLists();
  //groups
  const groups = useGroups();
  const groupsDispatch = useDispatchGroups();

  const [groupName, setGroupName] = useState("");
  const [showModal, setShowModal] = useState(false);
  let disabled = groupName.length < 1 ? true : false;

  console.log(lists)
  const renderedLists = [
    ...groups!,
    ...lists!.filter((list) => !list.groupId),
  ] as any;
  // console.log(lists, "FROM HOME SCREEN")
  return (
    <View style={styles.screen}>
      <Modal isOpen={showModal}>
        <View>
          <Text style={styles.modalTitle}> Create a group </Text>
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
                setShowModal(false);
              }}
            >
              <Text> CANCEL </Text>
            </MyButton>
            <MyButton
              disabled={disabled}
              style={{ opacity: disabled ? 0.2 : 1 }}
            >
              <Text
                style={styles.createGroupText}
                onPress={() => {
                  groupsDispatch!.addGroup(groupName);
                  setShowModal(false);
                }}
              >
                {" "}
                CREATE GROUP{" "}
              </Text>
            </MyButton>
          </View>
        </View>
      </Modal>
      <View style={styles.tasksListLinks}>
        <TaskListButton
          title="My Day"
          iconName="sun"
          iconSize={15}
          iconColor="#ccc"
          totalItems={todos!
            .filter((todo) => todo.screen === "myDay")
            .length.toString()}
          onPress={() => {
            navigation.navigate("Myday");
          }}
        />
        <TaskListButton
          title="Important"
          iconName="star"
          iconSize={15}
          iconColor="red"
          totalItems={todos!
            .filter((todo) => todo.important === 1)
            .length.toString()}
          onPress={() => {
            navigation.navigate("Important");
          }}
        />
        <TaskListButton
          title="Planned"
          iconName="calendar"
          iconSize={15}
          iconColor="green"
          onPress={() => {
            navigation.navigate("Planned");
          }}
        />
        <TaskListButton
          title="Assigned To You"
          iconName="user"
          iconSize={15}
          iconColor="green"
          onPress={() => {
            navigation.navigate("Assign");
          }}
        />
        <TaskListButton
          title="Tasks"
          iconName="layers"
          iconSize={15}
          iconColor="#313699"
          totalItems={todos!.length.toString()}
          onPress={() => {
            navigation.navigate("Tasks");
          }}
        />
      </View>
      <View style={styles.tasksList}>
        <View style={styles.list}>
          <FlatList
            data={renderedLists}
            renderItem={({ item }) => {
              if (item.color) {
                return (
                  <TaskListButton
                    title={item.title}
                    iconName="menu"
                    iconSize={15}
                    iconColor={item.color}
                    totalItems={todos!
                      .filter((todo) => todo.listType === item.title)
                      .length.toString()}
                    onPress={() => {
                      navigation.navigate("NewList", {
                        listName: item.title,
						newList: false,
						color: item.color
                      });
                    }}
                  />
                );
              }
              return (
                <Group
                  title={item.title}
                  id={item.id}
                  navigation={navigation}
                />
              );
            }}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View style={styles.listAction}>
          <View style={styles.addNewList}>
            <AntDesign name="plus" size={25} color="#313699" />
            <Text
              style={styles.addNewListText}
              onPress={() => {
                navigation.navigate("NewList", {
                  listName: "Untitled List",
				  newList: true,
				  color: "#F44336"
                });
              }}
            >
              New list
            </Text>
          </View>
          <View style={styles.addNewGroup}>
            <MaterialCommunityIcons
              name="shape-rectangle-plus"
              size={25}
              color="#313699"
              onPress={() => {
                setShowModal(true);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: "white",
  },
  tasksListLinks: {
    height: "45%",
    paddingVertical: 12,
  },
  tasksList: {
    height: "55%",
    justifyContent: "space-between",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  list: {
    height: "80%",
  },
  listAction: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addNewList: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  addNewListText: {
    color: "#313699",
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    marginLeft: 10,
  },
  addNewGroup: {
    padding: 5,
  },
  createGroupText: {
    color: "#0413bf",
  },
  headerContainer: {
    flexDirection: "row",
    // width: '75%',
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 50,
  },
  name: {
    fontFamily: "Roboto-Bold",
  },
  email: {
    fontFamily: "Roboto-Regular",
  },
  modalTitle: {
    fontFamily: "Roboto-Bold",
    fontSize: 18,
    paddingBottom: 20,
  },
  modalInput: {
    height: 40,
    fontSize: 18,
    paddingLeft: 6,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 30,
  },
});

export const HomeHeaderTitle: React.FC = () => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Image
          style={styles.profileImage}
          source={{
            uri:
              "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
          }}
        />
      </View>
      <View>
        <Text style={styles.name}>
          {" "}
          babatunde ololade
          <Entypo name="chevron-down" size={17} />{" "}
        </Text>
        <Text style={styles.email}> baba@tunde.com </Text>
      </View>
    </View>
  );
};

export default HomeScreen;
