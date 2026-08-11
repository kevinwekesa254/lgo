/* LGO shared helpers: i18n, help accordions/search, floating chatbot.
   Loaded in <helmet>; call window.LGO.init(rootEl) from componentDidMount.
   Languages: en (default), sg (Singlish), si (Sinhala), ta (Tamil). */
(function () {
  var PHONE = "+94 77 201 7950";
  var WA = "Contact.dc.html";
  try {
    if (location.hostname.indexOf("vercel.app") !== -1) {
      WA = "https://lgo-contact-4b1c31c5-contact-34p5ciqji-kevinwekesa254s-projects.vercel.app";
    }
  } catch (e) {}
  var PLAY = "https://play.google.com/store/apps/details?id=com.youcloud.youshop&hl=en";
  var EMAIL = "connect@lgotech.lk";

  // ---- UI string dictionary. Base = en. Fallback order: lang -> en. ----
  var T = {
    "nav.products": { en: "Products", sg: "Products", si: "නිෂ්පාදන", ta: "தயாரிப்புகள்" },
    "nav.hardware": { en: "Hardware", sg: "Hardware", si: "උපකරණ", ta: "வன்பொருள்" },
    "nav.lending": { en: "Lending", sg: "Loans", si: "ණය", ta: "கடன்" },
    "nav.how": { en: "How it works", sg: "How it works", si: "ක්‍රියා කරන ආකාරය", ta: "இது எப்படி வேலை செய்கிறது" },
    "nav.pricing": { en: "Pricing", sg: "Pricing", si: "මිල ගණන්", ta: "விலை" },
    "nav.support": { en: "Support", sg: "Support", si: "සහාය", ta: "ஆதரவு" }, "nav.contact": { en: "Contact", sg: "Contact", si: "සම්බන්ධ වන්න", ta: "தொடர்பு" },
    "btn.merchantSupport": { en: "Merchant support", sg: "Merchant support", si: "වෙළෙන්දා සහාය", ta: "வணிக ஆதரவு" },
    "btn.getFree": { en: "Get youShop free", sg: "Get youShop free", si: "youShop නොමිලේ ගන්න", ta: "youShop இலவசமாக பெறுங்கள்" },
    "hero.eyebrow": { en: "Software & credit for Sri Lanka's merchants", sg: "Software & credit for Sri Lankan merchants", si: "ශ්‍රී ලංකාවේ වෙළෙන්දන් සඳහා මෘදුකාංග සහ ණය", ta: "இலங்கை வணிகர்களுக்கான மென்பொருள் மற்றும் கடன்" },
    "hero.title": { en: "Run your business. <span style=\"font-style:italic;color:#4f8a1e\">Take payments.</span><br>Grow — <span style=\"font-style:italic;color:#4f8a1e\">get a loan.</span>", sg: "Run your business. <span style=\"font-style:italic;color:#4f8a1e\">Take payments.</span><br>Grow — <span style=\"font-style:italic;color:#4f8a1e\">get a loan.</span>", si: "ඔබේ කඩේ කළමනාකරණය කරන්න. <span style=\"font-style:italic;color:#4f8a1e\">ගෙවීම් ලබාගන්න.</span><br>වර්ධනයට ණය ගන්න.", ta: "உங்கள் கடையை நடத்துங்கள். <span style=\"font-style:italic;color:#4f8a1e\">பணம் பெறுங்கள்.</span><br>வளர கடன் பெறுங்கள்." },
    "pl.title": { en: "Start free. Add youQR. <span style=\"font-style:italic;color:#4f8a1e\">Grow with credit.</span>", sg: "Start free. Add youQR. <span style=\"font-style:italic;color:#4f8a1e\">Grow with credit.</span>", si: "ඔබේ ව්‍යාපාරය සැබවින්ම ක්‍රියා කරන ආකාරයට ගැලපෙන නිෂ්පාදන තෝරන්න.", ta: "உங்கள் வணிகம் உண்மையில் இயங்கும் விதத்திற்கு ஏற்ற தயாரிப்புகளைத் தேர்ந்தெடுங்கள்." },
    "pl.qrTitle": { en: "Customers order and pay in under a minute. <span style=\"font-style:italic;color:#8fb51f\">No download.</span>", sg: "Customers order and pay in under a minute. <span style=\"font-style:italic;color:#8fb51f\">No download.</span>", si: "පාරිභෝගිකයෝ මිනිත්තුවකට අඩු කාලයකින් ඇණවුම් කර ගෙවති. <span style=\"font-style:italic;color:#8fb51f\">බාගැනීමක් නැත.</span>", ta: "வாடிக்கையாளர்கள் ஒரு நிமிடத்திற்குள் ஆர்டர் செய்து பணம் செலுத்துகிறார்கள். <span style=\"font-style:italic;color:#8fb51f\">பதிவிறக்கம் இல்லை.</span>" },
    "hw.title": { en: "Everything runs on your phone.<br><span style=\"font-style:italic;color:#4f8a1e\">Hardware is a choice.</span>", sg: "Everything runs on your phone.<br><span style=\"font-style:italic;color:#4f8a1e\">Hardware is a choice.</span>", si: "සියල්ල ඔබේ දුරකථනයේ ක්‍රියා කරයි.<br><span style=\"font-style:italic;color:#4f8a1e\">උපකරණ තෝරාගැනීමකි.</span>", ta: "அனைத்தும் உங்கள் தொலைபேசியில் இயங்குகிறது.<br><span style=\"font-style:italic;color:#4f8a1e\">வன்பொருள் ஒரு விருப்பம்.</span>" },
    "mj.title": { en: "From <span style=\"font-style:italic;color:#8fb51f\">cash-and-memory</span> to credit-<br>ready, in four steps.", sg: "From <span style=\"font-style:italic;color:#8fb51f\">cash-and-memory</span> to credit-<br>ready, in four steps.", si: "<span style=\"font-style:italic;color:#8fb51f\">මුදල්-සහ-මතකයෙන්</span> ණයට සූදානම් වන්නට,<br>පියවර හතරකින්.", ta: "<span style=\"font-style:italic;color:#8fb51f\">பணம்-நினைவகத்திலிருந்து</span> கடனுக்குத் தயாராக,<br>நான்கு படிகளில்." },
    "pr.title": { en: "Start free. <span style=\"font-style:italic;color:#4f8a1e\">Upgrade when it pays for<br>itself.</span>", sg: "Start free. <span style=\"font-style:italic;color:#4f8a1e\">Upgrade when it pays for<br>itself.</span>", si: "නොමිලේ පටන් ගන්න. <span style=\"font-style:italic;color:#4f8a1e\">වටිනාකම දැනුණු විට<br>උසස් කරන්න.</span>", ta: "இலவசமாகத் தொடங்குங்கள். <span style=\"font-style:italic;color:#4f8a1e\">அது பயன் தரும்போது<br>மேம்படுத்துங்கள்.</span>" },
    "sp.title": { en: "Help you can <span style=\"font-style:italic;color:#4f8a1e\">walk to.</span>", sg: "Help you can <span style=\"font-style:italic;color:#4f8a1e\">walk to.</span>", si: "ඇවිද යා හැකි <span style=\"font-style:italic;color:#4f8a1e\">සහායක්.</span>", ta: "நடந்து செல்லக்கூடிய <span style=\"font-style:italic;color:#4f8a1e\">உதவி.</span>" },
    "hero.sub": { en: "LGO is a fintech that takes Sri Lanka's micro-merchants from accepting their first payment all the way to accessing credit — billing, inventory, LankaQR, LankaPay & card acceptance, in one free app.", sg: "LGO is a fintech that takes Sri Lanka's micro-merchants from accepting their first payment all the way to accessing credit — billing, inventory, LankaQR, LankaPay & card acceptance, in one free app.", si: "LGO යනු ශ්‍රී ලංකාවේ කුඩා වෙළෙන්දන්ගේ සාක්කුවේ ඇති නොමිලේ යෙදුමයි — බිල්පත්, තොග, LankaQR සහ LankaPay පිළිගැනීම, සහ ඔබ වර්ධනයට සූදානම් වූ විට our local lending partner වෙතින් ව්‍යාපාරික ණය.", ta: "LGO என்பது இலங்கையின் சிறு வணிகர்களின் பாக்கெட்டில் உள்ள இலவச செயலி — பில்லிங், சரக்கு, LankaQR & LankaPay ஏற்பு, மற்றும் நீங்கள் வளர தயாராகும்போது our local lending partner இலிருந்து மூலதனக் கடன்." },
    "hero.explore": { en: "Explore the apps", sg: "Explore the apps", si: "යෙදුම් බලන්න", ta: "செயலிகளைப் பார்க்கவும்" },
    "hero.lending": { en: "See how lending works", sg: "See how loans work", si: "ණය ක්‍රියා කරන ආකාරය බලන්න", ta: "கடன் எப்படி வேலை செய்கிறது என்று பாருங்கள்" },
    "hero.stat1": { en: "Active merchants", sg: "Active merchants", si: "ක්‍රියාකාරී වෙළෙන්දෝ", ta: "செயலில் உள்ள வணிகர்கள்" },
    "hero.stat2": { en: "LankaQR · LankaPay · Visa · Mastercard", sg: "LankaQR · LankaPay · Visa · Mastercard", si: "LankaQR · LankaPay · Visa · Mastercard", ta: "LankaQR · LankaPay · Visa · Mastercard" },
    "hero.stat3": { en: "Avg. working-capital loan", sg: "Avg. working-capital loan", si: "සාමාන්‍ය ව්‍යාපාරික ණය", ta: "சராசரி மூலதனக் கடன்" },
    "strip.powered": { en: "Payments & credit powered by", sg: "Payments & credit powered by", si: "ගෙවීම් සහ ණය බලගැන්වීම", ta: "கொடுப்பனவுகள் & கடன் வழங்குபவர்" },
    "pl.eyebrow": { en: "The product line", sg: "The product line", si: "නිෂ්පාදන පෙළ", ta: "தயாரிப்பு வரிசை" },
    "pl.intro": { en: "The LGO starter pack is free forever — billing, inventory and LankaQR acceptance in one app. Hand out youQR codes for app-less ordering, and unlock working-capital credit as your sales history grows.", sg: "The LGO starter pack is free forever — billing, inventory and LankaQR acceptance in one app. Hand out youQR codes for app-less ordering, and unlock working-capital credit as your sales history grows.", si: "සෑම නිෂ්පාදනයක්ම <b>youPay</b> මත ගොඩනගා ඇත — එක් ගෙවීම් එන්ජිමක්, එක් පියවීමක්, එක් ලෙජරයක්. සෑම නිෂ්පාදනයක්ම ස්තර හතරක් ගොඩනගයි: <b>වාණිජ්‍යය · ගෙවීම් · එම්බෙඩඩ් ෆිනෑන්ස් · AI</b> — සියල්ල එකට සම්බන්ධයි.", ta: "ஒவ்வொரு தயாரிப்பும் <b>youPay</b> மீது கட்டமைக்கப்பட்டுள்ளது — ஒரே கட்டண இயந்திரம், ஒரே தீர்வு, ஒரே லெட்ஜர். ஒவ்வொரு தயாரிப்பும் நான்கு அடுக்குகளை அடுக்குகிறது: <b>வர்த்தகம் · கட்டணங்கள் · உட்பொதிக்கப்பட்ட நிதி · AI</b> — அனைத்தும் ஒன்றாக இணைக்கப்பட்டுள்ளன." },
    "hw.eyebrow": { en: "Optional hardware", sg: "Optional hardware", si: "විකල්ප උපකරණ", ta: "விருப்ப வன்பொருள்" },
    "hw.intro": { en: "Prefer a dedicated device, or need to print receipts and kitchen tickets? Add LGO hardware — sold at cost-plus, paired in seconds.", sg: "Prefer a dedicated device, or need to print receipts and kitchen tickets? Add LGO hardware — sold at cost-plus, paired in seconds.", si: "විශේෂිත උපකරණයක් කැමතිද, නැතහොත් රිසිට්පත් සහ කුස්සියේ ටිකට් මුද්‍රණය කිරීමට අවශ්‍යද? LGO උපකරණ එක් කරන්න — අඩු මිලට, තත්පර කිහිපයකින් සම්බන්ධ වේ.", ta: "பிரத்தியேக சாதனம் விரும்புகிறீர்களா, அல்லது ரசீதுகள் மற்றும் சமையலறை டிக்கெட்டுகளை அச்சிட வேண்டுமா? LGO வன்பொருளைச் சேர்க்கவும் — குறைந்த விலையில், விநாடிகளில் இணைக்கப்படும்." },
    "hw.shop": { en: "Shop hardware", sg: "Shop hardware", si: "උපකරණ බලන්න", ta: "வன்பொருளைப் பாருங்கள்" },
    "hw.details": { en: "Details", sg: "Details", si: "විස්තර", ta: "விவரங்கள்" },
    "hw.comingSoon": { en: "Coming soon", sg: "Coming soon", si: "ඉක්මනින්", ta: "விரைவில்" },
    "mj.eyebrow": { en: "Merchant journey", sg: "Merchant journey", si: "වෙළෙන්දාගේ ගමන", ta: "வணிகர் பயணம்" },
    "mj.intro": { en: "The whole point is that you don't have to change how you run your shop. You just start ringing sales through LGO — the credit follows.", sg: "The whole point is that you don't have to change how you run your kade. You just start ringing sales through LGO — the credit follows.", si: "වැදගත්ම දෙය නම් ඔබ ඔබේ කඩේ කළමනාකරණය කරන ආකාරය වෙනස් කිරීමට අවශ්‍ය නොවීමයි. ඔබ LGO හරහා විකුණුම් ඇතුළත් කිරීම පටන් ගන්න — ණය ඊට පසුව එයි.", ta: "முக்கிய விஷயம் என்னவென்றால், உங்கள் கடையை நடத்தும் விதத்தை மாற்ற வேண்டியதில்லை. நீங்கள் LGO மூலம் விற்பனையைப் பதிவு செய்யத் தொடங்குங்கள் — கடன் பின்தொடரும்." },
    "pr.eyebrow": { en: "Pricing", sg: "Pricing", si: "මිල ගණන්", ta: "விலை" },
    "pr.intro": { en: "All plans include LankaQR & LankaPay acceptance and access to local-partner lending. Upgrade to unlock multi-outlet, staff roles and analytics.", sg: "All plans include LankaQR & LankaPay acceptance and access to local-partner lending. Upgrade to unlock multi-outlet, staff roles and analytics.", si: "සියලුම සැලසුම්වල LankaQR සහ LankaPay පිළිගැනීම සහ our local lending partner ණය ඇතුළත් වේ. බහු-අලෙවිසැල්, කාර්ය මණ්ඩල භූමිකා සහ විශ්ලේෂණ සඳහා උසස් කරන්න.", ta: "அனைத்து திட்டங்களிலும் LankaQR & LankaPay ஏற்பு மற்றும் our local lending partner கடன் அணுகல் அடங்கும். பல கடைகள், ஊழியர் பாத்திரங்கள் மற்றும் பகுப்பாய்வுக்கு மேம்படுத்துங்கள்." },
    "pr.downloadYoushop": { en: "Download youShop", sg: "Download youShop", si: "youShop බාගන්න", ta: "youShop பதிவிறக்கவும்" },
    "pr.startTrial": { en: "Start free trial", sg: "Start free trial", si: "නොමිලේ අත්හදාබැලීම", ta: "இலவச சோதனையைத் தொடங்குங்கள்" },
    "pr.talkSales": { en: "Talk to sales", sg: "Talk to sales", si: "විකුණුම් කණ්ඩායම හා කතා කරන්න", ta: "விற்பனைக் குழுவுடன் பேசுங்கள்" },
    "sp.eyebrow": { en: "Merchant support", sg: "Merchant support", si: "වෙළෙන්දා සහාය", ta: "வணிக ஆதரவு" },
    "sp.intro": { en: "A merchant agent is never far away. Search FAQs, find the nearest LGO agent, or switch the app to the language you speak at the till.", sg: "A merchant agent is never far away. Search FAQs, find the nearest LGO agent, or switch the app to the language you speak at the till.", si: "වෙළෙන්දා නියෝජිතයෙක් කවදාවත් දුරින් නැත. නිතර අසන ප්‍රශ්න සොයන්න, ළඟම LGO නියෝජිතයා සොයන්න, නැතහොත් යෙදුම ඔබ කතා කරන භාෂාවට මාරු කරන්න.", ta: "வணிக முகவர் ஒருபோதும் தொலைவில் இல்லை. கேள்விகளைத் தேடுங்கள், அருகிலுள்ள LGO முகவரைக் கண்டறியுங்கள், அல்லது நீங்கள் பேசும் மொழிக்கு செயலியை மாற்றுங்கள்." },
    "sp.help": { en: "Help centre", sg: "Help centre", si: "සහාය මධ්‍යස්ථානය", ta: "உதவி மையம்" },
    "sp.helpTitle": { en: "Answers, in your language", sg: "Answers, in your language", si: "පිළිතුරු, ඔබේ භාෂාවෙන්", ta: "பதில்கள், உங்கள் மொழியில்" },
    "sp.searchPh": { en: 'Search — e.g. "refund a LankaQR payment"', sg: 'Search — e.g. "refund a LankaQR payment"', si: 'සොයන්න — උදා. "LankaQR ගෙවීමක් ආපසු දෙන්නේ කෙසේද"', ta: 'தேடுங்கள் — எ.கா. "LankaQR கட்டணத்தை திரும்பப் பெறுவது"' },
    "sp.call": { en: "Call " + PHONE, sg: "Call " + PHONE, si: "අමතන්න " + PHONE, ta: "அழைக்கவும் " + PHONE },
    "sp.whatsappSupport": { en: "Talk to sales", sg: "Talk to sales", si: "විකුණුම් කණ්ඩායම", ta: "விற்பனைக் குழு" },
    "sp.agent": { en: "Agent locator", sg: "Agent locator", si: "නියෝජිත සොයන්න", ta: "முகவர் கண்டுபிடிப்பான்" },
    "sp.agentTitle": { en: "60+ agents nationwide", sg: "60+ agents nationwide", si: "දිවයින පුරා නියෝජිතයන් 60+", ta: "தீவு முழுவதும் 60+ முகவர்கள்" },
    "sp.seeAll": { en: "See all agents", sg: "See all agents", si: "සියලු නියෝජිතයන් බලන්න", ta: "அனைத்து முகவர்களையும் பார்க்கவும்" },
    "sp.requestVisit": { en: "Request a visit", sg: "Request a visit", si: "පැමිණීමක් ඉල්ලන්න", ta: "வருகையைக் கோருங்கள்" },
    "sp.langs": { en: "Languages", sg: "Languages", si: "භාෂා", ta: "மொழிகள்" },
    "sp.langsTitle": { en: "Serve customers in the language they speak", sg: "Serve customers in the language they speak", si: "පාරිභෝගිකයන්ට ඔවුන් කතා කරන භාෂාවෙන් සේවය කරන්න", ta: "வாடிக்கையாளர்களுக்கு அவர்கள் பேசும் மொழியில் சேவை செய்யுங்கள்" },
    "sp.langsIntro": { en: "The youShop and youResto apps, receipts and SoundBox voice prompts switch between English, Sinhala and Tamil — so every merchant and customer feels at home.", sg: "The youShop and youResto apps, receipts and SoundBox voice prompts switch between English, Sinhala and Tamil — so every merchant and customer feels at home.", si: "LGO යෙදුම්, රිසිට්පත් සහ SoundBox හඬ පණිවිඩ ඉංග්‍රීසි, සිංහල සහ දෙමළ අතර මාරු වේ — එබැවින් සෑම වෙළෙන්දෙකුටම සහ පාරිභෝගිකයෙකුටම නිවසේ සිටින හැඟීමක් ඇති වේ.", ta: "LGO செயலிகள், ரசீதுகள் மற்றும் SoundBox குரல் அறிவிப்புகள் ஆங்கிலம், சிங்களம் மற்றும் தமிழ் இடையே மாறுகின்றன — எனவே ஒவ்வொரு வணிகரும் வாடிக்கையாளரும் வீட்டில் இருப்பதைப் போல உணர்கிறார்கள்." },
    "cta.eyebrow": { en: "Ready when you are", sg: "Ready when you are", si: "ඔබ සූදානම් වූ විට සූදානම්", ta: "நீங்கள் தயாராகும்போது தயார்" },
    "cta.title": { en: "Your next sale can go through LGO <span style=\"font-style:italic;color:#8fb51f\">today.</span>", sg: "Your next sale can go through LGO <span style=\"font-style:italic;color:#8fb51f\">today.</span>", si: "ඔබේ ඊළඟ විකිණීම LGO හරහා සිදුවිය හැක <span style=\"font-style:italic;color:#8fb51f\">අදම.</span>", ta: "உங்கள் அடுத்த விற்பனை LGO மூலம் <span style=\"font-style:italic;color:#8fb51f\">இன்றே</span> நடக்கலாம்." },
    "cta.sub": { en: "Download youShop from the Play Store, or call a merchant agent — most shops are up and running in under five minutes.", sg: "Download youShop from the Play Store, or call a merchant agent — most shops are up and running in under five minutes.", si: "Play Store එකෙන් youShop බාගන්න, නැතහොත් වෙළෙන්දා නියෝජිතයෙකු අමතන්න — බොහෝ කඩ මිනිත්තු පහකට අඩු කාලයකින් ක්‍රියාත්මක වේ.", ta: "Play Store இலிருந்து youShop பதிவிறக்கவும், அல்லது வணிக முகவரை அழைக்கவும் — பெரும்பாலான கடைகள் ஐந்து நிமிடங்களுக்குள் இயங்குகின்றன." },
    "cta.download": { en: "Download youShop", sg: "Download youShop", si: "youShop බාගන්න", ta: "youShop பதிவிறக்கவும்" },
    "cta.callAgent": { en: "Call " + PHONE, sg: "Call " + PHONE, si: "අමතන්න " + PHONE, ta: "அழைக்கவும் " + PHONE },
    "cta.waAgent": { en: "Talk to sales", sg: "Talk to sales", si: "විකුණුම් කණ්ඩායම හා කතා කරන්න", ta: "விற்பனைக் குழுவுடன் பேசுங்கள்கு WhatsApp செய்யுங்கள்" },
    "ft.desc": { en: "A fintech taking Sri Lanka's micro-merchants from payment acceptance to credit. Built in Colombo by LGO Paytech, integrated with LankaPay and a local lending partner.", sg: "A fintech taking Sri Lanka's micro-merchants from payment acceptance to credit. Built in Colombo by LGO Paytech, integrated with LankaPay and a local lending partner.", si: "ශ්‍රී ලංකාවේ ක්ෂුද්‍ර වෙළෙන්දන් සඳහා මෘදුකාංග සහ ණය. LankaPay සහ our local lending partner සමඟ හවුල්ව LGO විසින් කොළඹ තැනූ.", ta: "இலங்கையின் நுண் வணிகர்களுக்கான மென்பொருள் மற்றும் கடன். LankaPay மற்றும் our local lending partner உடன் இணைந்து LGO ஆல் கொழும்பில் உருவாக்கப்பட்டது." },
    "chat.title": { en: "LGO Assistant", sg: "LGO Assistant", si: "LGO සහායක", ta: "LGO உதவியாளர்" },
    "chat.greeting": { en: "Hi! How can we help? Pick a question or chat with an agent.", sg: "Hi! How can we help? Pick a question or chat with an agent.", si: "ආයුබෝවන්! අපට උදව් කළ හැක්කේ කෙසේද? ප්‍රශ්නයක් තෝරන්න නැතහොත් WhatsApp හි නියෝජිතයෙකු සමඟ කතා කරන්න.", ta: "வணக்கம்! நாங்கள் எப்படி உதவலாம்? ஒரு கேள்வியைத் தேர்ந்தெடுக்கவும் அல்லது WhatsApp இல் முகவருடன் அரட்டையடிக்கவும்." },
    "chat.wa": { en: "Talk to sales", sg: "Talk to sales", si: "විකුණුම් කණ්ඩායම හා කතා කරන්න", ta: "விற்பனைக் குழுவுடன் பேசுங்கள்" },
    "chat.open": { en: "Help", sg: "Help", si: "සහාය", ta: "உதவி" },
    "back.home": { en: "← Back to home", sg: "← Back to home", si: "← මුල් පිටුවට", ta: "← முகப்புக்குத் திரும்பு" },
    "ys.eyebrow": { en: "youShop · Retail POS", sg: "youShop · Retail POS", si: "youShop · සිල්ලර POS", ta: "youShop · சில்லறை POS" },
    "ys.title": { en: "Run your whole shop <span style=\"font-style:italic;color:#4f8a1e\">from your phone.</span>", sg: "Run your whole kade <span style=\"font-style:italic;color:#4f8a1e\">from your phone.</span>", si: "ඔබේ මුළු කඩේම <span style=\"font-style:italic;color:#4f8a1e\">ඔබේ දුරකථනයෙන් කළමනාකරණය කරන්න.</span>", ta: "உங்கள் முழு கடையையும் <span style=\"font-style:italic;color:#4f8a1e\">உங்கள் தொலைபேசியில் இருந்து நடத்துங்கள்.</span>" },
    "ys.sub": { en: "youShop is a one-stop retail management system — payment acceptance, inventory, in-built accounting and a marketing manager. Free forever for micro-merchants; built for grocery stores, pharmacies, salons and boutiques.", sg: "youShop is a one-stop retail management system — payment acceptance, inventory, in-built accounting and a marketing manager. Free forever for micro-merchants; built for grocery stores, pharmacies, salons and boutiques.", si: "youShop යනු එක්-තැන් සිල්ලර කළමනාකරණ පද්ධතියකි — ගෙවීම් පිළිගැනීම, තොග, ගිණුම්කරණය සහ අලෙවිකරණය. ක්ෂුද්‍ර වෙළෙන්දන්ට සදාකල් නොමිලේ; සිල්ලර කඩ, ෆාමසි, සැලූන් සහ බුටික් සඳහා.", ta: "youShop என்பது ஒரே இட சில்லறை மேலாண்மை அமைப்பு — கட்டண ஏற்பு, சரக்கு, உள்ளமைந்த கணக்கியல் மற்றும் சந்தைப்படுத்தல் மேலாளர். நுண் வணிகர்களுக்கு எப்போதும் இலவசம்; மளிகைக் கடைகள், மருந்தகங்கள், சலூன்கள் மற்றும் கடைகளுக்காக." },
    "yr.eyebrow": { en: "youResto · Restaurant OS", sg: "youResto · Restaurant OS", si: "youResto · අවන්හල් OS", ta: "youResto · உணவகம் OS" },
    "yr.title": { en: "The complete <span style=\"font-style:italic;color:#4f8a1e\">restaurant</span> management system.", sg: "The complete <span style=\"font-style:italic;color:#4f8a1e\">restaurant</span> management system.", si: "සම්පූර්ණ <span style=\"font-style:italic;color:#4f8a1e\">අවන්හල්</span> කළමනාකරණ පද්ධතිය.", ta: "முழுமையான <span style=\"font-style:italic;color:#4f8a1e\">உணவக</span> மேலாண்மை அமைப்பு." },
    "yr.sub": { en: "youResto helps hotels, cafes and restaurants compete with global chains — menu management, table & ticket ordering, QR menus, delivery intake, accounting and loyalty, all from one dashboard.", sg: "youResto helps hotels, cafes and restaurants compete with global chains — menu management, table & ticket ordering, QR menus, delivery intake, accounting and loyalty, all from one dashboard.", si: "youResto හෝටල්, කැෆේ සහ අවන්හල්වලට ගෝලීය ජාලයන් සමඟ තරඟ කිරීමට උදව් කරයි — මෙනු කළමනාකරණය, මේස සහ ටිකට් ඇණවුම්, QR මෙනු, බෙදාහැරීම්, ගිණුම්කරණය සහ පක්ෂපාතිත්වය, එක් උපකරණ පුවරුවකින්.", ta: "youResto ஹோட்டல்கள், கஃபேக்கள் மற்றும் உணவகங்களுக்கு உலகளாவிய சங்கிலிகளுடன் போட்டியிட உதவுகிறது — மெனு மேலாண்மை, மேசை & டிக்கெட் ஆர்டர், QR மெனுக்கள், டெலிவரி, கணக்கியல் மற்றும் விசுவாசம், ஒரே டாஷ்போர்டில் இருந்து." },
    "yq.eyebrow": { en: "youQR · App-less commerce", sg: "youQR · App-less commerce", si: "youQR · යෙදුම් රහිත වෙළඳාම", ta: "youQR · செயலி இல்லா வர்த்தகம்" },
    "yq.title": { en: "Scan. Order. Pay. <span style=\"font-style:italic;color:#8fb51f\">No download.</span>", sg: "Scan. Order. Pay. <span style=\"font-style:italic;color:#8fb51f\">No download.</span>", si: "ස්කෑන් කරන්න. ඇණවුම් කරන්න. ගෙවන්න. <span style=\"font-style:italic;color:#8fb51f\">බාගැනීමක් නැත.</span>", ta: "ஸ்கேன். ஆர்டர். பணம். <span style=\"font-style:italic;color:#8fb51f\">பதிவிறக்கம் இல்லை.</span>" },
    "yq.sub": { en: "Print a QR code and place it on the table or shop window. Customers scan with any camera, browse your menu with photos, pay by LankaQR or LankaPay, and earn loyalty — all in the mobile browser, no app to install.", sg: "Print a QR code and place it on the table or shop window. Customers scan with any camera, browse your menu with photos, pay by LankaQR or LankaPay, and earn loyalty — all in the mobile browser, no app to install.", si: "QR කේතයක් මුද්‍රණය කර මේසය හෝ කඩ ජනේලයේ තබන්න. පාරිභෝගිකයෝ ඕනෑම කැමරාවකින් ස්කෑන් කර, ඡායාරූප සහිත මෙනුව බලා, LankaQR හෝ LankaPay මගින් ගෙවා, පක්ෂපාතිත්වය ලබයි — සියල්ල ජංගම බ්‍රව්සරයේ, යෙදුමක් නැත.", ta: "QR குறியீட்டை அச்சிட்டு மேசையிலோ கடை ஜன்னலிலோ வைக்கவும். வாடிக்கையாளர்கள் எந்த கேமராவிலும் ஸ்கேன் செய்து, புகைப்படங்களுடன் மெனுவைப் பார்த்து, LankaQR அல்லது LankaPay மூலம் பணம் செலுத்தி, விசுவாசம் பெறுகிறார்கள் — அனைத்தும் மொபைல் உலாவியில், செயலி இல்லை." },
    "hwp.eyebrow": { en: "LGO hardware", sg: "LGO hardware", si: "LGO උපකරණ", ta: "LGO வன்பொருள்" },
    "hwp.title": { en: "Hardware that <span style=\"font-style:italic;color:#4f8a1e\">pays for itself.</span>", sg: "Hardware that <span style=\"font-style:italic;color:#4f8a1e\">pays for itself.</span>", si: "තමන්ටම <span style=\"font-style:italic;color:#4f8a1e\">වටිනාකම ගෙවන උපකරණ.</span>", ta: "தன்னைத்தானே <span style=\"font-style:italic;color:#4f8a1e\">ஈடுசெய்யும் வன்பொருள்.</span>" },
    "hwp.sub": { en: "Everything runs on your phone — but if you want a dedicated device, a receipt printer or a kitchen display, LGO hardware is sold at cost-plus and pairs in seconds.", sg: "Everything runs on your phone — but if you want a dedicated device, a receipt printer or a kitchen display, LGO hardware is sold at cost-plus and pairs in seconds.", si: "සියල්ල ඔබේ දුරකථනයේ ක්‍රියා කරයි — නමුත් ඔබට විශේෂිත උපකරණයක්, රිසිට් මුද්‍රණ යන්ත්‍රයක් හෝ කුස්සියේ තිරයක් අවශ්‍ය නම්, LGO උපකරණ අඩු මිලට විකුණා තත්පර කිහිපයකින් සම්බන්ධ වේ.", ta: "அனைத்தும் உங்கள் தொலைபேசியில் இயங்குகிறது — ஆனால் பிரத்தியேக சாதனம், ரசீது அச்சுப்பொறி அல்லது சமையலறை காட்சி வேண்டுமானால், LGO வன்பொருள் குறைந்த விலையில் விற்கப்பட்டு விநாடிகளில் இணைக்கப்படும்." },
    "cmn.exploreShop": { en: "Download youShop free", sg: "Download youShop free", si: "youShop නොමිලේ බාගන්න", ta: "youShop இலவசமாக பதிவிறக்கவும்" },
    "cmn.talkSales": { en: "Talk to sales", sg: "Talk to sales", si: "විකුණුම් කණ්ඩායම හා කතා කරන්න", ta: "விற்பனைக் குழுவுடன் பேசுங்கள்" },
    "cmn.learnMore": { en: "Learn more", sg: "Learn more", si: "තව දැනගන්න", ta: "மேலும் அறிக" }
  };

  // ---- Help / chatbot FAQ ----
  var FAQ = [
    { key: "start", icon: "🚀",
      cat: { en: "Getting started", sg: "Getting started", si: "පටන් ගැනීම", ta: "தொடங்குதல்" },
      meta: { en: "onboarding, first sale, printer pairing", sg: "onboarding, first sale, printer pairing", si: "ලියාපදිංචිය, පළමු විකිණීම, මුද්‍රණ යන්ත්‍රය", ta: "பதிவு, முதல் விற்பனை, அச்சுப்பொறி இணைப்பு" },
      qa: [
        { q: { en: "How do I download youShop?", sg: "How do I download youShop?", si: "youShop බාගන්නේ කෙසේද?", ta: "youShop ஐ எப்படி பதிவிறக்குவது?" }, a: { en: "Install youShop free from the Google Play Store, or ask an LGO agent to set it up with you. You'll make your first sale in under five minutes.", sg: "Install youShop free from the Google Play Store, or ask an LGO agent to set it up. You'll make your first sale in under five minutes.", si: "Google Play Store එකෙන් youShop නොමිලේ ස්ථාපනය කරන්න, නැතහොත් LGO නියෝජිතයෙකුගෙන් උදව් ඉල්ලන්න. මිනිත්තු පහකට අඩු කාලයකින් පළමු විකිණීම කරන්න.", ta: "Google Play Store இலிருந்து youShop ஐ இலவசமாக நிறுவவும், அல்லது LGO முகவரிடம் அமைக்கச் சொல்லுங்கள். ஐந்து நிமிடங்களுக்குள் முதல் விற்பனை செய்வீர்கள்." } },
        { q: { en: "How do I make my first sale?", sg: "How do I make my first sale?", si: "පළමු විකිණීම කරන්නේ කෙසේද?", ta: "முதல் விற்பனையை எப்படி செய்வது?" }, a: { en: "Open youShop, tap New sale, add items or enter an amount, then choose LankaQR, LankaPay or cash. A digital receipt is sent instantly.", sg: "Open youShop, tap New sale, add items or enter an amount, then choose LankaQR, LankaPay or cash. A digital receipt is sent instantly.", si: "youShop විවෘත කර, නව විකිණීම තට්ටු කර, භාණ්ඩ එක් කරන්න හෝ මුදලක් ඇතුළත් කර, LankaQR, LankaPay හෝ මුදල් තෝරන්න. ඩිජිටල් රිසිට්පතක් ක්ෂණිකව යවනු ලැබේ.", ta: "youShop ஐத் திறந்து, புதிய விற்பனையைத் தட்டி, பொருட்களைச் சேர்க்கவும் அல்லது தொகையை உள்ளிடவும், பின்னர் LankaQR, LankaPay அல்லது பணத்தைத் தேர்வுசெய்யவும். டிஜிட்டல் ரசீது உடனடியாக அனுப்பப்படும்." } }
      ] },
    { key: "pay", icon: "💳",
      cat: { en: "Payments & refunds", sg: "Payments & refunds", si: "ගෙවීම් සහ ආපසු ගෙවීම්", ta: "கொடுப்பனவுகள் & பணத்திரும்பப்பெறல்" },
      meta: { en: "LankaQR, LankaPay, cash", sg: "LankaQR, LankaPay, cash", si: "LankaQR, LankaPay, මුදල්", ta: "LankaQR, LankaPay, பணம்" },
      qa: [
        { q: { en: "How do I accept a LankaQR payment?", sg: "How do I accept a LankaQR payment?", si: "LankaQR ගෙවීමක් පිළිගන්නේ කෙසේද?", ta: "LankaQR கட்டணத்தை எப்படி ஏற்பது?" }, a: { en: "Tap Charge · LankaQR on the sale screen. The customer scans and confirms on their banking app and the payment settles to your account in seconds.", sg: "Tap Charge · LankaQR on the sale screen. The customer scans and confirms on their banking app and the payment settles in seconds.", si: "විකිණුම් තිරයේ Charge · LankaQR තට්ටු කරන්න. පාරිභෝගිකයා ඔවුන්ගේ බැංකු යෙදුමෙන් ස්කෑන් කර තහවුරු කරයි, ගෙවීම තත්පර කිහිපයකින් ඔබේ ගිණුමට එයි.", ta: "விற்பனைத் திரையில் Charge · LankaQR ஐத் தட்டவும். வாடிக்கையாளர் தனது வங்கி செயலியில் ஸ்கேன் செய்து உறுதிப்படுத்துகிறார், கட்டணம் விநாடிகளில் உங்கள் கணக்கிற்கு வரும்." } },
        { q: { en: "How do I refund a payment?", sg: "How do I refund a payment?", si: "ගෙවීමක් ආපසු දෙන්නේ කෙසේද?", ta: "கட்டணத்தை எப்படி திரும்பப் பெறுவது?" }, a: { en: "Open the transaction in Recent activity, tap Refund, and confirm. LankaQR and LankaPay refunds are returned to the customer automatically.", sg: "Open the transaction in Recent activity, tap Refund, and confirm. LankaQR and LankaPay refunds go back to the customer automatically.", si: "මෑත ක්‍රියාකාරකම්වල ගනුදෙනුව විවෘත කර, Refund තට්ටු කර, තහවුරු කරන්න. LankaQR සහ LankaPay ආපසු ගෙවීම් ස්වයංක්‍රීයව පාරිභෝගිකයාට ලැබේ.", ta: "சமீபத்திய செயல்பாட்டில் பரிவர்த்தனையைத் திறந்து, Refund ஐத் தட்டி, உறுதிப்படுத்தவும். LankaQR மற்றும் LankaPay பணத்திரும்பப்பெறல் தானாகவே வாடிக்கையாளருக்குத் திரும்பும்." } }
      ] },
    { key: "stock", icon: "📦",
      cat: { en: "Inventory & stock", sg: "Inventory & stock", si: "තොග", ta: "சரக்கு" },
      meta: { en: "SKUs, low-stock, barcode scan", sg: "SKUs, low-stock, barcode scan", si: "SKU, අඩු තොග, බාර්කෝඩ්", ta: "SKU, குறைந்த சரக்கு, பார்கோடு" },
      qa: [
        { q: { en: "How do I add products?", sg: "How do I add products?", si: "නිෂ්පාදන එක් කරන්නේ කෙසේද?", ta: "பொருட்களை எப்படி சேர்ப்பது?" }, a: { en: "Go to Inventory, tap + Add, and enter the name, price and stock. Scan a barcode to add it even faster.", sg: "Go to Inventory, tap + Add, and enter the name, price and stock. Scan a barcode to add it even faster.", si: "තොග වෙත ගොස්, + Add තට්ටු කර, නම, මිල සහ තොගය ඇතුළත් කරන්න. වේගවත් කිරීමට බාර්කෝඩ් එකක් ස්කෑන් කරන්න.", ta: "சரக்குக்குச் சென்று, + Add ஐத் தட்டி, பெயர், விலை மற்றும் சரக்கை உள்ளிடவும். வேகமாக சேர்க்க பார்கோடை ஸ்கேன் செய்யவும்." } },
        { q: { en: "How do low-stock alerts work?", sg: "How do low-stock alerts work?", si: "අඩු තොග ඇඟවීම් ක්‍රියා කරන්නේ කෙසේද?", ta: "குறைந்த சரக்கு எச்சரிக்கைகள் எப்படி வேலை செய்கின்றன?" }, a: { en: "Set a minimum quantity per product. youShop notifies you when stock drops below it so you can reorder in time.", sg: "Set a minimum quantity per product. youShop notifies you when stock drops below it so you can reorder in time.", si: "නිෂ්පාදනයකට අවම ප්‍රමාණයක් සකසන්න. තොගය ඊට වඩා අඩු වූ විට youShop ඔබට දැනුම් දෙයි.", ta: "ஒரு பொருளுக்கு குறைந்தபட்ச அளவை அமைக்கவும். சரக்கு அதற்குக் கீழே குறையும்போது youShop உங்களுக்குத் தெரிவிக்கும்." } }
      ] },
    { key: "lend", icon: "🏦",
      cat: { en: "local-partner lending", sg: "local-partner lending", si: "our local lending partner ණය", ta: "our local lending partner கடன்" },
      meta: { en: "eligibility, repayment, top-ups", sg: "eligibility, repayment, top-ups", si: "සුදුසුකම්, ආපසු ගෙවීම්, ඉහළ දැමීම්", ta: "தகுதி, திருப்பிச்செலுத்தல், டாப்-அப்" },
      qa: [
        { q: { en: "Am I eligible for a loan?", sg: "Am I eligible for a loan?", si: "මම ණයකට සුදුසුද?", ta: "நான் கடனுக்குத் தகுதியானவனா?" }, a: { en: "Keep ringing your sales through LGO. After a few weeks of history, our local lending partner pre-approves a working-capital offer that appears in-app.", sg: "Keep ringing your sales through LGO. After a few weeks of history, our local lending partner pre-approves a working-capital offer that appears in-app.", si: "LGO හරහා ඔබේ විකුණුම් දිගටම ඇතුළත් කරන්න. සති කිහිපයක ඉතිහාසයකින් පසු, our local lending partner යෙදුමේ පෙනෙන ව්‍යාපාරික ණය පිරිනැමීමක් පෙර-අනුමත කරයි.", ta: "LGO மூலம் உங்கள் விற்பனையைப் பதிவு செய்யுங்கள். சில வாரங்கள் வரலாற்றுக்குப் பிறகு, our local lending partner செயலியில் தோன்றும் மூலதனக் கடன் சலுகையை முன்-அங்கீகரிக்கிறது." } },
        { q: { en: "How do I repay?", sg: "How do I repay?", si: "ආපසු ගෙවන්නේ කෙසේද?", ta: "எப்படி திருப்பிச் செலுத்துவது?" }, a: { en: "Repayments are taken automatically from a small share of your daily sales — no forms, no branch visit.", sg: "Repayments are taken automatically from a small share of your daily sales — no forms, no branch visit.", si: "ආපසු ගෙවීම් ඔබේ දෛනික විකුණුම්වල කුඩා කොටසකින් ස්වයංක්‍රීයව ලබා ගනී — පෝරම නැත, ශාඛාවට යාමක් නැත.", ta: "திருப்பிச்செலுத்தல் உங்கள் தினசரி விற்பனையின் ஒரு சிறிய பங்கிலிருந்து தானாகவே எடுக்கப்படும் — படிவங்கள் இல்லை, கிளை வருகை இல்லை." } }
      ] },
    { key: "resto", icon: "🍽️",
      cat: { en: "youResto & youQR", sg: "youResto & youQR", si: "youResto සහ youQR", ta: "youResto & youQR" },
      meta: { en: "tables, KDS, delivery", sg: "tables, KDS, delivery", si: "මේස, KDS, බෙදාහැරීම්", ta: "மேசைகள், KDS, டெலிவரி" },
      qa: [
        { q: { en: "How does youQR work?", sg: "How does youQR work?", si: "youQR ක්‍රියා කරන්නේ කෙසේද?", ta: "youQR எப்படி வேலை செய்கிறது?" }, a: { en: "Print your QR code and place it on the table or window. Customers scan, browse the menu, and pay by LankaQR or LankaPay — no app to install.", sg: "Print your QR code and place it on the table or window. Customers scan, browse the menu, and pay by LankaQR or LankaPay — no app to install.", si: "ඔබේ QR කේතය මුද්‍රණය කර මේසය හෝ ජනේලයේ තබන්න. පාරිභෝගිකයෝ ස්කෑන් කර, මෙනුව බලා, LankaQR හෝ LankaPay මගින් ගෙවති — යෙදුමක් නැත.", ta: "உங்கள் QR குறியீட்டை அச்சிட்டு மேசையிலோ ஜன்னலிலோ வைக்கவும். வாடிக்கையாளர்கள் ஸ்கேன் செய்து, மெனுவைப் பார்த்து, LankaQR அல்லது LankaPay மூலம் பணம் செலுத்துகிறார்கள் — செயலி இல்லை." } },
        { q: { en: "Do orders reach the kitchen?", sg: "Do orders reach the kitchen?", si: "ඇණවුම් කුස්සියට යයිද?", ta: "ஆர்டர்கள் சமையலறையை அடைகிறதா?" }, a: { en: "Yes. Every youQR and youResto order prints on your kitchen printer and appears on the display the moment it's placed.", sg: "Yes. Every youQR and youResto order prints on your kitchen printer and appears on the display the moment it's placed.", si: "ඔව්. සෑම youQR සහ youResto ඇණවුමක්ම ඔබේ කුස්සියේ මුද්‍රණ යන්ත්‍රයේ මුද්‍රණය වී තිරයේ පෙනේ.", ta: "ஆம். ஒவ்வொரு youQR மற்றும் youResto ஆர்டரும் உங்கள் சமையலறை அச்சுப்பொறியில் அச்சிடப்பட்டு காட்சியில் தோன்றும்." } }
      ] },
    { key: "hw", icon: "🖨️",
      cat: { en: "Hardware", sg: "Hardware", si: "උපකරණ", ta: "வன்பொருள்" },
      meta: { en: "POS, SoundBox, printers", sg: "POS, SoundBox, printers", si: "POS, SoundBox, මුද්‍රණ යන්ත්‍ර", ta: "POS, SoundBox, அச்சுப்பொறிகள்" },
      qa: [
        { q: { en: "Which printer works with LGO?", sg: "Which printer works with LGO?", si: "LGO සමඟ ක්‍රියා කරන්නේ කුමන මුද්‍රණ යන්ත්‍රයද?", ta: "எந்த அச்சுப்பொறி LGO உடன் வேலை செய்கிறது?" }, a: { en: "The Receipt 58 Bluetooth printer pairs with youShop in one tap. The Kitchen 80 is designed for youResto and youQR tickets.", sg: "The Receipt 58 Bluetooth printer pairs with youShop in one tap. The Kitchen 80 is designed for youResto and youQR tickets.", si: "Receipt 58 Bluetooth මුද්‍රණ යන්ත්‍රය එක් තට්ටුවකින් youShop සමඟ සම්බන්ධ වේ. Kitchen 80 එක youResto සහ youQR ටිකට් සඳහාය.", ta: "Receipt 58 Bluetooth அச்சுப்பொறி ஒரே தட்டலில் youShop உடன் இணைகிறது. Kitchen 80 youResto மற்றும் youQR டிக்கெட்டுகளுக்காக வடிவமைக்கப்பட்டுள்ளது." } },
        { q: { en: "Do I need special hardware?", sg: "Do I need special hardware?", si: "මට විශේෂ උපකරණ අවශ්‍යද?", ta: "எனக்கு சிறப்பு வன்பொருள் தேவையா?" }, a: { en: "No. Everything runs on your phone. Hardware like the LGO POS, SoundBox and printers is optional.", sg: "No. Everything runs on your phone. Hardware like the LGO POS, SoundBox and printers is optional.", si: "නැත. සියල්ල ඔබේ දුරකථනයේ ක්‍රියා කරයි. LGO POS, SoundBox සහ මුද්‍රණ යන්ත්‍ර වැනි උපකරණ විකල්පයකි.", ta: "இல்லை. அனைத்தும் உங்கள் தொலைபேசியில் இயங்குகிறது. LGO POS, SoundBox மற்றும் அச்சுப்பொறிகள் போன்ற வன்பொருள் விருப்பமானது." } }
      ] }
  ];

  function pick(obj, lang) { return obj[lang] || obj.en; }
  function tr(key, lang) { var e = T[key]; return e ? (e[lang] || e.en) : key; }

  function detectLang() {
    try { var s = localStorage.getItem("lgo_lang"); if (s === "en") return s; } catch (e) {}
    var n = (navigator.language || "en").toLowerCase();
    return "en"; // English default
  }

  function applyLang(root, lang) {
    root = root || document;
    root.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = tr(el.getAttribute("data-i18n"), lang);
    });
    root.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = tr(el.getAttribute("data-i18n-html"), lang);
    });
    root.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.setAttribute("placeholder", tr(el.getAttribute("data-i18n-ph"), lang));
    });
    root.querySelectorAll("[data-lang-btn]").forEach(function (b) {
      var on = b.getAttribute("data-lang-btn") === lang;
      b.style.background = on ? "#141414" : "transparent";
      b.style.color = on ? "#fff" : "#5b6472";
    });
    root.querySelectorAll("[data-lang-select]").forEach(function (s) { s.value = lang; });
    var labels = { en: "EN", si: "සිං", ta: "தமி" };
    root.querySelectorAll("[data-lang-current]").forEach(function (el) {
      el.textContent = labels[lang] || "EN";
    });
    try { localStorage.setItem("lgo_lang", lang); } catch (e) {}
    window.__lgoLang = lang;
    document.documentElement.lang = lang;
    renderChat(lang);
  }

  function wireSwitcher(root, onChange) {
    root.querySelectorAll("[data-lang-btn]").forEach(function (b) {
      b.addEventListener("click", function () { onChange(b.getAttribute("data-lang-btn")); });
    });
    root.querySelectorAll("[data-lang-select]").forEach(function (s) {
      s.addEventListener("change", function () { onChange(s.value); });
    });
  }

  // ---- Help centre accordions + search ----
  function buildHelp(container, lang) {
    if (!container) return;
    container.innerHTML = "";
    FAQ.forEach(function (c) {
      var card = document.createElement("div");
      card.className = "sf-help-card";
      card.style.cssText = "border:1px solid #eae2d1;border-radius:14px;overflow:hidden;background:#fff";
      var head = document.createElement("button");
      head.type = "button";
      head.style.cssText = "width:100%;text-align:left;border:0;background:transparent;padding:16px;cursor:pointer;display:flex;gap:12px;align-items:flex-start;font-family:inherit";
      head.innerHTML = '<span style="font-size:20px;line-height:1">' + c.icon + '</span><span style="flex:1"><span class="sf-cat" style="display:block;font-size:16px;font-weight:800;color:#141414">' + pick(c.cat, lang) + '</span><span class="sf-meta" style="display:block;font-size:13px;color:#8a8574;line-height:1.5;margin-top:4px">' + c.qa.length + ' articles · ' + pick(c.meta, lang) + '</span></span><span class="sf-chev" style="color:#4f8a1e;font-weight:700;transition:transform .2s">＋</span>';
      var body = document.createElement("div");
      body.style.cssText = "display:none;padding:0 16px 8px 48px";
      c.qa.forEach(function (item) {
        var qwrap = document.createElement("div");
        qwrap.className = "sf-qa";
        qwrap.style.cssText = "padding:12px 0";
        qwrap.style.borderTop = "1px solid #f1ebdd";
        var qbtn = document.createElement("button");
        qbtn.type = "button";
        qbtn.style.cssText = "width:100%;text-align:left;border:0;background:transparent;padding:0;cursor:pointer;font-size:15px;font-weight:700;color:#141414;font-family:inherit;display:flex;justify-content:space-between;gap:10px";
        qbtn.innerHTML = '<span class="sf-q">' + pick(item.q, lang) + '</span><span style="color:#4f8a1e">›</span>';
        var ans = document.createElement("p");
        ans.className = "sf-a";
        ans.style.cssText = "display:none;font-size:14px;line-height:1.6;color:#5b6472;margin-top:8px";
        ans.textContent = pick(item.a, lang);
        qbtn.addEventListener("click", function () { ans.style.display = ans.style.display === "none" ? "block" : "none"; });
        qwrap.appendChild(qbtn); qwrap.appendChild(ans);
        body.appendChild(qwrap);
      });
      head.addEventListener("click", function () {
        var open = body.style.display === "block";
        body.style.display = open ? "none" : "block";
        head.querySelector(".sf-chev").textContent = open ? "＋" : "–";
      });
      card.appendChild(head); card.appendChild(body);
      container.appendChild(card);
    });
  }

  function wireSearch(input, container) {
    if (!input || !container) return;
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      container.querySelectorAll(".sf-help-card").forEach(function (card) {
        var hitCard = false;
        card.querySelectorAll(".sf-qa").forEach(function (qa) {
          var txt = qa.textContent.toLowerCase();
          var hit = !q || txt.indexOf(q) !== -1;
          qa.style.display = hit ? "block" : "none";
          if (hit) hitCard = true;
        });
        var catTxt = (card.querySelector(".sf-cat") ? card.querySelector(".sf-cat").textContent.toLowerCase() : "");
        if (!q || catTxt.indexOf(q) !== -1) hitCard = true;
        card.style.display = hitCard ? "block" : "none";
        if (q) { card.querySelector("div").style.display = "block"; card.querySelectorAll(".sf-a").forEach(function(a){a.style.display="block";}); }
      });
    });
  }

  // ---- Floating chatbot ----
  var chatEls = null;
  function ensureChat() {
    if (chatEls) return chatEls;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", "Help");
    btn.style.cssText = "position:fixed;right:22px;bottom:22px;z-index:9999;width:60px;height:60px;border-radius:50%;border:0;cursor:pointer;background:#4f8a1e;color:#fff;font-size:26px;box-shadow:0 12px 30px -8px rgba(143,181,31,.6);display:flex;align-items:center;justify-content:center";
    btn.innerHTML = "💬";
    var panel = document.createElement("div");
    panel.style.cssText = "position:fixed;right:22px;bottom:94px;z-index:9999;width:340px;max-width:calc(100vw - 44px);background:#fff;border-radius:20px;box-shadow:0 30px 70px -20px rgba(18,18,18,.5);overflow:hidden;display:none;font-family:'Mulish',system-ui,sans-serif";
    var head = document.createElement("div");
    head.style.cssText = "background:#141414;color:#fff;padding:16px 18px;display:flex;align-items:center;gap:10px";
    head.innerHTML = '<span style="width:34px;height:34px;border-radius:50%;background:#4f8a1e;display:flex;align-items:center;justify-content:center;font-size:18px">💬</span><b class="sf-chat-title" style="flex:1;font-size:16px">LGO Assistant</b><span class="sf-chat-x" style="cursor:pointer;font-size:20px;opacity:.7">✕</span>';
    var bodyC = document.createElement("div");
    bodyC.className = "sf-chat-body";
    bodyC.style.cssText = "padding:16px;max-height:min(60vh,440px);overflow:auto";
    panel.appendChild(head); panel.appendChild(bodyC);
    document.body.appendChild(btn); document.body.appendChild(panel);
    btn.addEventListener("click", function () { panel.style.display = panel.style.display === "none" ? "block" : "none"; });
    head.querySelector(".sf-chat-x").addEventListener("click", function () { panel.style.display = "none"; });
    chatEls = { btn: btn, panel: panel, body: bodyC, title: head.querySelector(".sf-chat-title") };
    return chatEls;
  }
  function renderChat(lang) {
    var c = ensureChat();
    c.title.textContent = tr("chat.title", lang);
    var b = c.body; b.innerHTML = "";
    var greet = document.createElement("div");
    greet.style.cssText = "background:#f4efe4;border-radius:12px;padding:12px 14px;font-size:14px;line-height:1.5;color:#141414;margin-bottom:14px";
    greet.textContent = tr("chat.greeting", lang);
    b.appendChild(greet);
    FAQ.forEach(function (cat) {
      cat.qa.forEach(function (item) {
        var q = document.createElement("button");
        q.type = "button";
        q.style.cssText = "display:block;width:100%;text-align:left;border:1px solid #eae2d1;background:#fff;border-radius:12px;padding:10px 12px;margin-bottom:8px;cursor:pointer;font-size:13.5px;font-weight:700;color:#141414;font-family:inherit";
        q.textContent = pick(item.q, lang);
        var a = document.createElement("div");
        a.style.cssText = "display:none;font-size:13px;line-height:1.6;color:#5b6472;padding:6px 12px 12px";
        a.textContent = pick(item.a, lang);
        q.addEventListener("click", function () { a.style.display = a.style.display === "none" ? "block" : "none"; });
        b.appendChild(q); b.appendChild(a);
      });
    });
    var wa = document.createElement("a");
    wa.href = WA;
    wa.style.cssText = "display:block;text-align:center;background:#25d366;color:#fff;border-radius:12px;padding:12px;margin-top:8px;font-weight:800;font-size:14px;text-decoration:none";
    wa.textContent = tr("chat.wa", lang);
    b.appendChild(wa);
  }

  window.LGO = window.Senfay = {
    PHONE: PHONE, WA: WA, PLAY: PLAY, EMAIL: EMAIL,
    init: function (root) {
      root = root || document;
      var lang = detectLang();
      buildHelp(root.querySelector("[data-help-list]"), lang);
      wireSearch(root.querySelector("[data-help-search]"), root.querySelector("[data-help-list]"));
      wireSwitcher(root, function (l) { applyLang(root, l); buildHelp(root.querySelector("[data-help-list]"), l); wireSearch(root.querySelector("[data-help-search]"), root.querySelector("[data-help-list]")); });

      var canHover = window.matchMedia && window.matchMedia("(hover:hover) and (pointer:fine)").matches;
      var openDrops = [];
      function showDrop(p) { p.style.opacity = "1"; p.style.visibility = "visible"; p.style.transform = "translateY(0)"; p.style.pointerEvents = "auto"; }
      function hideDrop(p) { p.style.opacity = "0"; p.style.visibility = "hidden"; p.style.transform = "translateY(-6px)"; p.style.pointerEvents = "none"; }
      function closeAllDrops() { openDrops.forEach(hideDrop); }
      root.querySelectorAll("[data-dropdown]").forEach(function (dd) {
        var panel = dd.querySelector("[data-dropdown-panel]");
        if (!panel) return;
        openDrops.push(panel);
        if (canHover) {
          dd.addEventListener("mouseenter", function () { showDrop(panel); });
          dd.addEventListener("mouseleave", function () { hideDrop(panel); });
        }
        var trigger = dd.querySelector("a,button") || dd;
        trigger.addEventListener("click", function (e) {
          if (canHover) return;
          e.preventDefault();
          e.stopPropagation();
          var isOpen = panel.style.visibility === "visible";
          closeAllDrops();
          if (!isOpen) showDrop(panel);
        });
        panel.addEventListener("click", function (e) { e.stopPropagation(); });
      });
      document.addEventListener("click", closeAllDrops);
      var mb = root.querySelector("[data-menu-btn]"), mp = root.querySelector("[data-menu-panel]");
      if (mb && mp) { mb.addEventListener("click", function () { mp.style.display = mp.style.display === "flex" ? "none" : "flex"; }); mp.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { mp.style.display = "none"; }); }); }
      root.querySelectorAll("[data-price-btn]").forEach(function (b) {
        b.addEventListener("click", function () {
          var key = b.getAttribute("data-price-btn");
          root.querySelectorAll("[data-price-btn]").forEach(function (x) { var on = x === b; x.style.background = on ? "#141414" : "transparent"; x.style.color = on ? "#fff" : "#5b6472"; });
          root.querySelectorAll("[data-price-panel]").forEach(function (p) { p.style.display = p.getAttribute("data-price-panel") === key ? "grid" : "none"; });
        });
      });
      root.querySelectorAll("[data-bill-btn]").forEach(function (b) {
        b.addEventListener("click", function () {
          var key = b.getAttribute("data-bill-btn");
          root.querySelectorAll("[data-bill-btn]").forEach(function (x) { var on = x === b; x.style.background = on ? "#141414" : "transparent"; x.style.color = on ? "#fff" : "#5b6472"; });
          root.querySelectorAll("[data-bill]").forEach(function (p) { p.style.display = p.getAttribute("data-bill") === key ? "block" : "none"; });
        });
      });
      var setForm = function (k) {
        root.querySelectorAll("[data-form-tab]").forEach(function (x) { var on = x.getAttribute("data-form-tab") === k; x.style.background = on ? "#141414" : "transparent"; x.style.color = on ? "#fff" : "#141414"; });
        root.querySelectorAll("[data-form-panel]").forEach(function (p) { p.style.display = p.getAttribute("data-form-panel") === k ? "block" : "none"; });
      };
      window.LGO._setForm = setForm;
      root.querySelectorAll("[data-form-tab]").forEach(function (b) { b.addEventListener("click", function () { setForm(b.getAttribute("data-form-tab")); }); });
      root.querySelectorAll("[data-prod]").forEach(function (b) {
        b.addEventListener("click", function () {
          b.parentNode.querySelectorAll("[data-prod]").forEach(function (x) { var on = x === b; x.style.background = on ? "#eaf3dd" : "#fff"; x.style.borderColor = on ? "#4f8a1e" : "#d8d2c4"; x.style.color = on ? "#4f8a1e" : "#141414"; });
          var form = b.closest("form"); var hw = form && form.querySelector("[data-hw-field]"); if (hw) hw.style.display = (b.textContent.trim() === "Hardware") ? "block" : "none";
        });
      });
      root.querySelectorAll("[data-contact-form]").forEach(function (f) {
        f.addEventListener("submit", function (e) { e.preventDefault(); f.style.display = "none"; var s = f.parentNode.querySelector("[data-form-success]"); if (s) s.style.display = "block"; });
      });
      ensureChat();
      applyLang(root, lang);
    }
  };
})();
