type IItem = {
  id: number;
  title: string;
  subTitle: string;
  price: number;
  image: string;
  description: string;
};

export const Items: IItem[] = [
  {
    id: 1,
    title: 'しもふり焼肉盛り合わせ 300g',
    subTitle: '三田牛 100gあたり1280円',
    price: 3840,
    image: '/assets/images/beef.jpg',
    description: `店主おすすめの部位を盛り合わせにさせていただきます。
部位はその日によって異なります。
真空パックにしていますので冷蔵庫で１週間程、日持ちいたします。`,
  },
  {
    id: 2,
    title: '三田牛バーガー',
    subTitle: '三田牛を贅沢に使用',
    price: 1200,
    image: '/assets/images/hamburger.jpg',
    description: `店主おすすめの部位をミンチにしてハンバーグにしました。
真空パックにしていますので冷蔵庫で１週間程、日持ちいたします。`,
  },
];

type ITerms = {
  label: string;
  value: string;
};

export const Terms: ITerms[] = [
  {
    label: '販売業者',
    value: '一般社団法人リレーションデザイン研究所',
  },
  {
    label: '代表責任者',
    value: '榊原昌彦',
  },
  {
    label: '所在地',
    value: '〒530-0001 大阪府大阪市北区梅田1-1-3大阪駅前第3ビル 29階　1-1-1号室',
  },
  {
    label: '電話番号',
    value: '050-5240-6289',
  },
  {
    label: '電話受付時間',
    value: '10:00 〜 19:00',
  },
  {
    label: 'メールアドレス',
    value: 'info@rdlabo.jp',
  },
  {
    label: '販売価格',
    value: '各商品の紹介ページに記載している価格とします',
  },
  {
    label: '商品代金以外に必要な料金',
    value: '消費税',
  },
  {
    label: '引き渡し時期',
    value: 'ご注文から7日以内に対面販売',
  },
  {
    label: 'お支払い方法とお支払いの時期',
    value: 'クレジットカード決済：ご注文時にお支払いが確定します。',
  },
  {
    label: '返品・交換・キャンセルについて',
    value: '商品お渡し後の返品・交換・キャンセルには、基本的に対応しておりません。',
  },
];
