import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Octicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

import AssignedListScreen from '../screens/Assigned/AssignedListScreen';
import ImportantListScreen from '../screens/Important/ImportantListScreen';
import MyDayListScreen from '../screens/MyDay/MyDayScreen';
import PlannedListScreen from '../screens/Planned/PlannedListScreen';
import TasksListScreen from '../screens/Tasks/TasksListScreen';
import HomeScreen, { HomeHeaderTitle } from '../screens/HomeScreen';
import NewListScreen from '../screens/NewList/NewListScreen'

const TodoListStackNavigator = createStackNavigator();

const TodoListNavigator = () => (
	<TodoListStackNavigator.Navigator>
		<TodoListStackNavigator.Screen
			name="Home"
			component={HomeScreen}
			options={{
                headerTitle: (props) => <HomeHeaderTitle {...props} />,
                headerStyle: {
                    backgroundColor: 'white',
                    elevation: 0
                },
                headerRight: () => (
                    <View style={{padding: 10}}>
                        <Octicons name="search" size={23} color="blue" />
                    </View>
                )
			}}
		/>
		<TodoListStackNavigator.Screen name="Assign" component={AssignedListScreen} />
		<TodoListStackNavigator.Screen name="Important" component={ImportantListScreen} />
		<TodoListStackNavigator.Screen name="Myday" component={MyDayListScreen} />
		<TodoListStackNavigator.Screen name="Planned" component={PlannedListScreen} />
		<TodoListStackNavigator.Screen name="Tasks" component={TasksListScreen} />
		<TodoListStackNavigator.Screen name="NewList" component={NewListScreen} options={{
			title: "",
			headerStyle: {
				backgroundColor: "#F44336",
				elevation: 0
			},
			headerRight: () => (
				<View style={{padding: 10, flexDirection: "row", justifyContent: "space-between"}}>
					<AntDesign name="adduser" size={25} color="white" />
					<MaterialCommunityIcons name="dots-vertical" size={25} color="white" />
				</View>
			)
		}} />
	</TodoListStackNavigator.Navigator>
);

export default TodoListNavigator;
