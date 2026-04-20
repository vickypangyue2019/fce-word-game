import { WordFamily } from '@/types/fce'

export const allWordFamilies: WordFamily[] = [
  // Level 1
  {
    root: 'educate',
    forms: {
      动词: { word: 'educate', meaning: '教育', example: 'We need to educate young people about the environment.' },
      名词: { word: 'education', meaning: '教育', example: 'Education is the key to success.' },
      形容词: { word: 'educational', meaning: '有教育意义的', example: 'This documentary is very educational.' },
      副词: { word: 'educationally', meaning: '在教育上', example: 'The school is educationally excellent.' },
    },
    exercise: {
      sentence: 'The government has increased spending on ___ to improve schools.',
      answer: 'education',
      hint: 'educate → education（动词加-tion变名词）',
      options: ['educate', 'education', 'educational', 'educationally'],
    },
  },
  {
    root: 'compete',
    forms: {
      动词: { word: 'compete', meaning: '竞争', example: 'Athletes compete for gold medals.' },
      名词: { word: 'competition', meaning: '竞争；比赛', example: 'The competition was fierce this year.' },
      形容词: { word: 'competitive', meaning: '有竞争力的', example: 'She is very competitive in sports.' },
      副词: { word: 'competitively', meaning: '有竞争地', example: 'The product is competitively priced.' },
    },
    exercise: {
      sentence: 'There is a lot of ___ between companies for customers.',
      answer: 'competition',
      hint: 'compete → competition（动词加-tion变名词）',
      options: ['compete', 'competition', 'competitive', 'competitively'],
    },
  },
  // Level 2
  {
    root: 'attract',
    forms: {
      动词: { word: 'attract', meaning: '吸引', example: 'The museum attracts millions of visitors each year.' },
      名词: { word: 'attraction', meaning: '吸引力；景点', example: 'The Eiffel Tower is a major tourist attraction.' },
      形容词: { word: 'attractive', meaning: '吸引人的', example: 'She wore an attractive dress.' },
      副词: { word: 'attractively', meaning: '吸引人地', example: 'The shop was attractively decorated.' },
    },
    exercise: {
      sentence: 'The new theme park has become a popular tourist ___.',
      answer: 'attraction',
      hint: 'attract → attraction（动词加-tion变名词）',
      options: ['attract', 'attraction', 'attractive', 'attractively'],
    },
  },
  {
    root: 'organize',
    forms: {
      动词: { word: 'organize', meaning: '组织', example: 'She organized a fundraising event.' },
      名词: { word: 'organization', meaning: '组织；机构', example: 'He works for an international organization.' },
      形容词: { word: 'organized', meaning: '有组织的', example: 'She is a very organized person.' },
      副词: { word: 'organizationally', meaning: '在组织上', example: 'The event ran organizationally well.' },
    },
    exercise: {
      sentence: 'He joined a charity ___ that helps homeless people.',
      answer: 'organization',
      hint: 'organize → organization（动词加-ation变名词）',
      options: ['organize', 'organization', 'organized', 'organizationally'],
    },
  },
  // Level 3
  {
    root: 'pollute',
    forms: {
      动词: { word: 'pollute', meaning: '污染', example: 'Factories pollute the air and water.' },
      名词: { word: 'pollution', meaning: '污染', example: 'Air pollution is a serious problem in big cities.' },
      形容词: { word: 'polluted', meaning: '被污染的', example: 'The river is heavily polluted.' },
    },
    exercise: {
      sentence: 'Air ___ in the city has reached dangerous levels.',
      answer: 'pollution',
      hint: 'pollute → pollution（动词加-tion变名词）',
      options: ['pollute', 'pollution', 'polluted', 'polluting'],
    },
  },
  {
    root: 'suggest',
    forms: {
      动词: { word: 'suggest', meaning: '建议', example: 'I suggest going to the cinema tonight.' },
      名词: { word: 'suggestion', meaning: '建议', example: 'Do you have any suggestions for improvement?' },
    },
    exercise: {
      sentence: 'Thank you for your ___. We will consider it carefully.',
      answer: 'suggestion',
      hint: 'suggest → suggestion（动词加-ion变名词）',
      options: ['suggest', 'suggestion', 'suggestive', 'suggested'],
    },
  },
  // Level 4
  {
    root: 'decide',
    forms: {
      动词: { word: 'decide', meaning: '决定', example: 'She decided to study abroad.' },
      名词: { word: 'decision', meaning: '决定', example: 'Making a decision can be difficult.' },
      形容词: { word: 'decisive', meaning: '决断的', example: 'We need decisive action on this issue.' },
      副词: { word: 'decisively', meaning: '果断地', example: 'She acted decisively in the crisis.' },
    },
    exercise: {
      sentence: 'The manager made the final ___ to close the office.',
      answer: 'decision',
      hint: 'decide → decision（动词加-sion变名词）',
      options: ['decide', 'decision', 'decisive', 'decisively'],
    },
  },
  {
    root: 'discuss',
    forms: {
      动词: { word: 'discuss', meaning: '讨论', example: 'Let\'s discuss the problem together.' },
      名词: { word: 'discussion', meaning: '讨论', example: 'After a long discussion, they reached an agreement.' },
    },
    exercise: {
      sentence: 'After much ___, they finally agreed on a plan.',
      answer: 'discussion',
      hint: 'discuss → discussion（动词加-ion变名词）',
      options: ['discuss', 'discussion', 'discussed', 'discussing'],
    },
  },
  // Level 5
  {
    root: 'develop',
    forms: {
      动词: { word: 'develop', meaning: '发展；开发', example: 'The company plans to develop new products.' },
      名词: { word: 'development', meaning: '发展', example: 'Economic development is important for all countries.' },
      形容词: { word: 'developed', meaning: '发达的', example: 'Japan is a highly developed country.' },
    },
    exercise: {
      sentence: 'The rapid ___ of technology has changed our lives.',
      answer: 'development',
      hint: 'develop → development（动词加-ment变名词）',
      options: ['develop', 'development', 'developed', 'developing'],
    },
  },
  {
    root: 'achieve',
    forms: {
      动词: { word: 'achieve', meaning: '实现；达成', example: 'She achieved her goal of becoming a doctor.' },
      名词: { word: 'achievement', meaning: '成就', example: 'Winning the prize was a great achievement.' },
      形容词: { word: 'achievable', meaning: '可实现的', example: 'Is this target achievable by next year?' },
    },
    exercise: {
      sentence: 'Climbing Everest was the greatest ___ of his life.',
      answer: 'achievement',
      hint: 'achieve → achievement（动词加-ment变名词）',
      options: ['achieve', 'achievement', 'achievable', 'achieved'],
    },
  },
  // Level 6
  {
    root: 'appear',
    forms: {
      动词: { word: 'appear', meaning: '出现；似乎', example: 'A star appeared in the night sky.' },
      名词: { word: 'appearance', meaning: '外貌；出现', example: 'Her appearance changed a lot over the years.' },
    },
    exercise: {
      sentence: 'She always pays great attention to her ___.',
      answer: 'appearance',
      hint: 'appear → appearance（动词加-ance变名词）',
      options: ['appear', 'appearance', 'appeared', 'apparently'],
    },
  },
  {
    root: 'perform',
    forms: {
      动词: { word: 'perform', meaning: '表演；执行', example: 'The band performed their new song.' },
      名词: { word: 'performance', meaning: '表演；表现', example: 'The performance lasted two hours.' },
      名词2: { word: 'performer', meaning: '表演者', example: 'She is a talented performer.' },
    },
    exercise: {
      sentence: 'The actor gave an outstanding ___ in the film.',
      answer: 'performance',
      hint: 'perform → performance（动词加-ance变名词）',
      options: ['perform', 'performance', 'performer', 'performing'],
    },
  },
  // Level 7
  {
    root: 'express',
    forms: {
      动词: { word: 'express', meaning: '表达', example: 'It\'s important to express your feelings.' },
      名词: { word: 'expression', meaning: '表达；表情', example: 'He had a worried expression on his face.' },
      形容词: { word: 'expressive', meaning: '富有表情的', example: 'She has very expressive eyes.' },
    },
    exercise: {
      sentence: 'He had a strange ___ on his face when he heard the news.',
      answer: 'expression',
      hint: 'express → expression（动词加-ion变名词）',
      options: ['express', 'expression', 'expressive', 'expressively'],
    },
  },
  {
    root: 'inspire',
    forms: {
      动词: { word: 'inspire', meaning: '激励；启发', example: 'Her story inspired many young people.' },
      名词: { word: 'inspiration', meaning: '灵感；激励', example: 'Nature is a great source of inspiration for artists.' },
      形容词: { word: 'inspiring', meaning: '激励人心的', example: 'His speech was truly inspiring.' },
    },
    exercise: {
      sentence: 'The beautiful scenery gave her the ___ to write a poem.',
      answer: 'inspiration',
      hint: 'inspire → inspiration（动词加-ation变名词）',
      options: ['inspire', 'inspiration', 'inspiring', 'inspired'],
    },
  },
  // Level 8
  {
    root: 'survive',
    forms: {
      动词: { word: 'survive', meaning: '生存；幸存', example: 'Only a few people survived the earthquake.' },
      名词: { word: 'survival', meaning: '生存', example: 'Survival in the desert is very difficult.' },
      名词2: { word: 'survivor', meaning: '幸存者', example: 'She was the only survivor of the crash.' },
    },
    exercise: {
      sentence: 'The documentary showed the ___ of wild animals in winter.',
      answer: 'survival',
      hint: 'survive → survival（动词加-al变名词）',
      options: ['survive', 'survival', 'survivor', 'surviving'],
    },
  },
  {
    root: 'comfort',
    forms: {
      动词: { word: 'comfort', meaning: '安慰', example: 'She comforted her friend after the bad news.' },
      名词: { word: 'comfort', meaning: '舒适；安慰', example: 'He lived in comfort all his life.' },
      形容词: { word: 'comfortable', meaning: '舒适的', example: 'This sofa is very comfortable.' },
      副词: { word: 'comfortably', meaning: '舒适地', example: 'She sat comfortably in the armchair.' },
    },
    exercise: {
      sentence: 'Is the temperature ___ for you in this room?',
      answer: 'comfortable',
      hint: 'comfort → comfortable（名词加-able变形容词）',
      options: ['comfort', 'comfortably', 'comfortable', 'comforting'],
    },
  },
  // Level 9
  {
    root: 'care',
    forms: {
      动词: { word: 'care', meaning: '关心', example: 'She really cares about the environment.' },
      名词: { word: 'care', meaning: '关心；照料', example: 'Take care when crossing the road.' },
      形容词1: { word: 'careful', meaning: '小心的', example: 'Be careful not to make any mistakes.' },
      形容词2: { word: 'careless', meaning: '粗心的', example: 'A careless mistake cost him the job.' },
      副词: { word: 'carefully', meaning: '仔细地', example: 'Read the instructions carefully.' },
    },
    exercise: {
      sentence: 'Please read the contract ___ before you sign it.',
      answer: 'carefully',
      hint: 'careful → carefully（形容词加-ly变副词）',
      options: ['care', 'careful', 'careless', 'carefully'],
    },
  },
  {
    root: 'help',
    forms: {
      动词: { word: 'help', meaning: '帮助', example: 'Can you help me with this problem?' },
      名词: { word: 'help', meaning: '帮助', example: 'Thank you for your help.' },
      形容词1: { word: 'helpful', meaning: '有帮助的', example: 'The staff were very helpful.' },
      形容词2: { word: 'helpless', meaning: '无助的', example: 'She felt helpless in the situation.' },
      副词: { word: 'helpfully', meaning: '乐于助人地', example: 'He helpfully showed her the way.' },
    },
    exercise: {
      sentence: 'The tourist guide was very ___ and answered all our questions.',
      answer: 'helpful',
      hint: 'help → helpful（名词/动词加-ful变形容词）',
      options: ['help', 'helpless', 'helpful', 'helpfully'],
    },
  },
  // Level 10
  {
    root: 'use',
    forms: {
      动词: { word: 'use', meaning: '使用', example: 'Do you know how to use this machine?' },
      名词: { word: 'use', meaning: '用途', example: 'What is the use of this tool?' },
      形容词1: { word: 'useful', meaning: '有用的', example: 'A map is useful when you travel.' },
      形容词2: { word: 'useless', meaning: '无用的', example: 'This old computer is completely useless.' },
      副词: { word: 'usefully', meaning: '有用地', example: 'She spent her time usefully.' },
    },
    exercise: {
      sentence: 'This dictionary is very ___ for learning new words.',
      answer: 'useful',
      hint: 'use → useful（名词加-ful变形容词）',
      options: ['use', 'useless', 'useful', 'usefully'],
    },
  },
  {
    root: 'succeed',
    forms: {
      动词: { word: 'succeed', meaning: '成功', example: 'She succeeded in passing all her exams.' },
      名词: { word: 'success', meaning: '成功', example: 'Hard work leads to success.' },
      形容词: { word: 'successful', meaning: '成功的', example: 'He is a very successful businessman.' },
      副词: { word: 'successfully', meaning: '成功地', example: 'The mission was successfully completed.' },
    },
    exercise: {
      sentence: 'The launch of the new product was very ___.',
      answer: 'successful',
      hint: 'success → successful（名词加-ful变形容词）',
      options: ['succeed', 'success', 'successful', 'successfully'],
    },
  },
  // Level 11
  {
    root: 'danger',
    forms: {
      名词: { word: 'danger', meaning: '危险', example: 'The hikers were in great danger.' },
      形容词: { word: 'dangerous', meaning: '危险的', example: 'It is dangerous to drive too fast.' },
      副词: { word: 'dangerously', meaning: '危险地', example: 'He was driving dangerously fast.' },
      动词: { word: 'endanger', meaning: '使危险', example: 'Pollution endangers wildlife.' },
    },
    exercise: {
      sentence: 'Smoking is ___ to your health.',
      answer: 'dangerous',
      hint: 'danger → dangerous（名词加-ous变形容词）',
      options: ['danger', 'dangerous', 'dangerously', 'endanger'],
    },
  },
  {
    root: 'courage',
    forms: {
      名词: { word: 'courage', meaning: '勇气', example: 'It takes courage to stand up for what you believe.' },
      形容词: { word: 'courageous', meaning: '勇敢的', example: 'The firefighter was very courageous.' },
      动词: { word: 'encourage', meaning: '鼓励', example: 'Her parents always encouraged her to study.' },
      名词2: { word: 'encouragement', meaning: '鼓励', example: 'His words of encouragement helped her greatly.' },
    },
    exercise: {
      sentence: 'The teacher always ___ her students to ask questions.',
      answer: 'encourage',
      hint: 'courage → encourage（加en-前缀变动词）',
      options: ['courage', 'courageous', 'encourage', 'encouragement'],
    },
  },
  // Level 12
  {
    root: 'friend',
    forms: {
      名词: { word: 'friend', meaning: '朋友', example: 'She is my best friend.' },
      形容词: { word: 'friendly', meaning: '友好的', example: 'The staff are very friendly and helpful.' },
      名词2: { word: 'friendship', meaning: '友谊', example: 'Their friendship lasted many years.' },
      副词: { word: 'in a friendly way', meaning: '友好地', example: 'He greeted her in a friendly way.' },
    },
    exercise: {
      sentence: 'The locals were very ___ and welcomed us warmly.',
      answer: 'friendly',
      hint: 'friend → friendly（名词加-ly变形容词）',
      options: ['friend', 'friendly', 'friendship', 'friendless'],
    },
  },
  {
    root: 'nature',
    forms: {
      名词: { word: 'nature', meaning: '自然', example: 'She loves spending time in nature.' },
      形容词: { word: 'natural', meaning: '自然的', example: 'The food contains only natural ingredients.' },
      副词: { word: 'naturally', meaning: '自然地', example: 'She naturally picked up the language.' },
    },
    exercise: {
      sentence: 'She has a ___ talent for music.',
      answer: 'natural',
      hint: 'nature → natural（去e加-al变形容词）',
      options: ['nature', 'natural', 'naturally', 'naturalize'],
    },
  },
  // Level 13
  {
    root: 'nation',
    forms: {
      名词: { word: 'nation', meaning: '国家', example: 'Many nations took part in the competition.' },
      形容词: { word: 'national', meaning: '国家的', example: 'The national team won the championship.' },
      副词: { word: 'nationally', meaning: '全国地', example: 'The product is sold nationally.' },
      名词2: { word: 'nationality', meaning: '国籍', example: 'What is your nationality?' },
    },
    exercise: {
      sentence: 'The athletes marched behind their ___ flags.',
      answer: 'national',
      hint: 'nation → national（名词加-al变形容词）',
      options: ['nation', 'national', 'nationally', 'nationality'],
    },
  },
  {
    root: 'tradition',
    forms: {
      名词: { word: 'tradition', meaning: '传统', example: 'It is a tradition to give gifts at Christmas.' },
      形容词: { word: 'traditional', meaning: '传统的', example: 'They cooked a traditional meal.' },
      副词: { word: 'traditionally', meaning: '传统地', example: 'Traditionally, the bride wears white.' },
    },
    exercise: {
      sentence: 'In many countries, it is ___ to celebrate the New Year with fireworks.',
      answer: 'traditional',
      hint: 'tradition → traditional（名词加-al变形容词）',
      options: ['tradition', 'traditional', 'traditionally', 'traditionalist'],
    },
  },
  // Level 14
  {
    root: 'music',
    forms: {
      名词: { word: 'music', meaning: '音乐', example: 'I love listening to music.' },
      形容词: { word: 'musical', meaning: '音乐的', example: 'She comes from a very musical family.' },
      名词2: { word: 'musician', meaning: '音乐家', example: 'He is a talented musician.' },
    },
    exercise: {
      sentence: 'She grew up in a very ___ family — everyone played an instrument.',
      answer: 'musical',
      hint: 'music → musical（名词加-al变形容词）',
      options: ['music', 'musical', 'musician', 'musically'],
    },
  },
  {
    root: 'know',
    forms: {
      动词: { word: 'know', meaning: '知道', example: 'Do you know the answer?' },
      名词: { word: 'knowledge', meaning: '知识', example: 'Knowledge is power.' },
      形容词: { word: 'knowledgeable', meaning: '知识渊博的', example: 'She is very knowledgeable about history.' },
    },
    exercise: {
      sentence: 'He is very ___ about art and culture.',
      answer: 'knowledgeable',
      hint: 'knowledge → knowledgeable（名词加-able变形容词）',
      options: ['know', 'knowledge', 'knowledgeable', 'knowingly'],
    },
  },
  // Level 15
  {
    root: 'luck',
    forms: {
      名词: { word: 'luck', meaning: '运气', example: 'Good luck with your exam!' },
      形容词: { word: 'lucky', meaning: '幸运的', example: 'You are lucky to have such good friends.' },
      副词: { word: 'luckily', meaning: '幸运地', example: 'Luckily, no one was hurt in the accident.' },
    },
    exercise: {
      sentence: '___, the train arrived just as we reached the station.',
      answer: 'luckily',
      hint: 'lucky → luckily（形容词y变i加-ly变副词）',
      options: ['luck', 'lucky', 'luckily', 'luckiness'],
    },
  },
  {
    root: 'agree',
    forms: {
      动词: { word: 'agree', meaning: '同意', example: 'I agree with your decision.' },
      名词: { word: 'agreement', meaning: '协议；同意', example: 'They reached an agreement after long talks.' },
      形容词: { word: 'agreeable', meaning: '令人愉快的', example: 'The weather was most agreeable.' },
      副词: { word: 'agreeably', meaning: '令人愉快地', example: 'I was agreeably surprised by the result.' },
    },
    exercise: {
      sentence: 'The two countries signed a peace ___ last week.',
      answer: 'agreement',
      hint: 'agree → agreement（动词加-ment变名词）',
      options: ['agree', 'agreement', 'agreeable', 'agreeably'],
    },
  },
]

export function getWordFamiliesForLevel(level: number): WordFamily[] {
  const perLevel = 2
  const start = (level - 1) * perLevel
  const end = start + perLevel
  return allWordFamilies.slice(start, Math.min(end, allWordFamilies.length))
}

export function getTotalLevels(): number {
  return Math.ceil(allWordFamilies.length / 2)
}
