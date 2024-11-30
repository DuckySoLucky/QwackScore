import { getThemeElement } from '@/API/theme';
import { ViewProps } from '../Themed';
import { View } from 'react-native';

export function Container(props: ViewProps) {
  const { style, ...otherProps } = props;
  const container = getThemeElement('containerElement') as object;

  return <View style={[{ ...container }, style]} {...otherProps} />;
}

export function InnerContainer(props: ViewProps) {
  const { style, ...otherProps } = props;
  const innerContainer = getThemeElement('innerContainerElement') as object;

  return <View style={[{ ...innerContainer }, style]} {...otherProps} />;
}
