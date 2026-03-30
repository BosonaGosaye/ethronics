require('dotenv').config();
const mongoose = require('mongoose');
const ManufacturingProduct = require('../models/ManufacturingProduct');

const sampleProducts = [
  {
    image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=600',
    category: 'iot',
    status: 'In Development',
    progress: 75,
    expectedLaunch: 'Q2 2024',
    isPublished: true,
    isFeatured: true,
    order: 1,
    translations: {
      en: {
        name: 'Smart Environmental Monitor',
        description: 'Advanced IoT device for real-time environmental monitoring',
        detailedDescription: 'Our Smart Environmental Monitor is a cutting-edge IoT solution designed to track air quality, temperature, humidity, and other environmental parameters in real-time. Perfect for smart buildings, industrial facilities, and urban planning.',
        features: [
          'Real-time air quality monitoring',
          'Temperature and humidity sensors',
          'Cloud connectivity with data analytics',
          'Mobile app integration',
          'Low power consumption'
        ],
        applications: ['Smart Buildings', 'Industrial Monitoring', 'Urban Planning', 'Healthcare Facilities'],
        tags: ['IoT', 'Environmental', 'Sensors', 'Smart City']
      },
      am: {
        name: 'ስማርት የአካባቢ ክትትል',
        description: 'የላቀ IoT መሳሪያ ለእውነተኛ ጊዜ የአካባቢ ክትትል',
        detailedDescription: 'የእኛ ስማርት የአካባቢ ክትትል የላቀ IoT መፍትሄ ሲሆን የአየር ጥራት፣ የሙቀት መጠን፣ እርጥበት እና ሌሎች የአካባቢ መለኪያዎችን በእውነተኛ ጊዜ ለመከታተል የተነደፈ ነው።',
        features: [
          'የእውነተኛ ጊዜ የአየር ጥራት ክትትል',
          'የሙቀት እና እርጥበት ዳሳሾች',
          'የደመና ግንኙነት ከመረጃ ትንተና ጋር',
          'የሞባይል መተግበሪያ ውህደት',
          'ዝቅተኛ የኃይል ፍጆታ'
        ],
        applications: ['ስማርት ህንፃዎች', 'የኢንዱስትሪ ክትትል', 'የከተማ እቅድ', 'የጤና እንክብካቤ ተቋማት'],
        tags: ['IoT', 'አካባቢያዊ', 'ዳሳሾች', 'ስማርት ከተማ']
      },
      om: {
        name: 'Hordooftuu Naannoo Ismaartii',
        description: 'Meeshaa IoT sadarkaa olaanaa hordoffii naannoo yeroo qabatamaa',
        detailedDescription: 'Hordooftuun Naannoo Ismaartii keenya furmaata IoT sadarkaa olaanaa qulqullina qilleensaa, ho\'a, jiidha fi ulaagaalee naannoo biroo yeroo qabatamaa hordofuuf qophaa\'edha.',
        features: [
          'Hordoffii qulqullina qilleensaa yeroo qabatamaa',
          'Sensaroota ho\'aa fi jiidha',
          'Walitti hidhamiinsa duumessaa xiinxala deetaa waliin',
          'Walitti makamuu aplikeeshinii mobaayilaa',
          'Fayyadama humna gadi aanaa'
        ],
        applications: ['Gamoo Ismaartii', 'Hordoffii Industirii', 'Karoora Magaalaa', 'Dhaabbilee Eegumsa Fayyaa'],
        tags: ['IoT', 'Naannoo', 'Sensaroota', 'Magaalaa Ismaartii']
      }
    },
    specifications: {
      'Connectivity': 'WiFi 802.11ac, Bluetooth 5.0, LoRaWAN',
      'Sensors': 'PM2.5, PM10, CO2, Temperature, Humidity',
      'Power': '5V DC / Battery backup',
      'Dimensions': '15 x 10 x 5 cm',
      'Operating Temperature': '-10°C to 50°C'
    }
  },
  {
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600',
    category: 'automation',
    status: 'Production Ready',
    progress: 100,
    expectedLaunch: 'Available Now',
    isPublished: true,
    isFeatured: true,
    order: 2,
    translations: {
      en: {
        name: 'Industrial Automation Controller',
        description: 'High-performance PLC for industrial automation',
        detailedDescription: 'Our Industrial Automation Controller is a robust, high-performance programmable logic controller (PLC) designed for demanding industrial environments. It offers exceptional reliability, real-time processing, and seamless integration with existing systems.',
        features: [
          'Real-time processing capabilities',
          'Multiple I/O configurations',
          'Industrial-grade reliability',
          'Remote monitoring and control',
          'Modbus and OPC UA support'
        ],
        applications: ['Manufacturing', 'Process Control', 'Energy Management', 'Building Automation'],
        tags: ['Automation', 'PLC', 'Industrial', 'Control Systems']
      },
      am: {
        name: 'የኢንዱስትሪ አውቶሜሽን መቆጣጠሪያ',
        description: 'ለኢንዱስትሪ አውቶሜሽን ከፍተኛ አፈጻጸም ያለው PLC',
        detailedDescription: 'የእኛ የኢንዱስትሪ አውቶሜሽን መቆጣጠሪያ ጠንካራ፣ ከፍተኛ አፈጻጸም ያለው ፕሮግራም ሊደረግ የሚችል አመክንዮ መቆጣጠሪያ (PLC) ሲሆን ለከባድ የኢንዱስትሪ አካባቢዎች የተነደፈ ነው።',
        features: [
          'የእውነተኛ ጊዜ ማቀናበር አቅም',
          'በርካታ I/O ውቅሮች',
          'የኢንዱስትሪ ደረጃ አስተማማኝነት',
          'የርቀት ክትትል እና ቁጥጥር',
          'Modbus እና OPC UA ድጋፍ'
        ],
        applications: ['ማምረት', 'የሂደት ቁጥጥር', 'የኃይል አስተዳደር', 'የህንፃ አውቶሜሽን'],
        tags: ['አውቶሜሽን', 'PLC', 'ኢንዱስትሪ', 'የቁጥጥር ስርዓቶች']
      },
      om: {
        name: 'Too\'annoo Automation Industirii',
        description: 'PLC raawwii olaanaa automation industiriif',
        detailedDescription: 'Too\'annoon Automation Industirii keenya too\'annoo loojikii sagantaa\'amuu danda\'u (PLC) cimaa fi raawwii olaanaa naannoo industirii ulfaataa ta\'eef qophaa\'edha.',
        features: [
          'Dandeettii adeemsa yeroo qabatamaa',
          'Qindaa\'inoota I/O hedduu',
          'Amanamummaa sadarkaa industirii',
          'Hordoffii fi to\'annoo fagoo',
          'Deeggarsa Modbus fi OPC UA'
        ],
        applications: ['Oomisha', 'To\'annoo Adeemsa', 'Bulchiinsa Humna', 'Automation Gamoo'],
        tags: ['Automation', 'PLC', 'Industirii', 'Sirnoota To\'annoo']
      }
    },
    specifications: {
      'Processor': '32-bit ARM Cortex',
      'Memory': '512MB RAM, 4GB Flash',
      'I/O Points': 'Up to 256 digital, 64 analog',
      'Communication': 'Ethernet, RS-485, CAN bus',
      'Operating Temperature': '-20°C to 60°C',
      'Certifications': 'CE, UL, IEC 61131-3'
    }
  },
  {
    image: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=600',
    category: 'smart-city',
    status: 'Prototype',
    progress: 50,
    expectedLaunch: 'Q4 2024',
    isPublished: true,
    isFeatured: false,
    order: 3,
    translations: {
      en: {
        name: 'Smart Street Lighting System',
        description: 'Intelligent LED street lighting with adaptive control',
        detailedDescription: 'Our Smart Street Lighting System revolutionizes urban lighting infrastructure with intelligent, energy-efficient LED technology. The system automatically adjusts brightness based on ambient conditions, traffic patterns, and time of day, reducing energy consumption by up to 70%.',
        features: [
          'Adaptive brightness control',
          'Motion detection sensors',
          'Remote management platform',
          'Energy consumption analytics',
          'Fault detection and alerts'
        ],
        applications: ['Urban Streets', 'Parking Lots', 'Parks', 'Campus Lighting'],
        tags: ['Smart City', 'LED', 'Energy Efficiency', 'IoT']
      },
      am: {
        name: 'ስማርት የመንገድ መብራት ስርዓት',
        description: 'ብልህ LED የመንገድ መብራት ከተላመደ ቁጥጥር ጋር',
        detailedDescription: 'የእኛ ስማርት የመንገድ መብራት ስርዓት የከተማ መብራት መሠረተ ልማትን በብልህ፣ ኃይል ቆጣቢ LED ቴክኖሎጂ ያስተካክላል። ስርዓቱ በአካባቢ ሁኔታዎች፣ የትራፊክ ቅጦች እና የቀን ሰዓት ላይ በመመስረት ብሩህነትን በራስ-ሰር ያስተካክላል።',
        features: [
          'የተላመደ ብሩህነት ቁጥጥር',
          'የእንቅስቃሴ ማወቂያ ዳሳሾች',
          'የርቀት አስተዳደር መድረክ',
          'የኃይል ፍጆታ ትንተና',
          'የስህተት ማወቂያ እና ማንቂያዎች'
        ],
        applications: ['የከተማ መንገዶች', 'የመኪና ማቆሚያዎች', 'ፓርኮች', 'የካምፓስ መብራት'],
        tags: ['ስማርት ከተማ', 'LED', 'የኃይል ቆጣቢነት', 'IoT']
      },
      om: {
        name: 'Sirna Ibsaa Daandii Ismaartii',
        description: 'Ibsaa LED daandii sammuu qabu to\'annoo madaqsuu danda\'u waliin',
        detailedDescription: 'Sirnichi Ibsaa Daandii Ismaartii keenya bu\'uura ibsaa magaalaa teeknooloojii LED sammuu qabu fi humna qusatu fayyadamuun warraaqsa fida. Sirnichi haala naannoo, akkaataa tiraafikaa fi yeroo guyyaa irratti hundaa\'uudhee iftoominaa ofumaan sirreessa.',
        features: [
          'To\'annoo iftoominaa madaqsuu danda\'u',
          'Sensaroota adda baasuu sochii',
          'Waltajjii bulchiinsa fagoo',
          'Xiinxala fayyadama humna',
          'Adda baasuu dogoggoraa fi akeekkachiisa'
        ],
        applications: ['Daandiiwwan Magaalaa', 'Bakka Dhaabbii Konkolaataa', 'Paarkota', 'Ibsaa Kaampasii'],
        tags: ['Magaalaa Ismaartii', 'LED', 'Gahumsa Humna', 'IoT']
      }
    },
    specifications: {
      'LED Power': '50W - 150W per fixture',
      'Luminous Efficacy': '140 lm/W',
      'Control': 'Wireless mesh network',
      'Sensors': 'Motion, ambient light, temperature',
      'Lifespan': '50,000+ hours',
      'IP Rating': 'IP66'
    }
  }
];

const seedManufacturingProducts = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Check if products already exist
    const existingCount = await ManufacturingProduct.countDocuments();
    console.log(`📊 Current product count: ${existingCount}\n`);

    if (existingCount > 0) {
      console.log('⚠️  Products already exist. Do you want to:');
      console.log('   1. Skip seeding (default)');
      console.log('   2. Add sample products anyway');
      console.log('   3. Clear all and reseed');
      console.log('\n   To clear and reseed, run: node seedManufacturingProducts.js --force\n');
      
      if (!process.argv.includes('--force')) {
        console.log('✅ Skipping seed. Products already exist.');
        return;
      }

      console.log('🗑️  Clearing existing products...');
      await ManufacturingProduct.deleteMany({});
      console.log('✅ Cleared all products\n');
    }

    console.log('🌱 Seeding manufacturing products...\n');

    for (const productData of sampleProducts) {
      const product = new ManufacturingProduct(productData);
      await product.save();
      console.log(`   ✅ Created: ${product.translations.en.name}`);
    }

    console.log(`\n✅ Successfully seeded ${sampleProducts.length} manufacturing products!`);

    // Display summary
    const total = await ManufacturingProduct.countDocuments();
    const published = await ManufacturingProduct.countDocuments({ isPublished: true });
    const featured = await ManufacturingProduct.countDocuments({ isFeatured: true });

    console.log('\n📊 Summary:');
    console.log(`   Total products: ${total}`);
    console.log(`   Published: ${published}`);
    console.log(`   Featured: ${featured}`);

  } catch (error) {
    console.error('❌ Error seeding products:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Disconnected from MongoDB');
  }
};

seedManufacturingProducts();
