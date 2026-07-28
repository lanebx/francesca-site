import {
  Artwork,
  ArtworkFilter,
  LocalizedText,
  SiteLanguage,
} from '../models/artwork.model';

const localized = (
  en: string,
  fr: string,
  ko: string,
): LocalizedText => ({ en, fr, ko });

const artworkTitles: Record<string, LocalizedText> = {
  'hope-2025': localized('Hope', 'Espoir', '희망'),
  'pray-for-peace-2025': localized(
    'Pray for Peace',
    'Prière pour la paix',
    '평화를 위한 기도',
  ),
  'la-vie-renaissance-des-cendres-2025': localized(
    'Life, Rebirth from Ashes',
    'La Vie, Renaissance des Cendres',
    '삶, 재에서의 부활',
  ),
  'love-and-peace-2024-2025': localized(
    'Love & Peace',
    'Amour & Paix',
    '사랑과 평화',
  ),
  'pray-for-no-9-2024': localized(
    'Pray for No. 9',
    'Prière no 9',
    '기도 9번',
  ),
  'endured-spirit-2023': localized(
    'Endured Spirit',
    'Esprit endurant',
    '견뎌낸 정신',
  ),
  'untitled-2023': localized('Untitled', 'Sans titre', '무제'),
  'stop-war-2022': localized('Stop War', 'Arrêtez la guerre', '전쟁을 멈춰라'),
  'pour-tous-les-coeurs-innocents-1-2022': localized(
    'For All Innocent Hearts No. 1',
    'Pour tous les cœurs innocents no 1',
    '모든 순수한 마음을 위하여 1번',
  ),
  'pour-tous-les-coeurs-innocents-2-2022': localized(
    'For All Innocent Hearts No. 2',
    'Pour tous les cœurs innocents no 2',
    '모든 순수한 마음을 위하여 2번',
  ),
  'untitled-blue-and-gold-2022': localized(
    'Untitled, Blue and Gold',
    'Sans titre, bleu et or',
    '무제, 파랑과 금색',
  ),
  'aucun-proche-2020-2021': localized(
    'No One Close',
    'Aucun proche',
    '가까운 이 없이',
  ),
  'aout-2021': localized('August', 'Août', '8월'),
  'premier-janvier-2021': localized('January 1st', '1er janvier', '1월 1일'),
  'twin-but-twin-v-2018-2019': localized(
    'Twin but Twin V',
    'Jumeaux mais jumeaux V',
    '쌍둥이, 그러나 쌍둥이 V',
  ),
  'twin-but-twin-vii-2018-2019': localized(
    'Twin but Twin VII',
    'Jumeaux mais jumeaux VII',
    '쌍둥이, 그러나 쌍둥이 VII',
  ),
  'larmes-dans-locean-et-le-ciel-2017': localized(
    'Tears in the Ocean and the Sky',
    'Larmes dans l’océan et le ciel',
    '바다와 하늘의 눈물',
  ),
  'ors-capricieux-2017': localized(
    'Capricious Golds',
    'Ors capricieux',
    '변덕스러운 황금빛',
  ),
  'twin-but-twin-v-2017': localized(
    'Twin but Twin V',
    'Jumeaux mais jumeaux V',
    '쌍둥이, 그러나 쌍둥이 V',
  ),
  'ash-painting-i-2017': localized(
    'Ash Painting I',
    'Peinture de cendre I',
    '재 그림 I',
  ),
  'ash-painting-iii-2017': localized(
    'Ash Painting III',
    'Peinture de cendre III',
    '재 그림 III',
  ),
  'silence-2017': localized('Silence', 'Silence', '침묵'),
  'twin-but-twin-iii-2016': localized(
    'Twin but Twin III',
    'Jumeaux mais jumeaux III',
    '쌍둥이, 그러나 쌍둥이 III',
  ),
  'love-and-humility-2015': localized(
    'Love and Humility',
    'Amour et humilité',
    '사랑과 겸손',
  ),
  'solo-2015': localized('Solo', 'Solo', '독주'),
  'untitled-2015': localized('Untitled', 'Sans titre', '무제'),
  'twin-but-twin-i-2015': localized(
    'Twin but Twin I',
    'Jumeaux mais jumeaux I',
    '쌍둥이, 그러나 쌍둥이 I',
  ),
  'twin-but-twin-ii-2015': localized(
    'Twin but Twin II',
    'Jumeaux mais jumeaux II',
    '쌍둥이, 그러나 쌍둥이 II',
  ),
  'hope-and-miracles-2013': localized(
    'Hope & Miracles',
    'Espoir & Miracles',
    '희망과 기적',
  ),
  'deep-river-in-the-sky-2013': localized(
    'Deep River in the Sky',
    'Rivière profonde dans le ciel',
    '하늘의 깊은 강',
  ),
  'elegiac-2013': localized('Elegiac', 'Élégiaque', '비가'),
  'evergreen-by-the-river-thames-i-2013': localized(
    'Evergreen by the River Thames I',
    'Toujours vert au bord de la Tamise I',
    '템스강가의 상록수 I',
  ),
  'evergreen-by-the-river-thames-ii-2013': localized(
    'Evergreen by the River Thames II',
    'Toujours vert au bord de la Tamise II',
    '템스강가의 상록수 II',
  ),
  'optimistic-bias-i-2013': localized(
    'Optimistic Bias I',
    'Biais optimiste I',
    '낙관적 편향 I',
  ),
  'optimistic-bias-ii-2013': localized(
    'Optimistic Bias II',
    'Biais optimiste II',
    '낙관적 편향 II',
  ),
  'paradox-i-2013': localized('Paradox I', 'Paradoxe I', '역설 I'),
  'paradox-ii-2013': localized('Paradox II', 'Paradoxe II', '역설 II'),
  'life-without-words-i-2013': localized(
    'Life without Words I',
    'La vie sans paroles I',
    '말 없는 삶 I',
  ),
  'life-without-words-ii-2013': localized(
    'Life without Words II',
    'La vie sans paroles II',
    '말 없는 삶 II',
  ),
  'self-deception-2013': localized(
    'Self-Deception',
    'Auto-illusion',
    '자기기만',
  ),
};

export const artworkTitle = (
  artwork: Pick<Artwork, 'slug' | 'title'>,
  language: SiteLanguage,
): string => artworkTitles[artwork.slug]?.[language] ?? artwork.title;

const practiceDescription = localized(
  'Ash, pigment and remembered experience meet in a restrained surface where loss is held alongside the possibility of renewal.',
  'La cendre, le pigment et l’expérience remémorée se rencontrent dans une surface retenue où la perte côtoie la possibilité d’un renouveau.',
  '재와 안료, 기억된 경험이 절제된 화면에서 만나 상실과 새로움의 가능성을 함께 품습니다.',
);

const peaceDescription = localized(
  'Part of Francesca Cho’s continuing meditation on conflict and hope, the work holds a fragile light against a field marked by time.',
  'Inscrite dans la méditation continue de Francesca Cho sur le conflit et l’espoir, l’œuvre maintient une lumière fragile dans un champ marqué par le temps.',
  '갈등과 희망에 대한 조 프란체스카의 지속적인 사유 속에서, 이 작품은 시간의 흔적 위에 연약한 빛을 붙듭니다.',
);

const twinDescription = localized(
  'From the Twin but Twin series, this work explores proximity and difference through paired gestures, ash and an elongated pictorial field.',
  'Issue de la série Twin but Twin, cette œuvre explore la proximité et la différence par des gestes associés, la cendre et un champ pictural allongé.',
  'Twin but Twin 연작의 작품으로, 짝을 이룬 몸짓과 재, 길게 펼쳐진 화면을 통해 닮음과 차이를 탐구합니다.',
);

const medium = {
  ashMixedCanvas: localized(
    'Ash and mixed media on canvas',
    'Cendre et techniques mixtes sur toile',
    '캔버스에 재와 혼합 재료',
  ),
  ashOilCanvas: localized(
    'Ash and oil on canvas',
    'Cendre et huile sur toile',
    '캔버스에 재와 유채',
  ),
  oilAshCanvas: localized(
    'Oil and ash on canvas',
    'Huile et cendre sur toile',
    '캔버스에 유채와 재',
  ),
  mixedMedia: localized(
    'Mixed media',
    'Techniques mixtes',
    '혼합 재료',
  ),
  oilCanvas: localized(
    'Oil on canvas',
    'Huile sur toile',
    '캔버스에 유채',
  ),
  ashBoard: localized(
    'Ash on board',
    'Cendre sur panneau',
    '보드에 재',
  ),
  oilAshBoard: localized(
    'Oil and ash on board',
    'Huile et cendre sur panneau',
    '보드에 유채와 재',
  ),
};

export const ARTWORK_FILTERS: ArtworkFilter[] = [
  {
    id: 'all',
    label: localized('All', 'Toutes', '전체'),
  },
  {
    id: 'ash-memory',
    label: localized('Ash & Memory', 'Cendre & Mémoire', '재와 기억'),
  },
  {
    id: 'peace-hope',
    label: localized('Peace & Hope', 'Paix & Espoir', '평화와 희망'),
  },
  {
    id: 'twin-but-twin',
    label: localized('Twin but Twin', 'Twin but Twin', 'Twin but Twin'),
  },
];

export const ARTWORKS: Artwork[] = [
  {
    slug: 'hope-2025',
    title: 'Hope',
    year: '2025',
    category: 'peace-hope',
    medium: medium.ashBoard,
    dimensions: '',
    presentation: 'right',
    description: peaceDescription,
    views: {
      artwork: 'assets/images/paintings/2025/hope-2025.png',
    },
  },
  {
    slug: 'pray-for-peace-2025',
    title: 'Pray for Peace',
    year: '2025',
    category: 'peace-hope',
    medium: medium.ashOilCanvas,
    dimensions: '',
    presentation: 'left',
    description: peaceDescription,
    views: {
      artwork: 'assets/images/paintings/2025/pray-for-peace-2025.png',
    },
  },
  {
    slug: 'la-vie-renaissance-des-cendres-2025',
    title: 'La Vie, Renaissance des Cendres',
    year: '2025',
    category: 'ash-memory',
    medium: medium.ashMixedCanvas,
    dimensions: '',
    presentation: 'center',
    description: practiceDescription,
    views: {
      artwork:
        'assets/images/paintings/2025/la-vie-renaissance-des-cendres-2025.png',
    },
  },
  {
    slug: 'love-and-peace-2024-2025',
    title: 'Love & Peace',
    year: '2024—2025',
    category: 'peace-hope',
    medium: medium.ashMixedCanvas,
    dimensions: '184 × 32 cm',
    presentation: 'wide',
    galleryMatte: true,
    mobileGalleryCrop: true,
    description: peaceDescription,
    views: {
      artwork:
        'assets/images/paintings/2025/love-and-peace-2024-2025.png',
    },
  },
  {
    slug: 'pray-for-no-9-2024',
    title: 'Pray for No. 9',
    year: '2024',
    category: 'peace-hope',
    medium: localized(
      'Oil on entrance shutters',
      'Huile sur volets d’entrée',
      '입구 덧문에 유채',
    ),
    dimensions: '386 × 251 cm',
    presentation: 'right',
    description: peaceDescription,
    views: {
      artwork: 'assets/images/paintings/2024/pray-for-no-9-2024.png',
    },
  },
  {
    slug: 'endured-spirit-2023',
    title: 'Endured Spirit',
    year: '2023',
    category: 'ash-memory',
    medium: medium.oilCanvas,
    dimensions: '24 × 30 cm',
    presentation: 'left',
    description: practiceDescription,
    views: {
      artwork: 'assets/images/paintings/2023/endured-spirit-2023.png',
    },
  },
  {
    slug: 'untitled-2023',
    title: 'Untitled',
    year: '2023',
    category: 'ash-memory',
    medium: medium.oilCanvas,
    dimensions: '45 × 27 cm',
    presentation: 'center',
    description: practiceDescription,
    views: {
      artwork: 'assets/images/paintings/2023/untitled-2023.png',
    },
  },
  {
    slug: 'stop-war-2022',
    title: 'Stop War',
    year: '2022',
    category: 'peace-hope',
    medium: medium.mixedMedia,
    dimensions: '30 × 50 cm',
    presentation: 'right',
    description: peaceDescription,
    views: {
      artwork: 'assets/images/paintings/2022/stop-war-2022.png',
    },
  },
  {
    slug: 'pour-tous-les-coeurs-innocents-1-2022',
    title: 'Pour tous les cœurs innocents No. 1',
    year: '2022',
    category: 'peace-hope',
    medium: medium.oilCanvas,
    dimensions: '70 × 40 cm',
    presentation: 'wide',
    description: peaceDescription,
    views: {
      artwork:
        'assets/images/paintings/2022/pour-tous-les-coeurs-innocents-1-2022.png',
    },
  },
  {
    slug: 'pour-tous-les-coeurs-innocents-2-2022',
    title: 'Pour tous les cœurs innocents No. 2',
    year: '2022',
    category: 'peace-hope',
    medium: medium.oilCanvas,
    dimensions: '70 × 40 cm',
    presentation: 'left',
    description: peaceDescription,
    views: {
      artwork:
        'assets/images/paintings/2022/pour-tous-les-coeurs-innocents-2-2022.png',
    },
  },
  {
    slug: 'untitled-blue-and-gold-2022',
    title: 'Untitled, Blue and Gold',
    year: '2022',
    category: 'peace-hope',
    medium: medium.mixedMedia,
    dimensions: '',
    presentation: 'center',
    description: peaceDescription,
    views: {
      artwork:
        'assets/images/paintings/2022/untitled-blue-and-gold-2022.png',
    },
  },
  {
    slug: 'aucun-proche-2020-2021',
    title: 'Aucun proche',
    year: '2020—2021',
    category: 'ash-memory',
    medium: medium.mixedMedia,
    dimensions: '100 × 40 cm',
    presentation: 'wide',
    mobileGalleryCrop: true,
    description: practiceDescription,
    views: {
      artwork:
        'assets/images/paintings/2020-2021/aucun-proche-2020-2021.png',
    },
  },
  {
    slug: 'aout-2021',
    title: 'Août',
    year: '2021',
    category: 'ash-memory',
    medium: medium.mixedMedia,
    dimensions: '61 × 40 cm',
    presentation: 'left',
    description: practiceDescription,
    views: {
      artwork: 'assets/images/paintings/2020-2021/aout-2021.png',
    },
  },
  {
    slug: 'premier-janvier-2021',
    title: '1er janvier',
    year: '2021',
    category: 'ash-memory',
    medium: medium.mixedMedia,
    dimensions: '61 × 40 cm',
    presentation: 'right',
    description: practiceDescription,
    views: {
      artwork: 'assets/images/paintings/2020-2021/1er-janvier-2021.png',
    },
  },
  {
    slug: 'twin-but-twin-v-2018-2019',
    title: 'Twin but Twin V',
    year: '2018—2019',
    category: 'twin-but-twin',
    medium: medium.ashMixedCanvas,
    dimensions: '50 × 140 cm',
    presentation: 'wide',
    mobileGalleryCrop: true,
    description: twinDescription,
    views: {
      artwork:
        'assets/images/paintings/2018-2019/twin-but-twin-5-2018-2019.png',
    },
  },
  {
    slug: 'twin-but-twin-vii-2018-2019',
    title: 'Twin but Twin VII',
    year: '2018—2019',
    category: 'twin-but-twin',
    medium: medium.ashMixedCanvas,
    dimensions: '50 × 140 cm',
    presentation: 'wide',
    mobileGalleryCrop: true,
    description: twinDescription,
    views: {
      artwork:
        'assets/images/paintings/2018-2019/twin-but-twin-7-2018-2019.png',
    },
  },
  {
    slug: 'larmes-dans-locean-et-le-ciel-2017',
    title: 'Larmes dans l’océan et le ciel',
    year: '2017',
    category: 'ash-memory',
    medium: medium.ashMixedCanvas,
    dimensions: '153 × 194 cm',
    presentation: 'left',
    description: practiceDescription,
    views: {
      artwork:
        'assets/images/paintings/2017/larmes-dans-locean-et-le-ciel-2017.png',
    },
  },
  {
    slug: 'ors-capricieux-2017',
    title: 'Ors capricieux',
    year: '2017',
    category: 'ash-memory',
    medium: medium.ashMixedCanvas,
    dimensions: '',
    presentation: 'center',
    description: practiceDescription,
    views: {
      artwork:
        'assets/images/paintings/2017/ors-capricieux-2017.png',
    },
  },
  {
    slug: 'twin-but-twin-v-2017',
    title: 'Twin but Twin V',
    year: '2017',
    category: 'twin-but-twin',
    medium: medium.ashMixedCanvas,
    dimensions: '30 × 120 cm',
    presentation: 'wide',
    description: twinDescription,
    views: {
      artwork:
        'assets/images/paintings/2017/twin-but-twin-5-2017.png',
    },
  },
  {
    slug: 'ash-painting-i-2017',
    title: 'Ash Painting I',
    year: '2017',
    category: 'ash-memory',
    medium: medium.ashMixedCanvas,
    dimensions: '',
    presentation: 'right',
    description: practiceDescription,
    views: {
      artwork: 'assets/images/paintings/2017/ash-painting-1-2017.png',
    },
  },
  {
    slug: 'ash-painting-iii-2017',
    title: 'Ash Painting III',
    year: '2017',
    category: 'ash-memory',
    medium: medium.ashMixedCanvas,
    dimensions: '',
    presentation: 'center',
    description: practiceDescription,
    views: {
      artwork: 'assets/images/paintings/2017/ash-painting-3-2017.png',
    },
  },
  {
    slug: 'silence-2017',
    title: 'Silence',
    year: '2017',
    category: 'ash-memory',
    medium: medium.ashMixedCanvas,
    dimensions: '',
    presentation: 'left',
    description: practiceDescription,
    views: {
      artwork: 'assets/images/paintings/2017/silence-2017.png',
    },
  },
  {
    slug: 'twin-but-twin-iii-2016',
    title: 'Twin but Twin III',
    year: '2016',
    category: 'twin-but-twin',
    medium: medium.oilAshCanvas,
    dimensions: '',
    presentation: 'wide',
    description: twinDescription,
    views: {
      artwork:
        'assets/images/paintings/2016/twin-but-twin-3-2016.png',
    },
  },
  {
    slug: 'love-and-humility-2015',
    title: 'Love and Humility',
    year: '2015',
    category: 'peace-hope',
    medium: medium.oilAshCanvas,
    dimensions: '40 × 40 cm',
    presentation: 'right',
    description: peaceDescription,
    views: {
      artwork:
        'assets/images/paintings/2015/love-and-humility-2015.png',
    },
  },
  {
    slug: 'solo-2015',
    title: 'Solo',
    year: '2015',
    category: 'ash-memory',
    medium: medium.oilAshCanvas,
    dimensions: '',
    presentation: 'center',
    description: practiceDescription,
    views: {
      artwork: 'assets/images/paintings/2015/solo-2015.png',
    },
  },
  {
    slug: 'untitled-2015',
    title: 'Untitled',
    year: '2015',
    category: 'ash-memory',
    medium: medium.oilAshCanvas,
    dimensions: '',
    presentation: 'right',
    description: practiceDescription,
    views: {
      artwork: 'assets/images/paintings/2015/untitled-2015.png',
    },
  },
  {
    slug: 'twin-but-twin-i-2015',
    title: 'Twin but Twin I',
    year: '2015',
    category: 'twin-but-twin',
    medium: medium.oilAshCanvas,
    dimensions: '40 × 80 cm',
    presentation: 'left',
    description: twinDescription,
    views: {
      artwork:
        'assets/images/paintings/2015/twin-but-twin-1-2015.png',
    },
  },
  {
    slug: 'twin-but-twin-ii-2015',
    title: 'Twin but Twin II',
    year: '2015',
    category: 'twin-but-twin',
    medium: medium.oilAshCanvas,
    dimensions: '24 × 60 cm',
    presentation: 'wide',
    description: twinDescription,
    views: {
      artwork:
        'assets/images/paintings/2015/twin-but-twin-2-2015.png',
    },
  },
  {
    slug: 'hope-and-miracles-2013',
    title: 'Hope & Miracles',
    year: '2013',
    category: 'peace-hope',
    medium: medium.oilAshBoard,
    dimensions: '30 × 40 cm',
    presentation: 'left',
    description: peaceDescription,
    views: {
      artwork:
        'assets/images/paintings/2013/hope-and-miracles-2013.webp',
    },
  },
  {
    slug: 'deep-river-in-the-sky-2013',
    title: 'Deep River in the Sky',
    year: '2013',
    category: 'peace-hope',
    medium: medium.oilAshCanvas,
    dimensions: '',
    presentation: 'center',
    description: peaceDescription,
    views: {
      artwork:
        'assets/images/paintings/2013/deep-river-in-the-sky-2013.webp',
    },
  },
  {
    slug: 'elegiac-2013',
    title: 'Elegiac',
    year: '2013',
    category: 'peace-hope',
    medium: medium.oilAshCanvas,
    dimensions: '25 × 25 cm',
    presentation: 'right',
    description: peaceDescription,
    views: {
      artwork: 'assets/images/paintings/2013/elegiac-2013.webp',
    },
  },
  {
    slug: 'evergreen-by-the-river-thames-i-2013',
    title: 'Evergreen by the River Thames I',
    year: '2013',
    category: 'ash-memory',
    medium: medium.oilAshBoard,
    dimensions: '24 × 31 cm',
    presentation: 'left',
    description: practiceDescription,
    views: {
      artwork:
        'assets/images/paintings/2013/evergreen-by-the-river-thames-1-2013.webp',
    },
  },
  {
    slug: 'evergreen-by-the-river-thames-ii-2013',
    title: 'Evergreen by the River Thames II',
    year: '2013',
    category: 'ash-memory',
    medium: medium.oilAshBoard,
    dimensions: '24 × 31 cm',
    presentation: 'right',
    description: practiceDescription,
    views: {
      artwork:
        'assets/images/paintings/2013/evergreen-by-the-river-thames-2-2013.webp',
    },
  },
  {
    slug: 'optimistic-bias-i-2013',
    title: 'Optimistic Bias I',
    year: '2013',
    category: 'peace-hope',
    medium: medium.oilAshCanvas,
    dimensions: '25 × 60 cm',
    presentation: 'wide',
    description: peaceDescription,
    views: {
      artwork:
        'assets/images/paintings/2013/optimistic-bias-1-2013.webp',
    },
  },
  {
    slug: 'optimistic-bias-ii-2013',
    title: 'Optimistic Bias II',
    year: '2013',
    category: 'peace-hope',
    medium: medium.oilAshCanvas,
    dimensions: '25 × 60 cm',
    presentation: 'wide',
    description: peaceDescription,
    views: {
      artwork:
        'assets/images/paintings/2013/optimistic-bias-2-2013.webp',
    },
  },
  {
    slug: 'paradox-i-2013',
    title: 'Paradox I',
    year: '2013',
    category: 'ash-memory',
    medium: medium.oilAshCanvas,
    dimensions: '30 × 40 cm',
    presentation: 'right',
    description: practiceDescription,
    views: {
      artwork: 'assets/images/paintings/2013/paradox-1-2013.webp',
    },
  },
  {
    slug: 'paradox-ii-2013',
    title: 'Paradox II',
    year: '2013',
    category: 'ash-memory',
    medium: medium.oilAshCanvas,
    dimensions: '30 × 40 cm',
    presentation: 'left',
    description: practiceDescription,
    views: {
      artwork: 'assets/images/paintings/2013/paradox-2-2013.webp',
    },
  },
  {
    slug: 'life-without-words-i-2013',
    title: 'Life without Words I',
    year: '2013',
    category: 'ash-memory',
    medium: medium.oilAshCanvas,
    dimensions: '29 × 24 cm',
    presentation: 'left',
    description: practiceDescription,
    views: {
      artwork:
        'assets/images/paintings/2013/life-without-words-1-2013.webp',
    },
  },
  {
    slug: 'life-without-words-ii-2013',
    title: 'Life without Words II',
    year: '2013',
    category: 'ash-memory',
    medium: medium.oilAshCanvas,
    dimensions: '30 × 25 cm',
    presentation: 'right',
    description: practiceDescription,
    views: {
      artwork:
        'assets/images/paintings/2013/life-without-words-2-2013.webp',
    },
  },
  {
    slug: 'self-deception-2013',
    title: 'Self-Deception',
    year: '2013',
    category: 'ash-memory',
    medium: medium.oilAshCanvas,
    dimensions: '',
    presentation: 'center',
    description: practiceDescription,
    views: {
      artwork:
        'assets/images/paintings/2013/self-deception-2013.png',
    },
  },
];
