import Snackbar from 'react-native-snackbar'

export const showSnackbar = (text: string) => {
  Snackbar.show({text, action: {text: 'Dismiss'}})
}
