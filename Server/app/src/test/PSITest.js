const Test = require('./Test')
const State = require('./State')

let positive = Math.random() < 0.5
let measuredCongruent = Math.random() < 0.5
let positiveCongruent = Math.random() < 0.5
let negativeCongruent = Math.random() < 0.5

function lazyGroupPositivity(group) {
	if (group.positive === null) {
		group.positive = positive
		positive = !positive
	}

	return group.positive
}

function lazyGroupCongruency(group) {
	if (group.congruent === null) {
		if (group.positive === null) {
			group.congruent = measuredCongruent
			measuredCongruent = !measuredCongruent
		} else if (group.positive) {
			group.congruent = positiveCongruent
			positiveCongruent = !positiveCongruent
		} else {
			group.congruent = negativeCongruent
			negativeCongruent = !negativeCongruent
		}
	}

	return group.congruent
}

module.exports = new Test(
	{
		'approval': new State('fam', 'info_text', {
			title: "Tájékoztató és Beleegyező Nyilatkozat",
			description: "Ön egy tudományos kutatásban vesz részt, amelynek vezetője Buvár Ágnes, az ELTE PPK adjunktusa, illetve Balogh Eszter és Szilágyi Sára Franciska az ELTE PPK mesterszakos pszichológus hallgatói.\n" +
				"\n" +
				"Jelen vizsgálat célja a közösségi média használat közben tapasztalható, a közösségi médiatartalmak szereplőivel kialakított paraszociális interakciós folyamat mérése. \n" +
				"\n" +
				"A vizsgálat során egy influenszerrel kapcsolatban fogunk bemutatni vizuális ingereket, képeket és egy videót. Ezekkel kapcsolatban fogjuk kérni különböző kérdések megválaszolására.\n" +
				"\n" +
				"A vizsgálat mindössze kb. 20 percig tart.\n" +
				"\n" +
				"A kérdőív kitöltésének káros következménye nincs. A vizsgálatot bármikor indoklás nélkül akár végleg is megszakíthatja, vagy a kérdések megválaszolását megtagadhatja. A vizsgálatban történt részvételért anyagi javadalmazás nem jár. A kutatásban való részvétel teljesen önkéntes és anonim.\n" +
				"\n" +
				"A kutatás során azonosításra alkalmas személyes adatokat nem rögzítünk.\n" +
				"Szigorúan bizalmasan kezelünk minden olyan információt, amit a kutatás keretén belül gyűjtünk össze. A kutatás során nyert adatokat kóddal ellátva biztonságos számítógépen őrizzük. Az egyéni kódot minden esetben a kutatásban résztvevő asszisztens adja, csak ő ismeri és ő fér hozzájuk. A kutatás során nyert adatokon csoportszinten végzünk statisztikai elemzéseket, amelyekből egyetlen résztvevő azonossága sem állapítható meg. A vizsgálat eredményéről orvosi jellegű zárójelentés, laborlelet nem készül. \n" +
				"\n" +
				"A kutatás során kapott eredményekről később publikáció jelenhet meg, és tudományos konferenciákon kerülhet ismertetésre. Ezekről a kívánságnak megfelelően szóbeli vagy írásos tájékoztatást adunk.\n" +
				"\n" +
				"A továbblépéssel hozzájárul ahhoz, hogy a vizsgálat során az Önről felvett, személye azonosítására nem alkalmas adatokat kutatási célra felhasználjuk, illetve, hogy más kutatók számára is hozzáférhetők legyenek. Fenntartom a jogot arra, hogy a vizsgálat során annak folytatásától bármikor elállhassak. Ilyen esetben a rólam addig felvett adatokat törölni kell.\n" +
				"\n" +
				"Kijelentem, hogy 18 éves elmúltam, a kutatásban való részvételem körülményeiről részletes tájékoztatást kaptam, a feltételekkel egyetértek, a részvételt vállalom\n",
			next: "Beleegyezem és elfogadom"
		}),
		'fam': new State({
			'fam_scale': results => results['fam'].selected === '1',
			'vid_positive': results => results['fam'].selected === '0' && lazyGroupPositivity(results.group),
			'vid_negative': results => results['fam'].selected === '0' && !lazyGroupPositivity(results.group),
		}, 'input_options', {
			title: "Ismered [influencer]?", // TODO: influencer
			next: "Következő",
			options: [
				{id: "1", label: "Igen"},
				{id: "0", label: "Nem"}
			]
		}),
		'fam_scale': new State('following', 'input_slider', {
			title: "Értékeld egy 0-tól 100-as skálán, mennyire ismered [influencer]!", // TODO: influencer
			next: "Következő",
			minValue: 0,
			maxValue: 100
		}),
		'following': new State('PSR', 'input_options', {
			title: "Követed valamilyen platformon [influencer]t?", // TODO: influencer
			next: "Következő",
			options: [
				{id: "1", label: "Igen"},
				{id: "0", label: "Nem"}
			]
		}),



		// TODO: influencer
		'PSR': new State('disclosure', 'likert', {
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
			questions: [
				{
					id: '1',
					question: '[influencer]t nézve olyan érzésem támad, mintha olyasvalaki lenne, akit jól ismerek.'
				},
				{id: '2', question: 'Ha [influencer] megjelenne egy műsorban, megnézném azt a műsort.'},
				{id: '3', question: '[influencer]t egy természetes, szerény embernek látom.'},
				{id: '4', question: 'Ha látnék egy cikket, melyben [influencer] szerepel, elolvasnám azt.'},
				{id: '5', question: 'Szeretnék élőben is találkozni [influencer]vel.'},
				{id: '6', question: 'Úgy érzem, megértem [influencer] érzéseit.'},
				{id: '7', question: 'Előfordul olykor, hogy [influencer]re gondolok.'},
				{id: '8', question: 'Nem érzek semmit [influencer]vel kapcsolatban.'},
				{id: '9', question: 'Szívesen nézem [influencer] videóit és posztjait a közösségi médiában.'},
				{
					id: '10',
					question: 'Amikor nem jutok [influencer]vel kapcsolatos hírekhez, hiányolom ezeket a híreket.'
				},
				{id: '11', question: 'Szeretnék minél több mindent megtudni [influencer]ről.'},
				{
					id: '12',
					question: 'Előfordul, hogy információ után kutatok, hogy többet tudhassak meg [influencer]ről.'
				},
				{id: '13', question: 'Néha böngészek az interneten azért, hogy információt találjak [influencer]ről.'},
				{id: '14', question: 'Néha kedvem támad írásban reagálni [influencer] videójára vagy posztjára.'},
				{
					id: '15',
					question: 'Szerintem [influencer] ért azokhoz a dolgokhoz, amikről én is többet szeretnék tudni.'
				},
				{id: '16', question: 'Néha kommentelek [influencer] posztjai alá.'},
				{id: '17', question: 'Jól ismerem [influencer] életének részleteit.'},
				{id: '18', question: 'Csak nagyon kicsit értem meg [influencer]t, mint embert.'},
				{id: '19', question: 'Előre várni szoktam, hogy [influencer] új videót vagy posztot töltsön fel.'},
				{id: '20', question: '[influencer] nem igazán érdekel engem.'},
				{id: 'control', question: 'Kérlek nyomd meg az ötös gombot.'}
			]
		}),



		'vid_positive': new State('EPSI', 'info_video', {
			title: "Kérlek figyelmesen nézd végig a videót!",
			next: "Következő",
			source: "/res/vid_positive.mp4"
		}),
		'vid_negative': new State('EPSI', 'info_video', {
			title: "Kérlek figyelmesen nézd végig a videót!",
			next: "Következő",
			source: "/res/vid_negative.mp4"
		}),
		'EPSI': new State('disclosure', 'likert', {
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
				{id: '1', question: 'Farkas Timi úgy beszélt mintha én is ott lettem volna vele'},
				{id: '2', question: 'mintha Farkas Timi érzékelte volna a jelenlétem'},
				{id: '3', question: 'mintha Farkas Timi hozzám beszélt volna'},
				{id: '4', question: 'mintha Farkas Timi tudta volna, hogy figyelek rá'},
				{id: '5', question: 'mintha Farkas Timi ismerte volna a reakcióimat'},
				{id: '6', question: 'mintha Farkas Timi reagált volna a gondolataimra'}
			]
		}),



		'disclosure': new State({
			'post_congruent': results => lazyGroupCongruency(results.group),
			'post_incongruent': results => !lazyGroupCongruency(results.group)
		}, 'info_text', { // TODO: disclosure
			title: "Disclosure",
			next: "Következő"
		}),
		'post_congruent': new State('eng', 'info_image', {
			title: "Tanulmányozd az alábbi Instagram posztot minimum tíz másodpercig!",
			next: "Következő",
			source: "/res/post_congruent.png",
			waitingTime: 10000
		}),
		'post_incongruent': new State('eng', 'info_image', {
			title: "Tanulmányozd az alábbi Instagram posztot minimum tíz másodpercig!",
			next: "Következő",
			source: "/res/post_incongruent.png",
			waitingTime: 10000
		}),


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
		'ad_att': new State('rec', 'osgood', {
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



		'rec': new State({
			'debrief1_congruent': results => lazyGroupCongruency(results.group),
			'debrief1_incongruent': results => !lazyGroupCongruency(results.group)
		}, 'input_text', {
			title: "Kérlek, válaszolj, az alábbi kérdésekre!",
			next: "Következő",
			inputs: [
				{id: "product", label: "Milyen termék szerepelt a posztban?"},
				{id: "brand", label: "Milyen márka szerepelt a posztban?"},
			]
		}),
		'debrief1_congruent': new State('brand_att', 'info_text', {
			title: "Az instagram bejegyzésben [congruent_brand] volt látható, [congruent_product] szerepelt a képen.", // TODO: brand, product, influencer
			next: "Következő",
		}),
		'debrief1_incongruent': new State('brand_att', 'info_text', {
			title: "Az instagram bejegyzésben [incongruent_brand] volt látható, [incongruent_product] szerepelt a képen.", // TODO: brand, product, influencer
			next: "Következő",
		}),
		'brand_att': new State('purch_int', 'osgood', {
			title: "A következő kérdésekre adott válaszok segítségével jellemezd a posztban látott márkával kapcsolatos érzéseid!",
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
		'purch_int': new State({
			'con_congruent': results => lazyGroupCongruency(results.group),
			'con_incongruent': results => !lazyGroupCongruency(results.group)
		}, 'input_slider', {
			title: "Hogyan jellemezné az instagram posztban látott márkával kapcsolatos feltételezett vásárlási szándékát egy 0-tól 100-as skálán?",
			next: "Következő",
			minValue: 0,
			maxValue: 100
		}),
		'con_congruent': new State('third_pers', 'osgood', {
			title: "Hogyan jellemeznéd [congruent_brand] és [influencer] kapcsolatát?", // TODO: brand, influencer
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
		'con_incongruent': new State('cred', 'osgood', {
			title: "Hogyan jellemeznéd [incongruent_brand] és [influencer] kapcsolatát?", // TODO: brand, influencer
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



		'cred': new State('fam_post', 'osgood', {
			title: "A következő fogalmak segítségével jellemezd [influencer]!", // TODO: Influencer
			next: "Következő",
			pageSize: 6,
			random: true,
			size: 5,
			control: 'control',
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
				{id: 'cred_control', first: 'nyomd meg balról', second: 'a negyedik lehetőséget'}
			]
		}),
		'fam_post': new State('fam_brand', 'input_slider', {
			title: "Értékeld egy 0-tól 100-as skálán, mennyire ismerős számodra a poszt, amit láttál!",
			next: "Következő",
			minValue: 0,
			maxValue: 100
		}),
		'fam_brand': new State('sales_exp', 'input_slider', {
			title: "Értékeld egy 0-tól 100-as skálán, mennyire ismerős számodra a márka, amivel találkoztál!",
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



		'debrief': new State(null, 'info_text', {
			title: "Köszönjük a részvételed!",
			description: "Egy olyan vizsgálatban vettél részt, amelynek célja a lehetséges kapcsolatok feltárása az influenszerhez való viszony, az influenszer és a reklámozott márka összeillése, az üzenetben található koronavírussal kapcsolatos üzenet, valamint a bemutatott poszt értékelése között.\n" +
				"\n" +
				"Amennyiben bármilyen további kérdésed van a vizsgálattal kapcsolatban, a buvar.agnes@ppk.elte.hu címen tudsz kapcsolatba lépni a vizsgálatot lebonyolító kollégánkkal, aki készséggel válaszol. Ugyanezen az e-mail címen tudsz felvilágosítást kérni a vizsgálat eredményeivel és azok közzétételével kapcsolatban.\n" +
				"\n" +
				"Még egyszer köszönjük a részvételt! Legyen szép napod!\n"
		}),
	},
	() => 'approval',
	() => ({test: 'psi2', group: {positive: null, congruent: null}})
)
