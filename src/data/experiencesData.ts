import festivalVodoun from "@/assets/festival-vodoun.jpg";
import ganvieVillage from "@/assets/ganvie-village.jpg";
import pendjariPark from "@/assets/pendjari-park.jpg";
import ouidahDoor from "@/assets/ouidah-door.jpg";
import { Palette, Utensils, TreePine, Camera, Compass } from "lucide-react";

export interface Experience {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  images: string[];
  price: number;
  duration: string;
  days: number;
  rating: number;
  available: boolean;
  description: string;
  fullDescription: string;
  culturalContext: string;
  programFlow: string[];
  location: string;
  includes: string[];
  notIncludes: string[];
  difficulty: string;
  groupSize: string;
  icon: typeof Palette;
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    title: "Cérémonie Vodoun authentique",
    category: "culture",
    categoryLabel: "Culture",
    image: festivalVodoun,
    images: [festivalVodoun, ouidahDoor],
    price: 45000,
    duration: "4 heures",
    days: 1,
    rating: 4.9,
    available: true,
    description: "Assistez à une cérémonie vodoun avec un prêtre local.",
    fullDescription: "Plongez au cœur de la spiritualité béninoise lors d'une cérémonie vodoun authentique. Accompagné d'un guide expert et avec l'accord des dignitaires locaux, vous serez témoin de rituels ancestraux transmis de génération en génération. Cette expérience unique vous permettra de comprendre les fondements de cette religion qui a façonné l'histoire du Bénin.",
    culturalContext: "Le vodoun est bien plus qu'une religion : c'est un système de pensée qui structure la vie sociale et spirituelle de millions de Béninois. Né dans l'ancien royaume du Dahomey, le vodoun vénère les forces de la nature et les ancêtres. Chaque divinité (vodoun) possède ses propres cérémonies, chants et danses rituelles. Le Bénin est considéré comme le berceau mondial du vodoun, et Ouidah en est la capitale spirituelle.",
    programFlow: [
      "Accueil par le guide et introduction historique",
      "Rencontre avec le prêtre vodoun",
      "Explication des symboles et rituels",
      "Participation à la cérémonie (en tant qu'observateur respectueux)",
      "Échange avec les participants locaux",
      "Moment de réflexion et questions"
    ],
    location: "Ouidah",
    includes: ["Guide francophone expert", "Offrandes rituelles", "Transport local", "Eau et rafraîchissements"],
    notIncludes: ["Transport depuis Cotonou", "Repas", "Pourboires"],
    difficulty: "Facile",
    groupSize: "4-8 personnes",
    icon: Palette,
  },
  {
    id: "exp-2",
    title: "Cours de cuisine béninoise",
    category: "gastro",
    categoryLabel: "Gastronomie",
    image: ganvieVillage,
    images: [ganvieVillage, festivalVodoun],
    price: 35000,
    duration: "3 heures",
    days: 1,
    rating: 4.8,
    available: true,
    description: "Apprenez à préparer le fameux 'Amiwo' et autres plats locaux.",
    fullDescription: "Rejoignez une famille béninoise dans sa cuisine traditionnelle pour une immersion culinaire inoubliable. Vous apprendrez à préparer des plats emblématiques comme l'Amiwo (pâte de maïs à la sauce tomate), le Wagasi (fromage peul grillé) et d'autres délices locaux. Plus qu'un simple cours de cuisine, c'est une rencontre humaine autour des saveurs du Bénin.",
    culturalContext: "La cuisine béninoise reflète la diversité culturelle du pays. Chaque région a ses spécialités, transmises de mère en fille. Les marchés colorés regorgent d'ingrédients frais : ignames, manioc, poissons fumés, piments et épices locales. Le repas est un moment de partage essentiel dans la culture béninoise.",
    programFlow: [
      "Visite du marché local pour acheter les ingrédients",
      "Présentation des épices et produits locaux",
      "Préparation des plats avec la famille",
      "Cuisson traditionnelle au feu de bois",
      "Dégustation du repas préparé ensemble",
      "Remise des recettes écrites"
    ],
    location: "Cotonou",
    includes: ["Tous les ingrédients", "Tablier offert", "Livret de recettes", "Repas complet"],
    notIncludes: ["Transport", "Boissons alcoolisées"],
    difficulty: "Facile",
    groupSize: "2-6 personnes",
    icon: Utensils,
  },
  {
    id: "exp-3",
    title: "Safari photo à Pendjari",
    category: "nature",
    categoryLabel: "Nature",
    image: pendjariPark,
    images: [pendjariPark, festivalVodoun],
    price: 120000,
    duration: "8 heures",
    days: 2,
    rating: 5.0,
    available: true,
    description: "Partez à la rencontre des lions et éléphants d'Afrique.",
    fullDescription: "Vivez l'aventure ultime au cœur du Parc National de la Pendjari, l'un des derniers sanctuaires de la grande faune d'Afrique de l'Ouest. Accompagné d'un guide naturaliste expert, vous partirez à la recherche des lions, éléphants, buffles, hipppopotames et des nombreuses espèces d'oiseaux qui peuplent ce parc classé réserve de biosphère par l'UNESCO.",
    culturalContext: "Le Parc National de la Pendjari couvre plus de 4800 km² et abrite la plus grande population de lions d'Afrique de l'Ouest. Les communautés locales participent activement à la conservation de ce patrimoine naturel exceptionnel. Le parc est aussi le territoire des Somba, peuple aux traditions uniques.",
    programFlow: [
      "Départ à l'aube pour le safari",
      "Observation de la faune au lever du soleil",
      "Pause petit-déjeuner en brousse",
      "Continuation du safari",
      "Déjeuner au lodge",
      "Safari de l'après-midi",
      "Coucher de soleil sur la savane",
      "Nuit au lodge (2e jour)",
      "Safari matinal et retour"
    ],
    location: "Parc National de la Pendjari",
    includes: ["Guide naturaliste", "Véhicule 4x4", "Entrée du parc", "Nuit en lodge", "Pension complète"],
    notIncludes: ["Transport depuis Cotonou", "Équipement photo", "Pourboires"],
    difficulty: "Modéré",
    groupSize: "2-6 personnes",
    icon: Camera,
  },
  {
    id: "exp-4",
    title: "Atelier bronze d'Abomey",
    category: "culture",
    categoryLabel: "Artisanat",
    image: ouidahDoor,
    images: [ouidahDoor, festivalVodoun],
    price: 40000,
    duration: "5 heures",
    days: 1,
    rating: 4.7,
    available: true,
    description: "Créez votre propre sculpture avec les maîtres artisans.",
    fullDescription: "Initiez-vous à l'art ancestral du bronze d'Abomey, inscrit au patrimoine culturel immatériel. Les maîtres fondeurs perpétuent des techniques datant du royaume du Dahomey. Vous créerez votre propre œuvre selon la technique de la cire perdue, guidé par des artisans dont le savoir-faire se transmet depuis des générations.",
    culturalContext: "L'art du bronze d'Abomey remonte au XVIIe siècle sous le règne des rois du Dahomey. Les bas-reliefs en bronze ornaient les palais royaux et racontaient l'histoire du royaume. Aujourd'hui, les descendants des artisans royaux perpétuent cette tradition, créant des œuvres qui mêlent symbolisme ancien et créativité contemporaine.",
    programFlow: [
      "Visite du musée historique d'Abomey",
      "Rencontre avec le maître fondeur",
      "Présentation de la technique de la cire perdue",
      "Création de votre modèle en cire",
      "Démonstration de la fonte du bronze",
      "Finitions et patine",
      "Remise de votre création"
    ],
    location: "Abomey",
    includes: ["Entrée musée", "Matériaux", "Votre sculpture en bronze", "Certificat d'authenticité"],
    notIncludes: ["Transport", "Repas"],
    difficulty: "Facile",
    groupSize: "2-4 personnes",
    icon: Palette,
  },
  {
    id: "exp-5",
    title: "Dégustation de Sodabi",
    category: "gastro",
    categoryLabel: "Gastronomie",
    image: ganvieVillage,
    images: [ganvieVillage, ouidahDoor],
    price: 25000,
    duration: "2 heures",
    days: 1,
    rating: 4.6,
    available: true,
    description: "Découvrez l'alcool traditionnel du Bénin et ses secrets.",
    fullDescription: "Partez à la découverte du Sodabi, l'eau-de-vie traditionnelle du Bénin distillée à partir du vin de palme. Visitez une distillerie artisanale, rencontrez les producteurs et dégustez différentes variétés aromatisées aux herbes et écorces médicinales. Une expérience conviviale pour comprendre l'importance de cette boisson dans la culture locale.",
    culturalContext: "Le Sodabi, littéralement 'ce qui fait parler', est bien plus qu'une boisson : c'est un symbole de convivialité et de célébration. Utilisé lors des cérémonies traditionnelles, offrandes aux ancêtres et moments festifs, le Sodabi est distillé selon des méthodes transmises depuis des siècles dans les familles de producteurs.",
    programFlow: [
      "Visite de la palmeraie",
      "Explication de la récolte du vin de palme",
      "Visite de la distillerie artisanale",
      "Démonstration du processus de distillation",
      "Dégustation de 5 variétés différentes",
      "Moment d'échange avec le producteur"
    ],
    location: "Grand-Popo",
    includes: ["Dégustation complète", "Guide local", "Bouteille de Sodabi offerte"],
    notIncludes: ["Transport", "Repas"],
    difficulty: "Facile",
    groupSize: "2-10 personnes",
    icon: Utensils,
  },
  {
    id: "exp-6",
    title: "Randonnée cascades Tanougou",
    category: "nature",
    categoryLabel: "Nature",
    image: pendjariPark,
    images: [pendjariPark, ganvieVillage],
    price: 55000,
    duration: "6 heures",
    days: 1,
    rating: 4.8,
    available: false,
    description: "Trek vers les magnifiques chutes d'eau de l'Atacora.",
    fullDescription: "Randonnez à travers les paysages spectaculaires de la chaîne de l'Atacora jusqu'aux cascades de Tanougou. Ces chutes d'eau majestueuses, hautes de 20 mètres, se jettent dans un bassin naturel où vous pourrez vous baigner. Le sentier traverse des villages traditionnels et offre des panoramas exceptionnels sur les montagnes.",
    culturalContext: "La région de l'Atacora est le territoire des Somba, peuple aux traditions architecturales uniques. Leurs maisons-forteresses, les Tata Somba, sont classées au patrimoine mondial. Les cascades de Tanougou sont considérées comme sacrées par les populations locales.",
    programFlow: [
      "Départ du village de départ",
      "Traversée des villages Somba",
      "Observation des Tata Somba",
      "Randonnée en forêt",
      "Arrivée aux cascades",
      "Baignade et pique-nique",
      "Retour par un autre sentier"
    ],
    location: "Atacora",
    includes: ["Guide local", "Pique-nique", "Droits d'entrée", "Eau"],
    notIncludes: ["Transport depuis Natitingou", "Équipement de randonnée"],
    difficulty: "Modéré",
    groupSize: "2-8 personnes",
    icon: TreePine,
  },
  {
    id: "exp-7",
    title: "Initiation aux Gélédé",
    category: "culture",
    categoryLabel: "Culture",
    image: festivalVodoun,
    images: [festivalVodoun, ouidahDoor],
    price: 50000,
    duration: "4 heures",
    days: 1,
    rating: 4.9,
    available: true,
    description: "Découvrez l'art des masques Gélédé, patrimoine UNESCO.",
    fullDescription: "Plongez dans l'univers fascinant des masques Gélédé, chef-d'œuvre du patrimoine oral et immatériel de l'humanité. Rencontrez les sculpteurs de masques, découvrez leur signification et assistez à une représentation traditionnelle. Les Gélédé célèbrent le pouvoir féminin et transmettent des messages sociaux à travers la danse et le chant.",
    culturalContext: "Le Gélédé est une tradition vivante pratiquée par les Yoruba et les Nago du sud-ouest du Bénin. Chaque masque raconte une histoire et transmet des valeurs : respect des aînés, harmonie sociale, rôle des femmes. Les cérémonies ont lieu lors d'occasions spéciales et sont un spectacle total mêlant arts plastiques, musique et danse.",
    programFlow: [
      "Visite de l'atelier du sculpteur",
      "Explication de la symbolique des masques",
      "Rencontre avec les danseurs",
      "Présentation des costumes",
      "Représentation de danse Gélédé",
      "Échange avec les artistes"
    ],
    location: "Kétou",
    includes: ["Guide spécialisé", "Spectacle privé", "Rafraîchissements"],
    notIncludes: ["Transport", "Repas"],
    difficulty: "Facile",
    groupSize: "4-12 personnes",
    icon: Palette,
  },
  {
    id: "exp-8",
    title: "Pêche à Ganvié",
    category: "nature",
    categoryLabel: "Nature",
    image: ganvieVillage,
    images: [ganvieVillage, festivalVodoun],
    price: 30000,
    duration: "3 heures",
    days: 1,
    rating: 4.5,
    available: true,
    description: "Pêchez avec les habitants du village lacustre.",
    fullDescription: "Rejoignez les pêcheurs de Ganvié, la 'Venise de l'Afrique', pour une matinée de pêche traditionnelle. Naviguez en pirogue à travers les acadja (pièges à poissons) et apprenez les techniques ancestrales de pêche lacustre. Une immersion authentique dans la vie quotidienne de ce village unique au monde, construit sur pilotis.",
    culturalContext: "Ganvié fut fondé au XVIIe siècle par les Tofinu fuyant les razzias esclavagistes. Ils s'installèrent sur le lac Nokoué, lieu interdit aux Fon. Aujourd'hui, 30 000 personnes vivent dans ce village lacustre, perpétuant un mode de vie unique basé sur la pêche et le commerce sur l'eau.",
    programFlow: [
      "Traversée en pirogue jusqu'au village",
      "Visite du marché flottant",
      "Rencontre avec un pêcheur local",
      "Initiation aux techniques de pêche",
      "Pêche dans les acadja",
      "Préparation et dégustation du poisson"
    ],
    location: "Ganvié, Lac Nokoué",
    includes: ["Pirogue et piroguier", "Équipement de pêche", "Dégustation poisson frais", "Guide"],
    notIncludes: ["Transport jusqu'à Abomey-Calavi"],
    difficulty: "Facile",
    groupSize: "2-4 personnes",
    icon: Compass,
  },
];
