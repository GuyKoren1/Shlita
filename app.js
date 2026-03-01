// ==================== Configuration ====================
const PASSWORDS = {
    primary: '7368',   // Admin access
    secondary: '6711'  // Viewer access
};

// ==================== Embedded Personnel Data ====================
const INITIAL_PERSONNEL_DATA = [
  {"rank":"רס\"ל","name":"תום ורמן","profession":"נהג","team":"אבני","department":"121","personalId":"8811109","weaponId":"1956957","notes":""},
  {"rank":"סמל","name":"יעקב אראל","profession":"תותחן","team":"אבני","department":"121","personalId":"8396175","weaponId":"5029635","notes":"חסר טופס החתמה"},
  {"rank":"סרן","name":"אבשלום ברסלב","profession":"מפקץ","team":"אבשה","department":"","personalId":"","weaponId":"5067198","notes":""},
  {"rank":"רס\"ם","name":"רועי איו","profession":"נהג","team":"אורין","department":"121","personalId":"5913071","weaponId":"9256977","notes":""},
  {"rank":"סרן","name":"אוריין מגן","profession":"מפקץ","team":"אורין","department":"121","personalId":"8050933","weaponId":"","notes":""},
  {"rank":"רס\"ר","name":"דוד בראז","profession":"טען","team":"אורין","department":"121","personalId":"6104961","weaponId":"4084434","notes":"חסר טופס החתמה"},
  {"rank":"רס\"ם","name":"דור בן מאיר","profession":"תותחן","team":"אורין","department":"121","personalId":"5771680","weaponId":"5041607","notes":""},
  {"rank":"רס\"ר","name":"עמנואל טואטי","profession":"תותחן","team":"אידלבוים","department":"121","personalId":"8230202","weaponId":"5047565","notes":""},
  {"rank":"סמ\"ר","name":"ניתאי כספי","profession":"נהג","team":"אידלבוים","department":"121","personalId":"7527065","weaponId":"5171714","notes":""},
  {"rank":"סרן","name":"יונתן אידלבוים","profession":"מפקץ","team":"אידלבוים","department":"121","personalId":"7597913","weaponId":"9133307","notes":""},
  {"rank":"רס\"ל","name":"אוהד עילם","profession":"טען","team":"אידלבוים","department":"121","personalId":"8853274","weaponId":"9448833","notes":""},
  {"rank":"רס\"ר","name":"אורי ויזל","profession":"תותחן","team":"בוקסבוים","department":"121","personalId":"7640983","weaponId":"5016412","notes":""},
  {"rank":"רס\"ר","name":"ארז דנינו","profession":"נהג","team":"בוקסבוים","department":"121","personalId":"6176151","weaponId":"3444077","notes":""},
  {"rank":"סרן","name":"איתן בוקסבוים","profession":"מפקץ","team":"בוקסבוים","department":"121","personalId":"5865402","weaponId":"4625793","notes":""},
  {"rank":"רס\"ר","name":"עודד נבנצל","profession":"טען","team":"בוקסבוים","department":"121","personalId":"6909483","weaponId":"4984063","notes":""},
  {"rank":"רס\"ר","name":"אדם פינקווסקי","profession":"טען","team":"בוקסבוים","department":"121","personalId":"7725004","weaponId":"","notes":""},
  {"rank":"רס\"ם","name":"משה יפה","profession":"נהג","team":"גיא לנדנר","department":"89","personalId":"5791198","weaponId":"5180999","notes":""},
  {"rank":"סמ\"ר","name":"אהרון ויצמן","profession":"תותחן","team":"גיא לנדנר","department":"89","personalId":"7545629","weaponId":"9248758","notes":""},
  {"rank":"רס\"ם","name":"יונתן שפנגלט","profession":"תותחן","team":"יובל","department":"89","personalId":"5307243","weaponId":"9227283","notes":""},
  {"rank":"רס\"ר","name":"ישראל גליק","profession":"טען","team":"יובל","department":"89","personalId":"7673711","weaponId":"5102417","notes":""},
  {"rank":"סרן","name":"יובל קרן","profession":"מפקץ","team":"יובל","department":"89","personalId":"8296053","weaponId":"9265177","notes":"אופסן ביום חמישי 03.7"},
  {"rank":"רס\"ם","name":"משה וולף","profession":"נהג","team":"יובל","department":"89","personalId":"7395564","weaponId":"","notes":""},
  {"rank":"רס\"ם","name":"אלעד רובינסון","profession":"תותחן","team":"ליאון","department":"129","personalId":"5801485","weaponId":"5126934","notes":""},
  {"rank":"רס\"ן","name":"ליאון בן נדבה","profession":"מפקץ","team":"ליאון","department":"129","personalId":"5947066","weaponId":"5172307","notes":""},
  {"rank":"רס\"ר","name":"אופיר קולט","profession":"נהג","team":"ליאון","department":"129","personalId":"5998450","weaponId":"5246048","notes":""},
  {"rank":"רס\"ר","name":"עמרי צרפתי","profession":"טען","team":"ליאון","department":"129","personalId":"7723386","weaponId":"9446866","notes":""},
  {"rank":"סרן","name":"משה יאיר שושן","profession":"מפקץ","team":"מושי","department":"89","personalId":"6109029","weaponId":"4554658","notes":""},
  {"rank":"רס\"ר","name":"הראל בלום","profession":"תותחן","team":"מושי","department":"89","personalId":"8271842","weaponId":"5165122","notes":""},
  {"rank":"רס\"ל","name":"חיים אלטבך","profession":"טען","team":"מושי","department":"89","personalId":"7552722","weaponId":"9167085","notes":""},
  {"rank":"רס\"ר","name":"יואל רענן","profession":"נהג","team":"מושי","department":"89","personalId":"5817725","weaponId":"9388188","notes":""},
  {"rank":"סמ\"ר","name":"נועם גולדמן","profession":"תותחן","team":"ספייר","department":"89","personalId":"8517180","weaponId":"","notes":""},
  {"rank":"רס\"ם","name":"נבות עלי","profession":"תותחן","team":"ספייר","department":"129","personalId":"5871598","weaponId":"9417272","notes":""},
  {"rank":"סגן","name":"עומרי בן חיים","profession":"מפקץ","team":"עומרי","department":"89","personalId":"8894722","weaponId":"9446489","notes":""},
  {"rank":"סרן","name":"עקיבא יעקבוביץ","profession":"מפקץ","team":"עקיבא","department":"121","personalId":"5981832","weaponId":"9164788","notes":""},
  {"rank":"רס\"ר","name":"אביתר לרנר","profession":"נהג","team":"עקיבא","department":"121","personalId":"7535343","weaponId":"5127172","notes":""},
  {"rank":"רס\"ם","name":"יהונתן טאוב","profession":"תותחן","team":"עקיבא","department":"121","personalId":"7707600","weaponId":"5148622","notes":""},
  {"rank":"רס\"ר","name":"דוד סולטן","profession":"טען","team":"עקיבא","department":"121","personalId":"6046692","weaponId":"5177629","notes":""},
  {"rank":"רס\"ר","name":"עדי אברהם","profession":"נהג","team":"רהב","department":"121","personalId":"6178363","weaponId":"5647874","notes":""},
  {"rank":"רס\"ל","name":"איתמר אסרף","profession":"תותחן","team":"רהב","department":"121","personalId":"8375283","weaponId":"9179803","notes":"חסר טופס החתמה"},
  {"rank":"סגן","name":"רהב נוריאליאן עג'מי","profession":"מפקץ","team":"רהב","department":"121","personalId":"8764453","weaponId":"9446133","notes":"חסר טופס החתמה"},
  {"rank":"רס\"ל","name":"דניאל בוטקביץ","profession":"טען","team":"שטרן","department":"129","personalId":"8757623","weaponId":"5081291","notes":""},
  {"rank":"רס\"ל","name":"גיא מויאל","profession":"נהג","team":"שטרן","department":"129","personalId":"8189629","weaponId":"5167442","notes":""},
  {"rank":"סרן","name":"נדב שטרן","profession":"מפקץ","team":"שטרן","department":"129","personalId":"7559964","weaponId":"5191394","notes":""},
  {"rank":"רס\"ל","name":"בן ישראל","profession":"תותחן","team":"שטרן","department":"129","personalId":"8183988","weaponId":"9229884","notes":""},
  {"rank":"סגן","name":"שי בצ'ינסקי","profession":"מפקץ","team":"שי בצ'ינסקי","department":"129","personalId":"8783439","weaponId":"5073811","notes":"חסר טופס החתמה"},
  {"rank":"סמל","name":"דביר אבני","profession":"טען","team":"שי בצ'ינסקי","department":"","personalId":"8434955","weaponId":"5079252","notes":"חסר טופס החתמה"},
  {"rank":"רס\"ל","name":"חנן וקנין","profession":"נהג","team":"שי בצ'ינסקי","department":"129","personalId":"8874899","weaponId":"9180988","notes":""},
  {"rank":"סמ\"ר","name":"ניר זנד","profession":"טען","team":"שמולביץ","department":"129","personalId":"8402357","weaponId":"4982225","notes":""},
  {"rank":"סרן","name":"גל שמולוביץ","profession":"מפקץ","team":"שמולביץ","department":"129","personalId":"5892142","weaponId":"5083537","notes":""},
  {"rank":"רס\"ר","name":"איתן אברמן","profession":"נהג","team":"שמולביץ","department":"129","personalId":"5803413","weaponId":"5095719","notes":""},
  {"rank":"סמ\"ר","name":"הדר וולף","profession":"תותחן","team":"שמולביץ","department":"129","personalId":"8563998","weaponId":"5162564","notes":""},
  {"rank":"רס\"ר","name":"איל שלו","profession":"ק. שליטה","team":"Mמפלג","department":"","personalId":"5816827","weaponId":"4163198","notes":""},
  {"rank":"סא\"ל","name":"דניאל ציון","profession":"מ\"פ","team":"Mמפלג","department":"","personalId":"7691433","weaponId":"5037920","notes":""},
  {"rank":"סרן","name":"דור אפללו","profession":"קלג","team":"Mמפלג","department":"","personalId":"5415367","weaponId":"5079539","notes":""},
  {"rank":"רס\"ל","name":"יותם אופק","profession":"נהג מפלג","team":"Mמפלג","department":"","personalId":"8257190","weaponId":"5116740","notes":""},
  {"rank":"רס\"ר","name":"תום מלמד","profession":"סמבצ","team":"Mמפלג","department":"","personalId":"8109237","weaponId":"5123219","notes":""},
  {"rank":"סרן","name":"גיא קורן","profession":"קהד","team":"Mמפלג","department":"","personalId":"5674877","weaponId":"5167650","notes":""},
  {"rank":"רס\"ר","name":"ערן עזרא","profession":"רספ","team":"Mמפלג","department":"","personalId":"5812924","weaponId":"5185935","notes":""},
  {"rank":"רס\"ר","name":"אלעד גינזבורג","profession":"סמבצ","team":"Mמפלג","department":"","personalId":"5866372","weaponId":"5023633","notes":""},
  {"rank":"רס\"ם","name":"אמיר טנצר","profession":"שליש","team":"Mמפלג","department":"","personalId":"7682499","weaponId":"9227203","notes":""},
  {"rank":"רס\"ן","name":"יאיר יודקובסקי","profession":"קהד","team":"Mמפלג","department":"","personalId":"7177661","weaponId":"9251542","notes":""},
  {"rank":"רס\"ר","name":"איתי שגב","profession":"סרספ","team":"Mמפלג","department":"","personalId":"8319695","weaponId":"9265013","notes":""},
  {"rank":"רס\"ן","name":"חן שטורמן","profession":"סמפ","team":"Mמפלג","department":"","personalId":"7092932","weaponId":"9412168","notes":""},
  {"rank":"רס\"ם","name":"בוריס סמטנין","profession":"סרספ","team":"Mמפלג","department":"","personalId":"5324895","weaponId":"9424110","notes":""}
];

// ==================== Embedded Cameras Data ====================
const CAMERA_EQUIPMENT_TYPES = [
    'CF', 'אולר', 'אדום', 'מבן', 'מכלול', 'מדיה מכלול', 'מדיה אלעד ירוק',
    'אלעד ירוק', 'כרטיס מפעיל', '710', 'וילון', 'מאג 1', 'מאג 2',
    'מיקרון', 'רימונים', 'משקפת', 'מצפן'
];

const INITIAL_CAMERAS_DATA = [
    {
        id: '_cam_320', tank: '320', commander: 'שטרן', sourceBrigade: '129',
        items: [
            { name: 'CF', serial: '986627', status: 'תקין' },
            { name: 'אולר', serial: '102309188', status: 'תקין' },
            { name: 'אדום', serial: '552846', status: 'תקין' },
            { name: 'מבן', serial: '761313', status: 'תקין' },
            { name: 'מכלול', serial: '805136', status: 'תקין' },
            { name: 'מדיה מכלול', serial: '1114916', status: 'תקין' },
            { name: 'מדיה אלעד ירוק', serial: '1110795', status: 'תקין' },
            { name: 'אלעד ירוק', serial: '483799', status: 'תקין' },
            { name: 'כרטיס מפעיל', serial: '948165', status: 'תקין' },
            { name: '710', serial: '', status: 'תקין' },
            { name: 'וילון', serial: '796022', status: 'תקין' },
            { name: 'מאג 1', serial: '5040', status: 'תקין' },
            { name: 'מאג 2', serial: '094', status: 'תקין' },
            { name: 'מיקרון', serial: '207', status: 'תקין' },
            { name: 'רימונים', serial: '8', status: 'תקין' },
            { name: 'משקפת', serial: 'V', status: 'תקין' },
            { name: 'מצפן', serial: 'V', status: 'תקין' }
        ]
    },
    {
        id: '_cam_439', tank: '439', commander: "בצ'ינסקי", sourceBrigade: '129',
        items: [
            { name: 'CF', serial: '986702', status: 'תקין' },
            { name: 'אולר', serial: '102307457', status: 'תקין' },
            { name: 'אדום', serial: '552978', status: 'תקין' },
            { name: 'מבן', serial: '765370', status: 'תקין' },
            { name: 'מכלול', serial: '530293', status: 'תקין' },
            { name: 'מדיה מכלול', serial: '1103044', status: 'תקין' },
            { name: 'מדיה אלעד ירוק', serial: '1105647', status: 'תקין' },
            { name: 'אלעד ירוק', serial: '483500', status: 'תקין' },
            { name: 'כרטיס מפעיל', serial: '903640', status: 'תקין' },
            { name: '710', serial: '', status: 'תקין' },
            { name: 'וילון', serial: '88050163', status: 'תקין' },
            { name: 'מאג 1', serial: '2274', status: 'תקין' },
            { name: 'מאג 2', serial: '921', status: 'תקין' },
            { name: 'מיקרון', serial: '199', status: 'תקין' },
            { name: 'רימונים', serial: '8', status: 'תקין' },
            { name: 'משקפת', serial: 'V', status: 'תקין' },
            { name: 'מצפן', serial: 'V', status: 'תקין' }
        ]
    },
    {
        id: '_cam_325', tank: '325', commander: 'רהב', sourceBrigade: '89',
        items: [
            { name: 'CF', serial: '989330', status: 'תקין' },
            { name: 'אולר', serial: '102307335', status: 'תקין' },
            { name: 'אדום', serial: '552910', status: 'תקין' },
            { name: 'מבן', serial: '767446', status: 'תקין' },
            { name: 'מכלול', serial: '828899', status: 'תקין' },
            { name: 'מדיה מכלול', serial: '1103629', status: 'תקין' },
            { name: 'מדיה אלעד ירוק', serial: '110686', status: 'תקין' },
            { name: 'אלעד ירוק', serial: '482404', status: 'תקין' },
            { name: 'כרטיס מפעיל', serial: '0117813907', status: 'תקין' },
            { name: '710', serial: '', status: 'תקין' },
            { name: 'וילון', serial: '81520016', status: 'תקין' },
            { name: 'מאג 1', serial: '198', status: 'תקין' },
            { name: 'מאג 2', serial: '333', status: 'תקין' },
            { name: 'מיקרון', serial: '205', status: 'תקין' },
            { name: 'רימונים', serial: '8', status: 'תקין' },
            { name: 'משקפת', serial: 'V', status: 'תקין' },
            { name: 'מצפן', serial: 'V', status: 'תקין' }
        ]
    },
    {
        id: '_cam_281', tank: '281', commander: 'אוריין', sourceBrigade: '121',
        items: [
            { name: 'CF', serial: '916253', status: 'תקין' },
            { name: 'אולר', serial: '102307469', status: 'תקין' },
            { name: 'אדום', serial: '', status: 'תקין' },
            { name: 'מבן', serial: '761500', status: 'תקין' },
            { name: 'מכלול', serial: '522384', status: 'תקין' },
            { name: 'מדיה מכלול', serial: '1105838', status: 'תקין' },
            { name: 'מדיה אלעד ירוק', serial: '1100993', status: 'תקין' },
            { name: 'אלעד ירוק', serial: '484228', status: 'תקין' },
            { name: 'כרטיס מפעיל', serial: '0078751749', status: 'תקין' },
            { name: '710', serial: '', status: 'תקין' },
            { name: 'וילון', serial: '69703073', status: 'תקין' },
            { name: 'מאג 1', serial: '910', status: 'תקין' },
            { name: 'מאג 2', serial: '5521', status: 'תקין' },
            { name: 'מיקרון', serial: '204', status: 'תקין' },
            { name: 'רימונים', serial: '8', status: 'תקין' },
            { name: 'משקפת', serial: 'V', status: 'תקין' },
            { name: 'מצפן', serial: 'V', status: 'תקין' }
        ]
    },
    {
        id: '_cam_139', tank: '139', commander: 'מושי', sourceBrigade: '89',
        items: [
            { name: 'CF', serial: '989079', status: 'תקין' },
            { name: 'אולר', serial: '102301003', status: 'תקין' },
            { name: 'אדום', serial: '553078', status: 'תקין' },
            { name: 'מבן', serial: '765282', status: 'תקין' },
            { name: 'מכלול', serial: '523255', status: 'תקין' },
            { name: 'מדיה מכלול', serial: '1111535', status: 'תקין' },
            { name: 'מדיה אלעד ירוק', serial: '1114386', status: 'תקין' },
            { name: 'אלעד ירוק', serial: '482035', status: 'תקין' },
            { name: 'כרטיס מפעיל', serial: '0083702858', status: 'תקין' },
            { name: '710', serial: '', status: 'תקין' },
            { name: 'וילון', serial: '482835', status: 'תקין' },
            { name: 'מאג 1', serial: '9450', status: 'תקין' },
            { name: 'מאג 2', serial: '6790', status: 'תקין' },
            { name: 'מיקרון', serial: '190', status: 'תקין' },
            { name: 'רימונים', serial: '8', status: 'תקין' },
            { name: 'משקפת', serial: 'V', status: 'תקין' },
            { name: 'מצפן', serial: 'V', status: 'תקין' }
        ]
    },
    {
        id: '_cam_319', tank: '319', commander: 'עקיבא', sourceBrigade: '89',
        items: [
            { name: 'CF', serial: '989727', status: 'תקין' },
            { name: 'אולר', serial: '1022301398', status: 'תקין' },
            { name: 'אדום', serial: '552516', status: 'תקין' },
            { name: 'מבן', serial: '767435', status: 'תקין' },
            { name: 'מכלול', serial: '529262', status: 'תקין' },
            { name: 'מדיה מכלול', serial: '1107786', status: 'תקין' },
            { name: 'מדיה אלעד ירוק', serial: '1103374', status: 'תקין' },
            { name: 'אלעד ירוק', serial: '482696', status: 'תקין' },
            { name: 'כרטיס מפעיל', serial: '117813967', status: 'תקין' },
            { name: '710', serial: '', status: 'תקין' },
            { name: 'וילון', serial: '7960295', status: 'תקין' },
            { name: 'מאג 1', serial: '031', status: 'תקין' },
            { name: 'מאג 2', serial: '230', status: 'תקין' },
            { name: 'מיקרון', serial: '201', status: 'תקין' },
            { name: 'רימונים', serial: '8', status: 'תקין' },
            { name: 'משקפת', serial: 'V', status: 'תקין' },
            { name: 'מצפן', serial: 'V', status: 'תקין' }
        ]
    },
    {
        id: '_cam_029', tank: '029', commander: 'שמול', sourceBrigade: '129',
        items: [
            { name: 'CF', serial: '989080', status: 'תקין' },
            { name: 'אולר', serial: '', status: 'תקין' },
            { name: 'אדום', serial: '', status: 'תקין' },
            { name: 'מבן', serial: '765771', status: 'תקין' },
            { name: 'מכלול', serial: '805981', status: 'תקין' },
            { name: 'מדיה מכלול', serial: '1113768', status: 'תקין' },
            { name: 'מדיה אלעד ירוק', serial: '1107403', status: 'תקין' },
            { name: 'אלעד ירוק', serial: '482912', status: 'תקין' },
            { name: 'כרטיס מפעיל', serial: '029475', status: 'תקין' },
            { name: '710', serial: '', status: 'תקין' },
            { name: 'וילון', serial: '9760152', status: 'תקין' },
            { name: 'מאג 1', serial: '179', status: 'תקין' },
            { name: 'מאג 2', serial: '330', status: 'תקין' },
            { name: 'מיקרון', serial: '151', status: 'תקין' },
            { name: 'רימונים', serial: '8', status: 'תקין' },
            { name: 'משקפת', serial: 'V', status: 'תקין' },
            { name: 'מצפן', serial: 'V', status: 'תקין' }
        ]
    },
    {
        id: '_cam_mefaked', tank: 'מ״פ', commander: 'רוזן', sourceBrigade: '',
        items: [
            { name: 'CF', serial: '548639', status: 'תקין' },
            { name: 'אולר', serial: '102304863', status: 'תקין' },
            { name: 'אדום', serial: '', status: 'תקין' },
            { name: 'מבן', serial: '', status: 'תקין' },
            { name: 'מכלול', serial: '', status: 'תקין' },
            { name: 'מדיה מכלול', serial: '', status: 'תקין' },
            { name: 'מדיה אלעד ירוק', serial: '', status: 'תקין' },
            { name: 'אלעד ירוק', serial: '', status: 'תקין' },
            { name: 'כרטיס מפעיל', serial: '', status: 'תקין' },
            { name: '710', serial: '', status: 'תקין' },
            { name: 'וילון', serial: '', status: 'תקין' },
            { name: 'מאג 1', serial: '', status: 'תקין' },
            { name: 'מאג 2', serial: '', status: 'תקין' },
            { name: 'מיקרון', serial: '', status: 'תקין' },
            { name: 'רימונים', serial: '', status: 'תקין' },
            { name: 'משקפת', serial: '', status: 'תקין' },
            { name: 'מצפן', serial: '', status: 'תקין' }
        ]
    },
    {
        id: '_cam_saman', tank: 'סמ״פ', commander: 'יובל', sourceBrigade: '',
        items: [
            { name: 'CF', serial: '552719', status: 'תקין' },
            { name: 'אולר', serial: '102307464', status: 'תקין' },
            { name: 'אדום', serial: '', status: 'תקין' },
            { name: 'מבן', serial: '', status: 'תקין' },
            { name: 'מכלול', serial: '', status: 'תקין' },
            { name: 'מדיה מכלול', serial: '', status: 'תקין' },
            { name: 'מדיה אלעד ירוק', serial: '', status: 'תקין' },
            { name: 'אלעד ירוק', serial: '', status: 'תקין' },
            { name: 'כרטיס מפעיל', serial: '', status: 'תקין' },
            { name: '710', serial: '', status: 'תקין' },
            { name: 'וילון', serial: '', status: 'תקין' },
            { name: 'מאג 1', serial: '', status: 'תקין' },
            { name: 'מאג 2', serial: '', status: 'תקין' },
            { name: 'מיקרון', serial: '', status: 'תקין' },
            { name: 'רימונים', serial: '', status: 'תקין' },
            { name: 'משקפת', serial: '', status: 'תקין' },
            { name: 'מצפן', serial: '', status: 'תקין' }
        ]
    },
    {
        id: '_cam_shulhan', tank: 'שולחן שליטה', commander: 'איל', sourceBrigade: '',
        items: [
            { name: 'CF', serial: '', status: 'תקין' },
            { name: 'אולר', serial: '', status: 'תקין' },
            { name: 'אדום', serial: '', status: 'תקין' },
            { name: 'מבן', serial: '', status: 'תקין' },
            { name: 'מכלול', serial: '', status: 'תקין' },
            { name: 'מדיה מכלול', serial: '', status: 'תקין' },
            { name: 'מדיה אלעד ירוק', serial: '', status: 'תקין' },
            { name: 'אלעד ירוק', serial: '', status: 'תקין' },
            { name: 'כרטיס מפעיל', serial: '', status: 'תקין' },
            { name: '710', serial: '', status: 'תקין' },
            { name: 'וילון', serial: '', status: 'תקין' },
            { name: 'מאג 1', serial: '', status: 'תקין' },
            { name: 'מאג 2', serial: '', status: 'תקין' },
            { name: 'מיקרון', serial: '', status: 'תקין' },
            { name: 'רימונים', serial: '', status: 'תקין' },
            { name: 'משקפת', serial: '', status: 'תקין' },
            { name: 'מצפן', serial: '', status: 'תקין' }
        ]
    },
    {
        id: '_cam_mechola', tank: 'מכולה', commander: '', sourceBrigade: '',
        items: [
            { name: 'CF', serial: '', status: 'תקין' },
            { name: 'אולר', serial: '', status: 'תקין' },
            { name: 'אדום', serial: '', status: 'תקין' },
            { name: 'מבן', serial: '', status: 'תקין' },
            { name: 'מכלול', serial: '', status: 'תקין' },
            { name: 'מדיה מכלול', serial: '', status: 'תקין' },
            { name: 'מדיה אלעד ירוק', serial: '', status: 'תקין' },
            { name: 'אלעד ירוק', serial: '', status: 'תקין' },
            { name: 'כרטיס מפעיל', serial: '', status: 'תקין' },
            { name: '710', serial: '', status: 'תקין' },
            { name: 'וילון', serial: '', status: 'תקין' },
            { name: 'מאג 1', serial: '', status: 'תקין' },
            { name: 'מאג 2', serial: '', status: 'תקין' },
            { name: 'מיקרון', serial: '', status: 'תקין' },
            { name: 'רימונים', serial: '', status: 'תקין' },
            { name: 'משקפת', serial: '', status: 'תקין' },
            { name: 'מצפן', serial: '', status: 'תקין' }
        ]
    }
];

const FIXED_COLUMNS = [
    { key: 'name', label: 'שם', type: 'text' },
    { key: 'rank', label: 'דרגה', type: 'text' },
    { key: 'profession', label: 'מקצוע', type: 'text' },
    { key: 'team', label: 'צוות', type: 'text' },
    { key: 'department', label: 'מחלקה', type: 'text' },
    { key: 'personalId', label: 'מס אישי', type: 'text' }
];

const DEFAULT_COLUMN_CONFIG = [
    { key: 'name', label: 'שם', isPrimary: true, isFilter: false },
    { key: 'rank', label: 'דרגה', isPrimary: false, isFilter: true },
    { key: 'profession', label: 'מקצוע', isPrimary: false, isFilter: true },
    { key: 'team', label: 'צוות', isPrimary: false, isFilter: true },
    { key: 'department', label: 'מחלקה', isPrimary: false, isFilter: true },
    { key: 'personalId', label: 'מס אישי', isPrimary: false, isFilter: false }
];

// ==================== State ====================
let state = {
    accessLevel: null, // 'admin' or 'viewer'
    personnel: [],
    customColumns: [],
    activities: [],
    columnConfig: null, // dynamic column config (null = use default)
    sortColumn: null,
    sortDirection: 'asc',
    editingCell: null,
    editingPersonIndex: null, // for edit mode in modal
    currentActivityId: null,
    cameras: []
};

// ==================== Initialize ====================
document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    await loadState();
    document.getElementById('passwordInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleLogin();
    });
});

// ==================== Auth ====================
function handleLogin() {
    const password = document.getElementById('passwordInput').value;
    const errorEl = document.getElementById('loginError');

    if (password === PASSWORDS.primary) {
        state.accessLevel = 'admin';
    } else if (password === PASSWORDS.secondary) {
        state.accessLevel = 'viewer';
    } else {
        errorEl.textContent = 'סיסמה שגויה';
        document.getElementById('passwordInput').value = '';
        return;
    }

    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');

    const badge = document.getElementById('accessLevel');
    if (state.accessLevel === 'admin') {
        badge.textContent = 'מנהל';
        badge.className = 'access-badge admin';
    } else {
        badge.textContent = 'צפייה';
        badge.className = 'access-badge viewer';
    }

    initApp();
}

function handleLogout() {
    state.accessLevel = null;
    document.getElementById('mainApp').classList.add('hidden');
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('passwordInput').value = '';
    document.getElementById('loginError').textContent = '';
}

// ==================== Storage ====================
async function loadState() {
    try {
        const res = await fetch('/api/data');
        if (res.ok) {
            const data = await res.json();
            state.personnel = data.personnel || [];
            state.customColumns = data.customColumns || [];
            state.activities = data.activities || [];
            state.columnConfig = data.columnConfig || null;
            state.cameras = data.cameras || [];
            return;
        }
    } catch (err) {
        console.warn('Server unavailable, falling back to localStorage:', err);
    }
    // Fallback to localStorage if server is unreachable
    const saved = localStorage.getItem('shlita_data');
    if (saved) {
        const parsed = JSON.parse(saved);
        state.personnel = parsed.personnel || [];
        state.customColumns = parsed.customColumns || [];
        state.activities = parsed.activities || [];
        state.columnConfig = parsed.columnConfig || null;
        state.cameras = parsed.cameras || [];
    }
}

let _saveTimeout = null;
function saveState() {
    // Debounce: wait 300ms before saving to avoid excessive writes
    clearTimeout(_saveTimeout);
    _saveTimeout = setTimeout(() => _saveStateNow(), 300);
}

async function _saveStateNow() {
    const payload = {
        personnel: state.personnel,
        customColumns: state.customColumns,
        activities: state.activities,
        columnConfig: state.columnConfig,
        cameras: state.cameras
    };
    try {
        const res = await fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Save failed');
    } catch (err) {
        console.warn('Server save failed, falling back to localStorage:', err);
        localStorage.setItem('shlita_data', JSON.stringify(payload));
    }
}

function loadInitialData() {
    // Load cameras if empty
    if (state.cameras.length === 0) {
        state.cameras = JSON.parse(JSON.stringify(INITIAL_CAMERAS_DATA));
    }

    // Server handles initialization - just check if data loaded
    if (state.personnel.length > 0) {
        saveState();
        return;
    }

    // Fallback: load from embedded data if server returned empty
    state.personnel = INITIAL_PERSONNEL_DATA.map(p => ({
        id: generateId(),
        ...p
    }));
    saveState();
    showToast('נתוני כוח אדם נטענו בהצלחה');
}

// ==================== Theme ====================
function initTheme() {
    const saved = localStorage.getItem('shlita_theme');
    if (saved === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    }
    updateThemeIcon();
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    if (current === 'light') {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('shlita_theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('shlita_theme', 'light');
    }
    updateThemeIcon();
}

function updateThemeIcon() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const moonSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    const sunSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    const icon = isLight ? moonSvg : sunSvg;

    const btn = document.getElementById('themeToggle');
    if (btn) btn.innerHTML = icon;

    const loginBtn = document.getElementById('loginThemeToggle');
    if (loginBtn) {
        const bigIcon = icon.replace('width="18" height="18"', 'width="20" height="20"');
        loginBtn.innerHTML = bigIcon;
    }
}

// ==================== App Init ====================
function initApp() {
    loadInitialData();
    populateFilters();
    renderPersonnelTable();
    renderActivities();
    updateDashboard();
}

// ==================== View Switching ====================
function switchView(viewName) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById(viewName + 'View').classList.add('active');
    document.querySelector(`[data-view="${viewName}"]`).classList.add('active');

    if (viewName === 'dashboard') updateDashboard();
    if (viewName === 'activities') renderActivities();
    if (viewName === 'cameras') renderCameras();
}

// ==================== Filters ====================
function populateFilters() {
    const config = getColumnConfig();
    const filterColumns = config.filter(c => c.isFilter);

    // Build main filters container
    const mainContainer = document.getElementById('filtersContainer');
    let mainHtml = '<div class="filter-group"><input type="text" id="searchInput" placeholder="חיפוש חופשי..." oninput="applyFilters()"></div>';
    filterColumns.forEach(col => {
        const values = [...new Set(state.personnel.map(p => p[col.key]).filter(Boolean))].sort();
        mainHtml += `<div class="filter-group"><select id="filter_${col.key}" onchange="applyFilters()">`;
        mainHtml += `<option value="">כל ${col.label}</option>`;
        values.forEach(v => { mainHtml += `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`; });
        mainHtml += `</select></div>`;
    });
    mainHtml += '<button class="btn btn-ghost" onclick="clearFilters()">נקה סינון</button>';
    mainHtml += '<span id="personnelCount" class="count-badge"></span>';
    mainContainer.innerHTML = mainHtml;

    // Build activity modal filters container
    const actContainer = document.getElementById('actFiltersContainer');
    let actHtml = '<div class="filter-group"><input type="text" id="actSearchInput" placeholder="חיפוש..." oninput="filterActivityParticipants()"></div>';
    filterColumns.forEach(col => {
        const values = [...new Set(state.personnel.map(p => p[col.key]).filter(Boolean))].sort();
        actHtml += `<div class="filter-group"><select id="actFilter_${col.key}" onchange="filterActivityParticipants()">`;
        actHtml += `<option value="">כל ${col.label}</option>`;
        values.forEach(v => { actHtml += `<option value="${escapeHtml(v)}">${escapeHtml(v)}</option>`; });
        actHtml += `</select></div>`;
    });
    actContainer.innerHTML = actHtml;
}



function getFilteredPersonnel() {
    const searchEl = document.getElementById('searchInput');
    const search = searchEl ? searchEl.value.toLowerCase() : '';
    const config = getColumnConfig();
    const filterColumns = config.filter(c => c.isFilter);

    // Collect active filter values
    const activeFilters = [];
    filterColumns.forEach(col => {
        const el = document.getElementById('filter_' + col.key);
        if (el && el.value) activeFilters.push({ key: col.key, value: el.value });
    });

    return state.personnel.filter(p => {
        for (const f of activeFilters) {
            if (p[f.key] !== f.value) return false;
        }
        if (search) {
            const allValues = Object.values(p).join(' ').toLowerCase();
            if (!allValues.includes(search)) return false;
        }
        return true;
    });
}

function applyFilters() {
    renderPersonnelTable();
}

function clearFilters() {
    const searchEl = document.getElementById('searchInput');
    if (searchEl) searchEl.value = '';
    const config = getColumnConfig();
    config.filter(c => c.isFilter).forEach(col => {
        const el = document.getElementById('filter_' + col.key);
        if (el) el.value = '';
    });
    renderPersonnelTable();
}

// ==================== Personnel Table ====================
function getColumnConfig() {
    return state.columnConfig || DEFAULT_COLUMN_CONFIG;
}

function getAllColumns() {
    const config = getColumnConfig();
    // Map columnConfig entries to column objects (with type 'text' for table rendering)
    const cols = config.map(c => ({ key: c.key, label: c.label, type: 'text' }));
    // Also append any legacy custom columns not in config
    if (!state.columnConfig) {
        state.customColumns.forEach(cc => {
            if (!cols.find(c => c.key === cc.key)) {
                cols.push(cc);
            }
        });
    }
    return cols;
}

function renderPersonnelTable() {
    const filtered = getFilteredPersonnel();
    const columns = getAllColumns();

    // Sort
    if (state.sortColumn) {
        filtered.sort((a, b) => {
            const valA = (a[state.sortColumn] || '').toString();
            const valB = (b[state.sortColumn] || '').toString();
            const cmp = valA.localeCompare(valB, 'he');
            return state.sortDirection === 'asc' ? cmp : -cmp;
        });
    }

    // Header
    const thead = document.getElementById('personnelHead');
    let headerHtml = '<tr><th style="width:40px">#</th>';
    columns.forEach(col => {
        const sortClass = state.sortColumn === col.key
            ? (state.sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc')
            : '';
        headerHtml += `<th class="${sortClass}" onclick="sortBy('${col.key}')">${col.label}</th>`;
    });
    if (state.accessLevel === 'admin') {
        headerHtml += '<th style="width:80px">פעולות</th>';
    }
    headerHtml += '</tr>';
    thead.innerHTML = headerHtml;

    // Body
    const tbody = document.getElementById('personnelBody');
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="${columns.length + 2}" style="text-align:center;padding:40px;color:var(--text-muted)">לא נמצאו תוצאות</td></tr>`;
    } else {
        let bodyHtml = '';
        filtered.forEach((person, idx) => {
            const globalIdx = state.personnel.indexOf(person);
            bodyHtml += `<tr>`;
            bodyHtml += `<td style="color:var(--text-muted)">${idx + 1}</td>`;
            columns.forEach(col => {
                const val = person[col.key] || '';
                if (state.accessLevel === 'admin') {
                    bodyHtml += `<td class="editable" ondblclick="startCellEdit(this, ${globalIdx}, '${col.key}')">${escapeHtml(val)}</td>`;
                } else {
                    bodyHtml += `<td>${escapeHtml(val)}</td>`;
                }
            });
            if (state.accessLevel === 'admin') {
                bodyHtml += `<td>
                    <div class="row-actions">
                        <button title="ערוך" onclick="openEditPersonModal(${globalIdx})">✏️</button>
                        <button class="delete" title="מחק" onclick="deletePerson(${globalIdx})">🗑️</button>
                    </div>
                </td>`;
            }
            bodyHtml += '</tr>';
        });
        tbody.innerHTML = bodyHtml;
    }

    // Count
    document.getElementById('personnelCount').textContent = `${filtered.length} / ${state.personnel.length}`;
}

function sortBy(column) {
    if (state.sortColumn === column) {
        state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
        state.sortColumn = column;
        state.sortDirection = 'asc';
    }
    renderPersonnelTable();
}

// ==================== Inline Cell Editing ====================
function startCellEdit(td, personIdx, colKey) {
    if (state.accessLevel !== 'admin') return;
    if (state.editingCell) return;

    const currentValue = state.personnel[personIdx][colKey] || '';
    state.editingCell = { td, personIdx, colKey };

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'cell-edit';
    input.value = currentValue;

    td.textContent = '';
    td.appendChild(input);
    input.focus();
    input.select();

    input.addEventListener('blur', () => finishCellEdit(input));
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') input.blur();
    });
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            state.editingCell = null;
            renderPersonnelTable();
        }
    });
}

function finishCellEdit(input) {
    if (!state.editingCell) return;
    const { personIdx, colKey } = state.editingCell;
    state.personnel[personIdx][colKey] = input.value;
    state.editingCell = null;
    saveState();
    populateFilters();
    renderPersonnelTable();
}

// ==================== Add/Edit Person ====================
function renderPersonFormFields(person = null) {
    const container = document.getElementById('personFormFields');
    const columns = getAllColumns();
    let html = '';

    for (let i = 0; i < columns.length; i += 2) {
        html += '<div class="form-row">';
        for (let j = i; j < Math.min(i + 2, columns.length); j++) {
            const col = columns[j];
            const val = person ? (person[col.key] || '') : '';
            const config = getColumnConfig();
            const isPrimary = config.find(c => c.key === col.key)?.isPrimary;
            html += `<div class="form-group">
                <label>${escapeHtml(col.label)}</label>
                <input type="text" id="field_${col.key}" value="${escapeHtml(val)}" ${isPrimary ? 'required' : ''}>
            </div>`;
        }
        html += '</div>';
    }
    container.innerHTML = html;
}

function openAddPersonModal() {
    if (state.accessLevel !== 'admin') {
        showToast('אין הרשאה לביצוע פעולה זו');
        return;
    }
    state.editingPersonIndex = null;
    document.getElementById('addPersonModalTitle').textContent = 'הוסף איש חדש';
    renderPersonFormFields();
    openModal('addPersonModal');
}

function openEditPersonModal(idx) {
    if (state.accessLevel !== 'admin') return;
    state.editingPersonIndex = idx;
    const person = state.personnel[idx];

    document.getElementById('addPersonModalTitle').textContent = 'ערוך פרטים';
    renderPersonFormFields(person);
    openModal('addPersonModal');
}

function savePerson() {
    const columns = getAllColumns();
    const config = getColumnConfig();
    const primaryCol = config.find(c => c.isPrimary) || config[0];

    const primaryEl = document.getElementById('field_' + primaryCol.key);
    if (!primaryEl || !primaryEl.value.trim()) {
        showToast(`יש להזין ${primaryCol.label}`);
        return;
    }

    const personData = {};
    columns.forEach(col => {
        const el = document.getElementById('field_' + col.key);
        if (el) personData[col.key] = el.value.trim();
    });

    if (state.editingPersonIndex !== null) {
        const existing = state.personnel[state.editingPersonIndex];
        Object.assign(existing, personData);
        showToast('פרטים עודכנו בהצלחה');
    } else {
        personData.id = generateId();
        state.personnel.push(personData);
        showToast('איש חדש נוסף בהצלחה');
    }

    saveState();
    populateFilters();
    renderPersonnelTable();
    closeModal('addPersonModal');
}

function deletePerson(idx) {
    if (state.accessLevel !== 'admin') return;
    const person = state.personnel[idx];
    if (!confirm(`למחוק את ${person.name}?`)) return;

    state.personnel.splice(idx, 1);
    saveState();
    populateFilters();
    renderPersonnelTable();
    showToast('נמחק בהצלחה');
}

// ==================== Custom Columns ====================
function openAddColumnModal() {
    if (state.accessLevel !== 'admin') {
        showToast('אין הרשאה לביצוע פעולה זו');
        return;
    }
    document.getElementById('columnName').value = '';
    document.getElementById('columnType').value = 'text';
    openModal('addColumnModal');
}

function addColumn() {
    const name = document.getElementById('columnName').value.trim();
    if (!name) {
        showToast('יש להזין שם עמודה');
        return;
    }

    const key = 'custom_' + Date.now();
    const type = document.getElementById('columnType').value;

    state.customColumns.push({ key, label: name, type });
    saveState();
    renderPersonnelTable();
    closeModal('addColumnModal');
    showToast(`עמודה "${name}" נוספה בהצלחה`);
}

// ==================== Activities ====================
function openNewActivityModal() {
    if (state.accessLevel !== 'admin') {
        showToast('אין הרשאה לביצוע פעולה זו');
        return;
    }
    document.getElementById('activityName').value = '';
    document.getElementById('activityDescription').value = '';
    document.getElementById('activityDeadline').value = '';

    // Reset dynamic filters
    const actSearch = document.getElementById('actSearchInput');
    if (actSearch) actSearch.value = '';
    getColumnConfig().filter(c => c.isFilter).forEach(col => {
        const el = document.getElementById('actFilter_' + col.key);
        if (el) el.value = '';
    });

    renderActivityParticipants();
    openModal('newActivityModal');
}

function getActivityFilteredPersonnel() {
    const searchEl = document.getElementById('actSearchInput');
    const search = searchEl ? searchEl.value.toLowerCase() : '';
    const config = getColumnConfig();
    const filterColumns = config.filter(c => c.isFilter);

    const activeFilters = [];
    filterColumns.forEach(col => {
        const el = document.getElementById('actFilter_' + col.key);
        if (el && el.value) activeFilters.push({ key: col.key, value: el.value });
    });

    return state.personnel.filter(p => {
        for (const f of activeFilters) {
            if (p[f.key] !== f.value) return false;
        }
        if (search) {
            const allValues = Object.values(p).join(' ').toLowerCase();
            if (!allValues.includes(search)) return false;
        }
        return true;
    });
}

// Track selected participants using a Set of person IDs
let selectedParticipants = new Set();

function renderActivityParticipants() {
    const filtered = getActivityFilteredPersonnel();
    const container = document.getElementById('participantsList');

    let html = '';
    const config = getColumnConfig();
    const primaryCol = config.find(c => c.isPrimary) || config[0];
    const metaCols = config.filter(c => !c.isPrimary).slice(0, 3);

    filtered.forEach(person => {
        const checked = selectedParticipants.has(person.id) ? 'checked' : '';
        const selectedClass = selectedParticipants.has(person.id) ? 'selected' : '';
        const metaText = metaCols.map(c => person[c.key] || '').filter(Boolean).join(' | ');
        html += `<div class="participant-item ${selectedClass}" onclick="toggleParticipant('${person.id}', this)">
            <input type="checkbox" ${checked} onclick="event.stopPropagation(); toggleParticipant('${person.id}', this.parentElement)">
            <div class="participant-info">
                <span class="name">${escapeHtml(person[primaryCol.key] || '')}</span>
                <span class="meta">${escapeHtml(metaText)}</span>
            </div>
        </div>`;
    });

    container.innerHTML = html || '<div style="padding:20px;text-align:center;color:var(--text-muted)">לא נמצאו תוצאות</div>';
    updateSelectedCount();
}

function toggleParticipant(personId, element) {
    if (selectedParticipants.has(personId)) {
        selectedParticipants.delete(personId);
    } else {
        selectedParticipants.add(personId);
    }
    renderActivityParticipants();
}

function selectAllFiltered() {
    const filtered = getActivityFilteredPersonnel();
    filtered.forEach(p => selectedParticipants.add(p.id));
    renderActivityParticipants();
}

function deselectAllFiltered() {
    const filtered = getActivityFilteredPersonnel();
    filtered.forEach(p => selectedParticipants.delete(p.id));
    renderActivityParticipants();
}

function filterActivityParticipants() {
    renderActivityParticipants();
}

function updateSelectedCount() {
    document.getElementById('selectedCount').textContent = `${selectedParticipants.size} נבחרו`;
}

function createActivity() {
    const name = document.getElementById('activityName').value.trim();
    if (!name) {
        showToast('יש להזין שם פעילות');
        return;
    }
    if (selectedParticipants.size === 0) {
        showToast('יש לבחור לפחות משתתף אחד');
        return;
    }

    const activity = {
        id: generateId(),
        name,
        description: document.getElementById('activityDescription').value.trim(),
        deadline: document.getElementById('activityDeadline').value,
        createdAt: new Date().toISOString(),
        participants: Array.from(selectedParticipants).map(id => ({
            personId: id,
            completed: false,
            completedAt: null
        }))
    };

    state.activities.push(activity);
    selectedParticipants = new Set();
    saveState();
    renderActivities();
    closeModal('newActivityModal');
    showToast('פעילות נוצרה בהצלחה');
}

function renderActivities() {
    const container = document.getElementById('activitiesList');

    if (state.activities.length === 0) {
        container.innerHTML = `<div class="no-data">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
            </svg>
            <p>אין פעילויות עדיין</p>
        </div>`;
        return;
    }

    let html = '';
    // Show newest first
    [...state.activities].reverse().forEach(activity => {
        const total = activity.participants.length;
        const completed = activity.participants.filter(p => p.completed).length;
        const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
        const statusClass = percent === 100 ? 'completed' : 'in-progress';
        const statusText = percent === 100 ? 'הושלמה' : 'בתהליך';

        html += `<div class="activity-card" onclick="openActivityDetail('${activity.id}')">
            <div class="activity-card-header">
                <h3>${escapeHtml(activity.name)}</h3>
                <span class="activity-status ${statusClass}">${statusText}</span>
            </div>
            ${activity.description ? `<p class="activity-card-desc">${escapeHtml(activity.description)}</p>` : ''}
            <div class="activity-card-meta">
                <span>👥 ${total} משתתפים</span>
                <span>✅ ${completed} השלימו</span>
                ${activity.deadline ? `<span>📅 ${formatDate(activity.deadline)}</span>` : ''}
                <span>🕐 ${formatDate(activity.createdAt)}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percent}%"></div>
            </div>
        </div>`;
    });

    container.innerHTML = html;
}

// ==================== Activity Detail ====================
function openActivityDetail(activityId) {
    const activity = state.activities.find(a => a.id === activityId);
    if (!activity) return;

    state.currentActivityId = activityId;

    document.getElementById('activityDetailTitle').textContent = activity.name;
    document.getElementById('activityDetailDesc').textContent = activity.description || 'אין תיאור';
    document.getElementById('activityDetailDeadline').textContent = activity.deadline ? `תאריך יעד: ${formatDate(activity.deadline)}` : '';
    document.getElementById('activityDetailCreated').textContent = `נוצרה: ${formatDate(activity.createdAt)}`;

    document.getElementById('detailSearchInput').value = '';
    document.getElementById('detailFilterStatus').value = '';

    updateActivityProgress(activity);
    renderDetailParticipants(activity);
    openModal('activityDetailModal');
}

function updateActivityProgress(activity) {
    const total = activity.participants.length;
    const completed = activity.participants.filter(p => p.completed).length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

    document.getElementById('activityProgressText').textContent = `${percent}%`;
    document.getElementById('activityProgressBar').style.width = `${percent}%`;
    document.getElementById('activityCompletedCount').textContent = `${completed} השלימו`;
    document.getElementById('activityRemainingCount').textContent = `${total - completed} נותרו`;
}

function renderDetailParticipants(activity) {
    if (!activity) {
        activity = state.activities.find(a => a.id === state.currentActivityId);
    }
    if (!activity) return;

    const searchTerm = document.getElementById('detailSearchInput').value.toLowerCase();
    const statusFilter = document.getElementById('detailFilterStatus').value;

    const container = document.getElementById('detailParticipantsList');
    let html = '';

    const dConfig = getColumnConfig();
    const dPrimaryCol = dConfig.find(c => c.isPrimary) || dConfig[0];
    const dMetaCols = dConfig.filter(c => !c.isPrimary).slice(0, 3);

    activity.participants.forEach((participant, idx) => {
        const person = state.personnel.find(p => p.id === participant.personId);
        if (!person) return;

        const personName = person[dPrimaryCol.key] || '';
        // Filter
        if (searchTerm && !personName.toLowerCase().includes(searchTerm)) return;
        if (statusFilter === 'completed' && !participant.completed) return;
        if (statusFilter === 'pending' && participant.completed) return;

        const checked = participant.completed ? 'checked' : '';
        const completedClass = participant.completed ? 'completed-row' : '';
        const isAdmin = state.accessLevel === 'admin';
        const detailMeta = dMetaCols.map(c => person[c.key] || '').filter(Boolean).join(' | ');

        html += `<div class="detail-participant ${completedClass}">
            <div class="checkbox-wrap">
                <input type="checkbox" ${checked} ${isAdmin ? '' : 'disabled'}
                    onchange="toggleCompletion('${activity.id}', ${idx}, this.checked)">
            </div>
            <span class="p-name">${escapeHtml(personName)}</span>
            <span class="p-meta">${escapeHtml(detailMeta)}</span>
        </div>`;
    });

    container.innerHTML = html || '<div style="padding:20px;text-align:center;color:var(--text-muted)">לא נמצאו משתתפים</div>';
}

function filterDetailParticipants() {
    renderDetailParticipants();
}

function toggleCompletion(activityId, participantIdx, completed) {
    const activity = state.activities.find(a => a.id === activityId);
    if (!activity) return;

    activity.participants[participantIdx].completed = completed;
    activity.participants[participantIdx].completedAt = completed ? new Date().toISOString() : null;

    saveState();
    updateActivityProgress(activity);
    renderDetailParticipants(activity);
    renderActivities();
}

function deleteCurrentActivity() {
    if (state.accessLevel !== 'admin') return;
    if (!confirm('למחוק את הפעילות?')) return;

    state.activities = state.activities.filter(a => a.id !== state.currentActivityId);
    saveState();
    renderActivities();
    closeModal('activityDetailModal');
    showToast('פעילות נמחקה');
}

// ==================== Dashboard ====================
function updateDashboard() {
    document.getElementById('totalPersonnel').textContent = state.personnel.length;
    document.getElementById('totalActivities').textContent = state.activities.length;

    const dashConfig = getColumnConfig();
    const groupCol = dashConfig.find(c => c.isFilter) || dashConfig[1] || dashConfig[0];
    const groups = [...new Set(state.personnel.map(p => p[groupCol.key]).filter(Boolean))];
    document.getElementById('totalTeams').textContent = groups.length;

    // Avg completion
    if (state.activities.length > 0) {
        const totalPercent = state.activities.reduce((sum, act) => {
            const total = act.participants.length;
            const completed = act.participants.filter(p => p.completed).length;
            return sum + (total > 0 ? (completed / total) * 100 : 0);
        }, 0);
        document.getElementById('avgCompletion').textContent = Math.round(totalPercent / state.activities.length) + '%';
    } else {
        document.getElementById('avgCompletion').textContent = '0%';
    }

    // Recent activities
    const recentContainer = document.getElementById('recentActivities');
    if (state.activities.length === 0) {
        recentContainer.innerHTML = '<p style="color:var(--text-muted);padding:12px">אין פעילויות</p>';
    } else {
        let html = '';
        [...state.activities].reverse().slice(0, 5).forEach(act => {
            const total = act.participants.length;
            const completed = act.participants.filter(p => p.completed).length;
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
            html += `<div class="activity-mini">
                <span class="activity-mini-name">${escapeHtml(act.name)}</span>
                <div class="activity-mini-progress">
                    <div class="mini-bar"><div class="mini-fill" style="width:${percent}%"></div></div>
                    <span>${percent}%</span>
                </div>
            </div>`;
        });
        recentContainer.innerHTML = html;
    }

    // Group breakdown (uses first filter column)
    const teamContainer = document.getElementById('teamBreakdown');
    const groupCounts = {};
    state.personnel.forEach(p => {
        const val = p[groupCol.key];
        if (val) {
            groupCounts[val] = (groupCounts[val] || 0) + 1;
        }
    });
    let teamHtml = '';
    Object.entries(groupCounts).sort((a, b) => b[1] - a[1]).forEach(([group, count]) => {
        teamHtml += `<div class="team-card">
            <div class="team-name">${escapeHtml(group)}</div>
            <div class="team-count">${count} אנשים</div>
        </div>`;
    });
    teamContainer.innerHTML = teamHtml || '<p style="color:var(--text-muted)">אין נתונים</p>';
}

// ==================== Export ====================
function exportData() {
    const columns = getAllColumns();
    let csv = '\uFEFF'; // BOM for Excel Hebrew support
    csv += columns.map(c => c.label).join(',') + '\n';

    state.personnel.forEach(person => {
        csv += columns.map(c => {
            const val = (person[c.key] || '').toString().replace(/"/g, '""');
            return `"${val}"`;
        }).join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `כוח_אדם_${new Date().toLocaleDateString('he-IL')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('קובץ יוצא בהצלחה');
}

// ==================== Activities Export/Import ====================
function exportActivities() {
    if (state.activities.length === 0) {
        showToast('אין פעילויות לייצוא');
        return;
    }
    const json = '\uFEFF' + JSON.stringify(state.activities, null, 2);
    const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `פעילויות_${new Date().toLocaleDateString('he-IL')}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('קובץ פעילויות יוצא בהצלחה');
}

function importActivitiesFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    event.target.value = '';

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            let text = e.target.result;
            if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);
            const activities = JSON.parse(text);

            if (!Array.isArray(activities)) {
                showToast('קובץ לא תקין - נדרש מערך של פעילויות');
                return;
            }

            for (const act of activities) {
                if (!act.name || !Array.isArray(act.participants)) {
                    showToast('קובץ לא תקין - כל פעילות חייבת לכלול שם ומשתתפים');
                    return;
                }
            }

            const personnelIds = new Set(state.personnel.map(p => p.id));
            let orphanCount = 0;
            let importedCount = 0;

            for (const act of activities) {
                act.id = generateId();
                for (const p of act.participants) {
                    if (!personnelIds.has(p.personId)) {
                        orphanCount++;
                    }
                }
                state.activities.push(act);
                importedCount++;
            }

            saveState();
            renderActivities();

            let msg = `יובאו ${importedCount} פעילויות בהצלחה`;
            if (orphanCount > 0) {
                msg += ` (${orphanCount} משתתפים לא נמצאו בכוח האדם הנוכחי)`;
            }
            showToast(msg);
        } catch (err) {
            showToast('שגיאה בקריאת הקובץ - ודא שזהו קובץ JSON תקין');
        }
    };
    reader.readAsText(file);
}

// ==================== Utilities ====================
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function escapeHtml(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    try {
        const d = new Date(dateStr);
        return d.toLocaleDateString('he-IL', { day: 'numeric', month: 'numeric', year: 'numeric' });
    } catch {
        return dateStr;
    }
}

function openModal(id) {
    document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
    document.getElementById(id).classList.add('hidden');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => toast.classList.add('hidden'), 3000);
}

// ==================== Import ====================
let _importData = null; // { headers: [], rows: [] }

function openImportModal() {
    if (state.accessLevel !== 'admin') {
        showToast('אין הרשאה לביצוע פעולה זו');
        return;
    }
    _importData = null;
    document.getElementById('importStep1').classList.remove('hidden');
    document.getElementById('importStep2').classList.add('hidden');
    document.getElementById('importConfirmBtn').classList.add('hidden');
    document.getElementById('importFileInput').value = '';
    openModal('importModal');

    // Setup drag & drop
    const dropZone = document.getElementById('importDropZone');
    dropZone.onclick = () => document.getElementById('importFileInput').click();

    dropZone.ondragover = (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); };
    dropZone.ondragleave = () => dropZone.classList.remove('drag-over');
    dropZone.ondrop = (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) handleImportFile(file);
    };
}

function handleImportFileSelect(event) {
    const file = event.target.files[0];
    if (file) handleImportFile(file);
}

function handleImportFile(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: '' });

            if (jsonData.length < 2) {
                showToast('הקובץ ריק או שאין בו שורות נתונים');
                return;
            }

            const headers = jsonData[0].map(h => String(h).trim()).filter(Boolean);
            const numHeaders = headers.length;
            const rows = jsonData.slice(1)
                .map(row => row.slice(0, numHeaders))
                .filter(row => row.some(cell => {
                    const v = String(cell ?? '').trim().toLowerCase();
                    return v !== '' && v !== '0' && v !== 'true' && v !== 'false';
                }));

            _importData = { headers, rows };
            renderColumnConfig(headers, rows.length);
        } catch (err) {
            console.error('Import error:', err);
            showToast('שגיאה בקריאת הקובץ');
        }
    };
    reader.readAsArrayBuffer(file);
}

function renderColumnConfig(headers, rowCount) {
    document.getElementById('importStep1').classList.add('hidden');
    document.getElementById('importStep2').classList.remove('hidden');
    document.getElementById('importConfirmBtn').classList.remove('hidden');
    document.getElementById('importRowCount').textContent = `${rowCount} שורות`;

    const tbody = document.getElementById('importConfigBody');
    let html = '';
    headers.forEach((header, idx) => {
        const key = 'col_' + idx;
        html += `<tr>
            <td><input type="checkbox" class="import-include" data-idx="${idx}" checked></td>
            <td class="col-name">${escapeHtml(header)}</td>
            <td><input type="radio" name="importPrimary" value="${idx}" ${idx === 0 ? 'checked' : ''}></td>
            <td><input type="checkbox" class="import-filter" data-idx="${idx}"></td>
        </tr>`;
    });
    tbody.innerHTML = html;
}

function confirmImport() {
    if (!_importData) return;

    if (!confirm('פעולה זו תמחק את כל הנתונים הקיימים. להמשיך?')) return;

    const { headers, rows } = _importData;
    const includeBoxes = document.querySelectorAll('.import-include');
    const filterBoxes = document.querySelectorAll('.import-filter');
    const primaryRadio = document.querySelector('input[name="importPrimary"]:checked');
    const primaryIdx = primaryRadio ? parseInt(primaryRadio.value) : 0;

    // Build columnConfig
    const newColumnConfig = [];
    const includedIndices = [];

    includeBoxes.forEach(cb => {
        const idx = parseInt(cb.dataset.idx);
        if (cb.checked) {
            includedIndices.push(idx);
            const key = headers[idx].replace(/[^a-zA-Z0-9\u0590-\u05FF]/g, '_').toLowerCase() || 'col_' + idx;
            // Ensure unique keys
            let uniqueKey = key;
            let counter = 1;
            while (newColumnConfig.find(c => c.key === uniqueKey)) {
                uniqueKey = key + '_' + counter++;
            }
            const filterCb = filterBoxes[idx];
            newColumnConfig.push({
                key: uniqueKey,
                label: headers[idx],
                isPrimary: idx === primaryIdx,
                isFilter: filterCb ? filterCb.checked : false
            });
        }
    });

    if (newColumnConfig.length === 0) {
        showToast('יש לבחור לפחות עמודה אחת');
        return;
    }

    // Ensure at least one primary
    if (!newColumnConfig.find(c => c.isPrimary)) {
        newColumnConfig[0].isPrimary = true;
    }

    // Build personnel array
    const newPersonnel = rows.map(row => {
        const person = { id: generateId() };
        includedIndices.forEach((origIdx, configIdx) => {
            person[newColumnConfig[configIdx].key] = String(row[origIdx] ?? '').trim();
        });
        return person;
    });

    // Replace all data
    state.personnel = newPersonnel;
    state.customColumns = [];
    state.activities = [];
    state.columnConfig = newColumnConfig;
    state.sortColumn = null;
    state.sortDirection = 'asc';

    saveState();
    populateFilters();
    renderPersonnelTable();
    renderActivities();
    updateDashboard();

    closeModal('importModal');
    _importData = null;
    showToast(`יובאו ${newPersonnel.length} שורות בהצלחה`);
}

// ==================== Cameras ====================
function renderCameras() {
    const cameras = state.cameras;
    if (!cameras || cameras.length === 0) return;

    const isAdmin = state.accessLevel === 'admin';
    const thead = document.getElementById('camerasHead');
    const tbody = document.getElementById('camerasBody');

    // Header: # | ציוד | tank1 | tank2 | ... | (actions if admin)
    let headHtml = '<tr class="camera-header-row"><th>#</th><th>ציוד</th>';
    cameras.forEach(c => {
        headHtml += `<th>${escapeHtml(c.tank)}</th>`;
    });
    if (isAdmin) headHtml += '<th></th>';
    headHtml += '</tr>';
    thead.innerHTML = headHtml;

    let bodyHtml = '';

    // Commander row
    bodyHtml += '<tr class="camera-commander-row"><td></td><td style="text-align:right">מפקד</td>';
    cameras.forEach((c, tankIdx) => {
        if (isAdmin) {
            bodyHtml += `<td class="camera-info-cell" ondblclick="editCameraInfoCell(event, ${tankIdx}, 'commander')">${escapeHtml(c.commander)}</td>`;
        } else {
            bodyHtml += `<td>${escapeHtml(c.commander)}</td>`;
        }
    });
    if (isAdmin) bodyHtml += '<td></td>';
    bodyHtml += '</tr>';

    // Source brigade row
    bodyHtml += '<tr class="camera-brigade-row"><td></td><td style="text-align:right">חטיבת מקור</td>';
    cameras.forEach((c, tankIdx) => {
        if (isAdmin) {
            bodyHtml += `<td class="camera-info-cell" ondblclick="editCameraInfoCell(event, ${tankIdx}, 'sourceBrigade')">${escapeHtml(c.sourceBrigade)}</td>`;
        } else {
            bodyHtml += `<td>${escapeHtml(c.sourceBrigade)}</td>`;
        }
    });
    if (isAdmin) bodyHtml += '<td></td>';
    bodyHtml += '</tr>';

    // Equipment rows
    const equipmentCount = cameras[0].items.length;
    for (let itemIdx = 0; itemIdx < equipmentCount; itemIdx++) {
        bodyHtml += `<tr><td>${itemIdx + 1}</td><td style="text-align:right">${escapeHtml(cameras[0].items[itemIdx].name)}</td>`;
        cameras.forEach((cam, tankIdx) => {
            const item = cam.items[itemIdx];
            const isFaulty = item.status === 'תקול';
            const dotClass = isFaulty ? 'faulty' : 'ok';
            const cellClass = isFaulty ? 'camera-cell faulty' : 'camera-cell';
            const serial = escapeHtml(item.serial);

            bodyHtml += `<td class="${cellClass}" onclick="toggleCameraStatus(${tankIdx}, ${itemIdx})" ondblclick="editCameraCell(event, ${tankIdx}, ${itemIdx})">`;
            bodyHtml += `<div class="camera-cell-content">`;
            if (serial) {
                bodyHtml += `<span class="camera-serial">${serial}</span>`;
            }
            bodyHtml += `<span class="camera-status-dot ${dotClass}"></span>`;
            bodyHtml += `</div></td>`;
        });
        if (isAdmin) {
            bodyHtml += `<td class="camera-actions-cell"><button class="btn-icon delete-row-btn" onclick="deleteCameraRow(${itemIdx})" title="מחק שורה"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button></td>`;
        }
        bodyHtml += '</tr>';
    }

    // Summary row: count faulty per tank
    bodyHtml += '<tr class="camera-brigade-row"><td></td><td style="text-align:right;font-weight:600">תקולים</td>';
    cameras.forEach(cam => {
        const faultyCount = cam.items.filter(i => i.status === 'תקול').length;
        const color = faultyCount > 0 ? 'var(--danger)' : 'var(--success)';
        bodyHtml += `<td style="font-weight:700;color:${color}">${faultyCount}</td>`;
    });
    if (isAdmin) bodyHtml += '<td></td>';
    bodyHtml += '</tr>';

    tbody.innerHTML = bodyHtml;
}

function toggleCameraStatus(tankIdx, itemIdx) {
    if (state.accessLevel !== 'admin') return;
    const item = state.cameras[tankIdx].items[itemIdx];
    item.status = item.status === 'תקין' ? 'תקול' : 'תקין';
    saveState();
    renderCameras();
}

function editCameraCell(event, tankIdx, itemIdx) {
    if (state.accessLevel !== 'admin') return;
    event.stopPropagation();

    const td = event.currentTarget;
    const item = state.cameras[tankIdx].items[itemIdx];
    const currentSerial = item.serial;

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'cell-edit';
    input.value = currentSerial;

    td.innerHTML = '';
    td.appendChild(input);
    input.focus();
    input.select();

    const finish = () => {
        const newVal = input.value.trim();
        if (newVal !== currentSerial) {
            item.serial = newVal;
            saveState();
        }
        renderCameras();
    };

    input.addEventListener('blur', finish);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { input.blur(); }
        if (e.key === 'Escape') { input.value = currentSerial; input.blur(); }
    });
}

function editCameraInfoCell(event, tankIdx, field) {
    if (state.accessLevel !== 'admin') return;
    event.stopPropagation();

    const td = event.currentTarget;
    const currentVal = state.cameras[tankIdx][field] || '';

    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'cell-edit';
    input.value = currentVal;

    td.innerHTML = '';
    td.appendChild(input);
    input.focus();
    input.select();

    const finish = () => {
        const newVal = input.value.trim();
        if (newVal !== currentVal) {
            state.cameras[tankIdx][field] = newVal;
            saveState();
        }
        renderCameras();
    };

    input.addEventListener('blur', finish);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { input.blur(); }
        if (e.key === 'Escape') { input.value = currentVal; input.blur(); }
    });
}

function deleteCameraRow(itemIdx) {
    if (state.accessLevel !== 'admin') return;
    const name = state.cameras[0].items[itemIdx].name;
    if (!confirm(`למחוק את ${name}?`)) return;

    state.cameras.forEach(cam => {
        cam.items.splice(itemIdx, 1);
    });
    saveState();
    renderCameras();
    showToast(`${name} נמחק`);
}

function exportCameras() {
    const cameras = state.cameras;
    if (!cameras || cameras.length === 0) {
        showToast('אין נתוני צלמים לייצוא');
        return;
    }

    let csv = '\uFEFF'; // BOM for Excel Hebrew support

    // Header row: ציוד | tank names...
    csv += ['ציוד', ...cameras.map(c => `"${c.tank}"`)].join(',') + '\n';

    // Commander row
    csv += ['מפקד', ...cameras.map(c => `"${(c.commander || '').replace(/"/g, '""')}"`)].join(',') + '\n';

    // Brigade row
    csv += ['חטיבת מקור', ...cameras.map(c => `"${(c.sourceBrigade || '').replace(/"/g, '""')}"`)].join(',') + '\n';

    // Equipment rows
    const equipmentCount = cameras[0].items.length;
    for (let i = 0; i < equipmentCount; i++) {
        const row = [`"${cameras[0].items[i].name}"`];
        cameras.forEach(cam => {
            const item = cam.items[i];
            const val = item.serial ? `${item.serial} (${item.status})` : item.status;
            row.push(`"${val.replace(/"/g, '""')}"`);
        });
        csv += row.join(',') + '\n';
    }

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `צלמים_${new Date().toLocaleDateString('he-IL')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('קובץ צלמים יוצא בהצלחה');
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.add('hidden');
    }
});

// Keyboard shortcut - Escape to close modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay:not(.hidden)').forEach(m => m.classList.add('hidden'));
    }
});
