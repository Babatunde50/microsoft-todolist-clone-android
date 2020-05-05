import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MyButton: React.FC<{ disabled?: boolean, onPress?: () => void, style?: {}, children: React.ReactNode  }> = ( { disabled, onPress, style, children} ) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{...styles.button, ...style}}>
            { children}
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