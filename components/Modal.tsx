import React from 'react';
import { Alert, Modal, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

const ModalCmp: React.FC<{isOpen: boolean, children: React.JSX }> = ({ isOpen, children }) => {
	return (
			<Modal
				animationType="slide"
				transparent={true}
				visible={isOpen}
			>
            <View style={styles.modalBackdrop}>
                <View style={styles.modalView} > 
                    { children }
                </View>
            </View>
            </Modal>
		
	);
};

const styles = StyleSheet.create({
	modalBackdrop: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,.26)',
	},
	modalView: {
        backgroundColor: 'white',
        margin: 25,
		padding: 20,
		elevation: 5,
	},
});

export default ModalCmp;