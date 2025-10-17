// Comprehensive skeletal anatomy data with Latin names and anatomical features
// Organized by detailed body parts for better filtering
const skeletalData = {
    skull: {
        category: "Skull",
        bodyPart: "skull",
        bones: [
            {
                id: "frontal",
                english: "Frontal Bone",
                latin: "Os frontale",
                pronunciation: "os-fron-TAH-lay",
                features: ["Frontal surface", "Supraorbital margin", "Frontal sinus"],
                description: "Forms the forehead and upper part of the eye orbits"
            },
            {
                id: "parietal",
                english: "Parietal Bone",
                latin: "Os parietale",
                pronunciation: "os-pa-ry-eh-TAH-lay",
                features: ["Parietal eminence", "Superior temporal line", "Inferior temporal line"],
                description: "Forms the top and sides of the cranium"
            },
            {
                id: "occipital",
                english: "Occipital Bone",
                latin: "Os occipitale",
                pronunciation: "os-ok-sih-pih-TAH-lay",
                features: ["External occipital protuberance", "Foramen magnum", "Occipital condyle"],
                description: "Forms the back and base of the cranium"
            },
            {
                id: "temporal",
                english: "Temporal Bone",
                latin: "Os temporale",
                pronunciation: "os-tem-po-RAH-lay",
                features: ["Mastoid process", "External acoustic meatus", "Zygomatic process", "Styloid process"],
                description: "Forms the base and sides of the cranium, contains the hearing organs"
            },
            {
                id: "sphenoid",
                english: "Sphenoid Bone",
                latin: "Os sphenoidale",
                pronunciation: "os-sfe-noi-DAH-lay",
                features: ["Sella turcica", "Greater wing", "Lesser wing", "Pterygoid process"],
                description: "Butterfly-shaped bone in the middle of the cranial base"
            },
            {
                id: "ethmoid",
                english: "Ethmoid Bone",
                latin: "Os ethmoidale",
                pronunciation: "os-eth-moi-DAH-lay",
                features: ["Cribriform plate", "Crista galli", "Ethmoidal air cells"],
                description: "Forms the roof of the nasal cavity and medial wall of the orbits"
            },
            {
                id: "mandible",
                english: "Mandible",
                latin: "Mandibula",
                pronunciation: "man-DIB-yoo-lah",
                features: ["Body", "Ramus", "Condylar process", "Coronoid process", "Mental foramen"],
                description: "Lower jaw bone, the only movable bone of the skull"
            },
            {
                id: "maxilla",
                english: "Maxilla",
                latin: "Maxilla",
                pronunciation: "mak-SIL-ah",
                features: ["Frontal process", "Zygomatic process", "Palatine process", "Alveolar process"],
                description: "Forms most of the upper jaw and hard palate"
            },
            {
                id: "zygomatic",
                english: "Zygomatic Bone",
                latin: "Os zygomaticum",
                pronunciation: "os-zy-go-MAH-tih-kum",
                features: ["Temporal process", "Frontal process", "Maxillary process"],
                description: "Forms the cheekbone prominence"
            },
            {
                id: "nasal",
                english: "Nasal Bone",
                latin: "Os nasale",
                pronunciation: "os-nah-SAH-lay",
                features: ["Nasal bridge"],
                description: "Small bone forming the bridge of the nose"
            },
            {
                id: "lacrimal",
                english: "Lacrimal Bone",
                latin: "Os lacrimale",
                pronunciation: "os-lak-rih-MAH-lay",
                features: ["Lacrimal fossa"],
                description: "Small bone in the medial wall of the orbit"
            },
            {
                id: "palatine",
                english: "Palatine Bone",
                latin: "Os palatinum",
                pronunciation: "os-pal-ah-TY-num",
                features: ["Horizontal plate", "Perpendicular plate"],
                description: "Forms the posterior part of the hard palate and lateral wall of nasal cavity"
            },
            {
                id: "vomer",
                english: "Vomer",
                latin: "Vomer",
                pronunciation: "VOH-mer",
                features: ["Nasal septum"],
                description: "Forms the lower part of the nasal septum"
            },
            {
                id: "inferior_nasal_concha",
                english: "Inferior Nasal Concha",
                latin: "Concha nasalis inferior",
                pronunciation: "KON-kah nah-SAH-lis in-FEE-ree-or",
                features: ["Nasal meatus"],
                description: "Thin bone plate on the lateral wall of the nasal cavity"
            }
        ]
    },
    
    vertebral_column: {
        category: "Vertebral Column",
        bodyPart: "vertebral",
        bones: [
            {
                id: "cervical_vertebrae",
                english: "Cervical Vertebrae",
                latin: "Vertebrae cervicales",
                pronunciation: "ver-TEE-bray ser-vih-KAH-lays",
                features: ["Body", "Vertebral arch", "Transverse foramen", "Spinous process"],
                description: "7 cervical vertebrae (C1-C7)"
            },
            {
                id: "atlas",
                english: "Atlas",
                latin: "Atlas",
                pronunciation: "AT-las",
                features: ["Anterior arch", "Posterior arch", "Superior articular facet"],
                description: "First cervical vertebra (C1)"
            },
            {
                id: "axis",
                english: "Axis",
                latin: "Axis",
                pronunciation: "AK-sis",
                features: ["Dens/Odontoid process"],
                description: "Second cervical vertebra (C2)"
            },
            {
                id: "thoracic_vertebrae",
                english: "Thoracic Vertebrae",
                latin: "Vertebrae thoracicae",
                pronunciation: "ver-TEE-bray tho-RAH-sih-kay",
                features: ["Costal facets", "Long spinous process"],
                description: "12 thoracic vertebrae (T1-T12)"
            },
            {
                id: "lumbar_vertebrae",
                english: "Lumbar Vertebrae",
                latin: "Vertebrae lumbales",
                pronunciation: "ver-TEE-bray lum-BAH-lays",
                features: ["Large body", "Short spinous process", "Mammillary process"],
                description: "5 lumbar vertebrae (L1-L5)"
            },
            {
                id: "sacrum",
                english: "Sacrum",
                latin: "Os sacrum",
                pronunciation: "os-SAH-krum",
                features: ["Base", "Apex", "Sacral canal", "Sacral foramina"],
                description: "Formed by fusion of 5 sacral vertebrae"
            },
            {
                id: "coccyx",
                english: "Coccyx",
                latin: "Os coccygis",
                pronunciation: "os-KOK-sih-jis",
                features: ["Coccygeal cornua"],
                description: "Formed by fusion of 3-5 coccygeal vertebrae"
            }
        ]
    },

    thorax: {
        category: "Thorax",
        bodyPart: "thorax",
        bones: [
            {
                id: "sternum",
                english: "Sternum",
                latin: "Sternum",
                pronunciation: "STER-num",
                features: ["Manubrium", "Body", "Xiphoid process", "Jugular notch"],
                description: "Flat bone in the center of the chest"
            },
            {
                id: "ribs",
                english: "Ribs",
                latin: "Costae",
                pronunciation: "KOS-tay",
                features: ["Head", "Neck", "Tubercle", "Body", "Angle"],
                description: "12 pairs of ribs"
            },
            {
                id: "true_ribs",
                english: "True Ribs",
                latin: "Costae verae",
                pronunciation: "KOS-tay VEH-ray",
                features: ["Direct sternal connection"],
                description: "Ribs 1-7"
            },
            {
                id: "false_ribs",
                english: "False Ribs",
                latin: "Costae spuriae",
                pronunciation: "KOS-tay SPOO-ree-ay",
                features: ["Indirect sternal connection"],
                description: "Ribs 8-10"
            },
            {
                id: "floating_ribs",
                english: "Floating Ribs",
                latin: "Costae fluctuantes",
                pronunciation: "KOS-tay fluk-too-AN-tays",
                features: ["No sternal connection"],
                description: "Ribs 11-12"
            }
        ]
    },

    shoulder: {
        category: "Shoulder",
        bodyPart: "shoulder",
        bones: [
            {
                id: "clavicle",
                english: "Clavicle",
                latin: "Clavicula",
                pronunciation: "klah-VIH-koo-lah",
                features: ["Sternal end", "Acromial end", "Conoid tubercle"],
                description: "S-shaped bone connecting the upper limb to the trunk"
            },
            {
                id: "scapula",
                english: "Scapula",
                latin: "Scapula",
                pronunciation: "SKAP-yoo-lah",
                features: ["Spine", "Acromion", "Coracoid process", "Glenoid cavity", "Subscapular fossa", "Supraspinous fossa", "Infraspinous fossa"],
                description: "Triangular flat bone of the shoulder"
            }
        ]
    },

    arm: {
        category: "Arm (Humerus)",
        bodyPart: "arm",
        bones: [
            {
                id: "humerus",
                english: "Humerus",
                latin: "Humerus",
                pronunciation: "HYOO-mer-us",
                features: ["Head", "Anatomical neck", "Surgical neck", "Greater tubercle", "Lesser tubercle", "Deltoid tuberosity", "Radial groove", "Medial epicondyle", "Lateral epicondyle", "Trochlea", "Capitulum"],
                description: "Long bone of the upper arm"
            }
        ]
    },

    forearm: {
        category: "Forearm",
        bodyPart: "forearm",
        bones: [
            {
                id: "radius",
                english: "Radius",
                latin: "Radius",
                pronunciation: "RAY-dee-us",
                features: ["Head", "Neck", "Radial tuberosity", "Styloid process", "Ulnar notch"],
                description: "Long bone on the lateral (thumb) side of the forearm"
            },
            {
                id: "ulna",
                english: "Ulna",
                latin: "Ulna",
                pronunciation: "UL-nah",
                features: ["Olecranon", "Coronoid process", "Trochlear notch", "Radial notch", "Styloid process"],
                description: "Long bone on the medial (little finger) side of the forearm"
            }
        ]
    },

    hand: {
        category: "Hand",
        bodyPart: "hand",
        bones: [
            {
                id: "scaphoid",
                english: "Scaphoid",
                latin: "Os scaphoideum",
                pronunciation: "os-skaf-OY-day-um",
                features: ["Scaphoid tubercle"],
                description: "Proximal row carpal bone on the lateral side"
            },
            {
                id: "lunate",
                english: "Lunate",
                latin: "Os lunatum",
                pronunciation: "os-loo-NAH-tum",
                features: ["Crescent shape"],
                description: "Proximal row carpal bone in the middle"
            },
            {
                id: "triquetrum",
                english: "Triquetrum",
                latin: "Os triquetrum",
                pronunciation: "os-try-KWEE-trum",
                features: ["Pisiform articular surface"],
                description: "Proximal row carpal bone on the medial side"
            },
            {
                id: "pisiform",
                english: "Pisiform",
                latin: "Os pisiforme",
                pronunciation: "os-pih-sih-FOR-may",
                features: ["Sesamoid bone"],
                description: "Sesamoid bone in the carpus"
            },
            {
                id: "trapezium",
                english: "Trapezium",
                latin: "Os trapezium",
                pronunciation: "os-trah-PEE-zee-um",
                features: ["Saddle joint surface"],
                description: "Distal row carpal bone, most lateral"
            },
            {
                id: "trapezoid",
                english: "Trapezoid",
                latin: "Os trapezoideum",
                pronunciation: "os-trah-peh-ZOY-day-um",
                features: ["Wedge shape"],
                description: "Distal row carpal bone, second from lateral"
            },
            {
                id: "capitate",
                english: "Capitate",
                latin: "Os capitatum",
                pronunciation: "os-kap-ih-TAH-tum",
                features: ["Head"],
                description: "Largest carpal bone"
            },
            {
                id: "hamate",
                english: "Hamate",
                latin: "Os hamatum",
                pronunciation: "os-hah-MAH-tum",
                features: ["Hook/Hamulus"],
                description: "Distal row carpal bone, most medial"
            },
            {
                id: "metacarpals",
                english: "Metacarpals",
                latin: "Ossa metacarpi",
                pronunciation: "OS-ah met-ah-KAR-py",
                features: ["Base", "Body/Shaft", "Head"],
                description: "5 metacarpal bones (I-V)"
            },
            {
                id: "phalanges_hand",
                english: "Phalanges (Hand)",
                latin: "Phalanges manus",
                pronunciation: "fah-LAN-jeez MAH-nus",
                features: ["Proximal phalanx", "Middle phalanx", "Distal phalanx"],
                description: "14 phalanges of the fingers"
            }
        ]
    },

    pelvis: {
        category: "Pelvis",
        bodyPart: "pelvis",
        bones: [
            {
                id: "hip_bone",
                english: "Hip Bone",
                latin: "Os coxae",
                pronunciation: "os-KOK-say",
                features: ["Acetabulum", "Obturator foramen"],
                description: "Formed by fusion of ilium, ischium, and pubis"
            },
            {
                id: "ilium",
                english: "Ilium",
                latin: "Os ilium",
                pronunciation: "os-IH-lee-um",
                features: ["Iliac crest", "ASIS", "AIIS", "PSIS", "PIIS", "Iliac fossa"],
                description: "Upper portion of the hip bone"
            },
            {
                id: "ischium",
                english: "Ischium",
                latin: "Os ischii",
                pronunciation: "os-IS-kee-eye",
                features: ["Ischial tuberosity", "Ischial spine", "Greater sciatic notch", "Lesser sciatic notch"],
                description: "Posterior inferior portion of the hip bone"
            },
            {
                id: "pubis",
                english: "Pubis",
                latin: "Os pubis",
                pronunciation: "os-PYOO-bis",
                features: ["Pubic symphysis", "Pubic tubercle", "Pectineal line"],
                description: "Anterior inferior portion of the hip bone"
            }
        ]
    },

    femur: {
        category: "Femur (Thigh)",
        bodyPart: "femur",
        bones: [
            {
                id: "femur",
                english: "Femur",
                latin: "Femur",
                pronunciation: "FEE-mur",
                features: ["Head", "Neck", "Greater trochanter", "Lesser trochanter", "Intertrochanteric line", "Intertrochanteric crest", "Shaft", "Linea aspera", "Medial epicondyle", "Lateral epicondyle", "Medial condyle", "Lateral condyle", "Patellar surface"],
                description: "Longest and strongest bone in the human body"
            }
        ]
    },

    patella: {
        category: "Patella (Knee)",
        bodyPart: "patella",
        bones: [
            {
                id: "patella",
                english: "Patella",
                latin: "Patella",
                pronunciation: "pah-TEL-ah",
                features: ["Base", "Apex", "Articular surface"],
                description: "Sesamoid bone anterior to the knee joint"
            }
        ]
    },

    tibia_fibula: {
        category: "Tibia & Fibula (Lower Leg)",
        bodyPart: "tibia-fibula",
        bones: [
            {
                id: "tibia",
                english: "Tibia",
                latin: "Tibia",
                pronunciation: "TIH-bee-ah",
                features: ["Medial condyle", "Lateral condyle", "Tibial tuberosity", "Anterior crest", "Medial malleolus"],
                description: "Weight-bearing bone on the medial side of the lower leg"
            },
            {
                id: "fibula",
                english: "Fibula",
                latin: "Fibula",
                pronunciation: "FIB-yoo-lah",
                features: ["Head", "Neck", "Lateral malleolus"],
                description: "Slender bone on the lateral side of the lower leg"
            }
        ]
    },

    foot: {
        category: "Foot",
        bodyPart: "foot",
        bones: [
            {
                id: "talus",
                english: "Talus",
                latin: "Talus",
                pronunciation: "TAY-lus",
                features: ["Head", "Neck", "Body", "Trochlea"],
                description: "Uppermost tarsal bone of the foot"
            },
            {
                id: "calcaneus",
                english: "Calcaneus",
                latin: "Calcaneus",
                pronunciation: "kal-KAY-nee-us",
                features: ["Calcaneal tuberosity", "Sustentaculum tali"],
                description: "Largest bone of the foot, forms the heel"
            },
            {
                id: "navicular_foot",
                english: "Navicular (Foot)",
                latin: "Os naviculare",
                pronunciation: "os-nah-vik-yoo-LAH-ray",
                features: ["Navicular tuberosity"],
                description: "Tarsal bone in the middle of the foot"
            },
            {
                id: "cuboid",
                english: "Cuboid",
                latin: "Os cuboideum",
                pronunciation: "os-kyoo-BOY-day-um",
                features: ["Peroneal groove"],
                description: "Tarsal bone on the lateral side of the foot"
            },
            {
                id: "cuneiforms",
                english: "Cuneiforms",
                latin: "Ossa cuneiformia",
                pronunciation: "OS-ah kyoo-nee-ih-FOR-mee-ah",
                features: ["Medial cuneiform", "Intermediate cuneiform", "Lateral cuneiform"],
                description: "3 wedge-shaped tarsal bones"
            },
            {
                id: "metatarsals",
                english: "Metatarsals",
                latin: "Ossa metatarsi",
                pronunciation: "OS-ah met-ah-TAR-sy",
                features: ["Base", "Body/Shaft", "Head", "5th metatarsal tuberosity"],
                description: "5 metatarsal bones (I-V)"
            },
            {
                id: "phalanges_foot",
                english: "Phalanges (Foot)",
                latin: "Phalanges pedis",
                pronunciation: "fah-LAN-jeez PEH-dis",
                features: ["Proximal phalanx", "Middle phalanx", "Distal phalanx"],
                description: "14 phalanges of the toes"
            }
        ]
    }
};
