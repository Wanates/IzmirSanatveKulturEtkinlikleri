import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  Linking,
  Alert,
} from "react-native";
import { Event } from "@/types/event";
import {
  COLORS,
  SPACING,
  TEXT_STYLES,
  SHADOWS,
  LAYOUT,
} from "@/constants/theme";

interface EtkinlikProps {
  etkinlik: Event;
  stil?: ViewStyle;
  resimStili?: ImageStyle;
  yatay?: boolean;
}

export default function EventCard({
  etkinlik,
  stil,
  resimStili,
  yatay,
}: EtkinlikProps) {
  const baglantiyaGit = async () => {
    console.log(etkinlik);
    if (etkinlik.EtkinlikUrl) {
      try {
        const acilabilir = await Linking.canOpenURL(
          "https://kultursanat.izmir.bel.tr/" + etkinlik.EtkinlikUrl
        );
        if (acilabilir) {
          await Linking.openURL(
            "https://kultursanat.izmir.bel.tr/" + etkinlik.EtkinlikUrl
          );
        } else {
          Alert.alert("Hata", "Bu etkinlik bağlantısı açılamıyor.");
        }
      } catch (hata) {
        Alert.alert("Hata", "Etkinlik sayfası açılırken bir sorun oluştu.");
      }
    } else {
      Alert.alert("Bilgi", "Bu etkinlik için detay sayfası bulunmuyor.");
    }
  };

  return (
    <TouchableOpacity
      style={[stiller.kart, stil]}
      activeOpacity={0.7}
      onPress={baglantiyaGit}
    >
      <View style={stiller.yatayKapsayici}>
        <Image
          source={{
            uri: etkinlik.Resim,
            cache: "force-cache",
          }}
          style={[stiller.resim, resimStili]}
          resizeMode="cover"
          fadeDuration={0}
        />
        <View style={stiller.icerik}>
          <View>
            <Text style={stiller.baslik} numberOfLines={3}>
              {etkinlik.Adi}
            </Text>
            <Text style={stiller.konum} numberOfLines={2}>
              {etkinlik.EtkinlikMerkezi}
            </Text>
          </View>
          <View style={stiller.altBilgi}>
            <Text style={stiller.tarih}>
              {new Date(etkinlik.EtkinlikBaslamaTarihi).toLocaleDateString(
                "tr-TR"
              )}
            </Text>
            <View style={stiller.etiketler}>
              <Text style={stiller.turEtiketi}>{etkinlik.Tur}</Text>
              {etkinlik.UcretsizMi && (
                <Text style={stiller.ucretsizEtiketi}>Ücretsiz</Text>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const stiller = StyleSheet.create({
  kart: {
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.md,
    overflow: "hidden",
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
    width: "100%",
  },
  yatayKapsayici: {
    flexDirection: "row",
    height: "100%",
  },
  resim: {
    backgroundColor: COLORS.background,
    width: 120,
  },
  icerik: {
    flex: 1,
    padding: SPACING.sm,
    justifyContent: "space-between",
    gap: SPACING.xs,
  },
  baslik: {
    ...TEXT_STYLES.title,
    fontSize: 14,
    marginBottom: SPACING.xs,
    lineHeight: 18,
  },
  konum: {
    ...TEXT_STYLES.caption,
    fontSize: 12,
    marginBottom: SPACING.xs,
    lineHeight: 16,
    color: COLORS.gray,
  },
  altBilgi: {
    gap: SPACING.xs,
  },
  tarih: {
    ...TEXT_STYLES.caption,
    fontSize: 11,
    lineHeight: 14,
    color: COLORS.darkGray,
  },
  etiketler: {
    flexDirection: "row",
    gap: SPACING.xs,
    flexWrap: "wrap",
  },
  turEtiketi: {
    ...TEXT_STYLES.tag,
    fontSize: 11,
    color: COLORS.primary,
    backgroundColor: COLORS.tagBackground.primary,
    paddingHorizontal: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: LAYOUT.borderRadius.xs,
    overflow: "hidden",
  },
  ucretsizEtiketi: {
    ...TEXT_STYLES.tag,
    color: COLORS.success,
    backgroundColor: COLORS.tagBackground.success,
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: LAYOUT.borderRadius.xs,
    overflow: "hidden",
  },
});
