import React, { createContext, useContext, useState } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navbar
    home: 'Home',
    allProducts: 'All Products',
    sandals: 'Sandals',
    chappals: 'Chappals',
    shoes: 'Shoes',
    men: 'Men',
    women: 'Women',
    boys: 'Boys',
    girls: 'Girls',
    formal: 'Formal',
    sport: 'Sport',
    cart: 'Cart',
    myOrders: 'My Orders',
    admin: 'Admin',
    welcome: 'Welcome',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
    
    // Home
    heroTitle: 'METRONSHOE',
    heroSubtitle: 'Step into Style, Walk with Confidence',
    shopNow: 'Shop Now',
    
    // Products
    addToCart: 'Add to Cart',
    awaitingConfirmation: 'Awaiting Confirmation',
    adminConfirmed: 'Admin Confirmed',
    pendingConfirmation: 'Pending Confirmation',
    sizes: 'Sizes',
    
    // Auth
    loginTitle: 'Login to METRONSHOE',
    registerTitle: 'Join METRONSHOE',
    name: 'Name',
    email: 'Email',
    password: 'Password',
    
    // Cart & Orders
    proceedToCheckout: 'Proceed to Checkout',
    continueShopping: 'Continue Shopping',
    total: 'Total',
    orderPlaced: 'Order Placed Successfully!',
    
    // Common
    price: 'Price',
    category: 'Category',
    description: 'Description',
    size: 'Size',
    selectSize: 'Select Size',
    
    // Cart
    yourCart: 'Your Cart',
    cartEmpty: 'Your cart is empty',
    quantity: 'Quantity',
    each: 'each',
    remove: 'Remove',
    productUnavailable: 'Product unavailable',
    
    // Checkout
    checkout: 'Checkout',
    shippingAddress: 'Shipping Address',
    fullName: 'Full Name',
    phone: 'Phone',
    address: 'Address',
    city: 'City',
    pincode: 'Pincode',
    paymentMethod: 'Payment Method',
    cashOnDelivery: 'Cash on Delivery',
    googlePay: 'Google Pay',
    paytm: 'Paytm',
    phonePe: 'PhonePe',
    amazonPay: 'Amazon Pay',
    otherUpi: 'Other UPI Apps',
    creditDebitCard: 'Credit/Debit Card',
    netBanking: 'Net Banking',
    digitalWallet: 'Digital Wallet',
    emiOptions: 'EMI Options',
    placeOrder: 'Place Order',
    placingOrder: 'Placing Order...',
    orderSummary: 'Order Summary',
    freeDelivery: 'Free delivery in 5-7 business days'
  },
  
  hi: {
    // Navbar
    home: 'होम',
    allProducts: 'सभी उत्पाद',
    sandals: 'सैंडल',
    chappals: 'चप्पल',
    shoes: 'जूते',
    men: 'पुरुष',
    women: 'महिला',
    boys: 'लड़के',
    girls: 'लड़कियां',
    formal: 'औपचारिक',
    sport: 'खेल',
    cart: 'कार्ट',
    myOrders: 'मेरे ऑर्डर',
    admin: 'एडमिन',
    welcome: 'स्वागत',
    login: 'लॉगिन',
    register: 'रजिस्टर',
    logout: 'लॉगआउट',
    
    // Home
    heroTitle: 'मेट्रोनशू',
    heroSubtitle: 'स्टाइल में कदम रखें, आत्मविश्वास के साथ चलें',
    shopNow: 'अभी खरीदें',
    
    // Products
    addToCart: 'कार्ट में जोड़ें',
    awaitingConfirmation: 'पुष्टि की प्रतीक्षा',
    adminConfirmed: 'एडमिन द्वारा पुष्ट',
    pendingConfirmation: 'पुष्टि लंबित',
    sizes: 'साइज़',
    
    // Auth
    loginTitle: 'मेट्रोनशू में लॉगिन करें',
    registerTitle: 'मेट्रोनशू में शामिल हों',
    name: 'नाम',
    email: 'ईमेल',
    password: 'पासवर्ड',
    
    // Cart & Orders
    proceedToCheckout: 'चेकआउट पर जाएं',
    continueShopping: 'खरीदारी जारी रखें',
    total: 'कुल',
    orderPlaced: 'ऑर्डर सफलतापूर्वक दिया गया!',
    
    // Common
    price: 'कीमत',
    category: 'श्रेणी',
    description: 'विवरण',
    size: 'साइज़',
    selectSize: 'साइज़ चुनें',
    
    // Cart
    yourCart: 'आपका कार्ट',
    cartEmpty: 'आपका कार्ट खाली है',
    quantity: 'मात्रा',
    each: 'प्रत्येक',
    remove: 'हटाएं',
    productUnavailable: 'उत्पाद उपलब्ध नहीं',
    
    // Checkout
    checkout: 'चेकआउट',
    shippingAddress: 'शिपिंग पता',
    fullName: 'पूरा नाम',
    phone: 'फोन',
    address: 'पता',
    city: 'शहर',
    pincode: 'पिनकोड',
    paymentMethod: 'भुगतान विधि',
    cashOnDelivery: 'कैश ऑन डिलीवरी',
    googlePay: 'गूगल पे',
    paytm: 'पेटीएम',
    phonePe: 'फोनपे',
    amazonPay: 'अमेज़न पे',
    otherUpi: 'अन्य UPI ऐप्स',
    creditDebitCard: 'क्रेडिट/डेबिट कार्ड',
    netBanking: 'नेट बैंकिंग',
    digitalWallet: 'डिजिटल वॉलेट',
    emiOptions: 'EMI विकल्प',
    placeOrder: 'ऑर्डर दें',
    placingOrder: 'ऑर्डर दिया जा रहा है...',
    orderSummary: 'ऑर्डर सारांश',
    freeDelivery: '5-7 कार्यदिवसों में मुफ्त डिलीवरी'
  },
  
  gu: {
    // Navbar
    home: 'હોમ',
    allProducts: 'બધા ઉત્પાદનો',
    sandals: 'સેન્ડલ',
    chappals: 'ચપ્પલ',
    shoes: 'જૂતા',
    men: 'પુરુષો',
    women: 'મહિલાઓ',
    boys: 'છોકરાઓ',
    girls: 'છોકરીઓ',
    formal: 'ઔપચારિક',
    sport: 'રમત',
    cart: 'કાર્ટ',
    myOrders: 'મારા ઓર્ડર',
    admin: 'એડમિન',
    welcome: 'સ્વાગત',
    login: 'લોગિન',
    register: 'રજિસ્ટર',
    logout: 'લોગઆઉટ',
    
    // Home
    heroTitle: 'મેટ્રોનશૂ',
    heroSubtitle: 'સ્ટાઇલમાં પગલું મૂકો, આત્મવિશ્વાસ સાથે ચાલો',
    shopNow: 'હવે ખરીદો',
    
    // Products
    addToCart: 'કાર્ટમાં ઉમેરો',
    awaitingConfirmation: 'પુષ્ટિની રાહ',
    adminConfirmed: 'એડમિન દ્વારા પુષ્ટિ',
    pendingConfirmation: 'પુષ્ટિ બાકી',
    sizes: 'સાઇઝ',
    
    // Auth
    loginTitle: 'મેટ્રોનશૂમાં લોગિન કરો',
    registerTitle: 'મેટ્રોનશૂમાં જોડાઓ',
    name: 'નામ',
    email: 'ઇમેઇલ',
    password: 'પાસવર્ડ',
    
    // Cart & Orders
    proceedToCheckout: 'ચેકઆઉટ પર જાઓ',
    continueShopping: 'ખરીદારી ચાલુ રાખો',
    total: 'કુલ',
    orderPlaced: 'ઓર્ડર સફળતાપૂર્વક આપવામાં આવ્યો!',
    
    // Common
    price: 'કિંમત',
    category: 'કેટેગરી',
    description: 'વર્ણન',
    size: 'સાઇઝ',
    selectSize: 'સાઇઝ પસંદ કરો',
    
    // Cart
    yourCart: 'તમારું કાર્ટ',
    cartEmpty: 'તમારું કાર્ટ ખાલી છે',
    quantity: 'જથ્થો',
    each: 'દરેક',
    remove: 'દૂર કરો',
    productUnavailable: 'ઉત્પાદન ઉપલબ્ધ નથી',
    
    // Checkout
    checkout: 'ચેકઆઉટ',
    shippingAddress: 'શિપિંગ સરનામું',
    fullName: 'પૂરું નામ',
    phone: 'ફોન',
    address: 'સરનામું',
    city: 'શહેર',
    pincode: 'પિનકોડ',
    paymentMethod: 'ચુકવણી પદ્ધતિ',
    cashOnDelivery: 'કેશ ઓન ડિલિવરી',
    googlePay: 'ગૂગલ પે',
    paytm: 'પેટીએમ',
    phonePe: 'ફોનપે',
    amazonPay: 'એમેઝોન પે',
    otherUpi: 'અન્ય UPI એપ્સ',
    creditDebitCard: 'ક્રેડિટ/ડેબિટ કાર્ડ',
    netBanking: 'નેટ બેંકિંગ',
    digitalWallet: 'ડિજિટલ વોલેટ',
    emiOptions: 'EMI વિકલ્પો',
    placeOrder: 'ઓર્ડર આપો',
    placingOrder: 'ઓર્ડર આપવામાં આવી રહ્યો છે...',
    orderSummary: 'ઓર્ડર સારાંશ',
    freeDelivery: '5-7 કાર્યદિવસોમાં મફત ડિલિવરી'
  },
  
  // Bengali
  bn: {
    home: 'হোম',
    allProducts: 'সব পণ্য',
    sandals: 'স্যান্ডেল',
    chappals: 'চপ্পল',
    shoes: 'জুতা',
    men: 'পুরুষ',
    women: 'মহিলা',
    boys: 'ছেলে',
    girls: 'মেয়ে',
    cart: 'কার্ট',
    login: 'লগইন',
    register: 'নন্দন',
    heroTitle: 'মেট্রনশু',
    heroSubtitle: 'স্টাইলে পা রাখুন',
    shopNow: 'এখনই কিনুন',
    addToCart: 'কার্টে যোগ করুন',
    sizes: 'সাইজ',
    size: 'সাইজ',
    selectSize: 'সাইজ নির্বাচন করুন'
  },
  
  // Telugu
  te: {
    home: 'హోమ్',
    allProducts: 'అన్ని ఉత్పత్తులు',
    sandals: 'చప్పలు',
    chappals: 'చప్పలు',
    shoes: 'జూతాలు',
    men: 'పురుషులు',
    women: 'మహిళలు',
    boys: 'అమ్మాయిలు',
    girls: 'ఆడపిల్లలు',
    cart: 'కార్ట్',
    login: 'లాగిన్',
    register: 'నమోదు',
    heroTitle: 'మెట్రాన్‌షూ',
    heroSubtitle: 'స్టైల్‌లో అడుగు వేయండి',
    shopNow: 'ఇప్పుడే కొనుగోలు',
    addToCart: 'కార్ట్‌కు చేర్చు',
    sizes: 'సైజులు',
    size: 'సైజు',
    selectSize: 'సైజు ఎంచుకోండి'
  },
  
  // Marathi
  mr: {
    home: 'होम',
    allProducts: 'सर्व उत्पादने',
    sandals: 'चप्पल',
    chappals: 'चप्पल',
    shoes: 'बूट',
    men: 'पुरुष',
    women: 'महिला',
    boys: 'मुले',
    girls: 'मुली',
    cart: 'कार्ट',
    login: 'लॉगिन',
    register: 'नोंदणी',
    heroTitle: 'मेट्रोनशू',
    heroSubtitle: 'शैलीत पाऊल टाका',
    shopNow: 'आताच खरेदी करा',
    addToCart: 'कार्टमध्ये जोडा',
    sizes: 'आकार',
    size: 'आकार',
    selectSize: 'आकार निवडा'
  },
  
  // Tamil
  ta: {
    home: 'வீடு',
    allProducts: 'அனைத்து பொருட்கள்',
    sandals: 'சன்டல்',
    chappals: 'சப்பல்',
    shoes: 'செருப்பு',
    men: 'ஆண்கள்',
    women: 'பெண்கள்',
    boys: 'ஆண் குழந்தைகள்',
    girls: 'பெண் குழந்தைகள்',
    cart: 'கார்ட்',
    login: 'உள்நுழைவு',
    register: 'பந்தியீடு',
    heroTitle: 'மெட்ரான்ஷூ',
    heroSubtitle: 'ஸ்டைலில் அடி வைக்கவும்',
    shopNow: 'இப்போதே வாங்கவும்',
    addToCart: 'கார்டில் சேர்க்கவும்',
    sizes: 'அளவுகள்',
    size: 'அளவு',
    selectSize: 'அளவை தேர்ந்தெடுக்கவும்'
  },
  
  // Kannada
  kn: {
    home: 'ಮನೆ',
    allProducts: 'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು',
    sandals: 'ಸ್ಯಾಂಡಲ್‌ಗಳು',
    chappals: 'ಚಪ್ಪಲ್‌ಗಳು',
    shoes: 'ಜೂತೆಗಳು',
    men: 'ಪುರುಷರು',
    women: 'ಮಹಿಳೆಯರು',
    boys: 'ಹುಡುಗರು',
    girls: 'ಹುಡುಗಿಯರು',
    cart: 'ಕಾರ್ಟ್',
    login: 'ಲಾಗಿನ್',
    register: 'ನೋಂದಣಿ',
    heroTitle: 'ಮೆಟ್ರಾನ್‌ಶೂ',
    heroSubtitle: 'ಸ್ಟೈಲ್‌ನಲ್ಲಿ ನಡೆಯಿರಿ',
    shopNow: 'ಇದೇ ಕೊಂಡುಕೊಳ್ಳಿ',
    addToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
    sizes: 'ಅಳತೆಗಳು',
    size: 'ಅಳತೆ',
    selectSize: 'ಅಳತೆ ಆಯ್ಕೆಮಾಡಿ'
  },
  
  // Malayalam
  ml: {
    home: 'വീട്',
    allProducts: 'എല്ലാ ഉത്പന്നങ്ങളും',
    sandals: 'ചപ്പലുകള്‍',
    chappals: 'ചപ്പലുകള്‍',
    shoes: 'ജൂത്തകള്‍',
    men: 'പുരുഷന്മാര്‍',
    women: 'സ്ത്രീകള്‍',
    boys: 'ആണ്‍കുട്ടികള്‍',
    girls: 'പെണ്‍കുട്ടികള്‍',
    cart: 'കാര്‍ട്ട്',
    login: 'ലോഗിന്‍',
    register: 'രജിസ്റ്റര്‍ ചെയ്യുക',
    heroTitle: 'മെട്രോണ്‍ഷൂ',
    heroSubtitle: 'സ്റ്റൈലില്‍ നടക്കുക',
    shopNow: 'ഇപ്പോള്‍ വാങ്ങുക',
    addToCart: 'കാര്‍ട്ടില്‍ ചേര്‍ക്കുക',
    sizes: 'സൈസുകള്‍',
    size: 'സൈസ്',
    selectSize: 'സൈസ് തിരഞ്ഞെടുക്കുക'
  },
  
  // Punjabi
  pa: {
    home: 'ਘਰ',
    allProducts: 'ਸਾਰੇ ਉਤਪਾਦ',
    sandals: 'ਸੈਂਡਲ',
    chappals: 'ਚਪਲ',
    shoes: 'ਜੂਤੇ',
    men: 'ਮਰਦ',
    women: 'ਔਰਤਾਂ',
    boys: 'ਮੁੰਡੇ',
    girls: 'ਕੁੜੀਆਂ',
    cart: 'ਕਾਰਟ',
    login: 'ਲਾਗਇਨ',
    register: 'ਰਜਿਸਟਰ',
    heroTitle: 'ਮੈਟਰੋਨਸ਼ੂ',
    heroSubtitle: 'ਸਟਾਈਲ ਵਿੱਚ ਕਦਮ ਰੱਖੋ',
    shopNow: 'ਹੁਣ ਖਰੀਦੋ',
    addToCart: 'ਕਾਰਟ ਵਿੱਚ ਪਾਓ',
    sizes: 'ਸਾਈਜ਼',
    size: 'ਸਾਈਜ਼',
    selectSize: 'ਸਾਈਜ਼ ਚੁਣੋ'
  },
  
  // Odia
  or: {
    home: 'ଘର',
    allProducts: 'ସବୁ ଉତ୍ପାଦ',
    sandals: 'ଚପ୍ପଳ',
    chappals: 'ଚପ୍ପଳ',
    shoes: 'ଜୁତା',
    men: 'ପୁରୁଷ',
    women: 'ମହିଳା',
    boys: 'ଛୁଆ',
    girls: 'ଝିଅ',
    cart: 'କାର୍ଟ',
    login: 'ଲଗଇନ',
    register: 'ନିବନ୍ଧନ',
    heroTitle: 'ମେଟ୍ରୋନଶୁ',
    heroSubtitle: 'ସ୍ଟାଇଲରେ ପାଦ ରାଖନ୍ତୁ',
    shopNow: 'ଏଖନି କିଣନ୍ତୁ',
    addToCart: 'କାର୍ଟରେ ଯୋଗ କରନ୍ତୁ',
    sizes: 'ସାଇଜ',
    size: 'ସାଇଜ',
    selectSize: 'ସାଇଜ ବାଛନ୍ତୁ'
  },
  
  // Assamese
  as: {
    home: 'ঘৰ',
    allProducts: 'সকলো পণ্য',
    sandals: 'চেন্ডেল',
    chappals: 'চাপ্পাল',
    shoes: 'জুতা',
    men: 'পুৰুষ',
    women: 'মহিলা',
    boys: 'লড়া',
    girls: 'ছোৱালী',
    cart: 'কাৰ্ট',
    login: 'লগইন',
    register: 'নন্দন',
    heroTitle: 'মেট্ৰনশু',
    heroSubtitle: 'স্টাইলত পা দিয়ক',
    shopNow: 'এতিয়াই কিনক',
    addToCart: 'কাৰ্টত দিয়ক',
    sizes: 'ছাইজ',
    size: 'ছাইজ',
    selectSize: 'ছাইজ বাছনি কৰক'
  },
  
  // Urdu
  ur: {
    home: 'گھر',
    allProducts: 'تمام پروڈکٹس',
    sandals: 'سینڈل',
    chappals: 'چپل',
    shoes: 'جوتے',
    men: 'مرد',
    women: 'عورت',
    boys: 'لڑکے',
    girls: 'لڑکیاں',
    cart: 'کارٹ',
    login: 'لاگ ان',
    register: 'رجسٹر',
    heroTitle: 'میٹرون شو',
    heroSubtitle: 'اسٹائل میں قدم رکھیں',
    shopNow: 'اب خریدیں',
    addToCart: 'کارٹ میں شامل کریں',
    sizes: 'سائز',
    size: 'سائز',
    selectSize: 'سائز منتخب کریں'
  },
  
  // Sanskrit
  sa: {
    home: 'गृहम्',
    allProducts: 'सर्वाणि उत्पादानि',
    sandals: 'पादुकाः',
    chappals: 'पादुकाः',
    shoes: 'पादरक्षाः',
    men: 'पुरुषाः',
    women: 'स्त्रियः',
    boys: 'बालाः',
    girls: 'बालिकाः',
    cart: 'कार्टम्',
    login: 'प्रवेशः',
    register: 'नामाङ्कनम्',
    heroTitle: 'मेट्रोनशू',
    heroSubtitle: 'शैल्यां पादे धरतु',
    shopNow: 'अधुना क्रीणीतु',
    addToCart: 'कार्टे योजयतु',
    sizes: 'मापाः',
    size: 'मापः',
    selectSize: 'मापं चिनोतु'
  },
  
  // Nepali
  ne: {
    home: 'घर',
    allProducts: 'सबै उत्पादनहरू',
    sandals: 'चप्पल',
    chappals: 'चप्पल',
    shoes: 'जुत्ता',
    men: 'पुरुषहरू',
    women: 'महिलाहरू',
    boys: 'केटाहरू',
    girls: 'केटीहरू',
    cart: 'कार्ट',
    login: 'लगइन',
    register: 'दर्ता',
    heroTitle: 'मेट्रोनशु',
    heroSubtitle: 'शैलीमा हिँड्नुहोस्',
    shopNow: 'अब किन्नुहोस्',
    addToCart: 'कार्टमा थप्नुहोस्',
    sizes: 'साइजहरू',
    size: 'साइज',
    selectSize: 'साइज छान्नुहोस्'
  },
  
  // Sindhi
  sd: {
    home: 'گھر',
    allProducts: 'سارا پروڈکٹ',
    sandals: 'چپل',
    chappals: 'چپل',
    shoes: 'جوتا',
    men: 'مرد',
    women: 'عورت',
    boys: 'ڇوکرا',
    girls: 'ڇوکريوں',
    cart: 'کارٽ',
    login: 'لاگ ان',
    register: 'رجسٽر',
    heroTitle: 'میٽرون شو',
    heroSubtitle: 'اسٽائل میں قدم رکھو',
    shopNow: 'ھاني خريدو',
    addToCart: 'کارٽ میں شامل کرو',
    sizes: 'سائز',
    size: 'سائز',
    selectSize: 'سائز چونڈو'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    const languageTranslations = translations[language as keyof typeof translations] as any;
    return languageTranslations?.[key] || translations.en[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};