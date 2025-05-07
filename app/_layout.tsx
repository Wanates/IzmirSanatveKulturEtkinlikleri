import { Stack } from 'expo-router';
import { COLORS } from '@/constants/theme';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    />
  );
}
