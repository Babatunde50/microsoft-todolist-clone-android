import React, { useContext } from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';

import { TodoListContext, todoContext } from '../providers/TodoList';
import { TodoDetailsProp } from '../navigation/TodoNavigation';

function TodoDetailsScreen({ route, navigation }: TodoDetailsProp) {
	const { todos } = useContext(TodoListContext) as todoContext;
	const { id } = route.params;
	const foundTodo = todos.find((todo) => todo.id === id);
	return (
		<View style={styles.screen}>
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
                        <AntDesign name="plus" size={24} color="#3b08d4" />
                        <Text style={styles.nextStepText}>Next step</Text>
                    </View>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 5,
		// elevation: 3,
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
        paddingHorizontal: 20,
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
        padding: 8
    },
    nextStepText: {
        color: "#3b08d4",
        paddingHorizontal: 10,
        fontFamily: "Roboto-Bold",
        fontSize: 16,
        letterSpacing: 2
    }
});

export default TodoDetailsScreen;
