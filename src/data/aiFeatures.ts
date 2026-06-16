export interface AIFeature {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
}

export const AI_FEATURES: AIFeature[] = [
  // 1. Academic & Research
  { id: 'acad-1', name: 'شیکاریی سیمانتیکی توێژینەوە', category: 'ئەکادیمی', icon: 'Microscope', description: 'شیکاری وردی مانا و پەیوەندی نێوان توێژینەوە زانستییەکان.' },
  { id: 'acad-2', name: 'داڕشتنی تێزی تێر و تەسەل', category: 'ئەکادیمی', icon: 'BookOpen', description: 'هاوکاری لە نووسینی سەرەتا و کۆتایی تێزەکان.' },
  { id: 'acad-3', name: 'دۆزینەوەی بیرۆکەی توێژینەوە', category: 'ئەکادیمی', icon: 'Lightbulb', description: 'پێشنیارکردنی ناونیشانی توێژینەوەی نوێ و مۆدێرن.' },
  { id: 'acad-4', name: 'پوختەکردنی کتێبی زانستی', category: 'ئەکادیمی', icon: 'Library', description: 'کورتکردنەوەی فەسڵەکانی کتێب بە شێوەیەکی زیرەک.' },
  { id: 'acad-5', name: 'وەرگێڕانی تێکستی زانستی', category: 'ئەکادیمی', icon: 'Languages', description: 'وەرگێڕانی تێکستە ئاڵۆزەکان بە پاراستنی مانا زانستییەکەی.' },
  { id: 'acad-6', name: 'سەرچاوەسازی جیهانی', category: 'ئەکادیمی', icon: 'Quote', description: 'دروستکردنی سیتاشن بە فۆرماتەکانی APA, MLA, Harvard.' },
  { id: 'acad-7', name: 'شیکاری هاوکێشەی بیرکاری', category: 'ئەکادیمی', icon: 'FlaskConical', description: 'چارەسەرکردنی هاوکێشە ئاڵۆزەکان هەنگاو بە هەنگاو.' },
  { id: 'acad-8', name: 'ڕەخنەگرتنی ئەکادیمی', category: 'ئەکادیمی', icon: 'Eye', description: 'دۆزینەوەی خاڵە لاوازەکانی دەقە ئەکادیمییەکان.' },
  { id: 'acad-9', name: 'پلانی خوێندن بۆ تاقیکردنەوە', category: 'ئەکادیمی', icon: 'CalendarDays', description: 'کێشانی خشتەی خوێندن بەپێی کاتی بەردەست.' },
  { id: 'acad-10', name: 'نووسینی سیمیناری زانستی', category: 'ئەکادیمی', icon: 'Presentation', description: 'داڕشتنی ناوەڕۆکی سلاایدەکان بە شێوازێکی سەرنجڕاکێش.' },

  // 2. Business & Professional
  { id: 'biz-1', name: 'داڕشتنی Business Plan', category: 'بزنس', icon: 'Briefcase', description: 'نووسینی پلانی کار بۆ پڕۆژە بچووک و گەورەکان.' },
  { id: 'biz-2', name: 'شیکاریی SWOT', category: 'بزنس', icon: 'Target', description: 'دۆزینەوەی خاڵی بەهێز، لاواز، دەرفەت و هەڕەشەکان.' },
  { id: 'biz-3', name: 'پلانی مارکێتینگ', category: 'بزنس', icon: 'Megaphone', description: 'داڕشتنی ستراتیژی فرۆشتن و ناساندنی براند.' },
  { id: 'biz-4', name: 'نووسینی ئیمەیڵی فەرمی', category: 'بزنس', icon: 'Mail', description: 'داڕشتنی ئیمەیڵ بۆ مامەڵە بازرگانی و فەرمییەکان.' },
  { id: 'biz-5', name: 'شیکاریی ڕکابەران', category: 'بزنس', icon: 'Users', description: 'بەراوردکردنی براندەکەت لەگەڵ ڕکابەرە سەرەکییەکان.' },
  { id: 'biz-6', name: 'خەمڵاندنی بودجە', category: 'بزنس', icon: 'BarChart3', description: 'ژماردنی تێچووی پڕۆژە و پێشبینیکردنی داهات.' },
  { id: 'biz-7', name: 'گرێبەستی کار', category: 'بزنس', icon: 'FileText', description: 'ئامادەکردنی ڕەشنووسی گرێبەستە جیاوازەکان.' },
  { id: 'biz-8', name: 'پێشنیارکردنی ناوی براند', category: 'بزنس', icon: 'Type', description: 'دۆزینەوەی ناوی کورت و کاریگەر بۆ بزنسەکەت.' },
  { id: 'biz-9', name: 'وەسفی بەرهەم', category: 'بزنس', icon: 'ShoppingBag', description: 'نووسینی تێکستی ڕاکێشەر بۆ فرۆشتنی کاڵاکان.' },
  { id: 'biz-10', name: 'شیکاریی ترێندی بازاڕ', category: 'بزنس', icon: 'TrendingUp', description: 'ناسینی گۆڕانکارییەکانی بازاڕ لە کاتێکی کەمدا.' },

  // 3. Coding & Tech
  { id: 'code-1', name: 'ڕیفاقکردنی کۆد', category: 'کۆدینگ', icon: 'Code', description: 'پاککردنەوە و باشترکردنی ئاستی کۆدەکان.' },
  { id: 'code-2', name: 'وردبینی ئاسایش', category: 'کۆدینگ', icon: 'ShieldCheck', description: 'دۆزینەوەی کونە ئەمنییەکان لەناو کۆددا.' },
  { id: 'code-3', name: 'نووسینی Unit Test', category: 'کۆدینگ', icon: 'CheckCircle2', description: 'دروستکردنی تاقیکردنەوەی ئۆتۆماتیکی بۆ فەنکشنەکان.' },
  { id: 'code-4', name: 'گۆڕینی زمانی پڕۆگرامسازی', category: 'کۆدینگ', icon: 'ArrowLeftRight', description: 'پەڕینەوە لە زمانێکەوە بۆ زمانێکی دیکە.' },
  { id: 'code-5', name: 'دیزاینی داتابەیس', icon: 'Database', category: 'کۆدینگ', description: 'کێشانی پێکهاتەی خشتەکان و پەیوەندی نێوانیان.' },
  { id: 'code-6', name: 'دۆزینەوەی Bug', category: 'کۆدینگ', icon: 'Bug', description: 'شیکاری هەڵەکان و پێشنیارکردنی چارەسەر.' },
  { id: 'code-7', name: 'دۆکیومێنتکردنی کۆد', category: 'کۆدینگ', icon: 'FileCode', description: 'نووسینی ڕوونکردنەوە بۆ هەموو بەشەکانی سۆفتوێرەکە.' },
  { id: 'code-8', name: 'دروستکردنی Regex', category: 'کۆدینگ', icon: 'Key', description: 'شیکاری تێکستە ئاڵۆزەکان بە دەربڕینی ڕێک و پێک.' },
  { id: 'code-9', name: 'پلانی تەلارسازی', category: 'کۆدینگ', icon: 'Cpu', description: 'دیزاینکردنی سیستەمە گەورە و ئاڵۆزەکان.' },
  { id: 'code-10', name: 'ئۆتۆماتیککردنی ئەرکەکان', category: 'کۆدینگ', icon: 'Zap', description: 'نووسینی سکریپت بۆ جێبەجێکردنی کارە دووبارەبووەکان.' },

  // 4. Creative Arts
  { id: 'art-1', name: 'پرۆمتی وێنەی پڕۆفیشناڵ', category: 'داهێنان', icon: 'Palette', description: 'داڕشتنی تێکستی ورد بۆ دروستکەرانی وێنەی AI.' },
  { id: 'art-2', name: 'دەقی ڤیدیۆی یوتیوب', category: 'داهێنان', icon: 'Video', description: 'نووسینی سکریپتی سەرنجڕاکێش بۆ ڤیدیۆکان.' },
  { id: 'art-3', name: 'نووسینی شیعری کلاسیک', category: 'داهێنان', icon: 'Pen', description: 'داڕشتنی هۆنراوە بە کێش و سەرواوە.' },
  { id: 'art-4', name: 'سیناریۆی چیرۆک', category: 'داهێنان', icon: 'Book', description: 'دروستکردنی کارەکتەر و گرێی چیرۆک.' },
  { id: 'art-5', name: 'دیزاینی لۆگۆ', category: 'داهێنان', icon: 'PenTool', description: 'پێشنیارکردنی سیمبوڵ و ڕەنگی لۆگۆ.' },
  { id: 'art-6', name: 'نووسینی تێکستی میوزیک', category: 'داهێنان', icon: 'Music', description: 'داڕشتنی وشەی گۆرانی بۆ ئاوازەکان.' },
  { id: 'art-7', name: 'شیکاریی ڕەنگی دیزاین', category: 'داهێنان', icon: 'Pipette', description: 'دیاریکردنی پەلێتێکی ڕەنگی گونجاو.' },
  { id: 'art-8', name: 'ناوەڕۆکی سۆشیاڵ میدیا', category: 'داهێنان', icon: 'Share2', description: 'نووسینی پۆست بۆ ئینستاگرام، فەیسبووک و لیندین.' },
  { id: 'art-9', name: 'بانەری ڕێکلامی', category: 'داهێنان', icon: 'Layout', description: 'دیزاینکردنی بیرۆکەی بانەرە بازرگانییەکان.' },
  { id: 'art-10', name: 'شیکاریی وێنەی AI', category: 'داهێنان', icon: 'Search', description: 'تێگەیشتن لە کوالیتی و پێکهاتەی وێنەکان.' },

  // 5. Data Analysis
  { id: 'data-1', name: 'شیکاریی Excel', category: 'داتا', icon: 'Table', description: 'دەرهێنانی ماناکانی ناو فایلە ژمێریارییەکان.' },
  { id: 'data-2', name: 'دۆزینەوەی Trend', category: 'داتا', icon: 'TrendingUp', description: 'بینینی گۆڕانکارییەکان لە ماوەی کاتدا.' },
  { id: 'data-3', name: 'پاککردنەوەی داتا', category: 'داتا', icon: 'Eraser', description: 'لابردنی زانیارییە زائید و هەڵەکان.' },
  { id: 'data-4', name: 'گۆڕینی داتا بۆ گراف', category: 'داتا', icon: 'PieChart', description: 'خستنەڕووی زانیارییەکان بە شێوەی بینراو.' },
  { id: 'data-5', name: 'پێشبینیکردنی داتا', category: 'داتا', icon: 'LineChart', description: 'خەمڵاندنی بارودۆخی داهاتوو بەپێی داتای کۆن.' },
  { id: 'data-6', name: 'شیکاریی Sentiment', category: 'داتا', icon: 'Smile', description: 'زانینی هەستی خەڵک لە دەقێکدا (ئەرێنی/نەرێنی).' },
  { id: 'data-7', name: 'پوختەکردنی ئاماری', category: 'داتا', icon: 'Sigma', description: 'کورتکردنەوەی ژمارە ئاڵۆزەکان بۆ خاڵی سەرەکی.' },
  { id: 'data-8', name: 'بەراوردکردنی داتا', category: 'داتا', icon: 'Dna', description: 'دۆزینەوەی جیاوازییەکانی نێوان دوو کۆمەڵە زانیاری.' },
  { id: 'data-9', name: 'دەرهێنانی زانیاری', category: 'داتا', icon: 'FileSearch', description: 'کێشانی داتا لە ناو تێکستە گەورەکان.' },
  { id: 'data-10', name: 'ڕاپۆرتی بڕیاردان', category: 'داتا', icon: 'ClipboardCheck', description: 'ئامادەکردنی خولاسەیەک بۆ ئەوەی بڕیار بدەیت.' },

  // 6. Linguistic & Translation
  { id: 'lang-1', name: 'وەرگێڕانی زاراوە', category: 'زمانەوانی', icon: 'Languages', description: 'گۆڕینی ئیدیەمەکان بۆ زمانی کوردی بە مانا نەک وشە.' },
  { id: 'lang-2', name: 'چاککردنی ڕێزمان', category: 'زمانەوانی', icon: 'SpellCheck', description: 'ڕاستکردنەوەی هەڵە زمانەوانییە ئاڵۆزەکان.' },
  { id: 'lang-3', name: 'گۆڕینی تۆنی قسە', category: 'زمانەوانی', icon: 'Volume2', description: 'کردنی تێکستێک بە فەرمی، هاوڕێیانە، یان توند.' },
  { id: 'lang-4', name: 'پێشنیاری Synonym', category: 'زمانەوانی', icon: 'Type', description: 'دۆزینەوەی وشەی هاومانای بەهێز بۆ دەقەکان.' },
  { id: 'lang-5', name: 'کورتکردنەوەی وتار', category: 'زمانەوانی', icon: 'Minimize2', description: 'کەمکردنەوەی قەبارەی دەق بەبێ تێکچوونی مەبەست.' },
  { id: 'lang-6', name: 'وەرگێڕانی فرەزمان', category: 'زمانەوانی', icon: 'Globe', description: 'کارکردن لەگەڵ ٥٠+ زمانی جیاوازدا.' },
  { id: 'lang-7', name: 'شیکاریی مێژووی وشە', category: 'زمانەوانی', icon: 'History', description: 'زانینی بنەڕەت و ڕەگی وشەکان.' },
  { id: 'lang-8', name: 'وەرگێڕانی وێب سایت', category: 'زمانەوانی', icon: 'ExternalLink', description: 'گۆڕینی ناوەڕۆکی لاپەڕەکانی ئینتەرنێت.' },
  { id: 'lang-9', name: 'نووسینی وتاری بڵاوکراوە', category: 'زمانەوانی', icon: 'Newspaper', description: 'داڕشتنی هەواڵ و بابەتە کورتەکان.' },
  { id: 'lang-10', name: 'ڕاپۆرتی فێربوون', category: 'زمانەوانی', icon: 'Book', description: 'دروستکردنی تاقیکردنەوەی خێرا بۆ واژە نوێیەکان.' },

  // 7. Project & Time Management
  { id: 'time-1', name: 'پلانی گەشەپێدانی خود', category: 'بەڕێوەبردن', icon: 'UserPlus', description: 'داڕشتنی هەنگاوەکان بۆ فێربوونی لێهاتوویی نوێ.' },
  { id: 'time-2', name: 'پلانی خۆراک و وەرزش', category: 'بەڕێوەبردن', icon: 'Activity', description: 'خشتەی ژەمەکان و جۆری وەرزشی ڕۆژانە.' },
  { id: 'time-3', name: 'بەڕێوەبردنی Time Blocking', category: 'بەڕێوەبردن', icon: 'Clock', description: 'دابەشکردنی ڕۆژەکەت بۆ بلۆکی کاتی دیاریکراو.' },
  { id: 'time-4', name: 'Mock Interview', category: 'بەڕێوەبردن', icon: 'Headset', description: 'چاوپێکەوتنی تاقیکاری بۆ وەرگرتن لە کار.' },
  { id: 'time-5', name: 'نووسینی CV جیهانی', category: 'بەڕێوەبردن', icon: 'FileUser', description: 'دروستکردنی سیڤی بەپێی ستانداردە نوێیەکان.' },
  { id: 'time-6', name: 'فێربوونی زمان لە ٣٠ ڕۆژدا', category: 'بەڕێوەبردن', icon: 'Goal', description: 'پلانی چڕوپڕ بۆ خێرا فێربوونی زمان.' },
  { id: 'time-7', name: 'شیکاریی کەسایەتی', category: 'بەڕێوەبردن', icon: 'UserCheck', description: 'زانینی خاڵە بەهێزەکانت بەپێی بیرکردنەوەت.' },
  { id: 'time-8', name: 'پێشنیاری کتێب و فیلم', category: 'بەڕێوەبردن', icon: 'Clapperboard', description: 'هەڵبژاردنی باشترینەکان بۆ کاتی پشووت.' },
  { id: 'time-9', name: 'ڕاوێژی کۆمەڵایەتی', category: 'بەڕێوەبردن', icon: 'MessageCircle', description: 'چارەسەرکردنی کێشەکان بە ڕێگەی لۆژیکی.' },
  { id: 'time-10', name: 'پلانی گەشتوگوزار', category: 'بەڕێوەبردن', icon: 'Map', description: 'دیاریکردنی شوێن و تێچووی گەشتەکانت.' },

  // 8. Legal & Finance
  { id: 'legal-1', name: 'شیکاریی یاسایی', category: 'یاسایی', icon: 'Scale', description: 'دەرهێنانی خاڵە گرنگەکان لە ناو بەڵگەنامە یاساییەکان.' },
  { id: 'legal-2', name: 'داواکاریی فەرمی دادگا', category: 'یاسایی', icon: 'Gavel', description: 'نووسینی عەریزە و داواکارییە فەرمییەکان.' },
  { id: 'legal-3', name: 'ڕاوێژی دارایی', category: 'یاسایی', icon: 'Landmark', description: 'باشترین ڕێگە بۆ پاشکەوتکردنی پارە.' },
  { id: 'legal-4', name: 'وردبینی خەرجی', category: 'یاسایی', icon: 'Calculator', description: 'کۆنترۆڵکردنی بڕی پارەی ڕۆیشتوو.' },
  { id: 'legal-5', name: 'شیکاریی Crypto', category: 'یاسایی', icon: 'Coins', description: 'زانیاری لەسەر بازاڕی دراوە دیجیتاڵییەکان.' },
  { id: 'legal-6', name: 'پلانی خانەنشینی', category: 'یاسایی', icon: 'TrendingDown', description: 'وەبەرهێنان بۆ داهاتوویەکی ئارام.' },
  { id: 'legal-7', name: 'شیکاریی باج', category: 'یاسایی', icon: 'FileWarning', description: 'تێگەیشتن لە چۆنیەتی ژماردنی باجەکان.' },
  { id: 'legal-8', name: 'نموونەی وەصڵ', category: 'یاسایی', icon: 'FileSignature', description: 'دروستکردنی پسوڵەی فرۆشتنی کاڵاکان.' },
  { id: 'legal-9', name: 'پاراستنی Copyright', category: 'یاسایی', icon: 'Lock', description: 'پاراستنی مافی بەرهەمە فیکرییەکانت.' },
  { id: 'legal-10', name: 'ڕاوێژی یاسایی گشتی', category: 'یاسایی', icon: 'Shield', description: 'زانیاری سەرەتایی دەربارەی یاسا کارپێکراوەکان.' },

  // 9. Science & Nature
  { id: 'sci-1', name: 'کوانتەم فیزیک', category: 'زانست', icon: 'Atom', description: 'ڕوونکردنەوەی تیۆرە ئاڵۆزەکان بە کوردی.' },
  { id: 'sci-2', name: 'گەردوونناسی', category: 'زانست', icon: 'Orbit', description: 'زانیاری دەربارەی ئەستێرە و گەلەستێرەکان.' },
  { id: 'sci-3', name: 'جینات و زیندەزانی', category: 'زانست', icon: 'Dna', description: 'شیکاریی پێکهاتەی مرۆڤ و زیندەوەران.' },
  { id: 'sci-4', name: 'فەلسەفەی جیۆپۆلەتیک', category: 'زانست', icon: 'Globe2', description: 'پەیوەندی نێوان جوگرافیا و ململانێی هێز.' },
  { id: 'sci-5', name: 'تەکنەلۆژیای نانۆ', category: 'زانست', icon: 'Microscope', description: 'ئایندەی زانست لە قەبارە زۆر بچووکەکاندا.' },
  { id: 'sci-6', name: 'وزە نوێبووەوەکان', category: 'زانست', icon: 'Sun', description: 'کارەبا لە خۆر، با و ئاو بەرهەم بهێنە.' },
  { id: 'sci-7', name: 'Machine Learning', category: 'زانست', icon: 'BrainCircuit', description: 'چۆنیەتی ڕاهێنانی ئەپڵیکەیشنە زیرەکەکان.' },
  { id: 'sci-8', name: 'سایبەر سیکیوتی', category: 'زانست', icon: 'Terminal', description: 'پاراستنی ئامێرەکان لە هێرشی هاککەرەکان.' },
  { id: 'sci-9', name: 'کەشوهەوا', category: 'زانست', icon: 'Thermometer', description: 'شیکاریی گۆڕانی ژینگەیی و گەرمبوونی زەوی.' },
  { id: 'sci-10', name: 'مێژووی شارستانیەت', category: 'زانست', icon: 'Building2', description: 'چۆن مرۆڤایەتی گەیشتە ئەم قۆناغەی ئێستا.' },

  // 10. Ultra AI Exclusives
  { id: 'ultra-1', name: 'Ghost Writer', category: 'ئەلترا', icon: 'Ghost', description: 'نووسینی کتێبی تەواو بە شێوازی تایبەتی خۆت.' },
  { id: 'ultra-2', name: 'شیکاریی خەونەکان', category: 'ئەلترا', icon: 'CloudMoon', description: 'مانای خەونەکانت لۆژیکی یان دەروونی؟' },
  { id: 'ultra-3', name: 'Personal Assistant', category: 'ئەلترا', icon: 'Bot', description: 'هاوڕێیەکی هەمیشەیی بۆ هەموو کاروبارەکانت.' },
  { id: 'ultra-4', name: 'مێژووی جێگرەوە', category: 'ئەلترا', icon: 'RefreshCcw', description: 'ئەگەر جەنگەکە بە جۆرێکی تر بوایە چی دەبوو؟' },
  { id: 'ultra-5', name: 'شیکاریی ئایدیۆلۆژیا', category: 'ئەلترا', icon: 'Settings', description: 'بینینی جیهان لە ڕوانگەی بیروباوەڕە جیاوازەکان.' },
  { id: 'ultra-6', name: 'کایەی بیرکردنەوە', category: 'ئەلترا', icon: 'Gamepad2', description: 'بەهێزکردنی مێشک لە ڕێگەی مەتەڵ و کێشەکانەوە.' },
  { id: 'ultra-7', name: 'وەرگێڕانی Slang', category: 'ئەلترا', icon: 'MessageSquare', description: 'تێگەیشتن لە زمانی شەقام و ئەپڵیکەیشنە بیانییەکان.' },
  { id: 'ultra-8', name: 'پلانی Emergency', category: 'ئەلترا', icon: 'Siren', description: 'چی بکەیت لە کاتی قەیرانە لەناکاوەکاندا؟' },
  { id: 'ultra-9', name: 'شیکاریی لۆژیکی', category: 'ئەلترا', icon: 'Brain', description: 'دۆزینەوەی هەڵە لە ناو قسەی سیاسی و میدیاکاراندا.' },
  { id: 'ultra-10', name: 'Ultimate Summary', category: 'ئەلترا', icon: 'Sparkles', description: 'وەرگرتنی زانیاری گونجاو لە پانتایی ئینتەرنێتەوە.' },
];
