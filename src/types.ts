export type Category = '棋牌' | '运动' | '户外' | 'CoffeeChat' | '亲子';

export interface Participant {
  id: string;
  name: string;
  gender: '男' | '女' | '其他';
  hobbies: string[];
  occupation: string;
  avatar: string;
}

export interface Activity {
  id: string;
  category: Category;
  subCategory: string;
  title: string;
  time: string;
  location: string;
  description: string;
  creator: Participant;
  participants: Participant[];
  maxParticipants: number;
  status: 'open' | 'full' | 'completed';
}

export const CATEGORIES: Record<Category, string[]> = {
  '棋牌': ['麻将', '扑克', '剧本杀', '桌游', '象棋'],
  '运动': ['羽毛球', '篮球', '网球', '游泳', '健身', '乒乓球'],
  '户外': ['徒步', '露营', '骑行', '飞盘', '登山'],
  'CoffeeChat': ['职场交流', '创业分享', '语言交换', '随心聊'],
  '亲子': ['游乐园', '手工DIY', '绘本阅读', '郊游', '亲子运动'],
};
