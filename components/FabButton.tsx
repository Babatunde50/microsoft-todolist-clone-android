import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const FabButton: React.FC<{ style: {}, onPress: () => void, children: React.ReactNode }> = ({ style, onPress, children }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{...styles.button, ...style}}>
            { children }
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