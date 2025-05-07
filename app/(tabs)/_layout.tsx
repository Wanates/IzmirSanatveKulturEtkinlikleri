import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, TEXT_STYLES, SHADOWS } from "@/constants/theme";

export default function SekmeDuzeni() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          ...Platform.select({
            ios: {
              shadowColor: COLORS.cardShadow,
              shadowOffset: { width: 0, height: -4 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
            },
            android: {
              elevation: 8,
            },
          }),
        },
        sceneContainerStyle: {
          backgroundColor: COLORS.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Ana Sayfa",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: "Kategoriler",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="grid" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
