/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Plus, 
  MapPin, 
  Clock, 
  Users, 
  Filter, 
  ChevronRight,
  Coffee,
  Dices,
  Trophy,
  Trees,
  Baby,
  X,
  Heart,
  User
} from 'lucide-react';
import { Category, Activity, Participant, CATEGORIES } from './types';

// Mock Data
const MOCK_USERS: Participant[] = [
  { id: '1', name: '小林', gender: '女', hobbies: ['摄影', '徒步'], occupation: 'UI设计师', avatar: 'https://picsum.photos/seed/user1/100/100' },
  { id: '2', name: '阿强', gender: '男', hobbies: ['篮球', '编程'], occupation: '软件工程师', avatar: 'https://picsum.photos/seed/user2/100/100' },
  { id: '3', name: '悦悦', gender: '女', hobbies: ['瑜伽', '咖啡'], occupation: '市场经理', avatar: 'https://picsum.photos/seed/user3/100/100' },
  { id: '4', name: '老王', gender: '男', hobbies: ['象棋', '喝茶'], occupation: '退休教师', avatar: 'https://picsum.photos/seed/user4/100/100' },
];

const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'a1',
    category: '运动',
    subCategory: '羽毛球',
    title: '周六下午羽毛球双打，缺2人',
    time: '2024-03-02 14:00',
    location: '奥体中心羽毛球馆',
    description: '水平中等，欢迎爱运动的小伙伴加入。',
    creator: MOCK_USERS[1],
    participants: [MOCK_USERS[1], MOCK_USERS[0]],
    maxParticipants: 4,
    status: 'open',
  },
  {
    id: 'a2',
    category: 'CoffeeChat',
    subCategory: '职场交流',
    title: '互联网产品经理经验交流',
    time: '2024-03-03 10:30',
    location: '星巴克(静安寺店)',
    description: '聊聊AI时代的产品转型，欢迎同行。',
    creator: MOCK_USERS[2],
    participants: [MOCK_USERS[2]],
    maxParticipants: 3,
    status: 'open',
  },
  {
    id: 'a3',
    category: '棋牌',
    subCategory: '剧本杀',
    title: '《昆仑》硬核推理本，缺1人',
    time: '2024-03-02 18:30',
    location: '迷雾剧本杀工作室',
    description: '已有5人，来个逻辑强的小伙伴。',
    creator: MOCK_USERS[0],
    participants: [MOCK_USERS[0], MOCK_USERS[1], MOCK_USERS[3]],
    maxParticipants: 6,
    status: 'open',
  },
  {
    id: 'a4',
    category: '亲子',
    subCategory: '手工DIY',
    title: '周末亲子陶艺体验',
    time: '2024-03-03 15:00',
    location: '泥好陶艺馆',
    description: '带小朋友一起体验捏泥巴的乐趣。',
    creator: MOCK_USERS[3],
    participants: [MOCK_USERS[3]],
    maxParticipants: 5,
    status: 'open',
  },
  {
    id: 'a5',
    category: '户外',
    subCategory: '徒步',
    title: '香山赏红叶徒步活动',
    time: '2024-03-09 08:30',
    location: '香山公园东门集合',
    description: '春天也要去爬山！呼吸新鲜空气，强度适中。',
    creator: MOCK_USERS[0],
    participants: [MOCK_USERS[0], MOCK_USERS[2]],
    maxParticipants: 10,
    status: 'open',
  },
  {
    id: 'a6',
    category: '运动',
    subCategory: '篮球',
    title: '下午3点半场4V4，缺3人',
    time: '2024-03-02 15:30',
    location: '洛克公园(世博店)',
    description: '纯娱乐，不打球霸，欢迎加入。',
    creator: MOCK_USERS[1],
    participants: [MOCK_USERS[1], MOCK_USERS[3]],
    maxParticipants: 8,
    status: 'open',
  },
  {
    id: 'a7',
    category: 'CoffeeChat',
    subCategory: '创业分享',
    title: '独立开发者的小众出海经',
    time: '2024-03-05 19:00',
    location: 'WeWork会议室',
    description: '分享最近出海产品的经验，欢迎交流。',
    creator: MOCK_USERS[2],
    participants: [MOCK_USERS[2]],
    maxParticipants: 4,
    status: 'open',
  },
];

const CategoryIcon = ({ category, className }: { category: Category, className?: string }) => {
  switch (category) {
    case '棋牌': return <Dices className={className} />;
    case '运动': return <Trophy className={className} />;
    case '户外': return <Trees className={className} />;
    case 'CoffeeChat': return <Coffee className={className} />;
    case '亲子': return <Baby className={className} />;
  }
};

interface ActivityCardProps {
  activity: Activity;
  onSelect: (a: Activity) => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ 
  activity, 
  onSelect, 
  isFavorite, 
  onToggleFavorite 
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={() => onSelect(activity)}
      className="bg-white rounded-3xl p-6 card-shadow cursor-pointer hover:scale-[1.01] transition-transform group"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-warm flex items-center justify-center text-brand-olive">
            <CategoryIcon category={activity.category} className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-brand-olive/60 uppercase tracking-wider">
              {activity.category} · {activity.subCategory}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-brand-olive transition-colors">
              {activity.title}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={(e) => onToggleFavorite(e, activity.id)}
            className={`p-2 rounded-full transition-all ${isFavorite ? 'bg-pink-50 text-pink-500' : 'bg-gray-50 text-gray-300 hover:text-pink-400'}`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
          <div className="flex -space-x-2">
            {activity.participants.slice(0, 3).map((p, i) => (
              <img 
                key={p.id} 
                src={p.avatar} 
                className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                alt={p.name}
                referrerPolicy="no-referrer"
              />
            ))}
            {activity.participants.length > 3 && (
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                +{activity.participants.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{activity.time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MapPin className="w-4 h-4" />
          <span className="truncate">{activity.location}</span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-50">
        <div className="flex items-center gap-2">
          <img 
            src={activity.creator.avatar} 
            className="w-6 h-6 rounded-full object-cover" 
            alt={activity.creator.name}
            referrerPolicy="no-referrer"
          />
          <span className="text-xs text-gray-500">
            发起人: <span className="font-medium text-gray-900">{activity.creator.name}</span>
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-brand-olive">
          <span>{activity.participants.length}/{activity.maxParticipants} 已加入</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [view, setView] = useState<'home' | 'subCategories' | 'activities'>('home');
  const [activeTab, setActiveTab] = useState<'explore' | 'profile'>('explore');
  const [profileTab, setProfileTab] = useState<'favorites' | 'created'>('favorites');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<Category | '全部'>('全部');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | '全部'>('全部');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [categories, setCategories] = useState<Record<Category, string[]>>(CATEGORIES);
  const [currentUser, setCurrentUser] = useState<Participant>(MOCK_USERS[0]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [hobbyInput, setHobbyInput] = useState('');
  const [newActivity, setNewActivity] = useState({
    title: '',
    category: '棋牌' as Category,
    subCategory: '',
    time: '',
    location: '',
    description: '',
    maxParticipants: 4
  });

  const filteredActivities = useMemo(() => {
    return activities.filter(activity => {
      const matchesCategory = selectedCategory === '全部' || activity.category === selectedCategory;
      const matchesSubCategory = selectedSubCategory === '全部' || activity.subCategory === selectedSubCategory;
      const matchesSearch = activity.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           activity.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSubCategory && matchesSearch;
    });
  }, [activities, selectedCategory, selectedSubCategory, searchQuery]);

  const handleJoin = (activityId: string) => {
    setActivities(prev => prev.map(act => {
      if (act.id === activityId && act.participants.length < act.maxParticipants) {
        return { ...act, participants: [...act.participants, currentUser] };
      }
      return act;
    }));
  };

  const toggleFavorite = (e: React.MouseEvent, activityId: string) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(activityId)) {
        next.delete(activityId);
      } else {
        next.add(activityId);
      }
      return next;
    });
  };

  const handleCategoryClick = (cat: Category | '全部') => {
    setSelectedCategory(cat);
    if (cat === '全部') {
      setSelectedSubCategory('全部');
      setView('activities');
    } else {
      setView('subCategories');
    }
  };

  const handleSubCategoryClick = (subCat: string) => {
    setSelectedSubCategory(subCat);
    setView('activities');
  };

  const handleBack = () => {
    if (view === 'activities') {
      if (selectedCategory === '全部') {
        setView('home');
      } else {
        setView('subCategories');
      }
    } else if (view === 'subCategories') {
      setView('home');
    }
  };

  const categoryStats = useMemo(() => {
    const stats: Record<string, number> = {};
    activities.forEach(act => {
      stats[act.category] = (stats[act.category] || 0) + 1;
      const subKey = `${act.category}-${act.subCategory}`;
      stats[subKey] = (stats[subKey] || 0) + 1;
    });
    return stats;
  }, [activities]);

  return (
    <div className="min-h-screen font-sans pb-20">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-brand-warm/80 backdrop-blur-md px-6 py-4 border-b border-black/5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            {view !== 'home' && (
              <button 
                onClick={handleBack}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
            )}
            <h1 
              className="text-2xl font-serif font-bold tracking-tight text-brand-olive cursor-pointer"
              onClick={() => { setView('home'); setSelectedCategory('全部'); setSelectedSubCategory('全部'); }}
            >
              CityVibe
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6 mr-4">
              <button 
                onClick={() => { setActiveTab('explore'); setView('home'); }}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'explore' ? 'text-brand-olive' : 'text-gray-400 hover:text-brand-olive'}`}
              >
                探索
              </button>
              <button 
                onClick={() => setActiveTab('profile')}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${activeTab === 'profile' ? 'text-brand-olive' : 'text-gray-400 hover:text-brand-olive'}`}
              >
                个人中心
              </button>
            </nav>
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="搜索活动..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white rounded-full text-sm border-none focus:ring-2 focus:ring-brand-olive/20 w-48 md:w-64 transition-all"
              />
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="p-2 bg-brand-olive text-white rounded-full hover:opacity-90 transition-opacity"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' ? (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[40px] p-8 card-shadow flex flex-col items-center text-center relative group">
                {!isEditingProfile && (
                  <button 
                    onClick={() => setIsEditingProfile(true)}
                    className="absolute top-6 right-6 p-2 bg-brand-warm text-brand-olive rounded-full hover:bg-brand-olive hover:text-white transition-all"
                  >
                    <Filter className="w-4 h-4" /> {/* Using Filter as an edit icon since Edit isn't imported, or I can import it */}
                  </button>
                )}

                <div className="relative mb-4">
                  <img 
                    src={currentUser.avatar} 
                    className="w-24 h-24 rounded-full border-4 border-brand-warm object-cover shadow-lg" 
                    alt="Profile"
                    referrerPolicy="no-referrer"
                  />
                  {isEditingProfile ? (
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-brand-olive text-white rounded-full flex items-center justify-center border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                      <Plus className="w-4 h-4" />
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setCurrentUser(prev => ({ ...prev, avatar: reader.result as string }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  ) : (
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-brand-olive text-white rounded-full flex items-center justify-center border-2 border-white">
                      <Plus className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {isEditingProfile ? (
                  <div className="w-full space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block text-left px-2">昵称</label>
                      <input 
                        type="text" 
                        value={currentUser.name}
                        onChange={(e) => setCurrentUser(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-2 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive/20 text-center font-serif font-bold text-xl"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block text-left px-2">职业</label>
                      <input 
                        type="text" 
                        value={currentUser.occupation}
                        onChange={(e) => setCurrentUser(prev => ({ ...prev, occupation: e.target.value }))}
                        className="w-full px-4 py-2 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive/20 text-center text-sm text-gray-600"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block text-left px-2">爱好标签</label>
                      <div className="flex flex-wrap justify-center gap-2 mb-2">
                        {currentUser.hobbies.map(hobby => (
                          <span key={hobby} className="group flex items-center gap-1 px-3 py-1 bg-brand-warm text-brand-olive text-[10px] font-bold rounded-full uppercase tracking-wider">
                            {hobby}
                            <button 
                              onClick={() => setCurrentUser(prev => ({ ...prev, hobbies: prev.hobbies.filter(h => h !== hobby) }))}
                              className="hover:text-red-500 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          placeholder="添加爱好..."
                          value={hobbyInput}
                          onChange={(e) => setHobbyInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && hobbyInput.trim()) {
                              e.preventDefault();
                              if (!currentUser.hobbies.includes(hobbyInput.trim())) {
                                setCurrentUser(prev => ({ ...prev, hobbies: [...prev.hobbies, hobbyInput.trim()] }));
                              }
                              setHobbyInput('');
                            }
                          }}
                          className="flex-1 px-4 py-2 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive/20 text-xs"
                        />
                        <button 
                          onClick={() => {
                            if (hobbyInput.trim() && !currentUser.hobbies.includes(hobbyInput.trim())) {
                              setCurrentUser(prev => ({ ...prev, hobbies: [...prev.hobbies, hobbyInput.trim()] }));
                              setHobbyInput('');
                            }
                          }}
                          className="px-4 py-2 bg-brand-olive text-white rounded-2xl text-xs font-bold"
                        >
                          添加
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsEditingProfile(false)}
                      className="w-full py-3 bg-brand-olive text-white rounded-2xl font-bold text-sm shadow-lg shadow-brand-olive/20 mt-4"
                    >
                      保存修改
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">{currentUser.name}</h2>
                    <p className="text-sm text-gray-500 mb-4">{currentUser.occupation}</p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {currentUser.hobbies.map(hobby => (
                        <span key={hobby} className="px-3 py-1 bg-brand-warm text-brand-olive text-[10px] font-bold rounded-full uppercase tracking-wider">
                          {hobby}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-6">
                <div className="flex gap-4 border-b border-gray-100 px-2">
                  <button 
                    onClick={() => setProfileTab('favorites')}
                    className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all relative ${profileTab === 'favorites' ? 'text-brand-olive' : 'text-gray-400'}`}
                  >
                    我的收藏 ({favorites.size})
                    {profileTab === 'favorites' && (
                      <motion.div layoutId="profileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-olive" />
                    )}
                  </button>
                  <button 
                    onClick={() => setProfileTab('created')}
                    className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all relative ${profileTab === 'created' ? 'text-brand-olive' : 'text-gray-400'}`}
                  >
                    我发起的 ({activities.filter(a => a.creator.id === currentUser.id).length})
                    {profileTab === 'created' && (
                      <motion.div layoutId="profileTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-olive" />
                    )}
                  </button>
                </div>

                <div className="space-y-6 min-h-[300px]">
                  <AnimatePresence mode="wait">
                    {profileTab === 'favorites' ? (
                      <motion.div
                        key="favs"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                      >
                        {activities.filter(a => favorites.has(a.id)).length > 0 ? (
                          activities.filter(a => favorites.has(a.id)).map((activity) => (
                            <ActivityCard 
                              key={activity.id} 
                              activity={activity} 
                              onSelect={setSelectedActivity} 
                              isFavorite={true}
                              onToggleFavorite={toggleFavorite}
                            />
                          ))
                        ) : (
                          <div className="text-center py-12 bg-white/50 rounded-[32px] border-2 border-dashed border-gray-200">
                            <Heart className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                            <p className="text-gray-400 text-sm">还没有收藏任何活动哦</p>
                            <button 
                              onClick={() => setActiveTab('explore')}
                              className="mt-4 text-brand-olive font-semibold text-sm hover:underline"
                            >
                              去发现精彩活动
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="created"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                      >
                        {activities.filter(a => a.creator.id === currentUser.id).length > 0 ? (
                          activities.filter(a => a.creator.id === currentUser.id).map((activity) => (
                            <ActivityCard 
                              key={activity.id} 
                              activity={activity} 
                              onSelect={setSelectedActivity} 
                              isFavorite={favorites.has(activity.id)}
                              onToggleFavorite={toggleFavorite}
                            />
                          ))
                        ) : (
                          <div className="text-center py-12 bg-white/50 rounded-[32px] border-2 border-dashed border-gray-200">
                            <Plus className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                            <p className="text-gray-400 text-sm">还没有发起过活动哦</p>
                            <button 
                              onClick={() => setIsModalOpen(true)}
                              className="mt-4 text-brand-olive font-semibold text-sm hover:underline"
                            >
                              立即发起活动
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-serif font-bold text-gray-900">发现同城精彩</h2>
                <p className="text-gray-500">选择一个你感兴趣的活动大类开始探索</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleCategoryClick('全部')}
                  className="bg-brand-olive text-white rounded-[32px] p-8 cursor-pointer shadow-xl shadow-brand-olive/20 flex flex-col justify-between h-64 relative overflow-hidden group"
                >
                  <div className="relative z-10">
                    <h3 className="text-2xl font-serif font-bold mb-2">全部活动</h3>
                    <p className="text-white/70 text-sm">查看城市中正在发生的所有新鲜事</p>
                  </div>
                  <div className="relative z-10 flex items-center gap-2 text-sm font-medium">
                    <span>浏览全部</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform">
                    <Search className="w-48 h-48" />
                  </div>
                </motion.div>

                {Object.keys(categories).map((cat) => (
                  <motion.div
                    key={cat}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategoryClick(cat as Category)}
                    className="bg-white rounded-[32px] p-8 cursor-pointer card-shadow flex flex-col justify-between h-64 relative overflow-hidden group"
                  >
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-brand-warm flex items-center justify-center text-brand-olive mb-4">
                        <CategoryIcon category={cat as Category} className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">{cat}</h3>
                      <p className="text-gray-500 text-sm">
                        {categories[cat as Category].slice(0, 3).join(' · ')} 等
                      </p>
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-olive bg-brand-warm px-3 py-1 rounded-full">
                        {categoryStats[cat] || 0} 个活动
                      </span>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-brand-olive group-hover:translate-x-1 transition-all" />
                    </div>
                    <div className="absolute -right-6 -bottom-6 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                      <CategoryIcon category={cat as Category} className="w-40 h-40" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {view === 'subCategories' && (
            <motion.div
              key="subCategories"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900">{selectedCategory}</h2>
                  <p className="text-gray-500">请选择更具体的活动类型</p>
                </div>
                <div className="w-14 h-14 rounded-3xl bg-brand-olive text-white flex items-center justify-center shadow-lg shadow-brand-olive/20">
                  <CategoryIcon category={selectedCategory as Category} className="w-7 h-7" />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSubCategoryClick('全部')}
                  className="bg-brand-warm rounded-3xl p-6 cursor-pointer flex flex-col items-center justify-center text-center gap-3 group border border-brand-olive/5"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-brand-olive shadow-sm">
                    <Filter className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-gray-900">全部{selectedCategory}</span>
                  <span className="text-[10px] text-brand-olive/60 font-bold uppercase tracking-widest">
                    {categoryStats[selectedCategory as string] || 0} 个活动
                  </span>
                </motion.div>

                {categories[selectedCategory as Category]?.map((subCat) => (
                  <motion.div
                    key={subCat}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSubCategoryClick(subCat)}
                    className="bg-white rounded-3xl p-6 cursor-pointer card-shadow flex flex-col items-center justify-center text-center gap-3 group border border-transparent hover:border-brand-olive/10 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-brand-warm flex items-center justify-center text-brand-olive">
                      <CategoryIcon category={selectedCategory as Category} className="w-5 h-5" />
                    </div>
                    <span className="font-semibold text-gray-900">{subCat}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      {categoryStats[`${selectedCategory}-${subCat}`] || 0} 个活动
                    </span>
                  </motion.div>
                ))}

                {/* Personalized Activity Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setNewActivity(prev => ({ ...prev, category: selectedCategory as Category, subCategory: '' }));
                    setIsModalOpen(true);
                  }}
                  className="bg-white rounded-3xl p-6 cursor-pointer border-2 border-dashed border-brand-olive/20 flex flex-col items-center justify-center text-center gap-3 group hover:bg-brand-warm/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-full bg-brand-olive/10 flex items-center justify-center text-brand-olive">
                    <Plus className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-brand-olive">个性活动</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    自定义你的活动小类
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}

          {view === 'activities' && (
            <motion.div
              key="activities"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-serif font-bold text-gray-900">
                    {selectedSubCategory === '全部' ? selectedCategory : selectedSubCategory}
                  </h2>
                  <p className="text-gray-500">
                    {selectedSubCategory === '全部' 
                      ? `正在浏览${selectedCategory}下的所有活动` 
                      : `正在浏览${selectedCategory} · ${selectedSubCategory}活动`}
                  </p>
                </div>
                {selectedCategory !== '全部' && (
                  <div className="w-14 h-14 rounded-3xl bg-brand-olive text-white flex items-center justify-center shadow-lg shadow-brand-olive/20">
                    <CategoryIcon category={selectedCategory as Category} className="w-7 h-7" />
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                  {filteredActivities.map((activity) => (
                      <ActivityCard 
                        key={activity.id} 
                        activity={activity} 
                        onSelect={setSelectedActivity} 
                        isFavorite={favorites.has(activity.id)}
                        onToggleFavorite={toggleFavorite}
                      />
                    ))}
                  </AnimatePresence>

                {filteredActivities.length === 0 && (
                  <div className="text-center py-20">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-300" />
                    </div>
                    <p className="text-gray-500">该分类下暂时没有活动，去看看别的？</p>
                    <button 
                      onClick={handleBack}
                      className="mt-4 text-brand-olive font-medium hover:underline"
                    >
                      返回上级
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
            </>
          )}
        </AnimatePresence>
      </main>

      {/* Activity Detail Modal */}
      <AnimatePresence>
        {selectedActivity && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedActivity(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-brand-warm text-brand-olive text-[10px] font-bold uppercase tracking-widest rounded-full">
                        {selectedActivity.category}
                      </span>
                      <span className="text-xs text-gray-400">{selectedActivity.subCategory}</span>
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">{selectedActivity.title}</h2>
                  </div>
                  <button onClick={() => setSelectedActivity(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Clock className="w-5 h-5 text-brand-olive" />
                    <span>{selectedActivity.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-brand-olive" />
                    <span>{selectedActivity.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Users className="w-5 h-5 text-brand-olive" />
                    <span>人数限制: {selectedActivity.maxParticipants} 人 (已加入 {selectedActivity.participants.length} 人)</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">活动详情</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{selectedActivity.description}</p>
                </div>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-gray-900 mb-4">已加入的小伙伴</h4>
                  <div className="space-y-3">
                    {selectedActivity.participants.map(p => (
                      <div key={p.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                        <div className="flex items-center gap-3">
                          <img src={p.avatar} className="w-10 h-10 rounded-full object-cover" alt={p.name} referrerPolicy="no-referrer" />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-sm">{p.name}</span>
                              <span className={`text-[10px] px-1.5 py-0.5 rounded ${p.gender === '男' ? 'bg-blue-100 text-blue-600' : 'bg-pink-100 text-pink-600'}`}>
                                {p.gender}
                              </span>
                            </div>
                            <div className="text-[10px] text-gray-400">{p.occupation} · {p.hobbies.join('/')}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => {
                    handleJoin(selectedActivity.id);
                    setSelectedActivity(null);
                  }}
                  disabled={selectedActivity.participants.length >= selectedActivity.maxParticipants}
                  className="w-full py-4 bg-brand-olive text-white rounded-2xl font-semibold shadow-lg shadow-brand-olive/30 hover:opacity-90 transition-all disabled:bg-gray-300 disabled:shadow-none"
                >
                  {selectedActivity.participants.length >= selectedActivity.maxParticipants ? '人数已满' : '立即加入'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Activity Modal (Simplified) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-white rounded-[32px] p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">发起新活动</h2>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                const activityId = `a${Date.now()}`;
                const activity: Activity = {
                  id: activityId,
                  ...newActivity,
                  creator: currentUser,
                  participants: [currentUser],
                  status: 'open'
                };
                
                setActivities(prev => [activity, ...prev]);
                
                // Add sub-category to categories if it doesn't exist
                if (!categories[newActivity.category].includes(newActivity.subCategory)) {
                  setCategories(prev => ({
                    ...prev,
                    [newActivity.category]: [...prev[newActivity.category], newActivity.subCategory]
                  }));
                }
                
                setIsModalOpen(false);
                setNewActivity({
                  title: '',
                  category: '棋牌' as Category,
                  subCategory: '',
                  time: '',
                  location: '',
                  description: '',
                  maxParticipants: 4
                });
              }}>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">活动标题</label>
                  <input 
                    type="text" 
                    required
                    value={newActivity.title}
                    onChange={e => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive/20" 
                    placeholder="例如：周五晚羽毛球..." 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">大类</label>
                    <select 
                      value={newActivity.category}
                      onChange={e => setNewActivity(prev => ({ ...prev, category: e.target.value as Category, subCategory: '' }))}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive/20"
                    >
                      {Object.keys(categories).map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">小类 (可自定义)</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        list="sub-categories"
                        value={newActivity.subCategory}
                        onChange={e => setNewActivity(prev => ({ ...prev, subCategory: e.target.value }))}
                        className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive/20" 
                        placeholder="输入或选择小类..." 
                      />
                      <datalist id="sub-categories">
                        {categories[newActivity.category].map(sc => <option key={sc} value={sc} />)}
                      </datalist>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">时间</label>
                    <input 
                      type="text" 
                      required
                      value={newActivity.time}
                      onChange={e => setNewActivity(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive/20" 
                      placeholder="例如：周六 14:00" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">人数限制</label>
                    <input 
                      type="number" 
                      required
                      value={newActivity.maxParticipants}
                      onChange={e => setNewActivity(prev => ({ ...prev, maxParticipants: parseInt(e.target.value) }))}
                      className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive/20" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">地点</label>
                  <input 
                    type="text" 
                    required
                    value={newActivity.location}
                    onChange={e => setNewActivity(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive/20" 
                    placeholder="具体地址..." 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-2">活动描述</label>
                  <textarea 
                    value={newActivity.description}
                    onChange={e => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full px-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand-olive/20 min-h-[100px]" 
                    placeholder="简单介绍一下活动吧..." 
                  />
                </div>
                <button className="w-full py-4 bg-brand-olive text-white rounded-2xl font-semibold mt-4 shadow-lg shadow-brand-olive/20">发布活动</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Bottom Nav (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-black/5 px-8 py-2 flex justify-around items-center md:hidden">
        <button 
          onClick={() => { setActiveTab('explore'); setView('home'); }}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'explore' ? 'text-brand-olive' : 'text-gray-400'}`}
        >
          <Search className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">探索</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'profile' ? 'text-brand-olive' : 'text-gray-400'}`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold uppercase tracking-wider">个人中心</span>
        </button>
      </div>
    </div>
  );
}
