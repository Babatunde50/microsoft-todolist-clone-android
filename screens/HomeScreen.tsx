import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import TaskListButton from '../components/TaskListButton';

const HomeScreen: React.FC<{ navigation: { navigate: (arg: string) => void } }> = ({ navigation }) => {
	return (
		<View style={styles.screen}>
			<View style={styles.tasksListLinks}>
				<TaskListButton
					title="My Day"
					iconName="sun"
					iconSize={15}
					iconColor="#ccc"
					onPress={() => {
						navigation.navigate('Myday');
					}}
				/>
				<TaskListButton
					title="Important"
					iconName="star"
					iconSize={15}
					iconColor="red"
					onPress={() => {
						navigation.navigate('Important');
					}}
				/>
				<TaskListButton
					title="Planned"
					iconName="calendar"
					iconSize={15}
					iconColor="green"
					onPress={() => {
						navigation.navigate('Planned');
					}}
				/>
				<TaskListButton
					title="Assigned To You"
					iconName="user"
					iconSize={15}
					iconColor="green"
					onPress={() => {
						navigation.navigate('Assign');
					}}
				/>
				<TaskListButton
					title="Tasks"
					iconName="layers"
					iconSize={15}
					iconColor="blue"
					onPress={() => {
						navigation.navigate('Tasks');
					}}
				/>
			</View>
			<View style={styles.tasksList}>
				<Text>To be Added Later</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		paddingHorizontal: 8,
		backgroundColor: 'white',
	},
	tasksListLinks: {
		height: '50%',
		paddingVertical: 12,
		borderBottomWidth: 2,
		borderBottomColor: '#ccc',
	},
	tasksList: {
		marginTop: 3,
	},
	headerContainer: {
		flexDirection: 'row',
		// width: '75%',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	profileImage: {
		height: 40,
		width: 40,
		borderRadius: 50
	},
	name: {
		fontFamily: 'Roboto-Bold',
	},
	email: {
		fontFamily: 'Roboto-Regular',
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
							'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
					}}
				/>
			</View>
			<View>
				<Text style={styles.name}> babatunde ololade<Entypo name="chevron-down" size={17} /> </Text>
				<Text style={styles.email}> baba@tunde.com </Text>
			</View>
		</View>
	);
};

export default HomeScreen;
