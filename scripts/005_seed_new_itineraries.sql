-- Clear any existing data
TRUNCATE TABLE public.itineraries;

-- Seed realistic multi-day itineraries for Uganda

-- 1. 5-Day Gorilla and Wildlife Safari
INSERT INTO public.itineraries (title, country, duration, image_url, summary, days) VALUES (
  '5-Day Gorilla and Wildlife Safari',
  'Uganda',
  '5 days / 4 nights',
  '/bwindi-gorilla-trekking.jpg',
  'Experience the ultimate Uganda safari combining mountain gorilla trekking in Bwindi Impenetrable Forest with wildlife viewing in Queen Elizabeth National Park. This adventure offers encounters with endangered gorillas, tree-climbing lions, elephants, and boat safaris on the Kazinga Channel.',
  '[
    {
      "day_number": 1,
      "title": "Arrival in Entebbe and Transfer to Bwindi",
      "description": "Upon arrival at Entebbe International Airport, you will be met by your safari guide and begin the scenic 8-9 hour drive to Bwindi Impenetrable National Park. The journey takes you through the beautiful Ugandan countryside, passing through towns like Masaka and Mbarara. You will stop at the Equator for photos and lunch in Mbarara town. The drive offers stunning views of the terraced hills of Kigezi region as you approach Bwindi.",
      "accommodation": "Buhoma Lodge or similar mid-range lodge near the park",
      "extra": "Early morning flight arrivals are recommended. The drive is long but scenic with good road conditions."
    },
    {
      "day_number": 2,
      "title": "Gorilla Trekking in Bwindi Impenetrable Forest",
      "description": "After an early breakfast and briefing at the park headquarters, you will begin your gorilla trekking adventure. The trek can take 2-8 hours depending on the location of the gorilla family. Once located, you will spend one magical hour observing these gentle giants in their natural habitat - watching them feed, play, and interact. The experience is truly unforgettable as you observe their human-like behaviors and expressions. After the trek, return to the lodge to relax and share stories of your encounter.",
      "accommodation": "Buhoma Lodge or similar mid-range lodge",
      "extra": "Gorilla permits are included. Wear long pants, long-sleeved shirts, and sturdy hiking boots. Bring rain gear as weather is unpredictable. A reasonable level of fitness is required."
    },
    {
      "day_number": 3,
      "title": "Transfer to Queen Elizabeth National Park",
      "description": "After breakfast, depart Bwindi and drive north to Queen Elizabeth National Park (approximately 4-5 hours). The journey takes you through the Ishasha sector of the park, famous for its tree-climbing lions. You will have the opportunity to spot these unique lions resting in fig trees during a game drive through Ishasha. Continue to your lodge in the northern sector of the park, arriving in time for lunch and relaxation. In the late afternoon, enjoy a game drive in the Kasenyi plains, known for large herds of Uganda kob, elephants, and buffalo.",
      "accommodation": "Enganzi Game Lodge or similar mid-range lodge",
      "extra": "Keep cameras ready in Ishasha - tree-climbing lions are a rare sight! The afternoon game drive offers excellent wildlife viewing opportunities."
    },
    {
      "day_number": 4,
      "title": "Morning Game Drive and Kazinga Channel Boat Safari",
      "description": "Start the day with an early morning game drive in the Kasenyi plains and along the Mweya Peninsula. This is the best time to spot predators like lions and leopards, as well as large herds of elephants and buffalo. Return to the lodge for lunch and a brief rest. In the afternoon, enjoy a 2-hour boat cruise on the Kazinga Channel, which connects Lake Edward and Lake George. The channel has one of the highest concentrations of hippos in Africa, along with numerous crocodiles, elephants, and buffalo coming to drink. The boat cruise also offers excellent bird watching with over 60 species recorded.",
      "accommodation": "Enganzi Game Lodge or similar mid-range lodge",
      "extra": "Bring binoculars for the boat cruise. The channel cruise is a highlight with guaranteed wildlife sightings and excellent photo opportunities."
    },
    {
      "day_number": 5,
      "title": "Return to Entebbe",
      "description": "After breakfast, begin the journey back to Entebbe (approximately 6-7 hours). The drive takes you through Fort Portal and along the scenic escarpment with views of the Rwenzori Mountains (weather permitting). Stop for lunch en route in Fort Portal town. Continue to Entebbe, arriving in the late afternoon or evening for your departure flight or overnight stay.",
      "accommodation": "No accommodation (end of safari) or optional Entebbe hotel if needed",
      "extra": "Evening flights from Entebbe are recommended. If you have an early flight, an overnight in Entebbe on Day 4 can be arranged."
    }
  ]'::jsonb
);

-- 2. 7-Day Ultimate Primate and Wildlife Adventure
INSERT INTO public.itineraries (title, country, duration, image_url, summary, days) VALUES (
  '7-Day Ultimate Primate and Wildlife Adventure',
  'Uganda',
  '7 days / 6 nights',
  '/kibale-chimpanzee-safari.jpg',
  'The ultimate Uganda primate safari combining gorilla trekking, chimpanzee tracking, and classic wildlife viewing. This comprehensive adventure takes you to three of Uganda''s premier national parks: Kibale Forest for chimpanzees, Queen Elizabeth for wildlife, and Bwindi for mountain gorillas. Perfect for wildlife enthusiasts seeking the complete Uganda experience.',
  '[
    {
      "day_number": 1,
      "title": "Arrival and Transfer to Kibale Forest National Park",
      "description": "Meet your guide at Entebbe International Airport and begin the scenic 5-6 hour drive to Kibale Forest National Park, the primate capital of the world. The journey takes you through Kampala and westward through traditional villages, tea plantations, and the beautiful countryside. Stop at the Equator for photos and demonstrations. Arrive at your lodge in the afternoon with time to relax and enjoy the forest surroundings. Optional evening visit to Bigodi Wetland Sanctuary for bird watching and primate spotting.",
      "accommodation": "Kibale Forest Camp or similar mid-range lodge",
      "extra": "The drive offers beautiful scenery. Bigodi Wetland visit is optional but highly recommended for bird enthusiasts."
    },
    {
      "day_number": 2,
      "title": "Chimpanzee Tracking in Kibale Forest",
      "description": "After an early breakfast, head to the park headquarters for briefing before starting your chimpanzee tracking adventure. Kibale Forest is home to over 1,500 chimpanzees and 12 other primate species. The trek through the tropical rainforest takes 2-5 hours, and once you locate the chimps, you will spend one hour observing them as they feed, play, groom, and go about their daily activities. The forest is also home to red colobus monkeys, L''Hoest''s monkeys, and grey-cheeked mangabeys. After lunch, take a guided nature walk through Bigodi Wetland Sanctuary, home to over 200 bird species and several primate species including black-and-white colobus monkeys.",
      "accommodation": "Kibale Forest Camp or similar mid-range lodge",
      "extra": "Chimpanzee tracking success rate is over 90%. Wear long pants and sturdy shoes. The wetland walk is excellent for birding."
    },
    {
      "day_number": 3,
      "title": "Transfer to Queen Elizabeth National Park",
      "description": "After breakfast, drive south to Queen Elizabeth National Park (approximately 3 hours). The journey offers stunning views of the Rwenzori Mountains (weather permitting) and passes through traditional homesteads and crater lakes. Arrive at your lodge in time for lunch. In the afternoon, enjoy a game drive in the Kasenyi plains, known for large herds of Uganda kob, elephants, buffalo, and predators including lions and leopards. The park is home to over 95 mammal species and 600 bird species.",
      "accommodation": "Enganzi Game Lodge or similar mid-range lodge",
      "extra": "The afternoon game drive offers excellent wildlife viewing. Keep cameras ready for elephant herds and predators."
    },
    {
      "day_number": 4,
      "title": "Morning Game Drive and Kazinga Channel Boat Safari",
      "description": "Begin with an early morning game drive to catch predators during their most active time. Drive through the Kasenyi plains and along the Mweya Peninsula, searching for lions, leopards, hyenas, elephants, and buffalo. Return to the lodge for breakfast and relaxation. After lunch, embark on a 2-hour boat cruise along the Kazinga Channel. This 32km natural channel connects Lake Edward and Lake George and has one of the highest concentrations of hippos in the world. Watch hippos, crocodiles, elephants, buffalo, and water birds along the shores. The boat cruise offers unparalleled photo opportunities and guaranteed wildlife sightings.",
      "accommodation": "Enganzi Game Lodge or similar mid-range lodge",
      "extra": "The boat cruise is a safari highlight. Bring sun protection and binoculars. Over 60 bird species can be spotted from the boat."
    },
    {
      "day_number": 5,
      "title": "Ishasha Sector and Transfer to Bwindi",
      "description": "After breakfast, drive through the Ishasha sector of Queen Elizabeth National Park, famous for its tree-climbing lions. These unique lions can often be spotted resting in the branches of fig trees, especially during the hot midday hours. Enjoy a game drive through Ishasha searching for the lions, as well as elephants, buffalo, and topi. Continue south to Bwindi Impenetrable National Park (approximately 4 hours total). The drive takes you through the scenic Kigezi Highlands with terraced hillsides. Arrive at your lodge in the late afternoon with time to prepare for the next day''s gorilla trek.",
      "accommodation": "Buhoma Lodge or similar mid-range lodge near Bwindi",
      "extra": "Tree-climbing lions are best spotted between 11am-2pm. The drive to Bwindi is scenic through the terraced hills."
    },
    {
      "day_number": 6,
      "title": "Mountain Gorilla Trekking in Bwindi",
      "description": "The highlight of your safari! After an early breakfast, proceed to the park headquarters for briefing by ranger guides. You will be assigned to a gorilla family group and begin your trek into the impenetrable forest. The trek can take anywhere from 2-8 hours depending on where the gorillas spent the previous night. Once you locate your assigned gorilla family, you will spend one magical hour in their presence, observing these gentle giants as they feed, play, and interact. Watch the silverback protect his family, mothers nurse their babies, and juveniles play in the trees. This is a truly life-changing experience. After the trek, return to the lodge to relax and reflect on your incredible encounter.",
      "accommodation": "Buhoma Lodge or similar mid-range lodge",
      "extra": "Gorilla permits are included. Wear long pants, long sleeves, and waterproof hiking boots. Bring rain gear. Porters are available to carry your backpack and assist on steep sections."
    },
    {
      "day_number": 7,
      "title": "Return to Entebbe",
      "description": "After breakfast, begin the long but scenic drive back to Entebbe (approximately 8-9 hours). The journey takes you through the beautiful Kigezi Highlands, past Mbarara town, and through the Ugandan countryside. Stop for lunch in Mbarara and at the Equator for last photos and souvenir shopping. Arrive in Entebbe in the late afternoon or evening for your departure flight or overnight stay. End of your unforgettable Uganda primate and wildlife adventure.",
      "accommodation": "No accommodation (end of safari) or optional Entebbe hotel",
      "extra": "Evening flights are recommended. If you have an early morning flight, we recommend an overnight in Entebbe on Day 6. The drive is long but offers beautiful scenery and a chance to reflect on your amazing safari experiences."
    }
  ]'::jsonb
);
