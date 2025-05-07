import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  useWindowDimensions,
  Platform,
} from "react-native";
import axios from "axios";
import { Event } from "@/types/event";
import EventCard from "@/components/EventCard";
import { COLORS, SPACING, TEXT_STYLES, SHADOWS } from "@/constants/theme";
import LottieView from "lottie-react-native";
import React from "react";

const API_URL = "https://openapi.izmir.bel.tr/api/ibb/kultursanat/etkinlikler";

export default function AnaSayfa() {
  const [etkinlikler, setEtkinlikler] = useState<Event[]>([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [yenileniyor, setYenileniyor] = useState(false);
  const { width: ekranGenisligi } = useWindowDimensions();
  const kartGenisligi = ekranGenisligi - 32;

  const etkinlikleriGetir = async () => {
    try {
      const yanit = await axios.get<Event[]>(API_URL);
      setEtkinlikler(yanit.data);
    } catch (hata) {
      console.error("Etkinlikler yüklenirken hata:", hata);
    } finally {
      setYukleniyor(false);
      setYenileniyor(false);
    }
  };

  const yenile = () => {
    setYenileniyor(true);
    etkinlikleriGetir();
  };

  useEffect(() => {
    etkinlikleriGetir();
  }, []);

  const KarsilamaBanner = () => (
    <View style={stiller.karsilamaKutusu}>
      <Image
        source={require("@/assets/images/izmir-logo.png")}
        style={[
          stiller.logo,
          {
            width: ekranGenisligi * 0.7,
            height: ekranGenisligi * 0.7 * 0.35,
          },
        ]}
        resizeMode="contain"
      />
      <LottieView
        source={require("../../assets/animation/animation.json")}
        style={stiller.animasyon}
        autoPlay
      />

      <Text style={stiller.karsilamaBaslik}>İZMİR ETKİNLİKLERİ</Text>
      <Text style={stiller.karsilamaAltBaslik}>
        Şehrin Kültür ve Sanat Etkinliklerini Keşfedin
      </Text>
    </View>
  );

  if (yukleniyor) {
    return (
      <View style={stiller.yukleniyorKutu}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={stiller.kapsayici}>
      <FlatList
        data={etkinlikler}
        key="tek-sutun"
        keyExtractor={(item, index) => `etkinlik_${item.Id}_${index}`}
        renderItem={({ item }) => (
          <EventCard
            etkinlik={item}
            stil={{
              width: ekranGenisligi - 16,
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
        contentContainerStyle={stiller.listeIcerik}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews={true}
        ListHeaderComponent={KarsilamaBanner}
        stickyHeaderIndices={[0]}
        refreshControl={
          <RefreshControl refreshing={yenileniyor} onRefresh={yenile} />
        }
      />
    </View>
  );
}

const stiller = StyleSheet.create({
  kapsayici: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  yukleniyorKutu: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listeIcerik: {
    padding: SPACING.sm,
    paddingBottom: SPACING.xl,
    backgroundColor: COLORS.background,
  },
  karsilamaKutusu: {
    backgroundColor: COLORS.white,
    padding: SPACING.lg,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    ...SHADOWS.small,
  },
  logo: {
    marginBottom: 16,
  },
  karsilamaBaslik: {
    ...TEXT_STYLES.h2,
    color: COLORS.darkGray,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
  karsilamaAltBaslik: {
    ...TEXT_STYLES.subtitle,
    color: COLORS.gray,
    textAlign: "center",
  },
  animasyon: {
    textAlign: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
  },
});
