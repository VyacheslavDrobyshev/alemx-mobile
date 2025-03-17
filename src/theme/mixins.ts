import { StyleSheet } from 'react-native';

export const styleMixins = StyleSheet.create({
  flexGrow: { flexGrow: 1 },
  flexGrowUndefined: { flexGrow: undefined },
  flexOne: { flex: 1 },
  opacityZero: { opacity: 0 },
  row: { flexDirection: 'row' },
});
