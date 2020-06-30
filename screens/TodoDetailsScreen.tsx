import React, { useContext } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { FontAwesome, Feather, AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';

import { TodoListContext, todoContext } from '../providers/TodoList';
import { TodoDetailsProp } from '../navigation/TodoNavigation';

function TodoDetailsScreen({ route, navigation }: TodoDetailsProp) {
	const { todos } = useContext(TodoListContext) as todoContext;
	const { id } = route.params;
	const foundTodo = todos.find((todo) => todo.id === id);
	return (
		<KeyboardAvoidingView style={styles.screen}>
			<View style={styles.header}>
				<View style={styles.input}>
					<FontAwesome name="circle-thin" size={35} color="#868a8f" />
					<TextInput value={foundTodo?.title} onChangeText={(text) => ''} style={styles.textInput} />
				</View>
				<FontAwesome name="star" size={28} color={foundTodo?.important === 1 ? 'red' : '#ccc'} />
			</View>
			<ScrollView>
				<View style={styles.stepList}>
					{foundTodo?.steps?.split('\n').map((step) => (
						<View style={styles.stepContainer}>
							<View style={styles.input}>
								<FontAwesome name="circle-thin" size={25} color="#868a8f" />
								<TextInput value={step} onChangeText={(text) => ''} style={{...styles.textInput, ...styles.stepInput} } />
							</View>
							<FontAwesome name="times" size={18} color="#ccc" />
						</View>
					))}
                    <View style={styles.nextStep}>
                        <AntDesign name="plus" size={24} color="#250387" />
                        <Text style={styles.nextStepText}>Next step</Text>
                    </View>
				</View>
				<View style={styles.addToDay}>
					<Feather name="sun" size={24} color="black" />
					<Text style={styles.addToDayText} >Add to My Day</Text>
				</View>
				<View style={styles.time}>
					<View style={styles.timeItem}>
						<AntDesign name="bells" size={24} color="black" />
						<View style={styles.timeItemText}>
							<Text> Remind me </Text>
						</View>
					</View>
					<View style={styles.timeItem}>
						<AntDesign name="calendar" size={24} color="black" />
						<View style={styles.timeItemText}>
							<Text> Add due date </Text>
						</View>
					</View>
					<View style={styles.timeItem}>
						<Entypo name="loop" size={24} color="black" />
						<View style={styles.timeItemText}>
							<Text> Repeat </Text>
						</View>
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
						multiline={true}
						numberOfLines={2}
						placeholder="Add note"
					 />
				</View>
			</ScrollView>
			<View style={styles.dateCreatedContainer}>
				<Text> Created on { foundTodo?.createdAt?.slice(0, 10) } </Text>
				<AntDesign name="delete" size={24} color="black" />
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#fafafa"
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 10,
		elevation: 3,
		backgroundColor: "white"
	},
	input: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	textInput: {
		width: '80%',
		height: 40,
		padding: 6,
		fontFamily: 'Roboto-Bold',
		fontSize: 18,
		color: 'black',
		textDecorationLine: 'none',
    },
    stepList: {
        // paddingHorizontal: 20,
        elevation: 5
    },
    stepContainer: {
        flexDirection: 'row',
		justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    stepInput: {
        fontFamily: "Roboto-Regular",
        fontSize: 16
    },
    nextStep: {
        flexDirection: "row",
        alignItems: "center",
		paddingHorizontal: 8,
		paddingVertical: 20,
		elevation: 2,
		backgroundColor: "white",
		marginBottom: 2
    },
    nextStepText: {
        color: "#250387",
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
		margin: 5
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
		backgroundColor: "white"
	},
	timeItem: {
		flexDirection: "row",
		marginVertical: 5,
		alignItems: "center",
		justifyContent: "space-between"
	},
	timeItemText: {
		marginHorizontal: 10,
		paddingVertical: 10,
		borderBottomWidth: .5,
		borderBottomColor: "#2c2f33",
		width: '85%',
		color: "#524e5c"
	},
	noteContainer: {
		height: 120,
		padding: 15,
		elevation: 5,
		backgroundColor: "white",
		margin: 5,
		justifyContent: "flex-start"
	},
	noteText: {
		margin: 0,
		padding: 0
	},
	dateCreatedContainer: {
		padding: 10,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	createdText: {
		color: "#2c2f33",
        fontFamily: "Roboto-Regular",
        fontSize: 16,
        letterSpacing: 2
	}
});

export default TodoDetailsScreen;
