const { test, expect } = require("@playwright/test");

const SITE_URL = "https://www.swifttranslator.com/";


async function openSite(page) {
  await page.goto(SITE_URL, { waitUntil: "domcontentloaded" });}

function getInputLocator(page) {
  return page.getByPlaceholder("Input Your Singlish Text Here.");
}

function getOutputLocator(page) {
  return page.locator('.card:has-text("Sinhala") .bg-slate-50').first();
}

async function readOutput(locator) {
  const t = await locator.textContent();
  return (t || "").replace(/\r\n/g, "\n");
}

function normalize(s) {
  return (s || "").replace(/\r\n/g, "\n").trim();
}

async function runTranslationTest(tc, page, timeout = 20000) {
  await openSite(page);

  const inputArea = getInputLocator(page);
  const outputBox = getOutputLocator(page);

  await inputArea.waitFor({ state: "visible", timeout: 10000 });
  await inputArea.fill(tc.input);

  await expect
    .poll(async () => normalize(await readOutput(outputBox)), {
      timeout,
      message: `Output did not match for ${tc.id}`,
    })
    .toBe(normalize(tc.expected));
}

// positive
const positiveInputs = [
  {
    id: "Pos_Fun_0001",
    input: "aadhaayamata vadaa aduven viyadham karanna purudhu venna.",
    expected: "ආදායමට වඩා අඩුවෙන් වියදම් කරන්න පුරුදු වෙන්න."
  },
  {
    id: "Pos_Fun_0002",
    input: "venasakatath ekka api adha kopi ekak bomudha?",
    expected: "වෙනසකටත් එක්ක අපි අද කොපි එකක් බොමුද?"
  }
  ,
  {
    id: "Pos_Fun_0003",
    input: "magee aedhum okkoma paraNayi.mata aluthen aedhum tikak ganna oonee .mata Rs.50,000 salli dhennakoo .",
    expected: "මගේ ඇදුම් ඔක්කොම පරණයි.මට අලුතෙන් ඇදුම් ටිකක් ගන්න ඕනේ .මට Rs.50,000 සල්ලි දෙන්නකෝ ."
  }
  ,
  {
    id: "Pos_Fun_0004",
    input: "vaedi siini thee ekak genna.",
    expected: "වැඩි සීනි තේ එකක් ගෙන්න."
  }
  ,
  {
    id: "Pos_Fun_0005",
    input:"pirimi okkoma ekayi.",
    expected: "පිරිමි ඔක්කොම එකයි."
  }
  ,
  {
    id: "Pos_Fun_0006",
    input: "oyaa vaedipura kaemathi polisi yannadha?",
    expected: "ඔයා වැඩිපුර කැමති පොලිසි යන්නද?"
  }
  ,
  {
    id: "Pos_Fun_0007",
    input: "chuuti nQQgii kivvaa alto vageenam laabayilu.ee unaata magee hithee thiyannee Range Rover ekak ganna.",
    expected: "චූටි නංගී කිව්වා alto වගේනම් ලාබයිලු.ඒ උනාට මගේ හිතේ තියන්නේ Range Rover එකක් ගන්න."
  }
  ,
  {
    id: "Pos_Fun_0008",
    input: "avvee hitagena ehemehe yannee.... moLee hoDHA naedhdha?",
    expected: "අව්වේ හිටගෙන එහෙමෙහෙ යන්නේ.... මොළේ හොඳ නැද්ද?"
  }
  ,
  {
    id: "Pos_Fun_0009",
    input: "mQQ  dhavasak dhaekkaa oyaagee siQQhala potha . hariyata gaeenu Lamayekugee vagee needha ..anee mata oyaagee potha tiakak dhenavadha ? mQQ  parissam karalaa aayee dhennam .",
    expected: "මං  දවසක් දැක්කා ඔයාගේ සිංහල පොත . හරියට ගෑනු ළමයෙකුගේ වගේ නේද .. අනේ මට ඔයාගේ පොත ටිඅකක් දෙනවද ? මං  පරිස්සම් කරලා ආයේ දෙන්නම් ."
  }
  ,
  {
    id: "Pos_Fun_00010",
    input: "iiye mata hariyata dhuka hithunaa oya kiyapu dheeta , aapahu ehema kiyana epaa .",
    expected: "ඊයෙ මට හරියට දුක හිතුනා ඔය කියපු දේට , ආපහු එහෙම කියන එපා ."
  }
  ,
  {
    id: "Pos_Fun_0011",
    input: "mQQ enakal mee beheth pethi dheka bilaa nindhak dhaapan.",
    expected: "මං එනකල් මේ බෙහෙත් පෙති දෙක බිලා නින්දක් දාපන්."
  }
  ,
  {
    id: "Pos_Fun_0012",
    input: "apee gama nagarayen godak dhurayi , nagaree thiyana dheeval godak gamee ayata maejik vagee (kaeema ,aedhum ,jivithee ) , gamee yanakota ayisin mal thiyana keek ekak  aran yanna.ammaa asayi keek kanna ,nanagi aasayi keek ekee thiyana ayisin mal kanna .",
    expected: "අපේ ගම නගරයෙන් ගොඩක් දුරයි , නගරේ තියන දේවල් ගොඩක් ගමේ අයට මැජික් වගේ (කෑම ,ඇදුම් ,ජිවිතේ ) ,ගමේ යනකොට අයිසින් මල් තියන කේක් එකක්  අරන් යන්න.අම්මා අසයි කේක් කන්න ,නනගි ආසයි කේක් එකේ තියන අයිසින් මල් කන්න ."
  }
  ,
  {
    id: "Pos_Fun_0013",
    input: "excuse me sir,sir ta aethuLata enna kivvaa.enakota documents okkoma aran enna.",
    expected: "excuse මෙ sir,sir ට ඇතුළට එන්න කිව්වා.එනකොට documents ඔක්කොම අරන් එන්න."
  }
  ,
  {
    id: "Pos_Fun_0014",
    input: "naethuva! sar kohomadha echchara dheyak dhannee ? sar ee velaavee hitiyeth naenee …",
    expected: "නැතුව! සර් කොහොමද එච්චර දෙයක් දන්නේ ? සර් ඒ වෙලාවේ හිටියෙත් නැනේ …"
  }
  ,
  {
    id: "Pos_Fun_0015",
    input: " dheyiyanee..magee mal poochchiyata payin gahalaa ,paramparaa gaaNak thibuNa mal poochchiya. mama dhiiga edhdhii meheta genaavee. mama kivve meekigee nama maniShaa niskalQQkaa vuNaata gee aethuLe aevidhinneth katharinaa suLi kuNaatuva vagee. koyi veleevath hemin ganak nae anthimata ara paramparaa gaaNak thibuNu poochchiya biDHAlaa dhaemmaa , puthaata vitharak nevee. meekigen matath apalayidha kohedha",
    expected: " දෙයියනේ..මගේ මල් පෝච්චියට පයින් ගහලා ,පරම්පරා ගාණක් තිබුණ මල් පෝච්චිය. මම දීග එද්දී මෙහෙට ගෙනාවේ. මම කිව්වෙ මේකිගේ නම මනිෂා නිස්කලංකා වුණාට ගේ ඇතුළෙ ඇවිදින්නෙත් කතරිනා සුළි කුණාටුව වගේ. කොයි වෙලේවත් හෙමින් ගනක් නැ අන්තිමට අර පරම්පරා ගාණක් තිබුණු පෝච්චිය බිඳලා දැම්මා , පුතාට විතරක් නෙවේ. මේකිගෙන් මටත් අපලයිද කොහෙද"
  }
  ,
  {
    id: "Pos_Fun_0016",
    input: "oyatakannaonemonavadha",
    expected: "ඔයටකන්නඔනෙමොනවද"
  }
  ,
  {
    id: "Pos_Fun_0017",
    input: "adha dhina gaalla balaa gaman karana siigragaamii dhumraිya Dhaavanaya novana bava karuNaaven salakanna, emenma heta dhina sita dhumraිya gaasthu mila ihala yana baevin eka gaman varakata rupiyal 50 ka mudhalak ya keree .obata sidhuvana apahasuthaavayata kaNagaatuva prakaasha kara sitimu , sthuthiyi ",
    expected: "අද දින ගාල්ල බලා ගමන් කරන සීග්‍රගාමී දුම්රිය ධාවනය නොවන බව කරුණාවෙන් සලකන්න, එමෙන්ම හෙට දින සිට දුම්රිය ගාස්තු මිල ඉහල යන බැවින් එක ගමන් වරකට රුපියල් 50 ක මුදලක් ය කෙරේ .ඔබට සිදුවන අපහසුතාවයට කණගාටුව ප්‍රකාශ කර සිටිමු , ස්තුතියි "
  }
  ,
  {
    id: "Pos_Fun_0018",
    input: "apee gedhara kavuruth akkaata baninnee naetha. ee baena vaedak naethi nisaa ya.akkaa apa pavulata laebunee varak thaaththaa dheviyanta porondhu vu baarayak oppu nokiriima nisaa bava, ammaa haema thisseema paevasuvaa ya. akkaata meloo gedhara vaedak baeri ya. varak, aeya haedhu keek ekak kaa apee ballaata uugee dhath saelakiya yuthu pramaaNayak ahimi viya.edhaa sita uu kannee ammaa athin dhena kaeema pamaNa ya.",
    expected: "අපේ ගෙදර කවුරුත් අක්කාට බනින්නේ නැත. ඒ බැන වැඩක් නැති නිසා ය.අක්කා අප පවුලට ලැබුනේ වරක් තාත්තා දෙවියන්ට පොරොන්දු වු බාරයක් ඔප්පු නොකිරීම නිසා බව, අම්මා හැම තිස්සේම පැවසුවා ය. අක්කාට මෙලෝ ගෙදර වැඩක් බැරි ය. වරක්, ඇය හැදු කේක් එකක් කා අපේ බල්ලාට ඌගේ දත් සැලකිය යුතු ප්‍රමාණයක් අහිමි විය.එදා සිට ඌ කන්නේ අම්මා අතින් දෙන කෑම පමණ ය."
  }
  ,
  {
    id: "Pos_Fun_0019",
    input: "oyaanam godak lassanata idhivii.ee dress eka godak gaNan ekak venna aethi.",
    expected: "ඔයානම් ගොඩක් ලස්සනට ඉදිවී.ඒ dress එක ගොඩක් ගණන් එකක් වෙන්න ඇති."
  }
  ,
  {
    id: "Pos_Fun_0020",
    input: "dheevasThaanayee bQQku peeLiya maedhin maDHAk idhiriyata gaman kaLeeya.ashvaaroohaka prathimaava raDHAvaa thibuu kirigaruDA puvaruva hisva thibuu athara, ee matha dhilisena yamak vaetii aethi andhama smith dhitiiya. ohu edhesata gaman kaLee ema vasthuva kumakdhaeyi baeliima saDHAhaaya. puvaruva matha thibuNee nivtan saamivarayaa gela paelaDHAi dhiyamanthi maalayayi.",
    expected: "දේවස්ථානයේ බංකු පේළිය මැදින් මඳක් ඉදිරියට ගමන් කළේය.අශ්වාරෝහක ප්‍රතිමාව රඳවා තිබූ කිරිගරුඬ පුවරුව හිස්ව තිබූ අතර, ඒ මත දිලිසෙන යමක් වැටී ඇති අන්දම ස්මිත් දිටීය. ඔහු එදෙසට ගමන් කළේ එම වස්තුව කුමක්දැයි බැලීම සඳහාය. පුවරුව මත තිබුණේ නිව්ටන් සාමිවරයා ගෙල පැලඳි දියමන්ති මාලයයි."
  }
  ,
  {
    id: "Pos_Fun_0021",
    input: "heta iDHAlaa mama meekata muhuNa dhennee kohomadha kiyalaa matavath hithaaganna baeri vuNaa.avuurudhu gaaNak eka dhigata novaradhavaa aapu gud moonin maeseej eka thava dhuratath enne naee kiyalaa mata dhaenuNaa.",
    expected: "හෙට ඉඳලා මම මේකට මුහුණ දෙන්නේ කොහොමද කියලා මටවත් හිතාගන්න බැරි වුණා.අවූරුදු ගාණක් එක දිගට නොවරදවා ආපු ගුඩ් මෝනින් මැසේජ් එක තව දුරටත් එන්නෙ නෑ කියලා මට දැනුණා."
  }
  ,
  {
    id: "Pos_Fun_0022",
    input: "oyaa kavadhahari nil paata, koLa paata, alu paata siQQdhu ahalaa thiyenavadha? mata nam siQQdhu aehenne paata paatin.nishshabdhathaavaya kathaa karanavaa, oyaa ahalaa thiyenavadha? magee lookaye nihaDAbavatath haDAk thiyenavaa.kiyannadha pudhumayak? mathakaya magee",
    expected: "ඔයා කවදහරි නිල් පාට, කොළ පාට, අලු පාට සිංදු අහලා තියෙනවද? මට නම් සිංදු ඇහෙන්නෙ පාට පාටින්.නිශ්ශබ්දතාවය කතා කරනවා, ඔයා අහලා තියෙනවද?මගේ ලෝකයෙ නිහඬබවටත් හඬක් තියෙනවා.කියන්නද පුදුමයක්? මතකය මගේ"
  }
  ,
  {
    id: "Pos_Fun_0023",
    input: "kiyanadhee hariyata theerumganna mata ayemath ekama dhee kiyanna thiyanna epaa .",
    expected: "කියනදේ හරියට තේරුම්ගන්න මට අයෙමත් එකම දේ කියන්න තියන්න එපා ."
  }
  ,
  {
    id: "Pos_Fun_0024",
    input: "dhavasama phone ekee ..ooka paeththakin thiyala pothak balaagannavaa , phone eka aes valata hodha nae ",
    expected: "දවසම phone එකේ ..ඕක පැත්තකින් තියල පොතක් බලාගන්නවා , phone එක ඇස් වලට හොද නැ "
  }
  
<<<<<<< HEAD
];
   

//negative
const negativeInputs= [
  {
    id: "Neg_Fun_0001",
    input: "mndanna",
    expected: "මංදන්නැ"
  },
  {
    id: "Neg_Fun_0002",
    input: "mama @t home",
    expected: ""
  },
  {
    id: "Neg_Fun_0003",
    input: "oyamanganahithannaonenamatamninnawa",
    expected: "ඔයා මං ගැන හිතන්න ඕනේ නැ මට මං ඉන්නවා "
  },
  {
    id: "Neg_Fun_0004",
    input: "mata karadara nokara yaNNaaaaaaaaaaaa",
    expected: "මට කරදර නොකර යන්න"
  },
  {
    id: "Neg_Fun_0005",
    input: "api >= ai && lectures <= yannenathuwa || iinne",
    expected: "අපි ඇයි lectures යන් නැතුව ඉන්නේ?"
  },
  {
    id: "Neg_Fun_0006",
    input: "r a k i ya a w a s t a w a k d e n n a p u l u w a n .",
    expected: "රැකියා අවස්ථාවක් දෙන්න පුළුවන්."
  },
  {
    id: "Neg_Fun_0007",
    input: "me webadwiyata -https://sample.edu/railway gihin balanna mokada wenne kiyala",
    expected: "මේ වෙබ් අඩවියට - https://sample.edu/railway ගිහින් බලන්න මොකද වෙන්නේ කියල"
  },
  {
    id: "Neg_Fun_0008",
    input: "jewithayasamanai premayawadikirima anagathayaanam bedimakalakirimen adukirimamaranaya lesamama samikaranayawisitimi",
    expected: "ජීවිතය සමානය ප්‍රේමය - වැඩි කිරීම අනාගතය නම්, බෙදීම, කලකිරීමෙන් අඩුකිරීම මරණය ලෙස මම සමීකරණය වී සිටිමි."
  },
  {
    id: "Neg_Fun_0009",
    input: "me wage pipi rimak umana lab eke gett tu windi hatahlihak athulatha ibemaaalock wenawa",
    expected: "මේ වගේ පිපිරීමක් වුණාම මේ ලැබ් එකේ ගේට්ටු විනාඩි හතළිහක් ඇතුළත ඉබේම ලොක් වෙනවා"
  },

  {
    id: "Neg_Fun_0010",
    input: "puduma w3nna deyak n3m3i",
    expected: ""
  }
];

// -- Tests --
test("open swifttranslator", async ({ page }) => {
  await openSite(page);

  const pageTitle = await page.title();
  console.log("Page title is:", pageTitle);

  await expect(page).toHaveURL(SITE_URL);
  await expect(page).toHaveTitle(/Translator/i);
});

test.describe("SwiftTranslator – Positive Functional", () => {
  for (const tc of positiveInputs) {
    test(tc.id + " – should match expected Sinhala output", async ({ page }) => {
      await runTranslationTest(tc, page);
    });
  }
});

test.describe("SwiftTranslator – Negative Functional", () => {
  for (const tc of negativeInputs) {
    test(tc.id + " – should match expected Sinhala output", async ({ page }) => {
      await runTranslationTest(tc, page);
    });
  }
});

test("Pos_UI_0001 – Clearing input clears Sinhala output immediately", async ({ page }) => {
  await openSite(page);

  const inputArea = getInputLocator(page);
  const outputBox = getOutputLocator(page);

  await inputArea.waitFor({ state: "visible", timeout: 10000 });

  await inputArea.fill("api heta hambemu.");
  await expect
    .poll(async () => normalize(await readOutput(outputBox)), {
      timeout: 20000,
      message: "No output produced",
    })
    .not.toBe("");

  await inputArea.fill("");
  await expect
    .poll(async () => normalize(await readOutput(outputBox)), {
      timeout: 15000,
      message: "Output did not clear after clearing the input",
    })
    .toBe("");
});

test("Neg_UI_0001 – should respond within time for long gibberish input", async ({ page }) => {
  await openSite(page);

  const inputArea = getInputLocator(page);
  const outputBox = getOutputLocator(page);

  await inputArea.waitFor({ state: "visible", timeout: 10000 });

  const before = normalize(await readOutput(outputBox));
  const start = Date.now();

  await inputArea.fill(
    "ffnfnmlfnmltn fjnbfkrrh rkhmmlm tmhl5my5lye5lymolkjuyml hmyljmlt jtnhrenno nhkrehohnmkhmtm h5khm5olho 5o"
  );

  await expect
    .poll(async () => normalize(await readOutput(outputBox)) !== before, {
      timeout: 1000,
      message: "UI did not respond within 1000ms",
    })
    .toBe(true);

  const elapsed = Date.now() - start;
  expect(elapsed).toBeLessThanOrEqual(2200); 
});

=======
'aadhaayamata vadaa aduven viyadham karanna purudhu venna.'
,
'venasakatath ekka api adha kopi ekak bomudha?'
,
'magee aedhum okkoma paraNayi.mata aluthen aedhum tikak ganna oonee .mata Rs.50,000 salli dhennakoo .'
,
'vaedi siini thee ekak genna.'
,
'pirimi okkoma ekayi.'
,
'oyaa vaedipura kaemathi polisi yannadha?'
,
'chuuti nQQgii kivvaa alto vageenam laabayilu.ee unaata magee hithee thiyannee Range Rover ekak ganna.'
,
'avvee hitagena ehemehe yannee.... moLee hoDHA naedhdha?'
,
'mQQ  dhavasak dhaekkaa oyaagee siQQhala potha . hariyata gaeenu Lamayekugee vagee needha ..anee mata oyaagee potha tiakak dhenavadha ? mQQ  parissam karalaa aayee dhennam .'
,
'iiye mata hariyata dhuka hithunaa oya kiyapu dheeta , aapahu ehema kiyana epaa .'
,
'mQQ enakal mee beheth pethi dheka bilaa nindhak dhaapan.'
,
'apee gama nagarayen godak dhurayi , nagaree thiyana dheeval godak gamee ayata maejik vagee (kaeema ,aedhum ,jivithee ) , gamee yanakota ayisin mal thiyana keek ekak  aran yanna.ammaa asayi keek kanna ,nanagi aasayi keek ekee thiyana ayisin mal kanna .'
,

'excuse me sir,sir ta aethuLata enna kivvaa.enakota documents okkoma aran enna.'
,
'naethuva! sar kohomadha echchara dheyak dhannee ? sar ee velaavee hitiyeth naenee …'
,
 'dheyiyanee..magee mal poochchiyata payin gahalaa ,paramparaa gaaNak thibuNa mal poochchiya. mama dhiiga edhdhii meheta genaavee. mama kivve meekigee nama maniShaa niskalQQkaa vuNaata gee aethuLe aevidhinneth katharinaa suLi kuNaatuva vagee. koyi veleevath hemin ganak nae anthimata ara paramparaa gaaNak thibuNu poochchiya biDHAlaa dhaemmaa , puthaata vitharak nevee. meekigen matath apalayidha kohedha'
,
'oyatakannaonemonavadha'
,
'adha dhina gaalla balaa gaman karana siigragaamii dhumraිya Dhaavanaya novana bava karuNaaven salakanna, emenma heta dhina sita dhumraිya gaasthu mila ihala yana baevin eka gaman varakata rupiyal 50 ka mudhalak ya keree .obata sidhuvana apahasuthaavayata kaNagaatuva prakaasha kara sitimu , sthuthiyi '
,
'apee gedhara kavuruth akkaata baninnee naetha. ee baena vaedak naethi nisaa ya.akkaa apa pavulata laebunee varak thaaththaa dheviyanta porondhu vu baarayak oppu nokiriima nisaa bava, ammaa haema thisseema paevasuvaa ya. akkaata meloo gedhara vaedak baeri ya. varak, aeya haedhu keek ekak kaa apee ballaata uugee dhath saelakiya yuthu pramaaNayak ahimi viya.edhaa sita uu kannee ammaa athin dhena kaeema pamaNa ya.'
,
'oyaanam godak lassanata idhivii.ee dress eka godak gaNan ekak venna aethi.'
,
'dheevasThaanayee bQQku peeLiya maedhin maDHAk idhiriyata gaman kaLeeya. ashvaaroohaka prathimaava raDHAvaa thibuu kirigaruDA puvaruva hisva thibuu athara, ee matha dhilisena yamak vaetii aethi andhama smith dhitiiya. ohu edhesata gaman kaLee ema vasthuva kumakdhaeyi baeliima saDHAhaaya. puvaruva matha thibuNee nivtan saamivarayaa gela paelaDHAi dhiyamanthi maalayayi.'
,
'heta iDHAlaa mama meekata muhuNa dhennee kohomadha kiyalaa matavath hithaaganna baeri vuNaa. avuurudhu gaaNak eka dhigata novaradhavaa aapu gud moonin maeseej eka thava dhuratath enne naee kiyalaa mata dhaenuNaa.'
,
'oyaa kavadhahari nil paata, koLa paata, alu paata siQQdhu ahalaa thiyenavadha? mata nam siQQdhu aehenne paata paatin. nishshabdhathaavaya kathaa karanavaa, oyaa ahalaa thiyenavadha? magee lookaye nihaDAbavatath haDAk thiyenavaa. kiyannadha pudhumayak? mathakaya magee.'
,
'kiyanadhee hariyata theerumganna  mata ayemath ekama dhee kiyanna thiyanna epaa .'
,
'dhavasama phone ekee ..ooka paeththakin thiyala pothak balaagannavaa , phone eka aes valata hodha nae '
,
'mndanna'
,
'mama @t home'
,
'oyamanganahithannaonenamatamninnawa'
,
'mata karadara nokara yaNNaaaaaaaaaaaa'
,
'api >= ai && lectures <= yannenathuwa || iinne'
,
'r a k i ya a w a s t a w a k d e n n a p u l u w a n .'
,
'me webadwiyata -https://sample.edu/railway gihin balanna mokada wenne kiyala'
,
'jewithayasamanai premayawadikirima anagathayaanam bedimakalakirimen adukirimamaranaya lesamama samikaranayawisitimi'
,
'me wage pipi rimak umana lab eke gett tu windi hatahlihak athulatha ibemaaalock wenawa'
,
'puduma w3nna deyak n3m3i',

  ];

  test('Singlish to Sinhala', async ({ page }) => {

    await page.goto('https://www.swifttranslator.com/');


    const inputBox = page.locator('textarea');
    const outputBox = page.locator('div').nth(1);

    for (const input of testInputs) {
      await inputBox.fill(input);        

      const outputText = await outputBox.textContent(); 
      expect(outputText).not.toBeNull();
      expect(outputText.trim().length).toBeGreaterThan(0);
    }
  });
>>>>>>> f02c51c988b25d88c2eff84d12da4a19c50fe7b9

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    await page.screenshot({ path: `screenshots/${testInfo.title.replace(/\s+/g, "_")}.png` });
  }
});
