import festivalVodoun from "@/assets/festival-vodoun.jpg";
import ganvieVillage from "@/assets/ganvie-village.jpg";
import cotonouCity from "@/assets/cotonou-city.jpg";

export interface Festival {
  id: string;
  name: string;
  dates: string;
  month: number;
  city: string;
  image: string;
  images: string[];
  duration: string;
  description: string;
  fullDescription: string;
  culturalContext: string;
  program: {
    day: string;
    events: string[];
  }[];
  practicalInfo: {
    bestTime: string;
    whatToBring: string[];
    dresscode: string;
    accessibility: string;
  };
  highlights: string[];
}

export const festivals: Festival[] = [
  {
    id: "fest-1",
    name: "Festival du Vodoun",
    dates: "10 Janvier",
    month: 0,
    city: "Ouidah",
    image: festivalVodoun,
    images: [festivalVodoun, ganvieVillage],
    duration: "3 jours",
    description: "La plus grande célébration du vodoun au monde. Cérémonies, danses et rituels ancestraux.",
    fullDescription: "Le 10 janvier, fête nationale du vodoun au Bénin, Ouidah devient le centre mondial de cette spiritualité ancestrale. Des milliers de fidèles et de curieux convergent vers la capitale spirituelle du vodoun pour assister à des cérémonies exceptionnelles. Prêtres, adeptes et dignitaires se rassemblent sur la plage de Ouidah pour des rituels colorés mêlant transes, danses et offrandes aux divinités.",
    culturalContext: "Le vodoun, né dans l'ancien royaume du Dahomey, est reconnu comme religion officielle au Bénin depuis 1996. Le 10 janvier, jour férié, célèbre cette tradition spirituelle qui a traversé les océans avec les esclaves pour donner naissance au vaudou haïtien et aux cultes afro-brésiliens. Ouidah, dernière étape des esclaves avant leur départ, est chargée d'une histoire intense que le festival permet de commémorer.",
    program: [
      {
        day: "Jour 1 - 9 janvier",
        events: [
          "Arrivée et installation",
          "Visite du Temple des Pythons",
          "Cérémonie d'ouverture à la Porte du Non-Retour",
          "Dîner de bienvenue avec spectacle traditionnel"
        ]
      },
      {
        day: "Jour 2 - 10 janvier",
        events: [
          "Grande cérémonie sur la plage au lever du soleil",
          "Procession des dignitaires vodoun",
          "Rituels et transes collectives",
          "Danses et chants traditionnels",
          "Cérémonie du feu sacré au coucher du soleil"
        ]
      },
      {
        day: "Jour 3 - 11 janvier",
        events: [
          "Cérémonies de clôture",
          "Bénédictions individuelles",
          "Visite du musée d'histoire de Ouidah",
          "Départ ou prolongation libre"
        ]
      }
    ],
    practicalInfo: {
      bestTime: "Arriver la veille (9 janvier) pour profiter pleinement",
      whatToBring: ["Vêtements légers", "Protection solaire", "Chapeau", "Appareil photo (autorisé)", "Espèces pour les offrandes"],
      dresscode: "Tenue respectueuse, éviter le noir (couleur de deuil)",
      accessibility: "Certaines cérémonies sont sur la plage, prévoir des chaussures adaptées"
    },
    highlights: ["Cérémonies authentiques", "Rencontre avec les prêtres", "Patrimoine UNESCO", "Ambiance unique"]
  },
  {
    id: "fest-2",
    name: "Festival des Masques Gélédé",
    dates: "Mars",
    month: 2,
    city: "Kétou",
    image: festivalVodoun,
    images: [festivalVodoun, ganvieVillage],
    duration: "2 jours",
    description: "Patrimoine immatériel UNESCO. Spectacle de masques et de danses traditionnelles.",
    fullDescription: "Le Festival des Masques Gélédé est l'une des expressions culturelles les plus spectaculaires du Bénin. Classé chef-d'œuvre du patrimoine oral et immatériel de l'humanité par l'UNESCO, le Gélédé célèbre le pouvoir des mères et le rôle des femmes dans la société Yoruba. Les danseurs masqués, habillés de costumes colorés, exécutent des chorégraphies transmises depuis des générations.",
    culturalContext: "Le Gélédé est né de la vénération d'Iyá Nlá, la 'Grande Mère' primordiale. Cette tradition honore le pouvoir mystique des femmes et transmet des messages sociaux à travers des satires et des récits. Chaque masque sculpté raconte une histoire : animaux, personnages de la vie quotidienne, scènes humoristiques ou moralisatrices.",
    program: [
      {
        day: "Jour 1",
        events: [
          "Arrivée à Kétou et installation",
          "Visite de l'atelier des sculpteurs de masques",
          "Présentation de l'histoire du Gélédé",
          "Première représentation nocturne (Efe)"
        ]
      },
      {
        day: "Jour 2",
        events: [
          "Grande représentation diurne",
          "Défilé des masques",
          "Danses et chants traditionnels",
          "Rencontre avec les artistes",
          "Cérémonie de clôture"
        ]
      }
    ],
    practicalInfo: {
      bestTime: "La date exacte varie, se renseigner localement",
      whatToBring: ["Appareil photo", "Vêtements légers", "Argent liquide"],
      dresscode: "Libre, mais tenue respectueuse",
      accessibility: "Les représentations ont lieu en plein air sur la place du village"
    },
    highlights: ["Patrimoine UNESCO", "Masques sculptés uniques", "Danses spectaculaires", "Art ancestral vivant"]
  },
  {
    id: "fest-3",
    name: "FinAB - Festival International des Arts du Bénin",
    dates: "Avril",
    month: 3,
    city: "Cotonou",
    image: cotonouCity,
    images: [cotonouCity, festivalVodoun],
    duration: "5 jours",
    description: "Le plus grand festival artistique du pays. Musique, danse, théâtre et arts visuels.",
    fullDescription: "Le Festival International des Arts du Bénin (FinAB) est le rendez-vous incontournable de la création artistique africaine. Pendant cinq jours, Cotonou vibre au rythme des concerts, expositions, performances théâtrales et ateliers. Des artistes du monde entier se retrouvent pour célébrer la diversité culturelle et l'innovation artistique du continent africain.",
    culturalContext: "Créé pour promouvoir les arts contemporains africains, le FinAB est devenu une plateforme majeure pour les artistes émergents et confirmés. Le festival reflète la vitalité de la scène artistique béninoise, entre traditions séculaires et créations avant-gardistes. C'est aussi un espace de dialogue interculturel et de networking pour les professionnels de la culture.",
    program: [
      {
        day: "Jours 1-2",
        events: [
          "Cérémonie d'ouverture officielle",
          "Concerts de musique africaine",
          "Vernissage des expositions d'art contemporain",
          "Spectacles de danse moderne"
        ]
      },
      {
        day: "Jours 3-4",
        events: [
          "Pièces de théâtre et performances",
          "Ateliers artistiques ouverts au public",
          "Conférences et tables rondes",
          "Projections de films africains",
          "Jam sessions et scènes ouvertes"
        ]
      },
      {
        day: "Jour 5",
        events: [
          "Grande finale musicale",
          "Remise des prix",
          "Spectacle de clôture",
          "Fête de fin de festival"
        ]
      }
    ],
    practicalInfo: {
      bestTime: "Réserver son hébergement à l'avance, le festival attire beaucoup de monde",
      whatToBring: ["Pass festival", "Carnet pour les dédicaces", "Appareil photo"],
      dresscode: "Libre et créatif !",
      accessibility: "Plusieurs sites dans Cotonou, navettes disponibles"
    },
    highlights: ["Artistes internationaux", "Diversité artistique", "Ambiance festive", "Networking culturel"]
  },
  {
    id: "fest-4",
    name: "WeLovEya",
    dates: "Août",
    month: 7,
    city: "Grand-Popo",
    image: ganvieVillage,
    images: [ganvieVillage, cotonouCity],
    duration: "3 jours",
    description: "Festival de musique électronique sur la plage. Rencontre entre traditions et modernité.",
    fullDescription: "WeLovEya est le festival qui fait danser l'Afrique de l'Ouest ! Sur les plages paradisiaques de Grand-Popo, DJs internationaux et artistes locaux fusionnent musiques électroniques et rythmes traditionnels béninois. Trois jours de fête, de découvertes musicales et de rencontres dans un cadre idyllique entre océan et lagune.",
    culturalContext: "Né de la volonté de créer un événement musical d'envergure internationale au Bénin, WeLovEya incarne la modernité africaine. Le festival valorise les artistes locaux tout en invitant des têtes d'affiche mondiales. C'est un lieu de fusion où l'afrobeat rencontre la house, où les percussions traditionnelles se mêlent aux beats électroniques.",
    program: [
      {
        day: "Jour 1 - Vendredi",
        events: [
          "Ouverture des portes en fin d'après-midi",
          "Sunset session sur la plage",
          "DJ sets jusqu'à l'aube",
          "Zone chill et bars"
        ]
      },
      {
        day: "Jour 2 - Samedi",
        events: [
          "Pool party à l'hôtel partenaire",
          "Ateliers percussion et danse",
          "Scène principale : artistes locaux",
          "Têtes d'affiche internationales",
          "After party sur la plage"
        ]
      },
      {
        day: "Jour 3 - Dimanche",
        events: [
          "Brunch musical",
          "Sessions acoustiques",
          "Closing party au coucher du soleil",
          "Cérémonie de clôture"
        ]
      }
    ],
    practicalInfo: {
      bestTime: "Arriver le vendredi matin pour profiter de la plage avant le festival",
      whatToBring: ["Maillot de bain", "Crème solaire", "Tenue de soirée légère", "Cash et carte"],
      dresscode: "Beach vibes ! Libre et décontracté",
      accessibility: "Le site est sur la plage, prévoir des chaussures adaptées"
    },
    highlights: ["Plage paradisiaque", "Line-up international", "Fusion musicale", "Ambiance unique"]
  },
  {
    id: "fest-5",
    name: "Festival Quintessence",
    dates: "Décembre",
    month: 11,
    city: "Ouidah",
    image: festivalVodoun,
    images: [festivalVodoun, cotonouCity],
    duration: "4 jours",
    description: "Arts de la scène, théâtre et performances. Une vitrine de la créativité béninoise.",
    fullDescription: "Le Festival Quintessence est l'événement phare des arts de la scène au Bénin. Théâtre, danse contemporaine, performances, installations... Pendant quatre jours, Ouidah devient un laboratoire artistique à ciel ouvert. Le festival met en avant les créateurs béninois et africains qui repoussent les frontières de l'expression artistique.",
    culturalContext: "Quintessence est né de la volonté de faire de Ouidah un pôle culturel majeur en Afrique. Au-delà des cérémonies vodoun pour lesquelles la ville est connue, le festival révèle une autre facette : celle d'une ville tournée vers la création contemporaine, où l'histoire dialogue avec l'innovation artistique.",
    program: [
      {
        day: "Jours 1-2",
        events: [
          "Ouverture officielle",
          "Premières représentations théâtrales",
          "Installations artistiques dans la ville",
          "Performances de rue"
        ]
      },
      {
        day: "Jours 3-4",
        events: [
          "Spectacles de danse contemporaine",
          "Théâtre expérimental",
          "Débats et rencontres avec les artistes",
          "Spectacle de clôture",
          "Fête finale"
        ]
      }
    ],
    practicalInfo: {
      bestTime: "Se renseigner sur la programmation pour choisir les spectacles",
      whatToBring: ["Programme du festival", "Carnet de notes", "Ouverture d'esprit !"],
      dresscode: "Libre",
      accessibility: "Spectacles dans différents lieux de Ouidah, prévoir de marcher"
    },
    highlights: ["Création contemporaine", "Artistes émergents", "Cadre historique unique", "Rencontres artistiques"]
  },
  {
    id: "fest-6",
    name: "Fête des Religions Endogènes",
    dates: "Août",
    month: 7,
    city: "Covè",
    image: festivalVodoun,
    images: [festivalVodoun, ganvieVillage],
    duration: "2 jours",
    description: "Célébration des traditions spirituelles locales avec cérémonies et rituels.",
    fullDescription: "La Fête des Religions Endogènes de Covè est une célébration authentique des traditions spirituelles béninoises. Loin des circuits touristiques, cette fête permet d'assister à des cérémonies rituelles dans leur forme la plus pure. Les communautés locales se rassemblent pour honorer les ancêtres et les divinités protectrices à travers des rituels transmis depuis des générations.",
    culturalContext: "Covè est un haut lieu du vodoun au Bénin. La fête célèbre les 'religions endogènes', terme désignant les spiritualités traditionnelles africaines par opposition aux religions importées. C'est un moment de fierté culturelle où les communautés réaffirment leur attachement à leurs racines spirituelles.",
    program: [
      {
        day: "Jour 1",
        events: [
          "Arrivée et accueil par les autorités traditionnelles",
          "Procession vers les lieux sacrés",
          "Cérémonies d'ouverture",
          "Rituels nocturnes"
        ]
      },
      {
        day: "Jour 2",
        events: [
          "Cérémonies du matin",
          "Danses et chants rituels",
          "Bénédictions",
          "Cérémonie de clôture",
          "Repas communautaire"
        ]
      }
    ],
    practicalInfo: {
      bestTime: "Contacter un guide local pour les dates exactes",
      whatToBring: ["Vêtements modestes", "Offrandes (conseillées par le guide)", "Respect et discrétion"],
      dresscode: "Tenue respectueuse, pas de noir, pas de rouge vif",
      accessibility: "Route non goudronnée, prévoir un véhicule adapté"
    },
    highlights: ["Authenticité absolue", "Cérémonies intimistes", "Immersion culturelle", "Rencontre avec les dignitaires"]
  },
];
