# İzmir Kültür Sanat Etkinlikleri Mobil Uygulaması

Bu proje, İzmir Büyükşehir Belediyesi'nin açık API'sinden kültür ve sanat etkinliklerini listeleyen bir React Native (Expo) uygulamasıdır. Kullanıcılar etkinlikleri ana sayfada görebilir, kategorilere göre filtreleyebilir ve detaylarını inceleyebilir.

## Özellikler
- Ana sayfada etkinlik listesi
- Kategoriye göre filtreleme
- Modern ve sade arayüz
- Expo Router ile sekmeli (tab) navigasyon
- Axios ile API'den veri çekme

## Kurulum
1. **Depoyu klonlayın:**
   ```
   git clone <proje-linki>
   cd final
   ```
2. **Bağımlılıkları yükleyin:**
   ```
   yarn install
   ```
3. **Projeyi başlatın:**
   ```
   yarn start
   ```
   veya
   ```
   expo start
   ```

## Kullanılan Teknolojiler
- React Native
- Expo
- Expo Router
- Axios
- Lottie
- @react-navigation

## API
Etkinlikler, İzmir Büyükşehir Belediyesi'nin açık API'sinden alınmaktadır:
```
https://openapi.izmir.bel.tr/api/ibb/kultursanat/etkinlikler
```

## Klasör Yapısı
```
app/           # Sayfalar ve navigasyon
components/    # Ortak bileşenler
constants/     # Tema ve sabitler
hooks/         # Özel React hook'ları
types/         # Tip tanımları
assets/        # Görseller ve animasyonlar
```

## Notlar
- Proje Expo SDK 53 ve React Native 0.79 ile uyumludur.
- API erişiminde sorun yaşarsanız, internet bağlantınızı ve API adresini kontrol edin.

## Katkı
Katkıda bulunmak için fork'layıp pull request gönderebilirsiniz.

---
İzmir Büyükşehir Belediyesi'ne ve açık veri platformuna teşekkürler!
