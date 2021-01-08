import Snackbar from 'react-native-snackbar'

const showSnackbar = (text: string): void => {
  Snackbar.show({text, action: {text: 'Dismiss'}})
}

export default showSnackbar
