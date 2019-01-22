import React, { PureComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { ExampleButton } from 'components'

class InitialScreen extends PureComponent {
    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <ExampleButton title="Example" onPress={() => console.log('Pressed')}/>
            </View>
        )
    }
}

export default InitialScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});