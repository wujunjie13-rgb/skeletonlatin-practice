// Comprehensive skeletal anatomy data with Latin names, Finnish names, and anatomical features
const skeletalData = {
    skull: {
        category: "颅骨 (Skull)",
        bones: [
            {
                id: "frontal",
                chinese: "额骨",
                latin: "Os frontale",
                finnish: "Otsaluu",
                pronunciation: "os-fron-TAH-lay",
                features: ["前额面 (Frontal surface)", "眶上缘 (Supraorbital margin)", "额窦 (Frontal sinus)"],
                description: "形成前额和眼眶上部的骨骼"
            },
            {
                id: "parietal",
                chinese: "顶骨",
                latin: "Os parietale",
                finnish: "Päälakiluu",
                pronunciation: "os-pa-ry-eh-TAH-lay",
                features: ["顶结节 (Parietal eminence)", "上颞线 (Superior temporal line)", "下颞线 (Inferior temporal line)"],
                description: "形成颅顶和侧壁的骨骼"
            },
            {
                id: "occipital",
                chinese: "枕骨",
                latin: "Os occipitale",
                finnish: "Takaraivoluu",
                pronunciation: "os-ok-sih-pih-TAH-lay",
                features: ["枕外隆凸 (External occipital protuberance)", "大孔 (Foramen magnum)", "枕髁 (Occipital condyle)"],
                description: "形成颅底后部和后颅窝"
            },
            {
                id: "temporal",
                chinese: "颞骨",
                latin: "Os temporale",
                finnish: "Ohimoluu",
                pronunciation: "os-tem-po-RAH-lay",
                features: ["乳突 (Mastoid process)", "外耳道 (External acoustic meatus)", "颧突 (Zygomatic process)", "茎突 (Styloid process)"],
                description: "形成颅底和颅侧壁，包含听觉器官"
            },
            {
                id: "sphenoid",
                chinese: "蝶骨",
                latin: "Os sphenoidale",
                finnish: "Kiilaluu",
                pronunciation: "os-sfe-noi-DAH-lay",
                features: ["蝶鞍 (Sella turcica)", "大翼 (Greater wing)", "小翼 (Lesser wing)", "翼突 (Pterygoid process)"],
                description: "位于颅底中部的蝴蝶形骨骼"
            },
            {
                id: "ethmoid",
                chinese: "筛骨",
                latin: "Os ethmoidale",
                finnish: "Seulaluu",
                pronunciation: "os-eth-moi-DAH-lay",
                features: ["筛板 (Cribriform plate)", "鸡冠 (Crista galli)", "筛窦 (Ethmoidal air cells)"],
                description: "形成鼻腔顶部和眼眶内侧壁"
            },
            {
                id: "mandible",
                chinese: "下颌骨",
                latin: "Mandibula",
                finnish: "Alaleuka",
                pronunciation: "man-DIB-yoo-lah",
                features: ["下颌体 (Body)", "下颌支 (Ramus)", "髁突 (Condylar process)", "冠状突 (Coronoid process)", "颏孔 (Mental foramen)"],
                description: "下颌骨，唯一可活动的颅骨"
            },
            {
                id: "maxilla",
                chinese: "上颌骨",
                latin: "Maxilla",
                finnish: "Yläleuka",
                pronunciation: "mak-SIL-ah",
                features: ["额突 (Frontal process)", "颧突 (Zygomatic process)", "腭突 (Palatine process)", "牙槽突 (Alveolar process)"],
                description: "形成上颌和硬腭的大部分"
            },
            {
                id: "zygomatic",
                chinese: "颧骨",
                latin: "Os zygomaticum",
                finnish: "Poskipääluu",
                pronunciation: "os-zy-go-MAH-tih-kum",
                features: ["颞突 (Temporal process)", "额突 (Frontal process)", "上颌突 (Maxillary process)"],
                description: "形成面颊突出部分"
            },
            {
                id: "nasal",
                chinese: "鼻骨",
                latin: "Os nasale",
                finnish: "Nenäluu",
                pronunciation: "os-nah-SAH-lay",
                features: ["鼻桥 (Nasal bridge)"],
                description: "形成鼻梁的小骨"
            },
            {
                id: "lacrimal",
                chinese: "泪骨",
                latin: "Os lacrimale",
                finnish: "Kyynelluu",
                pronunciation: "os-lak-rih-MAH-lay",
                features: ["泪囊窝 (Lacrimal fossa)"],
                description: "眼眶内侧壁的小骨"
            },
            {
                id: "palatine",
                chinese: "腭骨",
                latin: "Os palatinum",
                finnish: "Kitalakiluu",
                pronunciation: "os-pal-ah-TY-num",
                features: ["水平板 (Horizontal plate)", "垂直板 (Perpendicular plate)"],
                description: "形成硬腭后部和鼻腔侧壁"
            },
            {
                id: "vomer",
                chinese: "犁骨",
                latin: "Vomer",
                finnish: "Auranluu",
                pronunciation: "VOH-mer",
                features: ["鼻中隔 (Nasal septum)"],
                description: "形成鼻中隔下部"
            },
            {
                id: "inferior_nasal_concha",
                chinese: "下鼻甲",
                latin: "Concha nasalis inferior",
                finnish: "Alempi nenäkuori",
                pronunciation: "KON-kah nah-SAH-lis in-FEE-ree-or",
                features: ["鼻道 (Nasal meatus)"],
                description: "鼻腔外侧壁的薄骨片"
            }
        ]
    },
    
    vertebral_column: {
        category: "脊柱 (Vertebral Column)",
        bones: [
            {
                id: "cervical_vertebrae",
                chinese: "颈椎",
                latin: "Vertebrae cervicales",
                finnish: "Kaulanikama",
                pronunciation: "ver-TEE-bray ser-vih-KAH-lays",
                features: ["椎体 (Body)", "椎弓 (Vertebral arch)", "横突孔 (Transverse foramen)", "棘突 (Spinous process)"],
                description: "7节颈椎 (C1-C7)"
            },
            {
                id: "atlas",
                chinese: "寰椎",
                latin: "Atlas",
                finnish: "Kannattajanikama",
                pronunciation: "AT-las",
                features: ["前弓 (Anterior arch)", "后弓 (Posterior arch)", "上关节面 (Superior articular facet)"],
                description: "第一颈椎 (C1)"
            },
            {
                id: "axis",
                chinese: "枢椎",
                latin: "Axis",
                finnish: "Kääntäjänikama",
                pronunciation: "AK-sis",
                features: ["齿突 (Dens/Odontoid process)"],
                description: "第二颈椎 (C2)"
            },
            {
                id: "thoracic_vertebrae",
                chinese: "胸椎",
                latin: "Vertebrae thoracicae",
                finnish: "Rintanikama",
                pronunciation: "ver-TEE-bray tho-RAH-sih-kay",
                features: ["肋凹 (Costal facets)", "长棘突 (Long spinous process)"],
                description: "12节胸椎 (T1-T12)"
            },
            {
                id: "lumbar_vertebrae",
                chinese: "腰椎",
                latin: "Vertebrae lumbales",
                finnish: "Lannenikama",
                pronunciation: "ver-TEE-bray lum-BAH-lays",
                features: ["大椎体 (Large body)", "短棘突 (Short spinous process)", "乳突 (Mammillary process)"],
                description: "5节腰椎 (L1-L5)"
            },
            {
                id: "sacrum",
                chinese: "骶骨",
                latin: "Os sacrum",
                finnish: "Ristiselkä",
                pronunciation: "os-SAH-krum",
                features: ["骶底 (Base)", "骶尖 (Apex)", "骶管 (Sacral canal)", "骶孔 (Sacral foramina)"],
                description: "5节骶椎融合而成"
            },
            {
                id: "coccyx",
                chinese: "尾骨",
                latin: "Os coccygis",
                finnish: "Häntäluu",
                pronunciation: "os-KOK-sih-jis",
                features: ["尾骨角 (Coccygeal cornua)"],
                description: "3-5节尾椎融合而成"
            }
        ]
    },

    thorax: {
        category: "胸廓 (Thorax)",
        bones: [
            {
                id: "sternum",
                chinese: "胸骨",
                latin: "Sternum",
                finnish: "Rintalasta",
                pronunciation: "STER-num",
                features: ["胸骨柄 (Manubrium)", "胸骨体 (Body)", "剑突 (Xiphoid process)", "颈静脉切迹 (Jugular notch)"],
                description: "胸部正中的扁平骨"
            },
            {
                id: "ribs",
                chinese: "肋骨",
                latin: "Costae",
                finnish: "Kylkiluut",
                pronunciation: "KOS-tay",
                features: ["肋头 (Head)", "肋颈 (Neck)", "肋结节 (Tubercle)", "肋体 (Body)", "肋角 (Angle)"],
                description: "12对肋骨"
            },
            {
                id: "true_ribs",
                chinese: "真肋",
                latin: "Costae verae",
                finnish: "Todelliset kylkiluut",
                pronunciation: "KOS-tay VEH-ray",
                features: ["直接连接胸骨 (Direct sternal connection)"],
                description: "第1-7对肋骨"
            },
            {
                id: "false_ribs",
                chinese: "假肋",
                latin: "Costae spuriae",
                finnish: "Epätodelliset kylkiluut",
                pronunciation: "KOS-tay SPOO-ree-ay",
                features: ["间接连接胸骨 (Indirect sternal connection)"],
                description: "第8-10对肋骨"
            },
            {
                id: "floating_ribs",
                chinese: "浮肋",
                latin: "Costae fluctuantes",
                finnish: "Kelluvat kylkiluut",
                pronunciation: "KOS-tay fluk-too-AN-tays",
                features: ["不连接胸骨 (No sternal connection)"],
                description: "第11-12对肋骨"
            }
        ]
    },

    upper_limb: {
        category: "上肢骨 (Upper Limb)",
        bones: [
            {
                id: "clavicle",
                chinese: "锁骨",
                latin: "Clavicula",
                finnish: "Solisluu",
                pronunciation: "klah-VIH-koo-lah",
                features: ["胸骨端 (Sternal end)", "肩峰端 (Acromial end)", "圆锥韧带结节 (Conoid tubercle)"],
                description: "连接上肢与躯干的S形骨"
            },
            {
                id: "scapula",
                chinese: "肩胛骨",
                latin: "Scapula",
                finnish: "Lapaluu",
                pronunciation: "SKAP-yoo-lah",
                features: ["肩胛冈 (Spine)", "肩峰 (Acromion)", "喙突 (Coracoid process)", "关节盂 (Glenoid cavity)", "肩胛下窝 (Subscapular fossa)", "冈上窝 (Supraspinous fossa)", "冈下窝 (Infraspinous fossa)"],
                description: "肩部的三角形扁平骨"
            },
            {
                id: "humerus",
                chinese: "肱骨",
                latin: "Humerus",
                finnish: "Olkaluu",
                pronunciation: "HYOO-mer-us",
                features: ["肱骨头 (Head)", "解剖颈 (Anatomical neck)", "外科颈 (Surgical neck)", "大结节 (Greater tubercle)", "小结节 (Lesser tubercle)", "三角肌粗隆 (Deltoid tuberosity)", "桡神经沟 (Radial groove)", "内上髁 (Medial epicondyle)", "外上髁 (Lateral epicondyle)", "滑车 (Trochlea)", "肱骨小头 (Capitulum)"],
                description: "上臂的长骨"
            },
            {
                id: "radius",
                chinese: "桡骨",
                latin: "Radius",
                finnish: "Värttinäluu",
                pronunciation: "RAY-dee-us",
                features: ["桡骨头 (Head)", "桡骨颈 (Neck)", "桡骨粗隆 (Radial tuberosity)", "茎突 (Styloid process)", "尺切迹 (Ulnar notch)"],
                description: "前臂外侧（拇指侧）的长骨"
            },
            {
                id: "ulna",
                chinese: "尺骨",
                latin: "Ulna",
                finnish: "Kyynärluu",
                pronunciation: "UL-nah",
                features: ["鹰嘴 (Olecranon)", "冠状突 (Coronoid process)", "滑车切迹 (Trochlear notch)", "桡切迹 (Radial notch)", "茎突 (Styloid process)"],
                description: "前臂内侧（小指侧）的长骨"
            },
            {
                id: "scaphoid",
                chinese: "舟骨",
                latin: "Os scaphoideum",
                finnish: "Veneluu",
                pronunciation: "os-skaf-OY-day-um",
                features: ["舟骨结节 (Scaphoid tubercle)"],
                description: "腕骨近侧列外侧骨"
            },
            {
                id: "lunate",
                chinese: "月骨",
                latin: "Os lunatum",
                finnish: "Puolikuuluu",
                pronunciation: "os-loo-NAH-tum",
                features: ["月状形 (Crescent shape)"],
                description: "腕骨近侧列中间骨"
            },
            {
                id: "triquetrum",
                chinese: "三角骨",
                latin: "Os triquetrum",
                finnish: "Kolmiomainen luu",
                pronunciation: "os-try-KWEE-trum",
                features: ["豌豆骨关节面 (Pisiform articular surface)"],
                description: "腕骨近侧列内侧骨"
            },
            {
                id: "pisiform",
                chinese: "豌豆骨",
                latin: "Os pisiforme",
                finnish: "Herneluu",
                pronunciation: "os-pih-sih-FOR-may",
                features: ["种子骨 (Sesamoid bone)"],
                description: "腕骨中的种子骨"
            },
            {
                id: "trapezium",
                chinese: "大多角骨",
                latin: "Os trapezium",
                finnish: "Isomonikulmio",
                pronunciation: "os-trah-PEE-zee-um",
                features: ["鞍状关节面 (Saddle joint surface)"],
                description: "腕骨远侧列最外侧骨"
            },
            {
                id: "trapezoid",
                chinese: "小多角骨",
                latin: "Os trapezoideum",
                finnish: "Pikkumonikulmio",
                pronunciation: "os-trah-peh-ZOY-day-um",
                features: ["楔形 (Wedge shape)"],
                description: "腕骨远侧列第二骨"
            },
            {
                id: "capitate",
                chinese: "头状骨",
                latin: "Os capitatum",
                finnish: "Pääluu",
                pronunciation: "os-kap-ih-TAH-tum",
                features: ["头 (Head)"],
                description: "腕骨中最大的骨"
            },
            {
                id: "hamate",
                chinese: "钩骨",
                latin: "Os hamatum",
                finnish: "Koukkuluu",
                pronunciation: "os-hah-MAH-tum",
                features: ["钩突 (Hook/Hamulus)"],
                description: "腕骨远侧列最内侧骨"
            },
            {
                id: "metacarpals",
                chinese: "掌骨",
                latin: "Ossa metacarpi",
                finnish: "Kämmenluu",
                pronunciation: "OS-ah met-ah-KAR-py",
                features: ["基底 (Base)", "体 (Body/Shaft)", "头 (Head)"],
                description: "5根掌骨 (I-V)"
            },
            {
                id: "phalanges_hand",
                chinese: "指骨",
                latin: "Phalanges manus",
                finnish: "Sormiluu",
                pronunciation: "fah-LAN-jeez MAH-nus",
                features: ["近节指骨 (Proximal phalanx)", "中节指骨 (Middle phalanx)", "远节指骨 (Distal phalanx)"],
                description: "手指的14根指骨"
            }
        ]
    },

    pelvic_girdle: {
        category: "骨盆带 (Pelvic Girdle)",
        bones: [
            {
                id: "hip_bone",
                chinese: "髋骨",
                latin: "Os coxae",
                finnish: "Lonkkaluu",
                pronunciation: "os-KOK-say",
                features: ["髋臼 (Acetabulum)", "闭孔 (Obturator foramen)"],
                description: "由髂骨、坐骨、耻骨融合而成"
            },
            {
                id: "ilium",
                chinese: "髂骨",
                latin: "Os ilium",
                finnish: "Suoliluu",
                pronunciation: "os-IH-lee-um",
                features: ["髂嵴 (Iliac crest)", "髂前上棘 (ASIS)", "髂前下棘 (AIIS)", "髂后上棘 (PSIS)", "髂后下棘 (PIIS)", "髂窝 (Iliac fossa)"],
                description: "髋骨上部"
            },
            {
                id: "ischium",
                chinese: "坐骨",
                latin: "Os ischii",
                finnish: "Istuinluu",
                pronunciation: "os-IS-kee-eye",
                features: ["坐骨结节 (Ischial tuberosity)", "坐骨棘 (Ischial spine)", "大坐骨切迹 (Greater sciatic notch)", "小坐骨切迹 (Lesser sciatic notch)"],
                description: "髋骨后下部"
            },
            {
                id: "pubis",
                chinese: "耻骨",
                latin: "Os pubis",
                finnish: "Häpyluu",
                pronunciation: "os-PYOO-bis",
                features: ["耻骨联合 (Pubic symphysis)", "耻骨结节 (Pubic tubercle)", "耻骨梳 (Pectineal line)"],
                description: "髋骨前下部"
            }
        ]
    },

    lower_limb: {
        category: "下肢骨 (Lower Limb)",
        bones: [
            {
                id: "femur",
                chinese: "股骨",
                latin: "Femur",
                finnish: "Resiluu",
                pronunciation: "FEE-mur",
                features: ["股骨头 (Head)", "股骨颈 (Neck)", "大转子 (Greater trochanter)", "小转子 (Lesser trochanter)", "转子间线 (Intertrochanteric line)", "转子间嵴 (Intertrochanteric crest)", "股骨体 (Shaft)", "粗线 (Linea aspera)", "内上髁 (Medial epicondyle)", "外上髁 (Lateral epicondyle)", "内侧髁 (Medial condyle)", "外侧髁 (Lateral condyle)", "髌面 (Patellar surface)"],
                description: "人体最长最强壮的骨"
            },
            {
                id: "patella",
                chinese: "髌骨",
                latin: "Patella",
                finnish: "Polvilumpio",
                pronunciation: "pah-TEL-ah",
                features: ["底 (Base)", "尖 (Apex)", "关节面 (Articular surface)"],
                description: "膝关节前方的种子骨"
            },
            {
                id: "tibia",
                chinese: "胫骨",
                latin: "Tibia",
                finnish: "Sääriluu",
                pronunciation: "TIH-bee-ah",
                features: ["内侧髁 (Medial condyle)", "外侧髁 (Lateral condyle)", "胫骨粗隆 (Tibial tuberosity)", "前嵴 (Anterior crest)", "内踝 (Medial malleolus)"],
                description: "小腿内侧承重骨"
            },
            {
                id: "fibula",
                chinese: "腓骨",
                latin: "Fibula",
                finnish: "Pohjeluu",
                pronunciation: "FIB-yoo-lah",
                features: ["腓骨头 (Head)", "腓骨颈 (Neck)", "外踝 (Lateral malleolus)"],
                description: "小腿外侧细长骨"
            },
            {
                id: "talus",
                chinese: "距骨",
                latin: "Talus",
                finnish: "Nilkkaluu",
                pronunciation: "TAY-lus",
                features: ["距骨头 (Head)", "距骨颈 (Neck)", "距骨体 (Body)", "滑车 (Trochlea)"],
                description: "足部最上方的跗骨"
            },
            {
                id: "calcaneus",
                chinese: "跟骨",
                latin: "Calcaneus",
                finnish: "Kantapääluu",
                pronunciation: "kal-KAY-nee-us",
                features: ["跟骨结节 (Calcaneal tuberosity)", "载距突 (Sustentaculum tali)"],
                description: "足部最大的骨，形成脚跟"
            },
            {
                id: "navicular_foot",
                chinese: "舟骨（足）",
                latin: "Os naviculare",
                finnish: "Veneluu",
                pronunciation: "os-nah-vik-yoo-LAH-ray",
                features: ["舟骨粗隆 (Navicular tuberosity)"],
                description: "足部中间的跗骨"
            },
            {
                id: "cuboid",
                chinese: "骰骨",
                latin: "Os cuboideum",
                finnish: "Kuutioluu",
                pronunciation: "os-kyoo-BOY-day-um",
                features: ["腓骨长肌沟 (Peroneal groove)"],
                description: "足外侧的跗骨"
            },
            {
                id: "cuneiforms",
                chinese: "楔骨",
                latin: "Ossa cuneiformia",
                finnish: "Kiilaluut",
                pronunciation: "OS-ah kyoo-nee-ih-FOR-mee-ah",
                features: ["内侧楔骨 (Medial cuneiform)", "中间楔骨 (Intermediate cuneiform)", "外侧楔骨 (Lateral cuneiform)"],
                description: "3块楔形跗骨"
            },
            {
                id: "metatarsals",
                chinese: "跖骨",
                latin: "Ossa metatarsi",
                finnish: "Jalkapöydänluu",
                pronunciation: "OS-ah met-ah-TAR-sy",
                features: ["基底 (Base)", "体 (Body/Shaft)", "头 (Head)", "第5跖骨粗隆 (5th metatarsal tuberosity)"],
                description: "5根跖骨 (I-V)"
            },
            {
                id: "phalanges_foot",
                chinese: "趾骨",
                latin: "Phalanges pedis",
                finnish: "Varvaskuu",
                pronunciation: "fah-LAN-jeez PEH-dis",
                features: ["近节趾骨 (Proximal phalanx)", "中节趾骨 (Middle phalanx)", "远节趾骨 (Distal phalanx)"],
                description: "足趾的14根趾骨"
            }
        ]
    }
};
