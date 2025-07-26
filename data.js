const questions = [
  {
    questionImg: 'PIC/Topic1.png',
    bgImg: 'PIC/Test1.png',
    options: [
      { img: 'PIC/Q1A.png', score: {1: 1} },  // 精神滿滿迅速衝出門 → 熱血冒險 (1)
      { img: 'PIC/Q1B.png', score: {2: 1} },  // 昨晚爆肝追劇，現在睡眼惺忪快遲到 → 未來科幻 (2)
      { img: 'PIC/Q1C.png', score: {3: 1} },  // 賴床賴到最後一刻才不情願爬起來 → 日常療癒 (3)
      { img: 'PIC/Q1D.png', score: {4: 1} }   // 起床瞬間感到世界無望，人生好難 → 黑暗奇幻 (4)
    ]
  },
  {
    questionImg: 'PIC/Topic2.png',
    bgImg: 'PIC/Test2.png',
    options: [
      { img: 'PIC/Q2A.png', score: {8: 1} },  // 找朋友一起狂吐槽大笑一場 → 搞怪無厘頭 (8)
      { img: 'PIC/Q2B.png', score: {7: 1} },  // 慢慢整理思緒，一件件處理好 → 社會寫實 (7)
      { img: 'PIC/Q2C.png', score: {5: 1} },  // 幻想召喚神秘力量 → 魔法校園 (5)
      { img: 'PIC/Q2D.png', score: {3: 1} }   // 躲起來泡茶看貓影片 → 日常療癒 (3)
    ]
  },
  {
    questionImg: 'PIC/Topic3.png',
    bgImg: 'PIC/Test3.png',
    options: [
      { img: 'PIC/Q3A.png', score: {6: 1} },  // 熱血爆發 → 戀愛喜劇 (6)
      { img: 'PIC/Q3B.png', score: {5: 1} },  // 魔法制服閃閃發光 → 魔法校園 (5)
      { img: 'PIC/Q3C.png', score: {2: 1} },  // 冷靜理性預測局勢 → 未來科幻 (2)
      { img: 'PIC/Q3D.png', score: {4: 1} }   // 暗地裡操控一切 → 黑暗奇幻 (4)
    ]
  },
  {
    questionImg: 'PIC/Topic4.png',
    bgImg: 'PIC/Test4.png',
    options: [
      { img: 'PIC/Q4A.png', score: {6: 1} },  // 便利商店打工被戀愛纏上 → 戀愛喜劇 (6)
      { img: 'PIC/Q4B.png', score: {1: 1} },  // 衝進危機拯救世界英雄 → 熱血冒險 (1)
      { img: 'PIC/Q4C.png', score: {7: 1} },  // 低調睿智哲學家 → 社會寫實 (7)
      { img: 'PIC/Q4D.png', score: {8: 1} }   // 路人製造笑點 → 搞怪無厘頭 (8)
    ]
  },
  {
    questionImg: 'PIC/Topic5.png',
    bgImg: 'PIC/Test5.png',
    options: [
      { img: 'PIC/Q5A.png', score: {1: 1} },  // 為夢想而活 → 熱血冒險 (1)
      { img: 'PIC/Q5B.png', score: {4: 1} },  // 世界沒有絕對對錯 → 黑暗奇幻 (4)
      { img: 'PIC/Q5C.png', score: {6: 1} },  // 今天閃閃惹人愛 → 戀愛喜劇 (6)
      { img: 'PIC/Q5D.png', score: {2: 1} }   // 數據從不說謊 → 未來科幻 (2)
    ]
  },
  {
    questionImg: 'PIC/Topic6.png',
    bgImg: 'PIC/Test6.png',
    options: [
      { img: 'PIC/Q6A.png', score: {3: 1} },  // 雜貨店貓咪小鎮→ 日常療癒 (3)
      { img: 'PIC/Q6B.png', score: {5: 1} },  // 魔法少女上課會飛 → 魔法校園 (5)
      { img: 'PIC/Q6C.png', score: {8: 1} },  // 脫離常理發瘋 → 搞怪無厘頭 (8)
      { img: 'PIC/Q6D.png', score: {7: 1} }   // 校園心理壓力試煉 → 社會寫實 (7)
    ]
  },
  {
    questionImg: 'PIC/Topic7.png',
    bgImg: 'PIC/Test7.png',
    options: [
      { img: 'PIC/Q7A.png', score: {2: 1} },  // 世界觀爆炸大 → 未來科幻 (2)
      { img: 'PIC/Q7B.png', score: {6: 1} },  // 曖昧氛圍戀愛修羅場 → 戀愛喜劇 (6)
      { img: 'PIC/Q7C.png', score: {4: 1} },  // 劇情黑暗心機 → 黑暗奇幻 (4)
      { img: 'PIC/Q7D.png', score: {3: 1} }   // 輕鬆小品適合吃飯時看 → 日常療癒 (3)
    ]
  },
  {
    questionImg: 'PIC/Topic8.png',
    bgImg: 'PIC/Test8.png',
    options: [
      { img: 'PIC/Q8A.png', score: {5: 1} },  // 魔法市集異世界文化祭 → 魔法校園 (5)
      { img: 'PIC/Q8B.png', score: {1: 1} },  // 爬山探險翻牆廢墟 → 熱血冒險 (1)
      { img: 'PIC/Q8C.png', score: {7: 1} },  // 咖啡廳窩一下午 → 社會寫實 (7)
      { img: 'PIC/Q8D.png', score: {8: 1} }   // 漫畫店搞笑看奇葩 → 搞怪無厘頭 (8)
    ]
  },
];
