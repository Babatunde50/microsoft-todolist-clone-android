import React from 'react';
import { StyleSheet, View } from 'react-native';

type args = {
    children: React.ReactNode,
    style?: {}
}

const todoDatesActions: React.FC<args> = ({ children, style}) => {
    return (
        <View style={ {...styles.container, ...style} }>
            { children }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        padding: 10,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 50,
        left: 20,
        zIndex: 200
    }
})

export default todoDatesActions;