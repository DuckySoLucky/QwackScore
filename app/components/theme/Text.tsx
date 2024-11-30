import { getThemeElement } from '@/API/theme';
import { TextProps } from '../Themed';
import { Text as RawText } from 'react-native';

export function MainText(props: TextProps): JSX.Element {
  const { style, ...otherProps } = props;
  const mainText = getThemeElement('mainTextElement') as object;

  return <RawText style={[{ ...mainText }, style]} {...otherProps} />;
}

export function Text(props: TextProps): JSX.Element {
  const { style, ...otherProps } = props;
  const mainText = getThemeElement('textElement') as object;

  return <RawText style={[{ ...mainText }, style]} {...otherProps} />;
}
