import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MyButton: React.FC = (props) => {
    return (
        <TouchableOpacity disabled={props.disabled} onPress={props.onPress} style={{...styles.button, ...props.style}}>
            { props.children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "white",
        padding: 10     
    }
})

export default MyButton;