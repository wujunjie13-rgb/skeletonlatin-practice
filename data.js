// Comprehensive skeletal anatomy data with Latin names, Finnish names, and anatomical features
const skeletalData = {
    skull: {
        category: "Skull",
        bones: [
            {
                id: "frontal",
                latin: "Os frontale",
                finnish: "Otsaluu",
                pronunciation: "os-fron-TAH-lay",
                features: ["Frontal surface", "Supraorbital margin", "Frontal sinus"],
                description: "Bone forming the forehead and upper part of the eye sockets"
            },
            {
                id: "parietal",
                latin: "Os parietale",
                finnish: "Päälakiluu",
                pronunciation: "os-pa-ry-eh-TAH-lay",
                features: ["Parietal eminence", "Superior temporal line", "Inferior temporal line"],
                description: "Bone forming the top and sides of the skull"
            },
            {
                id: "occipital",
                latin: "Os occipitale",
                finnish: "Takaraivoluu",
                pronunciation: "os-ok-sih-pih-TAH-lay",
                features: ["External occipital protuberance", "Foramen magnum", "Occipital condyle"],
                description: "Bone forming the back of the skull and posterior cranial fossa"
            },
            {
                id: "temporal",
                latin: "Os temporale",
                finnish: "Ohimoluu",
                pronunciation: "os-tem-po-RAH-lay",
                features: ["Mastoid process", "External acoustic meatus", "Zygomatic process", "Styloid process"],
                description: "Bone forming the base and sides of the skull, contains hearing organs"
            },
            {
                id: "sphenoid",
                latin: "Os sphenoidale",
                finnish: "Kiilaluu",
                pronunciation: "os-sfe-noi-DAH-lay",
                features: ["Sella turcica", "Greater wing", "Lesser wing", "Pterygoid process"],
                description: "Butterfly-shaped bone located in the middle of the skull base"
            },
            {
                id: "ethmoid",
                latin: "Os ethmoidale",
                finnish: "Seulaluu",
                pronunciation: "os-eth-moi-DAH-lay",
                features: ["Cribriform plate", "Crista galli", "Ethmoidal air cells"],
                description: "Bone forming the roof of the nasal cavity and medial wall of the orbit"
            },
            {
                id: "mandible",
                latin: "Mandibula",
                finnish: "Alaleuka",
                pronunciation: "man-DIB-yoo-lah",
                features: ["Body", "Ramus", "Condylar process", "Coronoid process", "Mental foramen"],
                description: "The lower jaw bone, the only movable skull bone"
            },
            {
                id: "maxilla",
                latin: "Maxilla",
                finnish: "Yläleuka",
                pronunciation: "mak-SIL-ah",
                features: ["Frontal process", "Zygomatic process", "Palatine process", "Alveolar process"],
                description: "Bone forming the upper jaw and most of the hard palate"
            },
            {
                id: "zygomatic",
                latin: "Os zygomaticum",
                finnish: "Poskipääluu",
                pronunciation: "os-zy-go-MAH-tih-kum",
                features: ["Temporal process", "Frontal process", "Maxillary process"],
                description: "Bone forming the prominence of the cheek"
            },
            {
                id: "nasal",
                latin: "Os nasale",
                finnish: "Nenäluu",
                pronunciation: "os-nah-SAH-lay",
                features: ["Nasal bridge"],
                description: "Small bone forming the bridge of the nose"
            },
            {
                id: "lacrimal",
                latin: "Os lacrimale",
                finnish: "Kyynelluu",
                pronunciation: "os-lak-rih-MAH-lay",
                features: ["Lacrimal fossa"],
                description: "Small bone in the medial wall of the orbit"
            },
            {
                id: "palatine",
                latin: "Os palatinum",
                finnish: "Kitalakiluu",
                pronunciation: "os-pal-ah-TY-num",
                features: ["Horizontal plate", "Perpendicular plate"],
                description: "Bone forming the posterior hard palate and lateral nasal wall"
            },
            {
                id: "vomer",
                latin: "Vomer",
                finnish: "Auranluu",
                pronunciation: "VOH-mer",
                features: ["Nasal septum"],
                description: "Bone forming the inferior part of the nasal septum"
            },
            {
                id: "inferior_nasal_concha",
                latin: "Concha nasalis inferior",
                finnish: "Alempi nenäkuori",
                pronunciation: "KON-kah nah-SAH-lis in-FEE-ree-or",
                features: ["Nasal meatus"],
                description: "Thin bone plate on the lateral wall of the nasal cavity"
            }
        ]
    },
    
    vertebral_column: {
        category: "Vertebral Column",
        bones: [
            {
                id: "cervical_vertebrae",
                latin: "Vertebrae cervicales",
                finnish: "Kaulanikama",
                pronunciation: "ver-TEE-bray ser-vih-KAH-lays",
                features: ["Body", "Vertebral arch", "Transverse foramen", "Spinous process"],
                description: "7 cervical vertebrae (C1-C7)"
            },
            {
                id: "atlas",
                latin: "Atlas",
                finnish: "Kannattajanikama",
                pronunciation: "AT-las",
                features: ["Anterior arch", "Posterior arch", "Superior articular facet"],
                description: "First cervical vertebra (C1)"
            },
            {
                id: "axis",
                latin: "Axis",
                finnish: "Kääntäjänikama",
                pronunciation: "AK-sis",
                features: ["Dens/Odontoid process"],
                description: "Second cervical vertebra (C2)"
            },
            {
                id: "thoracic_vertebrae",
                latin: "Vertebrae thoracicae",
                finnish: "Rintanikama",
                pronunciation: "ver-TEE-bray tho-RAH-sih-kay",
                features: ["Costal facets", "Long spinous process"],
                description: "12 thoracic vertebrae (T1-T12)"
            },
            {
                id: "lumbar_vertebrae",
                latin: "Vertebrae lumbales",
                finnish: "Lannenikama",
                pronunciation: "ver-TEE-bray lum-BAH-lays",
                features: ["Large body", "Short spinous process", "Mammillary process"],
                description: "5 lumbar vertebrae (L1-L5)"
            },
            {
                id: "sacrum",
                latin: "Os sacrum",
                finnish: "Ristiselkä",
                pronunciation: "os-SAH-krum",
                features: ["Base", "Apex", "Sacral canal", "Sacral foramina"],
                description: "Formed by fusion of 5 sacral vertebrae"
            },
            {
                id: "coccyx",
                latin: "Os coccygis",
                finnish: "Häntäluu",
                pronunciation: "os-KOK-sih-jis",
                features: ["Coccygeal cornua"],
                description: "Formed by fusion of 3-5 coccygeal vertebrae"
            }
        ]
    },

    thorax: {
        category: "Thorax",
        bones: [
            {
                id: "sternum",
                latin: "Sternum",
                finnish: "Rintalasta",
                pronunciation: "STER-num",
                features: ["Manubrium", "Body", "Xiphoid process", "Jugular notch"],
                description: "Flat bone in the middle of the chest"
            },
            {
                id: "ribs",
                latin: "Costae",
                finnish: "Kylkiluut",
                pronunciation: "KOS-tay",
                features: ["Head", "Neck", "Tubercle", "Body", "Angle"],
                description: "12 pairs of ribs"
            },
            {
                id: "true_ribs",
                latin: "Costae verae",
                finnish: "Todelliset kylkiluut",
                pronunciation: "KOS-tay VEH-ray",
                features: ["Direct sternal connection"],
                description: "Ribs 1-7"
            },
            {
                id: "false_ribs",
                latin: "Costae spuriae",
                finnish: "Epätodelliset kylkiluut",
                pronunciation: "KOS-tay SPOO-ree-ay",
                features: ["Indirect sternal connection"],
                description: "Ribs 8-10"
            },
            {
                id: "floating_ribs",
                latin: "Costae fluctuantes",
                finnish: "Kelluvat kylkiluut",
                pronunciation: "KOS-tay fluk-too-AN-tays",
                features: ["No sternal connection"],
                description: "Ribs 11-12"
            }
        ]
    },

    upper_limb: {
        category: "Upper Limb",
        bones: [
            {
                id: "clavicle",
                latin: "Clavicula",
                finnish: "Solisluu",
                pronunciation: "klah-VIH-koo-lah",
                features: ["Sternal end", "Acromial end", "Conoid tubercle"],
                description: "S-shaped bone connecting the upper limb to the trunk"
            },
            {
                id: "scapula",
                latin: "Scapula",
                finnish: "Lapaluu",
                pronunciation: "SKAP-yoo-lah",
                features: ["Spine", "Acromion", "Coracoid process", "Glenoid cavity", "Subscapular fossa", "Supraspinous fossa", "Infraspinous fossa"],
                description: "Triangular flat bone of the shoulder"
            },
            {
                id: "humerus",
                latin: "Humerus",
                finnish: "Olkaluu",
                pronunciation: "HYOO-mer-us",
                features: ["Head", "Anatomical neck", "Surgical neck", "Greater tubercle", "Lesser tubercle", "Deltoid tuberosity", "Radial groove", "Medial epicondyle", "Lateral epicondyle", "Trochlea", "Capitulum"],
                description: "Long bone of the upper arm"
            },
            {
                id: "radius",
                latin: "Radius",
                finnish: "Värttinäluu",
                pronunciation: "RAY-dee-us",
                features: ["Head", "Neck", "Radial tuberosity", "Styloid process", "Ulnar notch"],
                description: "Long bone of the forearm (thumb side)"
            },
            {
                id: "ulna",
                latin: "Ulna",
                finnish: "Kyynärluu",
                pronunciation: "UL-nah",
                features: ["Olecranon", "Coronoid process", "Trochlear notch", "Radial notch", "Styloid process"],
                description: "Long bone of the forearm (pinky side)"
            },
            {
                id: "scaphoid",
                latin: "Os scaphoideum",
                finnish: "Veneluu",
                pronunciation: "os-skaf-OY-day-um",
                features: ["Scaphoid tubercle"],
                description: "Proximal lateral carpal bone"
            },
            {
                id: "lunate",
                latin: "Os lunatum",
                finnish: "Puolikuuluu",
                pronunciation: "os-loo-NAH-tum",
                features: ["Crescent shape"],
                description: "Proximal middle carpal bone"
            },
            {
                id: "triquetrum",
                latin: "Os triquetrum",
                finnish: "Kolmiomainen luu",
                pronunciation: "os-try-KWEE-trum",
                features: ["Pisiform articular surface"],
                description: "Proximal medial carpal bone"
            },
            {
                id: "pisiform",
                latin: "Os pisiforme",
                finnish: "Herneluu",
                pronunciation: "os-pih-sih-FOR-may",
                features: ["Sesamoid bone"],
                description: "Sesamoid bone in the wrist"
            },
            {
                id: "trapezium",
                latin: "Os trapezium",
                finnish: "Isomonikulmio",
                pronunciation: "os-trah-PEE-zee-um",
                features: ["Saddle joint surface"],
                description: "Distal lateral carpal bone"
            },
            {
                id: "trapezoid",
                latin: "Os trapezoideum",
                finnish: "Pikkumonikulmio",
                pronunciation: "os-trah-peh-ZOY-day-um",
                features: ["Wedge shape"],
                description: "Distal second carpal bone"
            },
            {
                id: "capitate",
                latin: "Os capitatum",
                finnish: "Pääluu",
                pronunciation: "os-kap-ih-TAH-tum",
                features: ["Head"],
                description: "Largest carpal bone"
            },
            {
                id: "hamate",
                latin: "Os hamatum",
                finnish: "Koukkuluu",
                pronunciation: "os-hah-MAH-tum",
                features: ["Hook/Hamulus"],
                description: "Distal medial carpal bone"
            },
            {
                id: "metacarpals",
                latin: "Ossa metacarpi",
                finnish: "Kämmenluu",
                pronunciation: "OS-ah met-ah-KAR-py",
                features: ["Base", "Body/Shaft", "Head"],
                description: "5 metacarpal bones (I-V)"
            },
            {
                id: "phalanges_hand",
                latin: "Phalanges manus",
                finnish: "Sormiluu",
                pronunciation: "fah-LAN-jeez MAH-nus",
                features: ["Proximal phalanx", "Middle phalanx", "Distal phalanx"],
                description: "14 phalanges of the fingers"
            }
        ]
    },

    pelvic_girdle: {
        category: "Pelvic Girdle",
        bones: [
            {
                id: "hip_bone",
                latin: "Os coxae",
                finnish: "Lonkkaluu",
                pronunciation: "os-KOK-say",
                features: ["Acetabulum", "Obturator foramen"],
                description: "Formed by fusion of ilium, ischium, and pubis"
            },
            {
                id: "ilium",
                latin: "Os ilium",
                finnish: "Suoliluu",
                pronunciation: "os-IH-lee-um",
                features: ["Iliac crest", "ASIS", "AIIS", "PSIS", "PIIS", "Iliac fossa"],
                description: "Upper part of the hip bone"
            },
            {
                id: "ischium",
                latin: "Os ischii",
                finnish: "Istuinluu",
                pronunciation: "os-IS-kee-eye",
                features: ["Ischial tuberosity", "Ischial spine", "Greater sciatic notch", "Lesser sciatic notch"],
                description: "Posterior inferior part of the hip bone"
            },
            {
                id: "pubis",
                latin: "Os pubis",
                finnish: "Häpyluu",
                pronunciation: "os-PYOO-bis",
                features: ["Pubic symphysis", "Pubic tubercle", "Pectineal line"],
                description: "Anterior inferior part of the hip bone"
            }
        ]
    },

    lower_limb: {
        category: "Lower Limb",
        bones: [
            {
                id: "femur",
                latin: "Femur",
                finnish: "Resiluu",
                pronunciation: "FEE-mur",
                features: ["Head", "Neck", "Greater trochanter", "Lesser trochanter", "Intertrochanteric line", "Intertrochanteric crest", "Shaft", "Linea aspera", "Medial epicondyle", "Lateral epicondyle", "Medial condyle", "Lateral condyle", "Patellar surface"],
                description: "Longest and strongest bone in the human body"
            },
            {
                id: "patella",
                latin: "Patella",
                finnish: "Polvilumpio",
                pronunciation: "pah-TEL-ah",
                features: ["Base", "Apex", "Articular surface"],
                description: "Sesamoid bone in front of the knee joint"
            },
            {
                id: "tibia",
                latin: "Tibia",
                finnish: "Sääriluu",
                pronunciation: "TIH-bee-ah",
                features: ["Medial condyle", "Lateral condyle", "Tibial tuberosity", "Anterior crest", "Medial malleolus"],
                description: "Medial weight-bearing bone of the leg"
            },
            {
                id: "fibula",
                latin: "Fibula",
                finnish: "Pohjeluu",
                pronunciation: "FIB-yoo-lah",
                features: ["Head", "Neck", "Lateral malleolus"],
                description: "Slender lateral bone of the leg"
            },
            {
                id: "talus",
                latin: "Talus",
                finnish: "Nilkkaluu",
                pronunciation: "TAY-lus",
                features: ["Head", "Neck", "Body", "Trochlea"],
                description: "Uppermost tarsal bone of the foot"
            },
            {
                id: "calcaneus",
                latin: "Calcaneus",
                finnish: "Kantapääluu",
                pronunciation: "kal-KAY-nee-us",
                features: ["Calcaneal tuberosity", "Sustentaculum tali"],
                description: "Largest bone of the foot, forming the heel"
            },
            {
                id: "navicular_foot",
                latin: "Os naviculare",
                finnish: "Veneluu",
                pronunciation: "os-nah-vik-yoo-LAH-ray",
                features: ["Navicular tuberosity"],
                description: "Tarsal bone in the middle of the foot"
            },
            {
                id: "cuboid",
                latin: "Os cuboideum",
                finnish: "Kuutioluu",
                pronunciation: "os-kyoo-BOY-day-um",
                features: ["Peroneal groove"],
                description: "Lateral tarsal bone"
            },
            {
                id: "cuneiforms",
                latin: "Ossa cuneiformia",
                finnish: "Kiilaluut",
                pronunciation: "OS-ah kyoo-nee-ih-FOR-mee-ah",
                features: ["Medial cuneiform", "Intermediate cuneiform", "Lateral cuneiform"],
                description: "3 wedge-shaped tarsal bones"
            },
            {
                id: "metatarsals",
                latin: "Ossa metatarsi",
                finnish: "Jalkapöydänluu",
                pronunciation: "OS-ah met-ah-TAR-sy",
                features: ["Base", "Body/Shaft", "Head", "5th metatarsal tuberosity"],
                description: "5 metatarsal bones (I-V)"
            },
            {
                id: "phalanges_foot",
                latin: "Phalanges pedis",
                finnish: "Varvaskuu",
                pronunciation: "fah-LAN-jeez PEH-dis",
                features: ["Proximal phalanx", "Middle phalanx", "Distal phalanx"],
                description: "14 phalanges of the toes"
            }
        ]
    }
};
