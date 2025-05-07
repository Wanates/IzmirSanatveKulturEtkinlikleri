export interface Event {
  Id: number;
  Tur: string;
  Adi: string;
  EtkinlikMerkezi: string;
  EtkinlikBaslamaTarihi: string;
  EtkinlikBitisTarihi: string;
  KisaAciklama: string;
  BiletSatisLinki: string | null;
  UcretsizMi: boolean;
  Resim: string;
  EtkinlikUrl: string;
}

export type EventType = 'TİYATRO' | 'SERGİ' | 'FESTİVAL' | 'DİĞER'; 