-- Replace all dummy itineraries with 2 realistic multi-day Uganda safari itineraries
-- Clear existing data
DELETE FROM public.itineraries;

-- Seed realistic multi-day itineraries for Uganda
INSERT INTO public.itineraries (title, country, duration, image_url, summary, days) VALUES
(
  'Bwindi Gorilla Trekking & Queen Elizabeth Wildlife Safari',
  'Uganda',
  '5 days / 4 nights',
  '/bwindi-gorilla-trekking.jpg',
  'Experience the ultimate Uganda safari combining mountain gorilla trekking in Bwindi Impenetrable Forest with classic wildlife viewing in Queen Elizabeth National Park. This adventure offers encounters with endangered gorillas, tree-climbing lions, elephants, and boat safaris on the Kazinga Channel.',
  '[
    {
      "day_number": 1,
      "title": "Arrival in Entebbe & Transfer to Bwindi",
      "description": "Upon arrival at Entebbe International Airport, you will be warmly welcomed by your safari guide. After a brief orientation, begin your scenic 8-9 hour journey southwest to Bwindi Impenetrable National Park. The drive takes you through the beautiful Ugandan countryside, passing through towns like Masaka and Mbarara. Stop at the Equator monument for photos and demonstrations. Enjoy lunch in Mbarara town before continuing through the rolling hills of Kigezi region, known as the ''Switzerland of Africa''. Arrive at your lodge in the evening for dinner and overnight stay.",
      "accommodation": "Buhoma Lodge - Full board",
      "extra": "Travel time: 8-9 hours. Early morning flight arrival recommended."
    },
    {
      "day_number": 2,
      "title": "Gorilla Trekking in Bwindi Impenetrable Forest",
      "description": "After an early breakfast, head to the park headquarters for a briefing by Uganda Wildlife Authority rangers. You will be assigned to a gorilla family group and begin your trek through the dense forest. The trek can take 2-6 hours depending on the location of the gorillas. Once you locate them, spend a magical hour observing these gentle giants as they feed, play, and interact. Watch the silverback protect his family, mothers nurture their babies, and juveniles swing from vines. After this unforgettable encounter, trek back to the starting point and return to your lodge. In the evening, you may visit the local Batwa community to learn about their traditional forest lifestyle.",
      "accommodation": "Buhoma Lodge - Full board",
      "extra": "Gorilla permit included. Moderate to difficult trek. Bring rain jacket and sturdy hiking boots."
    },
    {
      "day_number": 3,
      "title": "Transfer to Queen Elizabeth National Park",
      "description": "After breakfast, depart Bwindi and drive north to Queen Elizabeth National Park (approximately 4 hours). The journey takes you through the scenic Ishasha sector, famous for its tree-climbing lions. Stop for a game drive in Ishasha to search for these unique lions resting in fig trees. Continue to the main park area, arriving in time for lunch at your lodge. In the afternoon, enjoy your first game drive in the Kasenyi plains, known for large herds of Uganda kob, buffalo, elephants, and predators including lions and leopards. Return to the lodge for dinner as the sun sets over the savanna.",
      "accommodation": "Mweya Safari Lodge - Full board",
      "extra": "Travel time: 4 hours. Excellent photographic opportunities in Ishasha."
    },
    {
      "day_number": 4,
      "title": "Game Drive & Kazinga Channel Boat Safari",
      "description": "Start your day with an early morning game drive in the Kasenyi sector when animals are most active. Look for lions, leopards, hyenas, elephants, buffalo, and various antelope species. Return to the lodge for breakfast and relaxation. After lunch, embark on a 2-hour boat cruise along the Kazinga Channel, a natural waterway connecting Lake Edward and Lake George. This boat safari offers excellent wildlife viewing including hippos, crocodiles, elephants, buffalo coming to drink, and over 60 bird species including African fish eagles, pelicans, and kingfishers. The channel has one of the highest concentrations of hippos in Africa. Return to the lodge for dinner and overnight.",
      "accommodation": "Mweya Safari Lodge - Full board",
      "extra": "Bring binoculars for bird watching. Sunset boat cruise available on request."
    },
    {
      "day_number": 5,
      "title": "Morning Game Drive & Return to Entebbe",
      "description": "Enjoy a final early morning game drive to catch any wildlife you may have missed. After breakfast, begin your journey back to Entebbe (approximately 6-7 hours). Stop for lunch en route in Mbarara or Masaka. Arrive in Entebbe in the late afternoon with time for last-minute souvenir shopping at local craft markets if your flight schedule allows. Transfer to Entebbe International Airport for your departure flight, taking with you incredible memories of Uganda''s wildlife and landscapes.",
      "accommodation": "No accommodation (departure day)",
      "extra": "Travel time: 6-7 hours. Evening flight departure recommended."
    }
  ]'::jsonb
),
(
  'Ultimate Uganda Primate & Wildlife Adventure',
  'Uganda',
  '7 days / 6 nights',
  '/kibale-chimpanzee-safari.jpg',
  'Discover Uganda''s incredible primate diversity on this comprehensive safari. Track chimpanzees in Kibale Forest, trek to see mountain gorillas in Bwindi, and enjoy classic savanna wildlife in Queen Elizabeth National Park. This journey showcases the best of Uganda''s biodiversity from rainforests to savannas.',
  '[
    {
      "day_number": 1,
      "title": "Arrival & Transfer to Kibale Forest National Park",
      "description": "Meet your guide at Entebbe International Airport and begin your journey to Kibale Forest National Park (approximately 5-6 hours). Drive through Fort Portal, the tourism capital of Uganda, with stunning views of the Rwenzori Mountains. Stop for lunch in Fort Portal town and visit the local markets if time permits. Continue to Kibale, arriving at your lodge in the late afternoon. Kibale Forest is home to 13 primate species and is considered the primate capital of the world. Settle into your lodge and enjoy dinner while listening to the sounds of the forest.",
      "accommodation": "Primate Lodge Kibale - Full board",
      "extra": "Travel time: 5-6 hours. Scenic drive through tea plantations."
    },
    {
      "day_number": 2,
      "title": "Chimpanzee Trekking & Bigodi Wetland Walk",
      "description": "After an early breakfast, head to Kanyanchu Visitor Center for a briefing before your chimpanzee trek. Enter the forest with experienced guides to track our closest relatives. Kibale has over 1,500 chimpanzees, and sightings are highly likely. Spend an hour observing these intelligent primates as they feed, groom, and play in the canopy. You may also see other primates including red colobus monkeys, L''Hoest''s monkeys, and grey-cheeked mangabeys. Return to the lodge for lunch. In the afternoon, visit Bigodi Wetland Sanctuary for a guided nature walk. This community-run project offers excellent bird watching with over 200 species including the Great Blue Turaco. Look for primates, butterflies, and unique wetland plants.",
      "accommodation": "Primate Lodge Kibale - Full board",
      "extra": "Chimpanzee permit included. Moderate trek. Rubber boots recommended for wetland walk."
    },
    {
      "day_number": 3,
      "title": "Transfer to Queen Elizabeth National Park",
      "description": "After breakfast, drive south to Queen Elizabeth National Park (approximately 3 hours). The route offers beautiful views of the Rwenzori Mountains and crater lakes. Arrive at your lodge in time for lunch. In the afternoon, enjoy a game drive through the park''s diverse ecosystems including savanna, wetlands, and forests. Queen Elizabeth is Uganda''s most visited national park and home to over 95 mammal species and 600 bird species. Look for elephants, buffalo, Uganda kob, waterbuck, and if lucky, lions and leopards. Return to the lodge for dinner overlooking the park.",
      "accommodation": "Mweya Safari Lodge - Full board",
      "extra": "Travel time: 3 hours. Excellent wildlife viewing opportunities year-round."
    },
    {
      "day_number": 4,
      "title": "Kazinga Channel Boat Safari & Evening Game Drive",
      "description": "Start with a leisurely breakfast before embarking on a morning boat cruise along the Kazinga Channel. This 32-kilometer natural channel connects Lake Edward and Lake George and is famous for having the world''s largest concentration of hippos. Watch these massive animals in the water alongside Nile crocodiles basking on the banks. Elephants, buffalo, and various antelope species come to the water''s edge to drink. The channel is a bird watcher''s paradise with African fish eagles, pelicans, cormorants, and colorful kingfishers. Return to the lodge for lunch and relaxation. In the late afternoon, head out for an evening game drive in the Kasenyi plains, prime territory for lion prides. As the sun sets, watch the savanna come alive with nocturnal animals beginning their activities.",
      "accommodation": "Mweya Safari Lodge - Full board",
      "extra": "Bring camera with zoom lens. Sunset photography opportunities."
    },
    {
      "day_number": 5,
      "title": "Ishasha Sector & Transfer to Bwindi",
      "description": "After breakfast, drive through the southern Ishasha sector of Queen Elizabeth National Park, famous for its tree-climbing lions. These unique lions have adapted to climbing fig trees, possibly to escape the heat and tsetse flies. Spend time searching for them lounging in the branches. The sector also has good populations of elephants, buffalo, and topi antelope. Continue your journey to Bwindi Impenetrable National Park (approximately 4 hours), passing through scenic landscapes and local villages. Arrive at your lodge in the afternoon with time to relax and prepare for tomorrow''s gorilla trek. Attend an evening briefing about gorilla trekking protocols and what to expect.",
      "accommodation": "Buhoma Lodge - Full board",
      "extra": "Travel time: 4 hours total. Pack for gorilla trek tonight."
    },
    {
      "day_number": 6,
      "title": "Mountain Gorilla Trekking Experience",
      "description": "Today is the highlight of your safari - mountain gorilla trekking. After an early breakfast, proceed to the park headquarters for registration and briefing by Uganda Wildlife Authority rangers. Learn about gorilla behavior, trekking protocols, and conservation efforts. You will be assigned to one of the habituated gorilla families and begin your trek into the impenetrable forest. The trek can take anywhere from 2 to 6 hours depending on where the gorillas spent the previous night. Your guides will track them using knowledge of their habits and recent locations. Once located, spend an unforgettable hour in the presence of these magnificent creatures. Watch the silverback lead his family, mothers care for infants, and juveniles play. This intimate encounter is truly a once-in-a-lifetime experience. After trekking back, return to your lodge. In the evening, you may visit a local community project or simply relax and reflect on your incredible experience.",
      "accommodation": "Buhoma Lodge - Full board",
      "extra": "Gorilla permit included. Porters available for hire. Bring rain gear and energy snacks."
    },
    {
      "day_number": 7,
      "title": "Return to Entebbe via Lake Mburo National Park",
      "description": "After breakfast, begin your journey back to Entebbe (approximately 8 hours). Break up the long drive with a stop at Lake Mburo National Park for a short game drive. This small but scenic park is home to zebras, impalas, elands, and other animals not found in other Ugandan parks. If time allows, take a brief nature walk or visit the lake shore. Continue to Entebbe, stopping for lunch in Masaka or Mbarara. Arrive in Entebbe in the late afternoon. Depending on your flight time, you may have time for last-minute shopping at local craft markets or a brief visit to the Entebbe Botanical Gardens. Transfer to Entebbe International Airport for your departure flight.",
      "accommodation": "No accommodation (departure day)",
      "extra": "Travel time: 8 hours with stops. Evening or night flight recommended."
    }
  ]'::jsonb
);
