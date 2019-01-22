import React, { PureComponent } from 'react'
import { Button } from 'react-native'

class ExampleButton extends PureComponent {
    render() {
        return <Button {...this.props} title="ExampleButton"/>
    }
}

export default ExampleButton