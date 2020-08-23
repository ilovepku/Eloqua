import React, {PropsWithChildren} from 'react';
import {Keyboard, ScrollView, TouchableOpacity} from 'react-native';
import tailwind from 'tailwind-rn';

interface Props {
  withScrollView?: boolean;
}

const KeyboardDismissView: React.FC<PropsWithChildren<Props>> = (props) => {
  return props.withScrollView ? (
    <ScrollView
      contentContainerStyle={tailwind('flex-1')}
      keyboardShouldPersistTaps="never">
      {props.children}
    </ScrollView>
  ) : (
    <TouchableOpacity
      style={tailwind('flex-1')}
      activeOpacity={1}
      onPress={Keyboard.dismiss}>
      {props.children}
    </TouchableOpacity>
  );
};

export default KeyboardDismissView;
