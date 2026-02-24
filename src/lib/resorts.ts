export interface Resort {
  name: string;
  address: string;
}

export const ORLANDO_RESORTS: Resort[] = [
  // ===== Walt Disney World Resorts =====
  // Deluxe
  { name: "Disney's Grand Floridian Resort & Spa", address: "4401 Floridian Way, Lake Buena Vista, FL 32830" },
  { name: "Disney's Contemporary Resort", address: "4600 N World Dr, Lake Buena Vista, FL 32830" },
  { name: "Disney's Polynesian Village Resort", address: "1600 Seven Seas Dr, Lake Buena Vista, FL 32830" },
  { name: "Disney's Animal Kingdom Lodge", address: "2901 Osceola Pkwy, Lake Buena Vista, FL 32830" },
  { name: "Disney's Wilderness Lodge", address: "901 Timberline Dr, Lake Buena Vista, FL 32830" },
  { name: "Disney's Beach Club Resort", address: "1800 Epcot Resorts Blvd, Lake Buena Vista, FL 32830" },
  { name: "Disney's Yacht Club Resort", address: "1700 Epcot Resorts Blvd, Lake Buena Vista, FL 32830" },
  { name: "Disney's BoardWalk Inn", address: "2101 Epcot Resorts Blvd, Lake Buena Vista, FL 32830" },
  { name: "Disney's Riviera Resort", address: "1080 Esplanade Ave, Lake Buena Vista, FL 32830" },
  // Moderate
  { name: "Disney's Caribbean Beach Resort", address: "900 Cayman Way, Lake Buena Vista, FL 32830" },
  { name: "Disney's Coronado Springs Resort", address: "1000 W Buena Vista Dr, Lake Buena Vista, FL 32830" },
  { name: "Disney's Port Orleans Resort - French Quarter", address: "2201 Orleans Dr, Lake Buena Vista, FL 32830" },
  { name: "Disney's Port Orleans Resort - Riverside", address: "1251 Riverside Dr, Lake Buena Vista, FL 32830" },
  { name: "Disney's Fort Wilderness Resort & Campground", address: "4510 N Fort Wilderness Trail, Lake Buena Vista, FL 32830" },
  // Value
  { name: "Disney's Art of Animation Resort", address: "1850 Animation Way, Lake Buena Vista, FL 32830" },
  { name: "Disney's Pop Century Resort", address: "1050 Century Dr, Lake Buena Vista, FL 32830" },
  { name: "Disney's All-Star Movies Resort", address: "1901 W Buena Vista Dr, Lake Buena Vista, FL 32830" },
  { name: "Disney's All-Star Music Resort", address: "1801 W Buena Vista Dr, Lake Buena Vista, FL 32830" },
  { name: "Disney's All-Star Sports Resort", address: "1701 W Buena Vista Dr, Lake Buena Vista, FL 32830" },
  // DVC / Other Disney
  { name: "Disney's Saratoga Springs Resort & Spa", address: "1960 Broadway, Lake Buena Vista, FL 32830" },
  { name: "Disney's Old Key West Resort", address: "1510 N Cove Rd, Lake Buena Vista, FL 32830" },
  { name: "Bay Lake Tower at Disney's Contemporary Resort", address: "4600 N World Dr, Lake Buena Vista, FL 32830" },
  { name: "The Villas at Disney's Grand Floridian Resort", address: "4401 Floridian Way, Lake Buena Vista, FL 32830" },
  // Disney Springs Area
  { name: "Walt Disney World Swan Hotel", address: "1200 Epcot Resorts Blvd, Lake Buena Vista, FL 32830" },
  { name: "Walt Disney World Dolphin Hotel", address: "1500 Epcot Resorts Blvd, Lake Buena Vista, FL 32830" },
  { name: "Walt Disney World Swan Reserve", address: "1100 Epcot Resorts Blvd, Lake Buena Vista, FL 32830" },
  { name: "Hilton Orlando Buena Vista Palace", address: "1900 Hotel Plaza Blvd, Lake Buena Vista, FL 32830" },
  { name: "Wyndham Garden Lake Buena Vista", address: "1850 Hotel Plaza Blvd, Lake Buena Vista, FL 32830" },
  { name: "DoubleTree Suites by Hilton Disney Springs", address: "2305 Hotel Plaza Blvd, Lake Buena Vista, FL 32830" },
  { name: "B Resort & Spa Disney Springs", address: "1905 Hotel Plaza Blvd, Lake Buena Vista, FL 32830" },

  // ===== Universal Orlando Resorts =====
  { name: "Universal's Loews Royal Pacific Resort", address: "6300 Hollywood Way, Orlando, FL 32819" },
  { name: "Universal's Hard Rock Hotel", address: "5800 Universal Blvd, Orlando, FL 32819" },
  { name: "Universal's Loews Portofino Bay Hotel", address: "5601 Universal Blvd, Orlando, FL 32819" },
  { name: "Universal's Cabana Bay Beach Resort", address: "6550 Adventure Way, Orlando, FL 32819" },
  { name: "Universal's Aventura Hotel", address: "6725 Adventure Way, Orlando, FL 32819" },
  { name: "Universal's Endless Summer Resort - Surfside Inn", address: "7000 Universal Blvd, Orlando, FL 32819" },
  { name: "Universal's Endless Summer Resort - Dockside Inn", address: "7125 Universal Blvd, Orlando, FL 32819" },
  { name: "Universal's Loews Sapphire Falls Resort", address: "6601 Adventure Way, Orlando, FL 32819" },
  { name: "Universal Stella Nova Resort", address: "5905 Turkey Lake Rd, Orlando, FL 32819" },
  { name: "Universal Terra Luna Resort", address: "5975 Turkey Lake Rd, Orlando, FL 32819" },
  { name: "Universal Helios Grand Hotel", address: "6400 Universal Blvd, Orlando, FL 32819" },

  // ===== Major Orlando Area Hotels & Resorts =====
  { name: "Gaylord Palms Resort & Convention Center", address: "6000 W Osceola Pkwy, Kissimmee, FL 34746" },
  { name: "JW Marriott Orlando Bonnet Creek", address: "14900 Chelonia Pkwy, Orlando, FL 32821" },
  { name: "Waldorf Astoria Orlando", address: "14200 Bonnet Creek Resort Ln, Orlando, FL 32821" },
  { name: "Hilton Orlando Bonnet Creek", address: "14100 Bonnet Creek Resort Ln, Orlando, FL 32821" },
  { name: "Four Seasons Resort Orlando", address: "10100 Dream Tree Blvd, Lake Buena Vista, FL 32836" },
  { name: "The Ritz-Carlton Orlando, Grande Lakes", address: "4012 Central Florida Pkwy, Orlando, FL 32837" },
  { name: "JW Marriott Orlando, Grande Lakes", address: "4040 Central Florida Pkwy, Orlando, FL 32837" },
  { name: "Signia by Hilton Orlando Bonnet Creek", address: "14100 Bonnet Creek Resort Ln, Orlando, FL 32821" },
  { name: "Hyatt Regency Orlando", address: "9801 International Dr, Orlando, FL 32819" },
  { name: "Hyatt Regency Grand Cypress", address: "1 Grand Cypress Blvd, Orlando, FL 32836" },
  { name: "Marriott's Grande Vista", address: "5925 Avenida Vista, Orlando, FL 32821" },
  { name: "Marriott's Cypress Harbour Villas", address: "11251 Harbour Villa Rd, Orlando, FL 32821" },
  { name: "Margaritaville Resort Orlando", address: "8000 Fins Up Cir, Kissimmee, FL 34747" },
  { name: "Omni Orlando Resort at ChampionsGate", address: "1500 Masters Blvd, ChampionsGate, FL 33896" },
  { name: "Reunion Resort", address: "7593 Gathering Dr, Kissimmee, FL 34747" },
  { name: "Floridays Resort Orlando", address: "12562 International Dr, Orlando, FL 32821" },
  { name: "Drury Plaza Hotel Orlando - Disney Springs", address: "2000 Hotel Plaza Blvd, Lake Buena Vista, FL 32830" },
  { name: "Westgate Lakes Resort & Spa", address: "10000 Turkey Lake Rd, Orlando, FL 32819" },
  { name: "Westgate Palace Resort", address: "6145 Carrier Dr, Orlando, FL 32819" },
  { name: "Westgate Vacation Villas & Town Center", address: "7700 Westgate Blvd, Kissimmee, FL 34747" },
  { name: "Wyndham Grand Orlando Resort Bonnet Creek", address: "14651 Chelonia Pkwy, Orlando, FL 32821" },

  // ===== LEGOLAND Resorts (Winter Haven) =====
  { name: "LEGOLAND Florida Hotel", address: "1 Legoland Way, Winter Haven, FL 33884" },
  { name: "LEGOLAND Pirate Island Hotel", address: "1 Legoland Way, Winter Haven, FL 33884" },
  { name: "LEGOLAND Beach Retreat", address: "1 Legoland Way, Winter Haven, FL 33884" },

  // ===== SeaWorld Area Hotels =====
  { name: "DoubleTree by Hilton at SeaWorld", address: "10100 International Dr, Orlando, FL 32821" },
  { name: "Renaissance Orlando at SeaWorld", address: "6677 Sea Harbor Dr, Orlando, FL 32821" },
  { name: "Residence Inn Orlando at SeaWorld", address: "11000 Westwood Blvd, Orlando, FL 32821" },
  { name: "SpringHill Suites Orlando at SeaWorld", address: "10801 International Dr, Orlando, FL 32821" },
  { name: "Fairfield Inn & Suites Orlando at SeaWorld", address: "10815 International Dr, Orlando, FL 32821" },
  { name: "Homewood Suites by Hilton Orlando Theme Parks", address: "11428 Marbella Palm Ct, Orlando, FL 32836" },
  { name: "Hilton Grand Vacations SeaWorld", address: "6924 Grand Vacations Way, Orlando, FL 32821" },

  // ===== International Drive / Dr. Phillips Area =====
  { name: "Rosen Shingle Creek", address: "9939 Universal Blvd, Orlando, FL 32819" },
  { name: "Rosen Inn at Pointe Orlando", address: "9000 International Dr, Orlando, FL 32819" },
  { name: "Rosen Plaza Hotel", address: "9700 International Dr, Orlando, FL 32819" },
  { name: "Rosen Centre Hotel", address: "9840 International Dr, Orlando, FL 32819" },
  { name: "Hilton Orlando", address: "6001 Destination Pkwy, Orlando, FL 32819" },
  { name: "Embassy Suites by Hilton Orlando I-Drive", address: "8978 International Dr, Orlando, FL 32819" },
  { name: "Holiday Inn Resort Orlando Suites - Waterpark", address: "14500 Continental Gateway, Orlando, FL 32821" },
  { name: "Caribe Royale Orlando", address: "8101 World Center Dr, Orlando, FL 32821" },
  { name: "Sheraton Vistana Resort Villas", address: "8800 Vistana Centre Dr, Orlando, FL 32821" },
  { name: "Sheraton Vistana Villages Resort Villas", address: "12401 International Dr, Orlando, FL 32821" },
  { name: "Marriott's Harbour Lake", address: "7102 Grand Horizons Blvd, Orlando, FL 32821" },
  { name: "Marriott Village at Little Lake Bryan", address: "8623 Vineland Ave, Orlando, FL 32821" },
  { name: "Courtyard by Marriott Orlando Lake Buena Vista", address: "8501 Palm Pkwy, Orlando, FL 32836" },

  // ===== Kissimmee Hotels & Resorts =====
  { name: "Meliá Orlando Celebration", address: "225 Celebration Pl, Kissimmee, FL 34747" },
  { name: "Bohemian Hotel Celebration", address: "700 Bloom St, Celebration, FL 34747" },
  { name: "Radisson Resort Orlando Celebration", address: "2900 Parkway Blvd, Kissimmee, FL 34747" },
  { name: "Mystic Dunes Resort & Golf Club", address: "7600 Mystic Dunes Ln, Kissimmee, FL 34747" },
  { name: "Maingate Lakeside Resort", address: "7769 W Irlo Bronson Memorial Hwy, Kissimmee, FL 34747" },
  { name: "Polynesian Isles Resort", address: "3045 Polynesian Isle Blvd, Kissimmee, FL 34746" },
  { name: "Vacation Village at Parkway", address: "2983 Vineland Rd, Kissimmee, FL 34746" },
  { name: "Comfort Suites Maingate East", address: "2775 Florida Plaza Blvd, Kissimmee, FL 34746" },
  { name: "Holiday Inn Club Vacations at Orange Lake Resort", address: "8505 W Irlo Bronson Memorial Hwy, Kissimmee, FL 34747" },
  { name: "Treasure Cove Resort", address: "2817 N Poinciana Blvd, Kissimmee, FL 34746" },
  { name: "Liki Tiki Village", address: "17777 Bali Blvd, Winter Garden, FL 34787" },

  // ===== Davenport Hotels & Resorts =====
  { name: "Providence Resort", address: "1150 S Apopka Vineland Rd, Davenport, FL 33897" },
  { name: "Paradise Palms Resort", address: "8801 Paradise Palms Dr, Kissimmee, FL 34747" },
  { name: "Highlands Reserve", address: "559 Highlands Reserve Blvd, Davenport, FL 33897" },
  { name: "Windsor at Westside", address: "8933 Stinger Dr, Davenport, FL 33896" },
  { name: "Solterra Resort", address: "5258 Oakbourne Ave, Davenport, FL 33837" },
  { name: "Champions Gate Resort Community", address: "1340 Errol Park Dr, Davenport, FL 33896" },
  { name: "Festival Resort", address: "800 Festival Park Ave, Davenport, FL 33837" },
  { name: "Calabria at Westside", address: "1013 Fern Leaf Ct, Davenport, FL 33896" },
  { name: "Bella Vida Resort", address: "501 Bella Vida Blvd, Kissimmee, FL 34746" },

  // ===== Clermont Hotels & Resorts =====
  { name: "Epic Forrest at Canyons Resort", address: "16545 Epic Forrest Dr, Clermont, FL 34714" },
  { name: "Monumental Hotel Orlando", address: "12120 International Dr, Orlando, FL 32821" },

  // ===== Vacation Home Communities =====
  { name: "Solara Resort", address: "1177 Folly Way, Kissimmee, FL 34746" },
  { name: "Storey Lake Resort", address: "4777 Storey Lake Blvd, Kissimmee, FL 34746" },
  { name: "Encore Resort at Reunion", address: "7635 Fairfax Dr, Kissimmee, FL 34747" },
];

// Search resorts by name (case-insensitive substring match)
export function searchResorts(query: string): Resort[] {
  if (!query || query.length < 2) return [];
  const lower = query.toLowerCase();
  return ORLANDO_RESORTS.filter(r => r.name.toLowerCase().includes(lower));
}
