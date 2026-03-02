// ==================== Configuration ====================

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