import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AssignedListScreen: React.FC = () => {
	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Assigned to you</Text>
			<View style={styles.centered}>
				<Image source={require("../../assets/images/task.png")} style={styles.image} />
				<Text style={styles.text}> Tasks assigned to you will appear here </Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#b6d9b4"
	},
	title: {
		color: "green",
		fontFamily: "Roboto-Bold",
		fontSize: 25,
		paddingHorizontal: 10
	},
	centered: {
		flex: .8,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		borderRadius: 100,
		height: 150,
		width: 150,
		backgroundColor: "#b6d9b4",

	},
	text: {
		color: "green",
		paddingVertical: 10,
		fontFamily: 'Roboto-Regular',
	}
})

export default AssignedListScreen;
