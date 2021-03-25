const Test = require('./Test')
const State = require('./State')

const groupCount = 4 * 3
let currentGroup = Math.floor(Math.random() * groupCount)

function nextGroup() {
	let group = currentGroup
	currentGroup = (currentGroup + 1) % groupCount
	return {
		covid: ['none', 'neutral', 'positive', 'negative'][group % 4],
		brand: ['none', 'congruent', 'incongruent'][Math.floor(group / 4)]
	}
}

function nextCode() {
	let code = ""
	for (let i = 0; i < 8; i++) {
		code += Math.floor(Math.random() * 10)
	}

	return code
}

module.exports = new Test(
	{
		'approval': new State({
			'debrief_nocode': results => results['approval'].selected === '0',
			'warning': results => results['approval'].selected === '1'
		}, 'info_text', {
			title: "Tájékoztató és Beleegyező Nyilatkozat",
			description: "Ön egy tudományos kutatásban vesz részt, amelynek vezetője Buvár Ágnes, az ELTE PPK adjunktusa, illetve Balogh Eszter az ELTE PPK mesterszakos pszichológus hallgatói.\n\n" +
				"Jelen vizsgálat célja a közösségi média használat közben tapasztalható, a közösségi médiatartalmak szereplőivel kialakított paraszociális interakciós folyamat mérése.\n\n" +
				"A vizsgálat során egy influenszerrel kapcsolatban fogunk bemutatni vizuális ingereket, képeket és egy videót. Ezekkel kapcsolatban fogjuk kérni különböző kérdések megválaszolására.\n\n" +
				"A vizsgálat mindössze kb. 20 percig tart.\n\n" +
				"A kérdőív kitöltésének káros következménye nincs. A vizsgálatot bármikor indoklás nélkül akár végleg is megszakíthatja, vagy a kérdések megválaszolását megtagadhatja. A vizsgálatban történt részvételért minden 25. résztvevő 2000 forint jutalmat kap Dechatlon vagy Media Markt virtuális ajándékutalvány formájában. A kutatásban való részvétel teljesen önkéntes és anonim.\n\n" +
				"A kutatás során azonosításra alkalmas személyes adatokat nem rögzítünk.\n\n" +
				"Szigorúan bizalmasan kezelünk minden olyan információt, amit a kutatás keretén belül gyűjtünk össze. A kutatás során nyert adatokat kóddal ellátva biztonságos számítógépen őrizzük. Az egyéni kódot minden esetben a kutatásban résztvevő asszisztens adja, csak ő ismeri és ő fér hozzájuk. A kutatás során nyert adatokon csoportszinten végzünk statisztikai elemzéseket, amelyekből egyetlen résztvevő azonossága sem állapítható meg. A vizsgálat eredményéről orvosi jellegű zárójelentés, laborlelet nem készül.\n\n" +
				"A kutatás során kapott eredményekről később publikáció jelenhet meg, és tudományos konferenciákon kerülhet ismertetésre. Ezekről a kívánságnak megfelelően szóbeli vagy írásos tájékoztatást adunk.\n\n" +
				"A továbblépéssel hozzájárul ahhoz, hogy a vizsgálat során az Önről felvett, személye azonosítására nem alkalmas adatokat kutatási célra felhasználjuk, illetve, hogy más kutatók számára is hozzáférhetők legyenek. Fenntartom a jogot arra, hogy a vizsgálat során annak folytatásától bármikor elállhassak. Ilyen esetben a rólam addig felvett adatokat törölni kell.\n\n" +
				"Amennyiben szeretne részt venni a jutalmazásban és elküldi részünkre a kérdőív során kapott hatjegyű kódot, kérjük engedélyezze személyes adatainak kezelését!\n\n" +
				"Az ELTE PPK Ember-Környezet Tranzakció Intézet, mint adatkezelő, fenti adataimat bizalmasan kezeli, más adatkezelőnek, adatfeldolgozónak nem adja át. E tényállás részleteit a „Hozzájárulás adatkezeléshez” c. dokumentum tartalmazza.\n\n" +
				"Az adatkezelésről szóló szabályozásról részletesebben pedig itt tájékozódhat (https://pgabo.madebyaron.com/res/policy.pdf)\n\n" +
				"Beleegyezésemmel kijelentem, hogy 18 éves elmúltam, a kutatásban való részvételem körülményeiről részletes tájékoztatást kaptam, a feltételekkel egyetértek, a részvételt vállalom.",
			positive: "Beleegyezem és elfogadom",
			positiveId: "1",
			negative: "Elutasítom",
			negativeId: "0"
		}),
		'warning': new State('fam', 'info_text', {
			title: "Figyelmeztetés",
			description: "A továbbiakban teszt kérdésekre kell majd választ adnod. Kérlek, hogy a kérdéseket figyelmesen olvasd el. **Lesznek ellenörző kérdések is.** Amennyiben ezekre rosszul válaszolsz, úgy a kitöltést nem folytathatod és a nyereményjátékban sem vehetsz részt.",
			positive: "Megértettem és folytatom"
		}),
		'fam': new State({
			'video': results => results['fam'].selected === '0',
			'fam_scale': results => results['fam'].selected === '1'
		}, 'input_options', {
			title: "Ismered Pumped Gabót?",
			next: "Következő",
			options: [
				{id: "1", label: "Igen"},
				{id: "0", label: "Nem"}
			]
		}),
		'fam_scale': new State('following', 'input_slider', {
			title: "Értékeld egy 0-tól 100-as skálán, mennyire ismered Gabót!",
			next: "Következő",
			minValue: 0,
			maxValue: 100
		}),
		'following': new State('PSR', 'input_options', {
			title: "Követed valamilyen platformon Gabót?",
			next: "Következő",
			options: [
				{id: "1", label: "Igen"},
				{id: "0", label: "Nem"}
			]
		}),


		'video': new State('EPSI', 'info_video', {
			title: "Kérlek figyelmesen nézd végig a videót.",
			next: "Következő",
			source: "/res/video.mp4"
		}),
		'EPSI': new State('post', 'likert', {
			title: "A videó nézése közben az az érzésem támadt, hogy…",
			next: "Következő",
			random: true,
			labels: [
				'Egyáltalán nem értek egyet',
				'',
				'',
				'',
				'',
				'',
				'Teljes mértékben egyetértek'
			],
			questions: [
				{id: '1', question: 'Gabó úgy beszélt mintha én is ott lettem volna vele'},
				{id: '2', question: 'mintha Gabó érzékelte volna a jelenlétem'},
				{id: '3', question: 'mintha Gabó hozzám beszélt volna'},
				{id: '4', question: 'mintha Gabó tudta volna, hogy figyelek rá'},
				{id: '5', question: 'mintha Gabó ismerte volna a reakcióimat'},
				{id: '6', question: 'mintha Gabó reagált volna a gondolataimra'}
			]
		}),


		'PSR': new State({
			'debrief_rejected': results => results['PSR'].inputs.find(input => input.id === 'control').answer !== 5,
			'post': results => results['PSR'].inputs.find(input => input.id === 'control').answer === 5
		}, 'likert', {
			title: "Mennyire értesz egyet az alábbi kijelentésekkel?",
			next: "Következő",
			pageSize: 7,
			random: true,
			labels: [
				'Egyáltalán nem értek egyet',
				'Inkább nem értek egyet',
				'Nem tudom / közömbös',
				'Inkább egyetértek',
				'Teljes mértékben egyetértek'
			],
			control: 'control',
			controlIndex: 17,
			questions: [
				{
					id: '1',
					question: 'Gabót nézve olyan érzésem támad, mintha olyasvalaki lenne, akit jól ismerek.'
				},
				{id: '2', question: 'Ha Gabó megjelenne egy műsorban, megnézném azt a műsort.'},
				{id: '3', question: 'Gabót egy természetes, szerény embernek látom.'},
				{id: '4', question: 'Ha látnék egy cikket, melyben Gabó szerepel, elolvasnám azt.'},
				{id: '5', question: 'Szeretnék élőben is találkozni Gabóvel.'},
				{id: '6', question: 'Úgy érzem, megértem Gabó érzéseit.'},
				{id: '7', question: 'Előfordul olykor, hogy Gabóre gondolok.'},
				{id: '8', question: 'Nem érzek semmit Gabóvel kapcsolatban.'},
				{id: '9', question: 'Szívesen nézem Gabó videóit és posztjait a közösségi médiában.'},
				{
					id: '10',
					question: 'Amikor nem jutok Gabóvel kapcsolatos hírekhez, hiányolom ezeket a híreket.'
				},
				{id: '11', question: 'Szeretnék minél több mindent megtudni Gabóről.'},
				{
					id: '12',
					question: 'Előfordul, hogy információ után kutatok, hogy többet tudhassak meg Gabóről.'
				},
				{id: '13', question: 'Néha böngészek az interneten azért, hogy információt találjak Gabóről.'},
				{id: '14', question: 'Néha kedvem támad írásban reagálni Gabó videójára vagy posztjára.'},
				{
					id: '15',
					question: 'Szerintem Gabó ért azokhoz a dolgokhoz, amikről én is többet szeretnék tudni.'
				},
				{id: '16', question: 'Néha kommentelek Gabó posztjai alá.'},
				{id: '17', question: 'Jól ismerem Gabó életének részleteit.'},
				{id: '18', question: 'Csak nagyon kicsit értem meg Gabót, mint embert.'},
				{id: '19', question: 'Előre várni szoktam, hogy Gabó új videót vagy posztot töltsön fel.'},
				{id: '20', question: 'Gabó nem igazán érdekel engem.'},
				{id: 'control', question: 'Kérlek nyomd meg az ötös gombot.'}
			]
		}),


		'post': new State('eng', 'info_image', results => ({
			title: "Tanulmányozd az alábbi Instagram posztot minimum tíz másodpercig!",
			next: "Következő",
			source: "/res/post_" + results.group.covid + "_" + results.group.brand + ".png",
			waitingTime: 10000
		})),


		'eng': new State('ad_cred', 'likert', {
			title: "Mennyire tartod valószínűnek, hogy poszt hatására elvégzed a következő aktivitásokat?",
			next: "Következő",
			random: true,
			labels: [
				'Egyáltalán nem valószínű',
				'',
				'',
				'',
				'',
				'',
				'Teljes mértékben valószínű'
			],
			questions: [
				{id: '1', question: 'Like-olom a posztot.'},
				{id: '2', question: 'Kommentet írok a poszthoz.'},
				{id: '3', question: 'Betaggelek valakit a poszthoz.'},
				{id: '4', question: 'Beszélek a posztról másoknak.'},
				{id: '5', question: 'Megosztom a posztot.'},
			]
		}),
		'ad_cred': new State('ad_att', 'likert', {
			title: "Mennyire értesz egyet az alábbi állításokkal?",
			next: "Következő",
			random: true,
			labels: [
				'Egyáltalán nem értek egyet',
				'Inkább nem értek egyet',
				'Nem tudom / közömbös',
				'Inkább egyetértek',
				'Teljes mértékben egyetértek'
			],
			questions: [
				{id: '1', question: 'A posztban látott kép és szöveg hihető.'},
				{id: '2', question: 'Ez a poszt igazat mond.'},
				{id: '3', question: 'Ez a poszt valósághű.'}
			]
		}),
		'ad_att': new State({
			'ad_ethical': results => results.group.brand !== 'none',
			'covid_cont': results => results.group.brand === 'none' && results.group.covid !== 'none',
			'cred': results => results.group.brand === 'none' && results.group.covid === 'none',
		}, 'osgood', {
			title: "A következő kérdésekre adott válaszok segítségével jellemezd a poszttal kapcsolatos érzéseid!",
			next: "Következő",
			random: true,
			size: 7,
			pairs: [
				{id: '1', first: 'Nem tetszik', second: 'Tetszik'},
				{id: '2', first: 'Negatív', second: 'Pozitív'},
				{id: '3', first: 'Unalmas', second: 'Élvezetes'},
				{id: '4', first: 'Taszító', second: 'Vonzó'},
				{id: '5', first: 'Idegesítő', second: 'Nem idegesítő'}
			]
		}),


		'ad_ethical': new State('rec', 'likert', {
			title: "Kérlek, válaszolj, az alábbi kérdésekre",
			next: "Következő",
			random: true,
			labels: [
				'Egyáltalán nem értek egyet',
				'',
				'',
				'',
				'',
				'',
				'Teljes mértékben egyetértek'
			],
			questions: [
				{
					id: '1',
					question: 'Ha marketinges lennék, fizetnék influenszereknek, hogy a termékemről a látott poszttal megegyező posztot osszanak meg.'
				},
				{
					id: '2',
					question: 'Ha influenszer lennék, elfogadnék fizetséget marketingesektől, hogy a látott poszttal megegyező posztot osszak meg.'
				},
			]
		}),
		'rec': new State('debrief1', 'input_text', {
			title: "Kérlek, válaszolj, az alábbi kérdésekre",
			next: "Következő",
			inputs: [
				{id: "product", label: "Milyen termék szerepelt a posztban?"},
				{id: "brand", label: "Milyen márka szerepelt a posztban?"},
			]
		}),
		'debrief1': new State('con', 'info_text', results => ({
			title: results.group.brand === 'congruent' ?
				"Az instagram bejegyzésben egy MYPROTEIN termék volt látható, egy shaker szerepelt a képen." :
				"Az instagram bejegyzésben két csomag NaturAqua ásványvíz volt látható.",
			positive: "Következő",
		})),
		'con': new State({
			'covid_cont': results => results.group.covid !== 'none',
			'cred': results => results.group.covid === 'none',
		}, 'osgood', results => ({
			title: results.group.brand === 'congruent' ?
				"Hogyan jellemeznéd a MYPROTEIN márka és Gabó kapcsolatát?" :
				"Hogyan jellemeznéd a NaturAqua márka és Gabó kapcsolatát?",
			next: "Következő",
			random: true,
			size: 7,
			pairs: [
				{id: '1', first: 'Nem megfelelő', second: 'Megfelelő'},
				{id: '2', first: 'Összeférhetetlen', second: 'Összeegyeztethető'},
				{id: '3', first: 'Valószínűtlen párosítás', second: 'Valószínű párosítás'},
				{id: '4', first: 'Egymáshoz nem kötődő', second: 'Egymáshoz kötődő'}
			]
		})),


		'covid_cont': new State('debrief2', 'input_text', {
			title: "Milyen üzenetekre emlékszel a posztból?",
			description: "Kérlek, töltsd ki az alábbi szövegdobozokat! Egy dobozba csak egy üzenet kerüljön! Ha nem emlékszel több üzenetre, akkor a hátralevő dobozokba írd, hogy N/A!",
			next: "Következő",
			inputs: [
				{id: "1", label: ''},
				{id: "2", label: ''},
				{id: "3", label: ''},
				{id: "4", label: ''},
				{id: "5", label: ''}
			]
		}),
		'debrief2': new State('covid_att', 'info_text', results => ({
			title: "A posztban koronavírushoz kapcsolódó tartalom szerepelt.",
			description: {
				'neutral': "Gabó arról írt, hogy a koronavírus miatt otthon edz.",
				'positive': "Gabó arra biztatott, hogy maradjunk otthon és vigyázzunk magunkra és a szeretteinkre.",
				'negative': "Gabó arról írt, hogy milyen nehézségei adódtak a koronavírus miatt."
			}[results.group.covid],
			positive: "Következő",
		})),
		'covid_att': new State('third_pers', 'osgood', {
			title: "A következő kérdésekre adott válaszok segítségével jellemezd a koronavírussal kapcsolatos üzenethez kapcsolódó érzéseidet!",
			next: "Következő",
			random: true,
			size: 7,
			pairs: [
				{id: '1', first: 'Nem tetszik', second: 'Tetszik'},
				{id: '2', first: 'Negatív', second: 'Pozitív'},
				{id: '3', first: 'Lényegtelen', second: 'Lényeges'},
				{id: '4', first: 'Elcsépelt', second: 'Aktuális'},
				{id: '5', first: 'Idegesítő', second: 'Nem idegesítő'}
			]
		}),
		'third_pers': new State('covid_con', 'input_slider', {
			title: "Szerinted mennyire találták meggyőzőnek mások a posztban található koronavírussal kapcsolatos üzenetet egy 0-tól 100-as skálán?",
			next: "Következő",
			minValue: 0,
			maxValue: 100
		}),
		'covid_con': new State('cred', 'osgood', {
			title: "Hogyan jellemeznéd a koronavírussal kapocsolatos üzenet és Gabó kapcsolatát?",
			next: "Következő",
			random: true,
			size: 7,
			pairs: [
				{id: '1', first: 'Nem megfelelő', second: 'Megfelelő'},
				{id: '2', first: 'Összeférhetetlen', second: 'Összeegyeztethető'},
				{id: '3', first: 'Valószínűtlen párosítás', second: 'Valószínű párosítás'},
				{id: '4', first: 'Egymáshoz nem kötődő', second: 'Egymáshoz kötődő'}
			]
		}),


		'cred': new State({
			'debrief_rejected': results => results['cred'].inputs.find(input => input.id === 'control').answer !== 4,
			'ad_perc': results => results['cred'].inputs.find(input => input.id === 'control').answer === 4
		}, 'osgood', {
			title: "A következő fogalmak segítségével jellemezd Gabót!",
			next: "Következő",
			pageSize: 6,
			random: true,
			size: 5,
			control: 'control',
			controlIndex: 19,
			pairs: [
				{id: 'att_1', first: 'taszító', second: 'vonzó'}, // attractiveness
				{id: 'att_2', first: 'közönséges', second: 'ízléses'},
				{id: 'att_3', first: 'csúnya', second: 'szép'},
				{id: 'att_4', first: 'hétköznapi', second: 'elegáns'},
				{id: 'att_5', first: 'nem szexi', second: 'szexi'},
				{id: 'trust_1', first: 'megbízhatatlan', second: 'megbízható'}, // trustworthiness
				{id: 'trust_2', first: 'becstelen', second: 'becsületes'},
				{id: 'trust_3', first: 'hiteltelen', second: 'hiteles'},
				{id: 'trust_4', first: 'őszintétlen', second: 'őszinte'},
				{id: 'trust_5', first: 'tisztességtelen', second: 'tisztességes'},
				{id: 'exp_1', first: 'nem szakértő', second: 'szakértő'}, // expertise
				{id: 'exp_2', first: 'tapasztalatlan', second: 'tapasztalt'},
				{id: 'exp_3', first: 'tudatlan', second: 'jól informált'},
				{id: 'exp_4', first: 'hozzá nem értő', second: 'hozzáértő'},
				{id: 'exp_5', first: 'kontár', second: 'profi'},
				{id: 'good_1', first: 'nem törődik velem', second: 'törődik velem'}, // goodwill
				{id: 'good_2', first: 'nem veszi figyelembe az érdekeimet', second: 'figyelembe veszi az érdekeimet'},
				{id: 'good_3', first: 'énközpontú', second: 'empatikus'},
				{id: 'good_4', first: 'nem foglalkozik velem', second: 'foglalkozik velem'},
				{id: 'good_5', first: 'érzéketlen', second: 'érzékeny'},
				{id: 'good_6', first: 'nem megértő', second: 'megértő'},
				{id: 'control', first: 'nyomd meg balról', second: 'a negyedik lehetőséget'}
			]
		}),
		'ad_perc': new State('fam_post', 'input_slider', {
			title: "Értékeld, mennyire tekinthető reklámnak, amit láttál egy 0-tól 100-as skálán.",
			next: "Következő",
			minValue: 0,
			maxValue: 100
		}),
		'fam_post': new State({
			'fam_brand': results => results.group.brand !== 'none',
			'sales_exp': results => results.group.brand === 'none'
		}, 'input_slider', {
			title: "Értékeld egy 0-tól 100-as skálán, mennyire ismerős számodra a poszt, amit láttál.",
			next: "Következő",
			minValue: 0,
			maxValue: 100
		}),
		'fam_brand': new State('sales_exp', 'input_slider', {
			title: "Értékeld egy 0-tól 100-as skálán, mennyire ismerős számodra a márka, amivel találkoztál.",
			next: "Következő",
			minValue: 0,
			maxValue: 100
		}),
		'sales_exp': new State('age', 'likert', {
			title: "Mennyire ismerősek számodra az alábbi reklámeszközök?",
			next: "Következő",
			random: true,
			labels: [
				'Egyáltalán nem ismerős',
				'',
				'',
				'',
				'',
				'',
				'Teljes mértékben ismerős'
			],
			questions: [
				{id: '1', question: 'Influenszer marketing'},
				{id: '2', question: 'Márka által szponzorált közösségi média megjelenés (Instagram, YouTube) '}
			]
		}),
		'age': new State('gender', 'input_text', {
			title: "Kérlek, add meg az életkorod számokban!",
			next: "Következő",
			inputs: [{id: "age", label: ""}]
		}),
		'gender': new State('edu', 'input_options', {
			title: "Mi a nemed?",
			next: "Következő",
			options: [
				{id: "0", label: "Férfi"},
				{id: "1", label: "Nő"},
				{id: "2", label: "Egyéb"}
			]
		}),
		'edu': new State('mkt_exp', 'input_options', {
			title: "Mi a legmagasabb befejezett iskolai végzettséged?",
			next: "Következő",
			options: [
				{id: "1", label: "8 általános"},
				{id: "2", label: "Középiskolai érettségi, szakmunkás bizonyítvány vagy ennek megfelelője"},
				{id: "3", label: "Befejezetlen felsőoktatási tanulmányok (nincs diploma)"},
				{id: "4", label: "BA/BSc/főiskolai diploma"},
				{id: "5", label: "MA/MSc/egyetemi diploma"},
				{id: "6", label: "Doktori vagy azzal egyenértékű fokozat"}
			]
		}),
		'mkt_exp': new State('debrief', 'input_options', {
			title: "Hogyan jellemeznéd a reklám/marketing területtel kapcsolatos tudásod?",
			next: "Következő",
			options: [
				{id: "1", label: "Dolgoztam vagy jelenleg is reklámmal/marketinggel foglalkozó ügynökségnél dolgozom."},
				{id: "2", label: "Dolgoztam vagy jelenleg is egy szervezet reklámmal vagy marketinggel foglalkozó osztályán dolgozom."},
				{id: "3", label: "Reklámmal vagy marketinggel kapcsolatos képesítésem van, de nincs gyakorlati vagy munkatapasztalatom a területen."},
				{id: "4", label: "Magasabb szinten tanultam reklámot vagy marketinget, de nincs gyakorlati vagy munkatapasztalatom a területen."},
				{id: "5", label: "Alap szinten tanultam reklámot vagy marketinget, de nincs gyakorlati vagy munkatapasztalatom a területen."},
				{id: "6", label: "Soha nem tanultam reklámot vagy marketinget."}
			]
		}),
		'debrief': new State(null, 'info_text', results => ({
			title: "Köszönjük a részvételed!",
			description: "Egy olyan vizsgálatban vettél részt, amelynek célja a lehetséges kapcsolatok feltárása az influenszerhez való viszony, az influenszer és a reklámozott márka összeillése, az üzenetben található koronavírussal kapcsolatos üzenet, valamint a bemutatott poszt értékelése között.\n\n" +
				"Amennyiben bármilyen további kérdésed van a vizsgálattal kapcsolatban, a buvar.agnes@ppk.elte.hu címen tudsz kapcsolatba lépni a vizsgálatot lebonyolító kollégánkkal, aki készséggel válaszol. Ugyanezen az e-mail címen tudsz felvilágosítást kérni a vizsgálat eredményeivel és azok közzétételével kapcsolatban.\n\n" +
				"Ha részt szeretnél venni a nyereményjátékunkban, kérjük küldd el a **" + results.code + "** kódot a felmeres19@gmail.com e-mail címre.\n\n" +
				"Még egyszer köszönjük a részvételt! Legyen szép napod!\n\n"
		})),
		'debrief_nocode': new State(null, 'info_text', results => ({
			title: "Köszönjük a részvételed!",
			description: "Egy olyan vizsgálatban vettél részt, amelynek célja a lehetséges kapcsolatok feltárása az influenszerhez való viszony, az influenszer és a reklámozott márka összeillése, az üzenetben található koronavírussal kapcsolatos üzenet, valamint a bemutatott poszt értékelése között.\n\n" +
				"Amennyiben bármilyen további kérdésed van a vizsgálattal kapcsolatban, a buvar.agnes@ppk.elte.hu címen tudsz kapcsolatba lépni a vizsgálatot lebonyolító kollégánkkal, aki készséggel válaszol. Ugyanezen az e-mail címen tudsz felvilágosítást kérni a vizsgálat eredményeivel és azok közzétételével kapcsolatban.\n\n" +
				"Még egyszer köszönjük a részvételt! Legyen szép napod!\n\n"
		})),
		'debrief_rejected': new State(null, 'info_text', results => ({
			title: "Köszönjük a részvételed!",
			description: "Egy olyan vizsgálatban vettél részt, amelynek célja a lehetséges kapcsolatok feltárása az influenszerhez való viszony, az influenszer és a reklámozott márka összeillése, az üzenetben található koronavírussal kapcsolatos üzenet, valamint a bemutatott poszt értékelése között.\n\n" +
				"Amennyiben bármilyen további kérdésed van a vizsgálattal kapcsolatban, a buvar.agnes@ppk.elte.hu címen tudsz kapcsolatba lépni a vizsgálatot lebonyolító kollégánkkal, aki készséggel válaszol. Ugyanezen az e-mail címen tudsz felvilágosítást kérni a vizsgálat eredményeivel és azok közzétételével kapcsolatban.\n\n" +
				"Rossz választ adtál meg egy ellenőrző kérdésünkre, emiatt nem tudod befejezni a tesztet és sajnos a jutalom sorsolásban sem tudsz részt venni. Az adataidat nem tároljuk és nem fogjuk felhasználni.\n\n" +
				"Még egyszer köszönjük a részvételt! Legyen szép napod!\n\n"
		}))
	},
	() => 'approval',
	() => ({test: 'psi1-pgabo', group: nextGroup(), code: nextCode()})
)
