import { useState } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Product {
  id: number;
  niche: string;
  name: string;
  title: string;
  description: string;
  price: number;
  image: string;
  color: string;
  sizes: string[];
  tags: string[];
}

interface Niche {
  id: string;
  name: string;
  description: string;
  count: number;
  color: string;
}

// 45 DESIGNS - ANIME (16) + GAMING (10) + FOOTBALL (10)
const PRODUCTS: Product[] = [
  // ANIME - DRAGON BALL (4)
  {
    id: 1,
    niche: 'anime',
    name: 'GOKU SPIRIT',
    title: 'Goku Spirit - Dragon Ball Legend',
    description: 'Premium streetwear celebrating the legendary Goku spirit. Dynamic action pose with golden aura.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_DRAGONBALL_001-Q5fK7TCViFhWDMBsbmA2Zv.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'dragonball', 'goku']
  },
  {
    id: 2,
    niche: 'anime',
    name: 'SUPER SAIYAN VIBES',
    title: 'Super Saiyan Vibes - Transformation',
    description: 'Transformation design with electric effects and Super Saiyan energy.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_DRAGONBALL_002-Q5fK7TCViFhWDMBsbmA2Zv.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'dragonball', 'saiyan']
  },
  {
    id: 3,
    niche: 'anime',
    name: 'DRAGON BALL LEGACY',
    title: 'Dragon Ball Legacy - Iconic Design',
    description: 'Iconic dragon ball with retro anime style. Celebrate the legacy of anime.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_DRAGONBALL_003-Q5fK7TCViFhWDMBsbmA2Zv.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'dragonball', 'legacy']
  },
  {
    id: 4,
    niche: 'anime',
    name: 'KAMEHAMEHA',
    title: 'Kamehameha - Energy Blast',
    description: 'Energy blast design with bold typography. The most iconic attack.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_DRAGONBALL_005-Q5fK7TCViFhWDMBsbmA2Zv.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'dragonball', 'attack']
  },
  // ANIME - DEMON SLAYER (4)
  {
    id: 5,
    niche: 'anime',
    name: 'TANJIRO WARRIOR',
    title: 'Tanjiro Warrior - Demon Slayer',
    description: 'Tanjiro in combat stance with demon slayer sword. Dark anime aesthetic.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_DEMONSLAYER_001-2NjDU4HgBrCZTQJtgCYFMS.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'demonslayer', 'tanjiro']
  },
  {
    id: 6,
    niche: 'anime',
    name: 'DEMON SLAYER CORPS',
    title: 'Demon Slayer Corps - Organization',
    description: 'Iconic demon slayer logo with Japanese elements.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_DEMONSLAYER_002-djtucdghUwrsRNoMhPiNP2.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'demonslayer', 'corps']
  },
  {
    id: 7,
    niche: 'anime',
    name: 'BREATHING TECHNIQUE',
    title: 'Breathing Technique - Water Breathing',
    description: 'Artistic representation of water breathing with fluid design.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_DEMONSLAYER_003-CTQAm6z4k4SJRZcvbzaSU4.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'demonslayer', 'breathing']
  },
  {
    id: 8,
    niche: 'anime',
    name: 'HASHIRA POWER',
    title: 'Hashira Power - Elite Warriors',
    description: 'Demon slayer hashira character design with warrior aesthetic.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_DEMONSLAYER_004-j2AmozP8E5mGAdVwAKVexc.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'demonslayer', 'hashira']
  },
  // ANIME - NARUTO (4)
  {
    id: 9,
    niche: 'anime',
    name: 'NARUTO NINJA',
    title: 'Naruto Ninja - Shinobi Spirit',
    description: 'Naruto in ninja pose with kunai. Dynamic action design.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_NARUTO_001-gJb3DdVTB67Q3CfqMcy6rC.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'naruto', 'ninja']
  },
  {
    id: 10,
    niche: 'anime',
    name: 'SHARINGAN POWER',
    title: 'Sharingan Power - Eye of the Uchiha',
    description: 'Iconic Sharingan eye design with red and black colors.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_NARUTO_002-5Hk8LJC2AF4poTtLoAUCxx.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'naruto', 'sharingan']
  },
  {
    id: 11,
    niche: 'anime',
    name: 'HIDDEN LEAF VILLAGE',
    title: 'Hidden Leaf Village - Konoha Pride',
    description: 'Naruto village symbol with ninja culture.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_NARUTO_003-bXUA7TPBWxr9CHDdQ77qMe.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'naruto', 'village']
  },
  {
    id: 12,
    niche: 'anime',
    name: 'CHAKRA ENERGY',
    title: 'Chakra Energy - Spiritual Power',
    description: 'Chakra visualization design with spiritual elements.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_NARUTO_004-hiGUw3iCdfteJ9etEaFJRW.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'naruto', 'chakra']
  },
  // ANIME - MODERN MIX (4)
  {
    id: 13,
    niche: 'anime',
    name: 'JUJUTSU KAISEN',
    title: 'Jujutsu Kaisen - Cursed Energy',
    description: 'Yuji Itadori with cursed energy design.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_MODERN_001-6xZM5hyrpBxGvm3nLHrxqB.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'jujutsu', 'kaisen']
  },
  {
    id: 14,
    niche: 'anime',
    name: 'MY HERO ACADEMIA',
    title: 'My Hero Academia - Hero Culture',
    description: 'All Might iconic pose with hero culture.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_MODERN_002-dMSRCavgyPxTFEARCfVUMt.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'mha', 'hero']
  },
  {
    id: 15,
    niche: 'anime',
    name: 'ONE PIECE ADVENTURE',
    title: 'One Piece Adventure - Pirate King',
    description: 'Luffy pirate design with adventure aesthetic.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_MODERN_003-R2cX5CfvwYqU6nhW8xpWsC.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'onepiece', 'adventure']
  },
  {
    id: 16,
    niche: 'anime',
    name: 'ATTACK ON TITAN',
    title: 'Attack on Titan - Titan Slayer',
    description: 'Titan slayer design with action-packed imagery.',
    price: 22.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/ANIME_MODERN_004-RM8TkjnAfYJEEG7oWTRFf3.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['anime', 'aot', 'titan']
  },
  // GAMING - LIFESTYLE (5)
  {
    id: 17,
    niche: 'gaming',
    name: 'PRO GAMER',
    title: 'Pro Gamer - Esports Legacy',
    description: 'Esports player in action with gaming setup. Neon colors.',
    price: 21.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/GAMING_ESPORTS_001-U3Wb8koKyFBMefPeMCW4x3.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['gaming', 'esports', 'pro']
  },
  {
    id: 18,
    niche: 'gaming',
    name: 'LEVEL UP',
    title: 'Level Up - Progression',
    description: 'Retro gaming design with pixel art and modern streetwear.',
    price: 21.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/GAMING_ESPORTS_002-YqbYVmNQeapoGMWHJ4gmKT.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['gaming', 'retro', 'levelup']
  },
  {
    id: 19,
    niche: 'gaming',
    name: 'CLUTCH PLAY',
    title: 'Clutch Play - Competitive Moment',
    description: 'Esports competitive gaming moment design.',
    price: 21.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/GAMING_ESPORTS_003-4TiTHdk2DpXPnaYTSFxdqK.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['gaming', 'clutch', 'competitive']
  },
  {
    id: 20,
    niche: 'gaming',
    name: 'GAMER MINDSET',
    title: 'Gamer Mindset - Mental Game',
    description: 'Motivational gaming design with controller elements.',
    price: 21.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/GAMING_ESPORTS_004-dpttjtdseoUgVAtGwNeRLD.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['gaming', 'mindset', 'motivation']
  },
  {
    id: 21,
    niche: 'gaming',
    name: 'RESPAWN',
    title: 'Respawn - Second Chance',
    description: 'Gaming culture design with phoenix/respawn theme.',
    price: 21.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/GAMING_ESPORTS_005-UD4Koca9eqvyGJ8nNJES6R.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['gaming', 'respawn', 'phoenix']
  },
  // GAMING - TITLES (5)
  {
    id: 22,
    niche: 'gaming',
    name: 'CALL OF DUTY',
    title: 'Call of Duty - Tactical Ops',
    description: 'Soldier in action with tactical gear.',
    price: 21.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/GAMING_TITLES_001-CgnjfGxecQVKRvZ9HFCjsB.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['gaming', 'cod', 'fps']
  },
  {
    id: 23,
    niche: 'gaming',
    name: 'VALORANT AGENT',
    title: 'Valorant Agent - Tactical Shooter',
    description: 'Valorant character with tactical design.',
    price: 21.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/GAMING_TITLES_002-6FZaWvFurNazPe4ZxQLBce.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['gaming', 'valorant', 'tactical']
  },
  {
    id: 24,
    niche: 'gaming',
    name: 'FORTNITE BATTLE',
    title: 'Fortnite Battle - Battle Royale',
    description: 'Battle royale gaming design with action elements.',
    price: 21.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/GAMING_TITLES_003-EiSkTSUwrKR3FSEC6yNaL5.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['gaming', 'fortnite', 'br']
  },
  {
    id: 25,
    niche: 'gaming',
    name: 'PUBG SURVIVOR',
    title: 'PUBG Survivor - Survival Game',
    description: 'Survival game design with parachute elements.',
    price: 21.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/GAMING_TITLES_004-SHzQ4NshHwEJxQ4jYMJXUq.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['gaming', 'pubg', 'survival']
  },
  {
    id: 26,
    niche: 'gaming',
    name: 'MINECRAFT BUILDER',
    title: 'Minecraft Builder - Creative Mode',
    description: 'Blocky pixel art design with creative gaming culture.',
    price: 21.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/GAMING_TITLES_005-gDUjUuTyfmcN3CK3Vtcaif.png',
    color: 'Black',
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    tags: ['gaming', 'minecraft', 'builder']
  },
  // FOOTBALL (10)
  {
    id: 27,
    niche: 'football',
    name: 'CR7 FOREVER',
    title: 'CR7 Forever - Cristiano Ronaldo Tribute',
    description: 'Premium football streetwear celebrating the GOAT. Features iconic CR7 imagery.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_001_CR7_LEGEND-G9WTgaEk8vEFCgcT75ysnQ.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'cr7', 'ronaldo']
  },
  {
    id: 28,
    niche: 'football',
    name: 'MESSI MAGIC',
    title: 'Messi Magic - Lionel Messi Tribute',
    description: 'Celebrate football excellence with Messi\'s dribbling artistry.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_002_MESSI_MAGIC-n7uUhYPpQiGEuwtywW2MpD.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'messi', 'soccer']
  },
  {
    id: 29,
    niche: 'football',
    name: 'SAUDI PRO LEAGUE',
    title: 'Saudi Pro League - Local Pride',
    description: 'Show your pride for Saudi Pro League football.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_003_SAUDI_PRO_LEAGUE-j9VZkT3PwCRxKQ9Nc9A3NV.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'saudi', 'league']
  },
  {
    id: 30,
    niche: 'football',
    name: 'GOAT CULTURE',
    title: 'GOAT Culture - Greatest of All Time',
    description: 'Celebrate football excellence with this GOAT culture design.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_004_GOAT_CULTURE-gzAf2s2VbQNGCVmxRqF8Gr.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'goat', 'culture']
  },
  {
    id: 31,
    niche: 'football',
    name: 'PASSION GAME',
    title: 'Passion Game - Football Love',
    description: 'For those who live and breathe football.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_005_PASSION_GAME-az2NnpaVWWp2p2TVF4TgcK.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'passion', 'game']
  },
  {
    id: 32,
    niche: 'football',
    name: 'NEYMAR MAGIC',
    title: 'Neymar Magic - Flair & Skill',
    description: 'Neymar-inspired design with dribbling artistry and flair.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_006_NEYMAR_MAGIC-JDHqANJwgzcyAWdSwyo8Vr.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'neymar', 'magic']
  },
  {
    id: 33,
    niche: 'football',
    name: 'HAALAND STRIKER',
    title: 'Haaland Striker - Goal Machine',
    description: 'Erling Haaland goal celebration design with power.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_007_HAALAND_STRIKER-KdRUVmd6KMABU4txv6ktde.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'haaland', 'striker']
  },
  {
    id: 34,
    niche: 'football',
    name: 'BENZEMA LEGEND',
    title: 'Benzema Legend - Football Artistry',
    description: 'Karim Benzema elegance and football artistry.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_008_BENZEMA_LEGEND-85kqBCjAWLsWAnLYcZgova.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'benzema', 'legend']
  },
  {
    id: 35,
    niche: 'football',
    name: 'FOOTBALL UNITED',
    title: 'Football United - Diversity & Teamwork',
    description: 'Diverse players united in football passion.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_009_FOOTBALL_UNITED-PoFAYu49xXTVfkCrLNMxPQ.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'unity', 'teamwork']
  },
  {
    id: 36,
    niche: 'football',
    name: 'CHAMPIONS MINDSET',
    title: 'Champions Mindset - Trophy Culture',
    description: 'Trophy and winner imagery celebrating championship culture.',
    price: 24.99,
    image: 'https://d2xsxph8kpxj0f.cloudfront.net/310419663032253817/W9dXJiEivXdpfNxcR8cgna/FOOTBALL_BATCH1_010_CHAMPIONS_MINDSET-5G2W2wLWitWjL9q247suHt.png',
    color: 'Black',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    tags: ['football', 'champions', 'mindset']
  }
];

const NICHES: Niche[] = [
  {
    id: 'anime',
    name: 'Anime 🎌',
    description: 'Anime and manga inspired designs',
    count: 16,
    color: '#a855f7'
  },
  {
    id: 'gaming',
    name: 'Gaming 🎮',
    description: 'Gaming culture and esports passion',
    count: 10,
    color: '#06b6d4'
  },
  {
    id: 'football',
    name: 'Football ⚽',
    description: 'Premium football streetwear',
    count: 10,
    color: '#ef4444'
  },
  {
    id: 'kpop',
    name: 'K-Pop 🎤',
    description: 'K-pop and K-drama fandom culture',
    count: 0,
    color: '#ec4899'
  },
  {
    id: 'fitness',
    name: 'Fitness 💪',
    description: 'Gym culture and fitness motivation',
    count: 0,
    color: '#fbbf24'
  },
  {
    id: 'women',
    name: 'Women 👩',
    description: 'Empowerment, fashion, and lifestyle',
    count: 0,
    color: '#f97316'
  },
  {
    id: 'kids',
    name: 'Kids 👶',
    description: 'Fun, colorful designs for ages 2-5',
    count: 0,
    color: '#10b981'
  },
  {
    id: 'indian-youth',
    name: 'Indian Youth 🇮🇳',
    description: 'Bollywood, festivals, desi culture',
    count: 0,
    color: '#f59e0b'
  },
  {
    id: 'mythical',
    name: 'Mythical 🔮',
    description: 'Mystical creatures, occult symbols',
    count: 0,
    color: '#8b5cf6'
  }
];

export default function Shop() {
  const [selectedNiche, setSelectedNiche] = useState<string | null>('anime');

  const filteredProducts = selectedNiche
    ? PRODUCTS.filter((p) => p.niche === selectedNiche)
    : PRODUCTS;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-50">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-white hover:text-red-500 transition-colors">
              KuchiTee
            </a>
          </Link>
          <nav className="flex gap-6">
            <Link href="/">
              <a className="text-foreground hover:text-red-500 transition-colors">Home</a>
            </Link>
            <Link href="/shop">
              <a className="text-red-500 font-semibold">Shop</a>
            </Link>
            <Link href="/about">
              <a className="text-foreground hover:text-red-500 transition-colors">About</a>
            </Link>
          </nav>
        </div>
      </header>

      {/* Shop Content */}
      <main className="container py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Premium Streetwear
          </h1>
          <p className="text-foreground/70 text-lg">
            {PRODUCTS.length} unique designs across {NICHES.filter(n => n.count > 0).length} niches. More coming soon!
          </p>
        </div>

        {/* Niche Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2 pb-4">
            {NICHES.map((niche) => {
              const nicheCount = PRODUCTS.filter(p => p.niche === niche.id).length;
              return (
                <Button
                  key={niche.id}
                  variant={selectedNiche === niche.id ? 'default' : 'outline'}
                  onClick={() => setSelectedNiche(niche.id)}
                  className="rounded-full text-sm"
                  disabled={nicheCount === 0}
                >
                  {niche.name} {nicheCount > 0 && `(${nicheCount})`}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="group overflow-hidden bg-card hover:shadow-lg transition-all duration-300 border-border hover:border-red-500/50"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-black h-64">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold text-white text-sm mb-1">{product.name}</h3>
                      <p className="text-xs text-foreground/60">{product.title}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-foreground/70 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-red-500">
                      ${product.price.toFixed(2)}
                    </span>
                    <Button
                      size="sm"
                      variant="default"
                      className="bg-red-500 hover:bg-red-600"
                    >
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground/70 text-lg">
              More designs coming soon for this niche!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
