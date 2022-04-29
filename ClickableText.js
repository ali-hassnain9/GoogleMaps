import React from "react"
import {Text, TouchableWithoutFeedback, View} from "react-native"

const ClickableText = (props) => {
    return (
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={props.viewStyle}>
                <Text style={[styles.labelStyle, props.style]}>
                    {props.text}
                </Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = {
    labelStyle: {
        fontSize: 14,
    },
}

export { ClickableText }
