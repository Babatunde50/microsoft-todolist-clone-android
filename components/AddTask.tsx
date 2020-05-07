import React from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text, TouchableOpacity } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';

type taskArgs = {
    task: string;
    show: boolean;
    taskInputHandler: (val: string) => void;
    submitTaskHandler: () => void;
    showDueDateHandler: () => void;
    showReminderHandler: () => void;
    showRepeatHandler: () => void;
}

const AddTask: React.FC<taskArgs> = ({ task, show, taskInputHandler, showReminderHandler, showRepeatHandler, submitTaskHandler, showDueDateHandler }) => {
    if(!show) {
        return null;
    }
    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <FontAwesome name="circle-thin" size={18} color="#868a8f" />
                <TextInput value={task} onChangeText={taskInputHandler} style={styles.textInput} placeholder="Task Title" />
                <MaterialCommunityIcons name="arrow-up-box" size={30} color="#868a8f" onPress={ submitTaskHandler } />
            </View>
            <ScrollView horizontal={true} style={styles.actions} contentContainerStyle={styles.contentContainer}>
                <View style={styles.action}>  
                    <AntDesign name="home" size={22} color="#868a8f" />
                    <Text style={styles.actionText}>Tasks</Text>
                </View>
                <TouchableOpacity onPress={showDueDateHandler} style={styles.action}>  
                    <Entypo name="calendar" size={18} color="#868a8f"  />
                    <Text style={styles.actionText}> Set due date </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={showReminderHandler}>  
                    <AntDesign name="bells" size={18} color="#868a8f"  />
                    <Text style={styles.actionText} > Remind me </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.action} onPress={showRepeatHandler}>  
                    <Entypo name="loop" size={18} color="#868a8f"  />
                    <Text style={styles.actionText}>Repeat</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 5,
        position: 'absolute',
        width: '100%',
        bottom: 0,
        left: 0,
        zIndex: 100
    },
    input: {    
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textInput: {
        width: '80%',
        height: 40,
        padding: 6,
        fontFamily: "Roboto-Regular",
        fontSize: 18,
        color: '#868a8f',
        textDecorationLine: 'none'
    },
    contentContainer: {
        paddingVertical: 20
    },
    actions: {
        flexDirection: 'row',
    },
    action: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5
    },
    actionText: {
        color: '#868a8f',
        fontFamily: 'Roboto-Regular',
        marginHorizontal: 5
    }
})

export default AddTask;