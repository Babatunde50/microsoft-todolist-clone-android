import React from 'react';
import { View, StyleSheet } from 'react-native';

const SmallCard: React.FC<{ children?: React.ReactNode, style?: {} }> = ( { children, style} ) => {
	return (
		<View style={{ ...styles.todayCard, ...style }}>
            { children }
		</View>
	);
};

const styles = StyleSheet.create({
    todayCard: {
		flexDirection: 'row',
		width: 100,
		backgroundColor: "#376e69",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		padding: 5,
		position: "absolute",
		bottom: 10,
		margin: 16,
		left: '30%'
	}
})

export default SmallCard;
