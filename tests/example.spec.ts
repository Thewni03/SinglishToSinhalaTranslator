const { test, expect } = require('@playwright/test');

test.describe('Translate Singlish to Sinhala', () => {

  const testInputs = [
  
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


    



    /*

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
'apee gama nagarayen godak dhurayi , nagaree thiyana dheeval godak gamee ayata maejik vagee (kaeema ,aedhum ,jivithee ) ,
gamee yanakota ayisin mal thiyana keek ekak  aran yanna.ammaa asayi keek kanna ,nanagi aasayi keek ekee thiyana ayisin mal kanna .'
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
'dheevasThaanayee bQQku peeLiya maedhin maDHAk idhiriyata gaman kaLeeya.
ashvaaroohaka prathimaava raDHAvaa thibuu kirigaruDA puvaruva hisva thibuu athara, ee matha dhilisena yamak vaetii aethi andhama smith dhitiiya. ohu edhesata gaman kaLee ema vasthuva kumakdhaeyi baeliima saDHAhaaya. puvaruva matha thibuNee nivtan saamivarayaa gela paelaDHAi dhiyamanthi maalayayi.'
,
'heta iDHAlaa mama meekata muhuNa dhennee kohomadha kiyalaa matavath hithaaganna baeri vuNaa.
avuurudhu gaaNak eka dhigata novaradhavaa aapu gud moonin maeseej eka thava dhuratath enne naee kiyalaa mata dhaenuNaa.'
,
'oyaa kavadhahari nil paata, koLa paata, alu paata siQQdhu ahalaa thiyenavadha? mata nam siQQdhu aehenne paata paatin.
nishshabdhathaavaya kathaa karanavaa, oyaa ahalaa thiyenavadha?
magee lookaye nihaDAbavatath haDAk thiyenavaa.
kiyannadha pudhumayak? mathakaya magee.'
,
'kiyanadhee hariyata theerumganna 
mata ayemath ekama dhee kiyanna thiyanna epaa .'
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
'me wage pipi
rimak umana lab eke gett
tu windi hatahlihak athulatha ibemaaalock wenawa'
,
'puduma w3nna deyak n3m3i'


*/
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

});
