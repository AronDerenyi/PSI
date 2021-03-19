const Test = require('./Test')
const State = require('./State')

const groupCount = 2 * 3
let currentGroup = Math.floor(Math.random() * groupCount)

function nextGroup() {
	let group = currentGroup
	currentGroup = (currentGroup + 1) % groupCount
	return {
		covid: [false, true][group % 2],
		brand: ['none', 'congruent', 'incongruent'][Math.floor(group / 2)]
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
			'debrief': results => results['approval'].selected === '0',
			'familiar': results => results['approval'].selected === '1'
		}, 'info_text', {
			title: "Tájékoztató és Beleegyező Nyilatkozat",
			description: "Ön egy tudományos kutatásban vesz részt, amelynek vezetője Buvár Ágnes, az ELTE PPK adjunktusa, illetve Balogh Eszter és Szilágyi Sára Franciska az ELTE PPK mesterszakos pszichológus hallgatói.\n\n" +
				"Jelen vizsgálat célja a közösségi média használat közben tapasztalható, a közösségi médiatartalmak szereplőivel kialakított paraszociális interakciós folyamat mérése.\n\n" +
				"A vizsgálat során egy influenszerrel kapcsolatban fogunk bemutatni vizuális ingereket, képeket és egy videót. Ezekkel kapcsolatban fogjuk kérni különböző kérdések megválaszolására.\n\n" +
				"A vizsgálat mindössze kb. 20 percig tart.\n\n" +
				"A kérdőív kitöltésének káros következménye nincs. A vizsgálatot bármikor indoklás nélkül akár végleg is megszakíthatja, vagy a kérdések megválaszolását megtagadhatja. A vizsgálatban történt részvételért minden 25. résztvevő 2000 forint jutalmat kap Dechatlon vagy Media Markt virtuális ajándékutalvány formájában. A kutatásban való részvétel teljesen önkéntes és anonim.\n\n" +
				"A kutatás során azonosításra alkalmas személyes adatokat nem rögzítünk.\n\n" +
				"Szigorúan bizalmasan kezelünk minden olyan információt, amit a kutatás keretén belül gyűjtünk össze. A kutatás során nyert adatokat kóddal ellátva biztonságos számítógépen őrizzük. Az egyéni kódot minden esetben a kutatásban résztvevő asszisztens adja, csak ő ismeri és ő fér hozzájuk. A kutatás során nyert adatokon csoportszinten végzünk statisztikai elemzéseket, amelyekből egyetlen résztvevő azonossága sem állapítható meg. A vizsgálat eredményéről orvosi jellegű zárójelentés, laborlelet nem készül.\n\n" +
				"A kutatás során kapott eredményekről később publikáció jelenhet meg, és tudományos konferenciákon kerülhet ismertetésre. Ezekről a kívánságnak megfelelően szóbeli vagy írásos tájékoztatást adunk.\n\n" +
				"A továbblépéssel hozzájárul ahhoz, hogy a vizsgálat során az Önről felvett, személye azonosítására nem alkalmas adatokat kutatási célra felhasználjuk, illetve, hogy más kutatók számára is hozzáférhetők legyenek. Fenntartom a jogot arra, hogy a vizsgálat során annak folytatásától bármikor elállhassak. Ilyen esetben a rólam addig felvett adatokat törölni kell.\n\n" +
				"Beleegyezésemmel kijelentem, hogy 18 éves elmúltam, a kutatásban való részvételem körülményeiről részletes tájékoztatást kaptam, a feltételekkel egyetértek, a részvételt vállalom.",
			positive: "Beleegyezem és elfogadom",
			positiveId: "1",
			negative: "Elutasítom",
			negativeId: "0"
		}),
		'familiar': new State({
			'video': results => results['familiar'].selected === '0',
			'psr': results => results['familiar'].selected === '1',
		}, 'input_options', {
			title: "Ismered Farkas Timit?",
			next: "Következő",
			options: [
				{id: "1", label: "Igen"},
				{id: "0", label: "Nem"}
			]
		}),


		'video': new State('psi', 'info_video', {
			title: "Kérlek figyelmesen nézd végig a videót.",
			next: "Következő",
			source: "/res/farkas_timi.mp4"
		}),
		'psi': new State({
			'insta_brand_none': results => results.group.covid === false && results.group.brand === 'none',
			'insta_brand_cong': results => results.group.covid === false && results.group.brand === 'congruent',
			'insta_brand_incong': results => results.group.covid === false && results.group.brand === 'incongruent',
			'insta_covid_brand_none': results => results.group.covid === true && results.group.brand === 'none',
			'insta_covid_brand_cong': results => results.group.covid === true && results.group.brand === 'congruent',
			'insta_covid_brand_incong': results => results.group.covid === true && results.group.brand === 'incongruent'
		}, 'likert', {
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


		'psr': new State({
			'insta_brand_none': results => results.group.covid === false && results.group.brand === 'none',
			'insta_brand_cong': results => results.group.covid === false && results.group.brand === 'congruent',
			'insta_brand_incong': results => results.group.covid === false && results.group.brand === 'incongruent',
			'insta_covid_brand_none': results => results.group.covid === true && results.group.brand === 'none',
			'insta_covid_brand_cong': results => results.group.covid === true && results.group.brand === 'congruent',
			'insta_covid_brand_incong': results => results.group.covid === true && results.group.brand === 'incongruent'
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
			control: '0',
			questions: [
				{
					id: '1',
					question: 'Farkas Timit nézve olyan érzésem támad, mintha olyasvalaki lenne, akit jól ismerek.'
				},
				{id: '2', question: 'Ha Farkas Timi megjelenne egy műsorban, megnézném azt a műsort.'},
				{id: '3', question: 'Farkas Timit egy természetes, szerény embernek látom.'},
				{id: '4', question: 'Ha látnék egy cikket, melyben Farkas Timi szerepel, elolvasnám azt.'},
				{id: '5', question: 'Szeretnék élőben is találkozni Farkas Timivel.'},
				{id: '6', question: 'Úgy érzem, megértem Farkas Timi érzéseit.'},
				{id: '7', question: 'Előfordul olykor, hogy Farkas Timire gondolok.'},
				{id: '8', question: 'Nem érzek semmit Farkas Timivel kapcsolatban.'},
				{id: '9', question: 'Szívesen nézem Farkas Timi videóit és posztjait a közösségi médiában.'},
				{
					id: '10',
					question: 'Amikor nem jutok Farkas Timivel kapcsolatos hírekhez, hiányolom ezeket a híreket.'
				},
				{id: '11', question: 'Szeretnék minél több mindent megtudni Farkas Timiről.'},
				{
					id: '12',
					question: 'Előfordul, hogy információ után kutatok, hogy többet tudhassak meg Farkas Timiről.'
				},
				{id: '13', question: 'Néha böngészek az interneten azért, hogy információt találjak Farkas Timiről.'},
				{id: '14', question: 'Néha kedvem támad írásban reagálni Farkas Timi videójára vagy posztjára.'},
				{
					id: '15',
					question: 'Szerintem Farkas Timi ért azokhoz a dolgokhoz, amikről én is többet szeretnék tudni.'
				},
				{id: '16', question: 'Néha kommentelek Farkas Timi posztjai alá.'},
				{id: '17', question: 'Jól ismerem Farkas Timi életének részleteit.'},
				{id: '18', question: 'Csak nagyon kicsit értem meg Farkas Timit, mint embert.'},
				{id: '19', question: 'Előre várni szoktam, hogy Farkas Timi új videót vagy posztot töltsön fel.'},
				{id: '20', question: 'Farkas Timi nem igazán érdekel engem.'},
				{id: '0', question: 'Kérlek nyomd meg az ötös gombot.'}
			]
		}),


		'insta_brand_none': new State('actions', 'info_image', {
			title: "Tanulmányozd az alábbi Instagram posztot minimum tíz másodpercig!",
			next: "Következő",
			source: "/res/insta_brand_none.png",
			waitingTime: 10000
		}),
		'insta_brand_cong': new State('actions', 'info_image', {
			title: "Tanulmányozd az alábbi Instagram posztot minimum tíz másodpercig!",
			next: "Következő",
			source: "/res/insta_brand_cong.png",
			waitingTime: 10000
		}),
		'insta_brand_incong': new State('actions', 'info_image', {
			title: "Tanulmányozd az alábbi Instagram posztot minimum tíz másodpercig!",
			next: "Következő",
			source: "/res/insta_brand_incong.png",
			waitingTime: 10000
		}),
		'insta_covid_brand_none': new State('actions', 'info_image', {
			title: "Tanulmányozd az alábbi Instagram posztot minimum tíz másodpercig!",
			next: "Következő",
			source: "/res/insta_covid_brand_none.png",
			waitingTime: 10000
		}),
		'insta_covid_brand_cong': new State('actions', 'info_image', {
			title: "Tanulmányozd az alábbi Instagram posztot minimum tíz másodpercig!",
			next: "Következő",
			source: "/res/insta_covid_brand_cong.png",
			waitingTime: 10000
		}),
		'insta_covid_brand_incong': new State('actions', 'info_image', {
			title: "Tanulmányozd az alábbi Instagram posztot minimum tíz másodpercig!",
			next: "Következő",
			source: "/res/insta_covid_brand_incong.png",
			waitingTime: 10000
		}),


		'actions': new State('trustworthy', 'likert', {
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
		'trustworthy': new State('attractive', 'likert', {
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
		'attractive': new State({
			'ethics': results => results.group.brand !== 'none',
			'covid_content': results => results.group.brand === 'none' && results.group.covid === true,
			'creadibility': results => results.group.brand === 'none' && results.group.covid === false,
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


		'ethics': new State('brand', 'likert', {
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
		'brand': new State({
			'debrief1_cong': results => results.group.brand === 'congruent',
			'debrief1_incong': results => results.group.brand === 'incongruent'
		}, 'input_text', {
			title: "Kérlek, válaszolj, az alábbi kérdésekre",
			next: "Következő",
			inputs: [
				{id: "product", label: "Milyen termék szerepelt a posztban?"},
				{id: "brand", label: "Milyen márka szerepelt a posztban?"},
			]
		}),
		'debrief1_cong': new State('congruency_cong', 'info_text', {
			title: "Az instagram bejegyzésben egy HelloBody kozmetikum volt látható, egy Coco WOW agyagmaszk szerepelt a képen.",
			positive: "Következő",
		}),
		'debrief1_incong': new State('congruency_incong', 'info_text', {
			title: "Az instagram bejegyzésben a PizzaForte volt látható, két PizzaFortés pizzadoboz szerepelt a képen.",
			positive: "Következő",
		}),
		'congruency_cong': new State({
			'covid_content': results => results.group.covid === true,
			'creadibility': results => results.group.covid === false,
		}, 'osgood', {
			title: "Hogyan jellemeznéd az HelloBody márka és Farkas Timi kapcsolatát?",
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
		'congruency_incong': new State({
			'covid_content': results => results.group.covid === true,
			'creadibility': results => results.group.covid === false,
		}, 'osgood', {
			title: "Hogyan jellemeznéd a PizzaForte márka és Farkas Timi kapcsolatát?",
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


		'covid_content': new State('debrief2', 'input_text', {
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
		'debrief2': new State('covid_attractive', 'info_text', {
			title: "A posztban koronavírushoz kapcsolódó tartalom szerepelt.",
			description: "Timi arra biztatott, hogy maradjunk otthon és vigyázzunk magunkra.",
			positive: "Következő",
		}),
		'covid_attractive': new State('third_person', 'osgood', {
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
		'third_person': new State('covid_congruency', 'input_slider', {
			title: "Szerinted mennyire találták meggyőzőnek mások a posztban található koronavírussal kapcsolatos üzenetet egy 0-tól 100-as skálán?",
			next: "Következő",
			minValue: 0,
			maxValue: 100
		}),
		'covid_congruency': new State('creadibility', 'osgood', {
			title: "Hogyan jellemeznéd a koronavírussal kapocsolatos üzenet és Farkas Timi kapcsolatát?",
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


		'creadibility': new State('advertisement', 'osgood', {
			title: "A következő fogalmak segítségével jellemezd Farkas Timit!",
			next: "Következő",
			pageSize: 6,
			random: true,
			size: 5,
			control: '0',
			pairs: [
				{id: '1', first: 'taszító', second: 'vonzó'}, // attractiveness
				{id: '2', first: 'közönséges', second: 'ízléses'},
				{id: '3', first: 'csúnya', second: 'szép'},
				{id: '4', first: 'hétköznapi', second: 'elegáns'},
				{id: '5', first: 'nem szexi', second: 'szexi'},
				{id: '6', first: 'megbízhatatlan', second: 'megbízható'}, // trustworthiness
				{id: '7', first: 'becstelen', second: 'becsületes'},
				{id: '8', first: 'hiteltelen', second: 'hiteles'},
				{id: '9', first: 'őszintétlen', second: 'őszinte'},
				{id: '10', first: 'tisztességtelen', second: 'tisztességes'},
				{id: '11', first: 'nem szakértő', second: 'szakértő'}, // expertise
				{id: '12', first: 'tapasztalatlan', second: 'tapasztalt'},
				{id: '13', first: 'tudatlan', second: 'jól informált'},
				{id: '14', first: 'hozzá nem értő', second: 'hozzáértő'},
				{id: '15', first: 'kontár', second: 'profi'},
				{id: '16', first: 'törődik velem', second: 'nem törődik velem'}, // goodwill
				{id: '17', first: 'figyelembe veszi az érdekeimet', second: 'nem veszi figyelembe az érdekeimet'},
				{id: '18', first: 'énközpontú', second: 'empatikus'},
				{id: '19', first: 'foglalkozik velem', second: 'nem foglalkozik velem'},
				{id: '20', first: 'érzéketlen', second: 'érzékeny'},
				{id: '21', first: 'nem megértő', second: 'megértő'},
				{id: '0', first: 'nyomd meg balról', second: 'a negyedik lehetőséget'}
			]
		}),
		'advertisement': new State('post_familiar', 'input_slider', {
			title: "Értékeld, mennyire tekinthető reklámnak, amit láttál egy 0-tól 100-as skálán.",
			next: "Következő",
			minValue: 0,
			maxValue: 100
		}),
		'post_familiar': new State({
			'brand_familiar': results => results.group.brand !== 'none',
			'sales_knowledge': results => results.group.brand === 'none'
		}, 'input_slider', {
			title: "Értékeld egy 0-tól 100-as skálán, mennyire ismerős számodra a poszt, amit láttál.",
			next: "Következő",
			minValue: 0,
			maxValue: 100
		}),
		'brand_familiar': new State('sales_knowledge', 'input_slider', {
			title: "Értékeld egy 0-tól 100-as skálán, mennyire ismerős számodra a márka, amivel találkoztál.",
			next: "Következő",
			minValue: 0,
			maxValue: 100
		}),
		'sales_knowledge': new State('age', 'likert', {
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
		'gender': new State('education', 'input_options', {
			title: "Mi a nemed?",
			next: "Következő",
			options: [
				{id: "0", label: "Férfi"},
				{id: "1", label: "Nő"},
				{id: "2", label: "Egyéb"}
			]
		}),
		'education': new State('marketing_knowledge', 'input_options', {
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
		'marketing_knowledge': new State('source', 'input_options', {
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
		'source': new State('debrief', 'input_text', {
 			title: "Honnan hallottál a kérdőívről?",
 			next: "Következő",
 			inputs: [{id: "source", label: ""}]
 		}),
		'debrief': new State(null, 'info_text', results => ({
			title: "Köszönjük a részvételed!",
			description: "Egy olyan vizsgálatban vettél részt, amelynek célja a lehetséges kapcsolatok feltárása az influenszerhez való viszony, az influenszer és a reklámozott márka összeillése, az üzenetben található koronavírussal kapcsolatos üzenet, valamint a bemutatott poszt értékelése között.\n\n" +
				"Amennyiben bármilyen további kérdésed van a vizsgálattal kapcsolatban, a buvar.agnes@ppk.elte.hu címen tudsz kapcsolatba lépni a vizsgálatot lebonyolító kollégánkkal, aki készséggel válaszol. Ugyanezen az e-mail címen tudsz felvilágosítást kérni a vizsgálat eredményeivel és azok közzétételével kapcsolatban.\n\n" +
				"Még egyszer köszönjük a részvételt! Legyen szép napod!\n\n"
		})),
	},
	() => 'approval',
	() => ({test: 'psi1', group: nextGroup(), code: nextCode()})
)
