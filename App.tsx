import React from 'react';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

import AppNavigator from './navigation/AppNavigation';

export default function App() {
	let [fontsLoaded] = useFonts({
		'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
		'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
		'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
		'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return <AppNavigator />;
	}
}
