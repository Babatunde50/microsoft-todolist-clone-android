import React from 'react';
import { StyleSheet, View, TextInput, ScrollView, Text } from 'react-native';
import { FontAwesome, MaterialCommunityIcons, Entypo, AntDesign } from '@expo/vector-icons';

const AddTask: React.FC = () => {
    return (
        <View style={styles.container}>
            <View style={styles.input}>
                <FontAwesome name="circle-thin" size={18} color="#ccc" />
                <TextInput style={styles.textInput} placeholder="Task Title" />
                <MaterialCommunityIcons name="arrow-up-box" size={30} color="#ccc" />
            </View>
            <ScrollView horizontal={true} style={styles.actions}>
                <View style={styles.action}>  
                    <AntDesign name="home" size={22} color="#ccc" />
                    <Text style={styles.actionText}>Tasks</Text>
                </View>
                <View style={styles.action}>  
                    <Entypo name="calendar" size={18} color="#ccc" />
                    <Text style={styles.actionText}> Set due date </Text>
                </View>
                <View style={styles.action}>  
                    <AntDesign name="bells" size={18} color="#ccc" />
                    <Text style={styles.actionText}> Remind me </Text>
                </View>
                <View style={styles.action}>  
                    <Entypo name="loop" size={18} color="#ccc" />
                    <Text style={styles.actionText}>Repeat</Text>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
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
        fontSize: 18
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
        color: '#ccc',
        fontFamily: 'Roboto-Regular',
        marginHorizontal: 5
    }
})

export default AddTask;