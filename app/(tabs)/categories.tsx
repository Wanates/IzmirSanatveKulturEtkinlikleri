import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  useWindowDimensions,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { Event } from "@/types/event";
import EventCard from "@/components/EventCard";
import {
  COLORS,
  SPACING,
  TEXT_STYLES,
  SHADOWS,
  LAYOUT,
} from "@/constants/theme";

interface Kategori {
  id: string;
  isim: string;
  ikon: string;
}

type KategoriEslesmeleri = {
  [key: string]: string[];
};

const API_ADRESI =
  "https://openapi.izmir.bel.tr/api/ibb/kultursanat/etkinlikler";

const KATEGORILER: Kategori[] = [
  { id: "tiyatro", isim: "Tiyatro", ikon: "🎭" },
  { id: "konser", isim: "Konser", ikon: "🎵" },
  { id: "sergi", isim: "Sergi", ikon: "🎨" },
  { id: "soylesi", isim: "Söyleşi", ikon: "💭" },
  { id: "sinema", isim: "Sinema", ikon: "🎬" },
  { id: "cocuk", isim: "Çocuk", ikon: "🧸" },
  { id: "opera", isim: "Opera", ikon: "🎻" },
  { id: "diger", isim: "Diğer", ikon: "📅" },
  { id: "bos", isim: "", ikon: "" },
];

const KATEGORI_ESLESMELERI: KategoriEslesmeleri = {
  tiyatro: ["TİYATRO"],
  konser: ["KONSER", "MÜZİK"],
  sergi: ["SERGİ"],
  soylesi: ["SÖYLEŞİ", "PANEL"],
  sinema: ["SİNEMA", "FİLM"],
  cocuk: ["ÇOCUK"],
  opera: ["OPERA", "BALE"],
  diger: ["DİĞER"],
};

export default function KategorilerSayfasi() {
  const { width: ekranGenisligi } = useWindowDimensions();
  const kartGenisligi = ekranGenisligi - 16;

  const [seciliKategori, setSeciliKategori] = useState<string | null>(null);
  const [etkinlikler, setEtkinlikler] = useState<Event[]>([]);
  const [yukleniyor, setYukleniyor] = useState(false);

  const kategoriyeGoreEtkinlikleriGetir = async (kategori: string) => {
    setYukleniyor(true);
    setEtkinlikler([]);
    try {
      const yanit = await axios.get<Event[]>(API_ADRESI);
      const kategoriAnahtarKelimeleri = KATEGORI_ESLESMELERI[kategori] || [
        kategori.toUpperCase(),
      ];

      const filtrelenmisEtkinlikler = yanit.data.filter((etkinlik) => {
        if (!etkinlik.Tur) return false;

        if (kategori === "diger") {
          const tumKategoriler = Object.values(KATEGORI_ESLESMELERI)
            .flat()
            .filter((k) => k !== "DİĞER");
          return !tumKategoriler.includes(etkinlik.Tur);
        }

        if (etkinlik.Tur === "DİĞER") {
          const aramaMetni =
            `${etkinlik.Adi} ${etkinlik.KisaAciklama}`.toLowerCase();
          return kategoriAnahtarKelimeleri.some((anahtar) =>
            aramaMetni.includes(kategori.toLowerCase())
          );
        }

        return kategoriAnahtarKelimeleri.includes(etkinlik.Tur);
      });

      setEtkinlikler(filtrelenmisEtkinlikler);
    } catch (hata) {
      console.error("Etkinlikler yüklenirken hata:", hata);
      Alert.alert(
        "Hata",
        "Etkinlikler yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
      );
    } finally {
      setYukleniyor(false);
    }
  };

  const kategoriSec = (kategori: string) => {
    setSeciliKategori(kategori);
    kategoriyeGoreEtkinlikleriGetir(kategori);
  };

  const geriDon = () => {
    setSeciliKategori(null);
    setEtkinlikler([]);
  };

  return (
    <View style={stiller.kapsayici}>
      {!seciliKategori ? (
        <FlatList
          data={KATEGORILER.filter((kat) => kat.isim !== "")}
          keyExtractor={(item) => `kategori_${item.id}`}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                stiller.kategoriKarti,
                { width: (ekranGenisligi - SPACING.lg * 3) / 2 },
              ]}
              onPress={() => kategoriSec(item.id)}
            >
              <Text style={stiller.kategoriIkonu}>{item.ikon}</Text>
              <Text style={stiller.kategoriIsmi}>{item.isim}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={stiller.kategorilerKapsayici}
        />
      ) : (
        <View style={stiller.etkinliklerKapsayici}>
          <View style={stiller.ustBar}>
            <TouchableOpacity style={stiller.geriButonu} onPress={geriDon}>
              <Text style={stiller.geriButonMetni}>← Geri</Text>
            </TouchableOpacity>
            <Text style={stiller.seciliKategoriBaslik}>
              {KATEGORILER.find((k) => k.id === seciliKategori)?.isim}
            </Text>
          </View>
          <FlatList
            data={etkinlikler}
            key="kategori-etkinlikleri"
            keyExtractor={(item, index) =>
              `kategori_etkinlik_${item.Id}_${index}`
            }
            renderItem={({ item }) => (
              <EventCard
                etkinlik={item}
                stil={{
                  width: kartGenisligi,
                  marginBottom: SPACING.sm,
                  height: 120,
                }}
                resimStili={{
                  width: 120,
                  height: "100%",
                }}
                yatay={true}
              />
            )}
            contentContainerStyle={stiller.etkinliklerListesi}
            maxToRenderPerBatch={5}
            windowSize={5}
            removeClippedSubviews={true}
            ListEmptyComponent={
              yukleniyor ? (
                <View style={stiller.yukleniyorKutu}>
                  <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
              ) : (
                <View style={stiller.bosKutu}>
                  <Text style={stiller.bosMetin}>
                    Bu kategoride etkinlik bulunamadı
                  </Text>
                </View>
              )
            }
          />
        </View>
      )}
    </View>
  );
}

const stiller = StyleSheet.create({
  kapsayici: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  kategorilerKapsayici: {
    padding: SPACING.lg,
  },
  kategoriKarti: {
    height: 120,
    backgroundColor: COLORS.white,
    borderRadius: LAYOUT.borderRadius.md,
    padding: SPACING.lg,
    alignItems: "center",
    justifyContent: "center",
    margin: SPACING.sm,
    ...SHADOWS.small,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.03)",
  },
  kategoriIkonu: {
    fontSize: SPACING.xxl,
    marginBottom: SPACING.sm,
  },
  kategoriIsmi: {
    ...TEXT_STYLES.subtitle,
    textAlign: "center",
    color: COLORS.darkGray,
  },
  etkinliklerKapsayici: {
    flex: 1,
  },
  ustBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.lg,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.small,
  },
  geriButonu: {
    marginRight: SPACING.lg,
    padding: SPACING.xs,
  },
  geriButonMetni: {
    ...TEXT_STYLES.subtitle,
    color: COLORS.primary,
  },
  seciliKategoriBaslik: {
    ...TEXT_STYLES.h2,
    color: COLORS.darkGray,
  },
  etkinliklerListesi: {
    padding: SPACING.sm,
    paddingBottom: SPACING.xl,
  },
  yukleniyorKutu: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: SPACING.xxl,
  },
  bosKutu: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: SPACING.xxl,
    paddingHorizontal: SPACING.xl,
  },
  bosMetin: {
    ...TEXT_STYLES.subtitle,
    textAlign: "center",
    color: COLORS.gray,
  },
});
