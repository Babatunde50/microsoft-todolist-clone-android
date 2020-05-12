import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { ColorPicker } from 'react-native-status-color-picker';

import Modal from '../../components/Modal';
import MyButton from '../../components/MyButton';
import Colors from '../../utils/colors';
import FabButton from '../../components/FabButton';
import { NewListProp } from '../../navigation/TodoNavigation';
import { TodoListContext, todoContext } from '../../providers/TodoList'

function NewListScreen({ route, navigation }: NewListProp) {
    const todoDB = useContext(TodoListContext) as todoContext;
    const { listName, newList } = route.params;
    const [ groupName, setGroupName] = useState("");
    const [title, setTitle] = useState(listName);
    const [showModal, setShowModal] = useState(newList);
    const [selectedColor, setSelectedColor] = useState('#F44336')

    let disabled = groupName.length < 1 ? true : false;
	return (
		<View style={{flex: 1, backgroundColor: selectedColor}}>
            <Modal isOpen={showModal}> 
				<Text style={styles.modalTitle}> New list </Text>
                <View style={styles.inputContainer}> 
                    <Entypo name="emoji-happy" size={20} color={selectedColor} />
                    <TextInput value={groupName} onChangeText={text => setGroupName(text)} placeholder="Enter list title" placeholderTextColor="#ccc"  style={styles.modalInput} underlineColorAndroid={selectedColor} />
                </View>
                {/* <View style={styles.colorButtonContainer}> 
                    <MyButton style={styles.colorButton}>
                        <Text> Color </Text>
                    </MyButton>
                    <MyButton  style={styles.colorButton}>
                        <Text> Photo </Text> 
                    </MyButton>
                </View> */}
                <View> 
                    <ColorPicker
                        colors={Colors}
                        selectedColor={selectedColor}
                        onSelect={(color: string) => { 
                            setSelectedColor(color);
                            navigation.setOptions({
                                headerStyle: {
                                    backgroundColor: color,
                                    elevation: 0
                                }
                            })
                        }}
                    />
                </View>
				<View style={styles.modalActions}> 
					<MyButton onPress={() => { 
                        navigation.goBack();
                        setShowModal(false)
                         } }> 
						<Text> CANCEL </Text>
					</MyButton>
					<MyButton onPress={() => {
                        todoDB.addList(groupName, selectedColor)
                        setShowModal(false);
                        setTitle(groupName)
                    }}  disabled={disabled} style={{opacity: disabled ? .2 : 1}} > 
						<Text> CREATE LIST </Text>
					</MyButton>
				</View>
			</Modal>
			<Text style={styles.title}> {title} </Text>
            <FabButton>  
                <Entypo name="plus" size={32} color={selectedColor} />
            </FabButton>
		</View>
	);
};

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontFamily: 'Roboto-Bold',
        color: 'white'
    },
    modalTitle: {
		fontFamily: 'Roboto-Bold',
		fontSize: 18,
		paddingBottom: 20
    },
    colorButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5
    },
    colorButton: {
        borderWidth: 2,
        borderColor: 'red',
        backgroundColor: 'white',
        padding: 5,
        margin: 2,
        borderRadius: 20
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
	modalInput: {
		height: 40,
		fontSize: 18,
        paddingLeft: 6,
        width: '95%',
        marginLeft: 5
	},
	modalActions: {
		flexDirection: 'row',
		justifyContent: "flex-end",
		marginTop: 30,
	}
})

export default NewListScreen;