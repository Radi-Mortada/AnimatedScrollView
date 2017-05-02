import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles, Fonts } from '../../Themes/'
import I18n from 'react-native-i18n'

export default StyleSheet.create({
    header: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        backgroundColor: 'black',
    },
    bar: {
        marginTop: 10,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: 'white',
        fontSize: 18,
    },
    scrollViewContent: {
        marginTop: 200,
    },

})