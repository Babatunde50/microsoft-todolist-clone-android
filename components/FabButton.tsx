import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FabButton: React.FC = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{...styles.button, ...props.style}}>
            { props.children }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        backgroundColor: "white",
        textAlign: "center",
        margin: 16,
        right: 0,
        bottom: 0,
        width: 60,
        height: 60,
        borderRadius: 50
    }
})

export default FabButton;