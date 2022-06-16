export type IItem = {
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
