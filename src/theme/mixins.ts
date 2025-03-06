import { StyleSheet } from 'react-native';

export const styleMixins = StyleSheet.create({
  flexGrow: { flexGrow: 1 },
  flexGrowUndefined: { flexGrow: undefined },
  flexOne: { flex: 1 },
  row: { flexDirection: 'row' },
  opacityZero: { opacity: 0 },
});
