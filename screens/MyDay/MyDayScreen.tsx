import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Entypo } from '@expo/vector-icons';

import FabButton from '../../components/FabButton';
import AddTask from '../../components/AddTask';

const MyDayScreen: React.FC = () => {
	const todayDate = new Date().toString().split(' ')
	return (
		<View style={styles.screen}>
			<ImageBackground 
				source={require('../../assets/images/myday2.webp')} 
				style={styles.image}>
				<Text style={styles.myDayText}> My Day</Text>
				<Text style={styles.dateText} > {`${todayDate[0]}, ${todayDate[1]} ${todayDate[2]}`} </Text>
				<View style={styles.todayCard}>
					<Entypo name="light-up" size={15} color="white" />
					<Text style={styles.todayText}> Today </Text>
				</View>
				<FabButton style={{backgroundColor: "#2288fa"}} onPress={() => {}}>  
                	<Entypo name="plus" size={32} color="white" />
            	</FabButton>
				<AddTask />
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
	  flex: 1,
	  flexDirection: "column"
	},
	image: {
	  flex: 1,
	  resizeMode: "center",
	  backgroundColor: 'rgba(0,0,0,.8)',
	//   padding: 10
	},
	myDayText: {
		fontFamily: 'Roboto-Bold',
		fontSize: 30,
		color: 'white',
		paddingHorizontal: 10
	},
	dateText: {
		fontFamily: 'Roboto-Bold',
		fontSize: 18,
		color: 'white',
		letterSpacing: 3,
		paddingHorizontal: 10
	},
	todayCard: {
		flexDirection: 'row',
		width: 100,
		backgroundColor: "#2288fa",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		padding: 5,
		position: "absolute",
		bottom: 20,
		margin: 16,
		left: '30%'
	},
	todayText: {
		fontFamily: "Roboto-Bold",
		fontSize: 15,
		color: "white",
		marginLeft: 5
	}
  });

export default MyDayScreen;
