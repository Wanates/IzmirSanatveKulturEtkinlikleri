import { Platform } from 'react-native';

export const COLORS = {
  // Ana renkler
  primary: '#FF385C',
  secondary: '#00A699',
  tertiary: '#484848',

  // Durum renkleri
  success: '#00B797',
  warning: '#FEB60A',
  error: '#FF4842',

  // Nötr renkler
  black: '#222222',
  darkGray: '#484848',
  gray: '#767676',
  lightGray: '#DDDDDD',
  border: '#EBEBEB',
  background: '#F7F7F7',
  white: '#FFFFFF',

  // Özel renkler
  cardShadow: 'rgba(0, 0, 0, 0.08)',
  overlay: 'rgba(0, 0, 0, 0.4)',

  // Etiket renkleri
  tagBackground: {
    primary: '#FFE8EC', // Açık kırmızı
    secondary: '#E6F6F6', // Açık turkuaz
    success: '#E6F8F5', // Açık yeşil
  },
};

export const FONTS = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
  }),
  medium: Platform.select({
    ios: '-apple-system',
    android: 'Roboto-Medium',
  }),
  bold: Platform.select({
    ios: '-apple-system',
    android: 'Roboto-Bold',
  }),
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  }
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.cardShadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  }
};

export const TEXT_STYLES = {
  h1: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.xxl,
    color: COLORS.black,
    lineHeight: 38,
  },
  h2: {
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.xl,
    color: COLORS.black,
    lineHeight: 32,
  },
  title: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.size.lg,
    color: COLORS.black,
    lineHeight: 24,
  },
  subtitle: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.darkGray,
    lineHeight: 22,
  },
  body: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.darkGray,
    lineHeight: 22,
  },
  caption: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.sm,
    color: COLORS.gray,
    lineHeight: 18,
  },
  tag: {
    fontFamily: FONTS.medium,
    fontSize: FONTS.size.xs,
    lineHeight: 16,
  },
};

export const LAYOUT = {
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  card: {
    borderRadius: 12,
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  }
}; 