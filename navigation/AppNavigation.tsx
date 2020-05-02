import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import TodoListNavigator from './TodoNavigation'

const AppNavigator = () => {
	return (
		<NavigationContainer>
            <TodoListNavigator />
		</NavigationContainer>
	);
};


export default AppNavigator