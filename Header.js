import React from "react";
import {ActivityIndicator, Platform, StyleSheet, Text, View} from "react-native";
import {ClickableText} from "./ClickableText";


const CustomHeader = (props) => {
    // const navigation = useNavigation()

    function renderClickableText() {
        if (props.menuButtonText) {
            return (
                <View
                    style={[
                        {
                            alignItems: 'flex-end',
                            marginEnd: 5,
                            justifyContent: 'center',
                        },
                        props.menuButtonStyle,
                    ]}
                >
                    {!props.loading ? (
                        <ClickableText
                            onPress={() => {
                                !props.loading ? props.menuButtonClicked() : null
                            }}
                            style={{
                                color: 'lightblue',
                                marginRight: 2,
                                padding: 10,
                            }}
                            text={props.menuButtonText}
                        />
                    ) : (
                        <ActivityIndicator color={'blue'}/>
                    )}
                </View>
            )
        }
    }

    function renderTitle() {
        return (
            <View style={[{alignItems: 'flex-start'}]}>
                <View style={{flexDirection: 'row'}}>
                    {props.title && (
                        <Text
                            numberOfLines={1}
                            style={[
                                {
                                    fontWeight: '600',
                                    fontSize: 16,
                                    marginTop: Platform.OS === 'android'
                                        ? 2
                                        : 0,
                                },
                                {...props.headerStyle},
                            ]}
                        >
                            {props.title}
                        </Text>
                    )}
                </View>
            </View>
        )
    }


    return (
        <View
            style={[
                styles.headerView,
                props.hideElevation ? [] : styles.elevation,
                props.showBorder ? styles.borderView : [],
            ]}
        >
            <View style={[{top: 10}, props.firstSectionStyle]}>
                <Text>
                    {renderTitle()}
                </Text>
            </View>
            <View style={[{top: 10, justifyContent: "flex-end"}]}>
                <Text>
                    {renderClickableText()}
                </Text>
            </View>
        </View>
    )
}
export default CustomHeader
const styles = StyleSheet.create({
    backArrowImage: {
        height: 23,
        width: 23,
    },
    headerView: {
        height: 70,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal:15,
        width:'100%',
        paddingTop:30,
        marginBottom:20
    },
    elevation: {
        shadowColor: 'gray',
        shadowOffset: {width: -1, height: -1},
        shadowOpacity: 0.9,
        shadowRadius: 3,
        zIndex: 5,
        elevation: 5,
    },
})
