import { useState } from "react";

// ── TRANSLATIONS ──────────────────────────────────────────────
// (legacy data removed – using CATEGORIES_DATA below)

const BG      = "#1a1a18";
const BG2     = "#222220";
const BG3     = "#2c2c29";
const GOLD    = "#b8975a";
const GOLDLT  = "#d4b47a";
const TEXT    = "#e8e0d0";
const TEXTMUT = "#9a8f7a";

const HopmannsLogo = ({ size = 68 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="4" fill={BG}/>
    <rect x="3" y="3" width="94" height="94" rx="3" fill="none" stroke={GOLD} strokeWidth="1"/>
    <text x="50" y="28" textAnchor="middle" fontFamily="Georgia,serif" fontSize="24" fontWeight="bold" fill={GOLD}>25</text>
    <line x1="18" y1="33" x2="82" y2="33" stroke={GOLD} strokeWidth="0.8"/>
    {[22,29,36,43,50,57,64,71,78].map((x,i) => (
      <ellipse key={i} cx={x} cy={i%2===0?30.5:35.5} rx="3.5" ry="1.6" fill={GOLD}
        transform={`rotate(${i%2===0?-25:25},${x},${i%2===0?30.5:35.5})`}/>
    ))}
    <text x="50" y="47" textAnchor="middle" fontFamily="Georgia,serif" fontSize="8" fill={TEXT} letterSpacing="2">HOPMANNS</text>
    <text x="50" y="64" textAnchor="middle" fontFamily="Georgia,serif" fontSize="20" fontWeight="bold" fontStyle="italic" fill={GOLD}>Olive</text>
    <line x1="14" y1="68" x2="86" y2="68" stroke={GOLD} strokeWidth="0.7"/>
    <text x="50" y="77" textAnchor="middle" fontFamily="Georgia,serif" fontSize="5.5" fill={TEXTMUT} letterSpacing="0.5">HopmannsOlive.de</text>
    <circle cx="78" cy="86" r="16" fill={GOLD}/>
    <text x="78" y="82" textAnchor="middle" fontFamily="Georgia,serif" fontSize="4.2" fill={BG} fontStyle="italic">Save the</text>
    <text x="78" y="87" textAnchor="middle" fontFamily="Georgia,serif" fontSize="4.2" fill={BG} fontStyle="italic">Date</text>
    <text x="78" y="93" textAnchor="middle" fontFamily="Georgia,serif" fontSize="5.5" fontWeight="bold" fill={BG}>2026</text>
  </svg>
);

const GoldDivider = () => (
  <div style={{ display:"flex", alignItems:"center", gap:"10px", margin:"6px 0 18px" }}>
    <div style={{ flex:1, height:"1px", background:`linear-gradient(to right, transparent, ${GOLD})` }}/>
    <div style={{ width:"5px", height:"5px", background:GOLD, transform:"rotate(45deg)", flexShrink:0 }}/>
    <div style={{ flex:1, height:"1px", background:`linear-gradient(to left, transparent, ${GOLD})` }}/>
  </div>
);

const fmt = (n) => n.toFixed(2).replace(".", ",") + " \u20ac";

// ── ÜBERSETZUNGEN ──────────────────────────────────────────────
// ── KATEGORIEN MIT ÜBERSETZUNGEN ───────────────────────────────
const CATEGORIES_DATA = [
  {
    id:"vorspeisen",
    name:{ de:"Vorspeisen", en:"Starters", nl:"Voorgerechten", tr:"Başlangıçlar" },
    items:[
      {
        id:1,
        name:{ de:"Bärlauch-Schaumsuppe", en:"Wild Garlic Foam Soup", nl:"Daslook schuimsoep", tr:"Yabani Sarımsak Köpük Çorbası" },
        desc:{ de:"", en:"", nl:"", tr:"" },
        variants:[
          { label:{ de:"Ohne Beilage", en:"Without Side", nl:"Zonder bijgerecht", tr:"Garnitürsüz" }, price:12.00 },
          { label:{ de:"+ Fischkonfekt & Dillcreme", en:"+ Fish Confection & Dill Cream", nl:"+ Visconfect & Dilleroom", tr:"+ Balık Konfekti & Dereotu Kreması" }, price:15.00 },
        ],
      },
      {
        id:3,
        name:{ de:"\u201eFrühjahrs Bowl\u201c", en:"\u201cSpring Bowl\u201d", nl:"\u201eLentebowl\u201c", tr:"\u201cBahar Kasesi\u201d" },
        desc:{ de:"Teriyaki Reis | Mizuna Salat | Pak Choi | Mango | Avocado | Erdnuss | Sesam | Ponzu-Dressing", en:"Teriyaki Rice | Mizuna Salad | Pak Choi | Mango | Avocado | Peanut | Sesame | Ponzu Dressing", nl:"Teriyaki rijst | Mizuna salade | Paksoi | Mango | Avocado | Pinda | Sesam | Ponzu-dressing", tr:"Teriyaki Pirinç | Mizuna Salata | Pak Choi | Mango | Avokado | Fıstık | Susam | Ponzu Sos" },
        variants:[
          { label:{ de:"Bowl", en:"Bowl", nl:"Bowl", tr:"Kase" }, price:16.00 },
          { label:{ de:"+ Riesengarnele im Knuspermantel", en:"+ King Prawn in Crispy Coat", nl:"+ Reuzengarnaal in krokant jasje", tr:"+ Çıtır Kaplamalı Karides" }, price:21.00 },
        ],
        variantNote:{ de:"Upgrade: Riesengarnele pro Stück +5,00 \u20ac", en:"Upgrade: King prawn per piece +5.00 \u20ac", nl:"Upgrade: reuzengarnaal per stuk +5,00 \u20ac", tr:"Yükseltme: Adet başı karides +5,00 \u20ac" },
      },
      { id:4, name:{ de:"Zweierlei vom Kohlrabi", en:"Two Ways of Kohlrabi", nl:"Kohlrabi op twee manieren", tr:"İki Şekilde Kohlrabi" }, desc:{ de:"Geröstet & Eingelegt | Apfel | Buttermilch | Haselnuss", en:"Roasted & Pickled | Apple | Buttermilk | Hazelnut", nl:"Geroosterd & Ingelegde | Appel | Karnemelk | Hazelnoot", tr:"Kızartılmış & Turşu | Elma | Ayran | Fındık" }, price:15.00 },
      { id:5, name:{ de:"Mild gebeiztes Saiblingsfilet", en:"Mildly Cured Arctic Char Fillet", nl:"Zacht gepekeld beekforelfilet", tr:"Hafif Kürlü Alabalık Fileto" }, desc:{ de:"Miso | Rettich | Gurke", en:"Miso | Radish | Cucumber", nl:"Miso | Radijs | Komkommer", tr:"Miso | Turp | Salatalık" }, price:22.00 },
      { id:6, name:{ de:"Tatar vom Rinderfilet", en:"Beef Fillet Tartare", nl:"Tartaar van runderfilet", tr:"Dana Fileto Tatar" }, desc:{ de:"Handgeschnitten | Confiertes Eigelb | Kräutersponge | Umami-Creme", en:"Hand-cut | Confit Egg Yolk | Herb Sponge | Umami Cream", nl:"Handgesneden | Geconfijte eierdooier | Kruidenspons | Umami-crème", tr:"El Yapımı | Konfit Yumurta Sarısı | Bitki Süngeri | Umami Krem" }, price:22.00 },
      { id:7, name:{ de:"Gambas \u201epikant\u201c", en:"Spicy Gambas", nl:"Pikante gambas", tr:"Baharatlı Karides" }, desc:{ de:"Olivenöl | Knoblauch | Chili", en:"Olive Oil | Garlic | Chili", nl:"Olijfolie | Knoflook | Chili", tr:"Zeytinyağı | Sarımsak | Chili" }, price:20.00 },
    ],
  },
  {
    id:"hauptspeisen",
    name:{ de:"Hauptspeisen", en:"Main Courses", nl:"Hoofdgerechten", tr:"Ana Yemekler" },
    items:[
      { id:10, name:{ de:"Sardische Fregula", en:"Sardinian Fregula", nl:"Sardinische Fregula", tr:"Sardinya Frequla" }, desc:{ de:"Kräuterseitlinge | Treviso | Buchweizen-Crunch | Blutorangen-Beurre blanc | Kräuteröl", en:"Oyster Mushrooms | Treviso | Buckwheat Crunch | Blood Orange Beurre Blanc | Herb Oil", nl:"Kruidenoesterzwammen | Treviso | Boekweitcrunch | Bloedsinaasappel-beurre blanc | Kruidenolie", tr:"İstiridye Mantarı | Treviso | Karabuğday Gevreği | Kan Portakallı Beurre Blanc | Otlu Yağ" }, price:30.00 },
      { id:11, name:{ de:"Lotte und Gambas", en:"Monkfish & Gambas", nl:"Zeeduivel en gambas", tr:"Fener Balığı & Karides" }, desc:{ de:"Gebraten in Olivenöl | Knoblauch | Mediterrane Kräuter | Pikante Spaghetti", en:"Fried in Olive Oil | Garlic | Mediterranean Herbs | Spicy Spaghetti", nl:"Gebakken in olijfolie | Knoflook | Mediterrane kruiden | Pikante spaghetti", tr:"Zeytinyağında Kızartılmış | Sarımsak | Akdeniz Otları | Acılı Spagetti" }, price:40.00 },
      { id:12, name:{ de:"Island-Saiblingsfilet", en:"Icelandic Arctic Char Fillet", nl:"IJslands beekforelfilet", tr:"İzlanda Alabalık Fileto" }, desc:{ de:"Gebraten | Zitronen-Risotto | Lauchtexturen | Miso-Hollandaise", en:"Pan-fried | Lemon Risotto | Leek Textures | Miso Hollandaise", nl:"Gebakken | Citroenrisotto | Prei-texturen | Miso-hollandaise", tr:"Tavada Kızartılmış | Limon Risotto | Pırasa Dokuları | Miso Hollandaise" }, price:44.00 },
      { id:13, name:{ de:"Maishähnchenbrust Supreme", en:"Corn-fed Chicken Breast Supreme", nl:"Mais kippenborst supreme", tr:"Mısır Besili Tavuk Göğsü" }, desc:{ de:"Spitzkohl | Confierte Kartoffeln | Soja-Karamell", en:"Pointed Cabbage | Confit Potatoes | Soy Caramel", nl:"Spitskool | Geconfijte aardappelen | Soja-karamel", tr:"Sivri Lahana | Konfit Patates | Soya Karamel" }, price:38.00 },
      { id:14, name:{ de:"Rückenfilet vom Holsteiner Salzwiesenlamm", en:"Holstein Salt Meadow Lamb Loin Fillet", nl:"Lamsrugfilet van Holsteiner zoutweidenlam", tr:"Holstein Tuzlu Çayır Kuzusu Sırt Fileto" }, desc:{ de:"Im Heu gegart | Möhrenvielfalt | Kartoffelvelouté | Jus", en:"Hay-cooked | Carrot Variety | Potato Velouté | Jus", nl:"In hooi gegaard | Wortelvarieteit | Aardappelvelouté | Jus", tr:"Saman İçinde Pişirilmiş | Havuç Çeşitliliği | Patates Velouté | Et Suyu" }, price:46.00 },
    ],
  },
  {
    id:"steak",
    name:{ de:"Black Angus Rind", en:"Black Angus Beef", nl:"Black Angus Rund", tr:"Black Angus Sığır" },
    subtitle:{ de:"Australisches Fleisch", en:"Australian Beef", nl:"Australisch vlees", tr:"Avustralya Eti" },
    items:[
      {
        id:20,
        name:{ de:"Rumpsteak", en:"Rump Steak", nl:"Rumpsteak", tr:"Rump Biftek" },
        desc:{ de:"Black Angus Rind aus Australien", en:"Black Angus Beef from Australia", nl:"Black Angus rund uit Australië", tr:"Avustralya Black Angus Sığır" },
        variants:[
          { label:{ de:"250g", en:"250g", nl:"250g", tr:"250g" }, price:32.00 },
          { label:{ de:"350g", en:"350g", nl:"350g", tr:"350g" }, price:42.00 },
          { label:{ de:"450g", en:"450g", nl:"450g", tr:"450g" }, price:52.00 },
        ],
      },
      {
        id:21,
        name:{ de:"Filetsteak", en:"Fillet Steak", nl:"Filetsteak", tr:"Fileto Biftek" },
        desc:{ de:"Black Angus Rind aus Australien", en:"Black Angus Beef from Australia", nl:"Black Angus rund uit Australië", tr:"Avustralya Black Angus Sığır" },
        variants:[
          { label:{ de:"200g", en:"200g", nl:"200g", tr:"200g" }, price:40.00 },
          { label:{ de:"300g", en:"300g", nl:"300g", tr:"300g" }, price:52.00 },
        ],
      },
      { id:30, name:{ de:"Saucen je 3,50 \u20ac", en:"Sauces 3.50 \u20ac each", nl:"Sauzen per 3,50 \u20ac", tr:"Soslar 3,50 \u20ac" }, desc:{ de:"Gewürzbutter | Pfefferrahmsauce | BBQ-Jus | Sauce Béarnaise", en:"Spiced Butter | Pepper Cream Sauce | BBQ Jus | Béarnaise Sauce", nl:"Kruidenboter | Pepercreamsaus | BBQ-jus | Béarnaisesaus", tr:"Baharatlı Tereyağ | Biberli Krem Sos | BBQ Jus | Béarnaise Sos" }, sectionLabel:true },
      { id:34, name:{ de:"Beilagen je 6,00 \u20ac", en:"Sides 6.00 \u20ac each", nl:"Bijgerechten per 6,00 \u20ac", tr:"Garnitürler 6,00 \u20ac" }, desc:{ de:"Belgische Pommes frites & Trüffelmayonnaise | Pflücksalat mit Hausdressing | Getrüffeltes Kartoffelpüree", en:"Belgian Fries & Truffle Mayonnaise | Green Salad with House Dressing | Truffled Mashed Potatoes", nl:"Belgische friet & truffelmayonaise | Pluksalade met huisdressing | Getruffelde aardappelpuree", tr:"Belçika Patatesi & Trüf Mayonezi | Karışık Salata | Trüflü Patates Püresi" }, sectionLabel:true },
      { id:37, name:{ de:"Beilagen je 9,50 \u20ac", en:"Sides 9.50 \u20ac each", nl:"Bijgerechten per 9,50 \u20ac", tr:"Garnitürler 9,50 \u20ac" }, desc:{ de:"Genuss Pommes mit Trüffel & Parmesan", en:"Gourmet Fries with Truffle & Parmesan", nl:"Genietfriet met truffel & Parmezaan", tr:"Gurme Patates: Trüf & Parmesan" }, sectionLabel:true },
    ],
  },
  {
    id:"kaese",
    name:{ de:"Käseauswahl", en:"Cheese Selection", nl:"Kaasassortiment", tr:"Peynir Seçkisi" },
    items:[
      { id:60, name:{ de:"Auswahl von Rohmilchkäse", en:"Selection of Raw Milk Cheese", nl:"Keuze van rauwemelkse kaas", tr:"Çiğ Süt Peyniri Seçkisi" }, desc:{ de:"3 Stück", en:"3 pieces", nl:"3 stuks", tr:"3 parça" }, price:15.00 },
      { id:61, name:{ de:"Dazu servieren wir", en:"Served with", nl:"Wij serveren erbij", tr:"Yanında servis edilir" }, desc:{ de:"Früchtebrot | Feigensenf | Hausgemachte schwarze Walnüsse", en:"Fruit Bread | Fig Mustard | Homemade Black Walnuts", nl:"Vruchtenbrood | Vijgenmost | Huisgemaakte zwarte walnoten", tr:"Meyveli Ekmek | İncir Hardal | Ev Yapımı Siyah Ceviz" }, sectionLabel:true },
    ],
  },
  {
    id:"dessert",
    name:{ de:"Dessert", en:"Dessert", nl:"Dessert", tr:"Tatlı" },
    items:[
      { id:40, name:{ de:"\u201eCafé gourmand\u201c", en:"\u201cCafé Gourmand\u201d", nl:"\u201eCafé gourmand\u201c", tr:"\u201cCafé Gourmand\u201d" }, desc:{ de:"Kaffee-Spezialität | Kleine Patisserie", en:"Coffee Speciality | Mini Pastries", nl:"Koffiespecialiteit | Kleine patisserie", tr:"Kahve Özel | Mini Pastane" }, price:12.00 },
      { id:41, name:{ de:"Eine Kugel hausgemachtes Sorbet", en:"One Scoop Homemade Sorbet", nl:"Één bol huisgemaakt sorbet", tr:"Bir Top Ev Yapımı Sorbe" }, desc:{ de:"Aufgegossen mit Sekt oder mit \u201eWudka\u201c aus dem Kaiserstuhl", en:"With sparkling wine or \u201cWudka\u201d from Kaiserstuhl", nl:"Overgoten met prosecco of \u201eWudka\u201c uit de Kaiserstuhl", tr:"Köpüklü Şarap veya Kaiserstuhl \u201cWudka\u201d ile" }, price:11.00 },
      { id:42, name:{ de:"Auswahl unserer Sorbets", en:"Selection of our Sorbets", nl:"Keuze van onze sorbets", tr:"Sorbe Seçkimiz" }, desc:{ de:"", en:"", nl:"", tr:"" }, price:4.50, priceLabel:{ de:"pro Kugel", en:"per scoop", nl:"per bol", tr:"top başına" } },
      { id:43, name:{ de:"Cremeeis \u201eDame Blanche\u201c", en:"Ice Cream \u201cDame Blanche\u201d", nl:"Roomijs \u201eDame Blanche\u201c", tr:"\u201cDame Blanche\u201d Dondurma" }, desc:{ de:"Hausgemachtes Vanille-Cremeeis mit heißer Schokoladensauce", en:"Homemade vanilla ice cream with hot chocolate sauce", nl:"Huisgemaakt vanille-roomijs met warme chocoladesaus", tr:"Ev Yapımı Vanilyalı Dondurma ile Sıcak Çikolata Sosu" }, price:13.00 },
      { id:44, name:{ de:"Pina Colada 2.0", en:"Pina Colada 2.0", nl:"Pina Colada 2.0", tr:"Pina Colada 2.0" }, desc:{ de:"Ananas | Kokosnuss", en:"Pineapple | Coconut", nl:"Ananas | Kokosnoot", tr:"Ananas | Hindistan Cevizi" }, price:15.00 },
      { id:45, name:{ de:"\u201eRhabarberkuchen\u201c", en:"\u201cRhubarb Cake\u201d", nl:"\u201eRabarber­taart\u201c", tr:"\u201cRavent Pastası\u201d" }, desc:{ de:"Pochierter Rhabarber | Kuchencreme | Kardamom Crumble | Sushi-Ingwergel | Yuzu-Sauerrahm Eis", en:"Poached Rhubarb | Cake Cream | Cardamom Crumble | Sushi Ginger Gel | Yuzu Sour Cream Ice", nl:"Gepocheerde rabarber | Taartenroom | Kardemoncrumble | Sushigimbergelei | Yuzu-zure roomijs", tr:"Haşlanmış Ravent | Pasta Kreması | Kakule Crumble | Zencefil Jel | Yuzu Ekşi Krema Dondurma" }, price:15.00 },
    ],
  },
  {
    id:"menues",
    name:{ de:"Unsere Menüs", en:"Our Menus", nl:"Onze menu's", tr:"Menülerimiz" },
    menuNote:{ de:"Bitte haben Sie Verständnis, das wir unsere Menüs aufgrund des Ablaufs nur tischweise servieren. Letzte Annahme jeweils 13.30 Uhr | 19.30 Uhr", en:"Please note that our menus are served table-wide only. Last order at 1:30 pm | 7:30 pm.", nl:"Onze menu's worden uitsluitend per tafel geserveerd. Laatste reservering om 13.30 uur | 19.30 uur.", tr:"Menülerimiz yalnızca masa bazında servis edilmektedir. Son sipariş: 13.30 | 19.30." },
    items:[
      {
        id:50,
        name:{ de:"4-Gang Surprise-Menü", en:"4-Course Surprise Menu", nl:"4-gangen verrassingmenu", tr:"4 Kurs Sürpriz Menü" },
        headline:{ de:"Schon probiert?", en:"Have you tried it?", nl:"Al geprobeerd?", tr:"Denediniz mi?" },
        desc:{ de:"Unser Menü für Genuß-Entdecker: Unerwartete Kombinationen, überraschende Nuancen und die besondere Handschrift unserer Küche laden ein, Neues zu entdecken.", en:"Our menu for culinary explorers: unexpected combinations, surprising nuances and the distinctive signature of our kitchen invite you to discover something new.", nl:"Ons menu voor smaakontdekkers: onverwachte combinaties, verrassende nuances en de bijzondere handtekening van onze keuken nodigen uit om het nieuwe te ontdekken.", tr:"Mutfağımızın özgün imzasıyla beklenmedik kombinasyonlar ve şaşırtıcı lezzetler sizi yeni keşiflere davet ediyor." },
        variants:[
          { label:{ de:"Surprise-Menü", en:"Surprise Menu", nl:"Verrassingmenu", tr:"Sürpriz Menü" }, price:85.00 },
          { label:{ de:"Vegetarisches Surprise-Menü", en:"Vegetarian Surprise Menu", nl:"Vegetarisch verrassingmenu", tr:"Vejetaryen Sürpriz Menü" }, price:75.00 },
        ],
        perPerson:true,
      },
      {
        id:51,
        name:{ de:"Hopmanns Olive-Menü (6 Gänge)", en:"Hopmanns Olive Menu (6 Courses)", nl:"Hopmanns Olive-menu (6 gangen)", tr:"Hopmanns Olive Menü (6 Kurs)" },
        headline:{ de:"Unser Klassiker", en:"Our Classic", nl:"Onze klassieker", tr:"Klasiğimiz" },
        italic:true,
        desc:{ de:"Einstimmung\nZweierlei vom Kohlrabi | Geröstet & Eingelegt | Apfel | Buttermilch | Haselnuss\n\nIsland-Saiblingsfilet\nGebraten | Zitronen-Risotto | Lauchtexturen | Miso-Hollandaise\n\nPulpo & Chorizo | Sellerie | Blutorange\n\nRückenfilet vom Holsteiner Salzwiesenlamm\nIm Heu gegart | Möhrenvielfalt | Kartoffelvelouté | Jus\n\n\u201eRhabarberkuchen\u201c\nPochierter Rhabarber | Kuchencreme | Kardamom Crumble | Sushi-Ingwergel | Yuzu-Sauerrahm Eis\n\nSüßer Abschluss\nKleine Patisserie | Espresso oder Kaffee", en:"Prelude\nTwo Ways of Kohlrabi | Roasted & Pickled | Apple | Buttermilk | Hazelnut\n\nIcelandic Arctic Char Fillet\nPan-fried | Lemon Risotto | Leek Textures | Miso Hollandaise\n\nPulpo & Chorizo | Celery | Blood Orange\n\nHolstein Salt Meadow Lamb Loin Fillet\nHay-cooked | Carrot Variety | Potato Velouté | Jus\n\n\u201cRhubarb Cake\u201d\nPoached Rhubarb | Cake Cream | Cardamom Crumble | Sushi Ginger Gel | Yuzu Sour Cream Ice\n\nSweet Finale\nMini Pastries | Espresso or Coffee", nl:"Ouverture\nKohlrabi op twee manieren | Geroosterd & Ingelegd | Appel | Karnemelk | Hazelnoot\n\nIJslands beekforelfilet\nGebakken | Citroenrisotto | Prei-texturen | Miso-hollandaise\n\nPulpo & Chorizo | Bleekselderij | Bloedsinaasappel\n\nLamsrugfilet van Holsteiner zoutweidenlam\nIn hooi gegaard | Wortelvarieteit | Aardappelvelouté | Jus\n\n\u201eRabarber­taart\u201c\nGepocheerde rabarber | Taartenroom | Kardemoncrumble | Sushigimbergelei | Yuzu-zure roomijs\n\nZoet slot\nKleine patisserie | Espresso of koffie", tr:"Giriş\nİki Şekilde Kohlrabi | Kızartılmış & Turşu | Elma | Ayran | Fındık\n\nİzlanda Alabalık Fileto\nTavada Kızartılmış | Limon Risotto | Pırasa Dokuları | Miso Hollandaise\n\nPulpo & Chorizo | Kereviz | Kan Portakalı\n\nHolstein Tuzlu Çayır Kuzusu Sırt Fileto\nSaman İçinde Pişirilmiş | Havuç Çeşitliliği | Patates Velouté | Et Suyu\n\n\u201cRavent Pastası\u201d\nHaşlanmış Ravent | Pasta Kreması | Kakule Crumble | Zencefil Jel | Yuzu Ekşi Krema Dondurma\n\nTatlı Final\nMini Pastane | Espresso veya Kahve" },
        variants:[
          { label:{ de:"Mit Pulpo", en:"With Pulpo", nl:"Met pulpo", tr:"Ahtapotlu" }, price:108.00 },
          { label:{ de:"Ohne Pulpo", en:"Without Pulpo", nl:"Zonder pulpo", tr:"Ahtapotsuz" }, price:98.00 },
        ],
        perPerson:true,
        extra:{ de:"Weinbegleitung +40,00 \u20ac p.P. (oder 34,00 \u20ac p.P.)", en:"Wine pairing +40.00 \u20ac p.p. (or 34.00 \u20ac p.p.)", nl:"Wijnbegeleiding +40,00 \u20ac p.p. (of 34,00 \u20ac p.p.)", tr:"Şarap eşleşmesi +40,00 \u20ac kişi başı (veya 34,00 \u20ac)" },
      },
    ],
  },
];

const SAVE = "13. Juni 2026 – Großes Sommerfest · 25 Jahre Hopmanns Olive";

const btnStyle = (extra = {}) => ({
  background:"transparent", color:GOLD, border:`1px solid ${GOLD}`, borderRadius:"2px",
  padding:"6px 20px", fontSize:"12px", cursor:"pointer", fontFamily:"Georgia,serif",
  letterSpacing:"1.5px", textTransform:"uppercase", transition:"all .2s", ...extra,
});

const t = (obj, lang) => (typeof obj === "object" && obj !== null && !Array.isArray(obj)) ? (obj[lang] || obj["de"] || "") : (obj || "");

const VariantSelector = ({ variants, selected, onSelect, perPerson, lang, ui }) => (
  <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", margin:"10px 0" }}>
    {variants.map((v, i) => (
      <button key={i} onClick={() => onSelect(i)}
        style={{
          padding:"6px 14px", borderRadius:"2px", border:`1px solid ${selected === i ? GOLD : BG3}`,
          background: selected === i ? `${GOLD}22` : "transparent",
          cursor:"pointer", fontFamily:"Georgia,serif", fontSize:"12px", transition:"all .2s",
          display:"flex", flexDirection:"column", alignItems:"center", gap:"2px",
        }}>
        <span style={{ color: selected === i ? GOLD : TEXTMUT, letterSpacing:"0.5px" }}>{t(v.label, lang)}</span>
        <span style={{ color:GOLD, fontWeight:"bold", fontSize:"13px" }}>
          {fmt(v.price)}{perPerson ? ` ${ui.perPerson}` : ""}
        </span>
      </button>
    ))}
  </div>
);

const MenuItem = ({ item, onAdd, lang, ui }) => {
  const [selectedVariant, setSelectedVariant] = useState(0);

  if (item.sectionLabel) return (
    <div style={{ marginBottom:"14px", paddingTop:"4px" }}>
      <div style={{ fontSize:"12px", fontWeight:"bold", color:GOLD, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"4px" }}>{t(item.name, lang)}</div>
      <div style={{ fontSize:"13px", color:TEXTMUT, lineHeight:1.6 }}>{t(item.desc, lang)}</div>
    </div>
  );

  const hasVariants = item.variants && item.variants.length > 0;
  const currentPrice = hasVariants ? item.variants[selectedVariant].price : item.price;
  const currentLabel = hasVariants ? t(item.variants[selectedVariant].label, lang) : null;

  const handleAdd = () => {
    onAdd({
      ...item,
      price: currentPrice,
      name: hasVariants ? `${t(item.name, lang)} (${currentLabel})` : t(item.name, lang),
    });
  };

  return (
    <div style={{ marginBottom:"22px" }}>
      {item.headline && (
        <div style={{ fontSize:"10px", letterSpacing:"3px", textTransform:"uppercase", color:GOLDLT, marginBottom:"4px" }}>
          {t(item.headline, lang)}
        </div>
      )}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"16px" }}>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:"bold", fontSize:item.italic?"18px":"16px", color:TEXT, fontFamily:"Georgia,serif", fontStyle:item.italic?"italic":"normal", lineHeight:1.3, marginBottom:"5px" }}>
            {t(item.name, lang)}
          </div>
          {item.desc && t(item.desc, lang) && (
            <div style={{ fontSize:"13px", color:TEXTMUT, whiteSpace:"pre-line", lineHeight:1.7 }}>{t(item.desc, lang)}</div>
          )}
        </div>
        {!hasVariants && item.price != null && (
          <div style={{ textAlign:"right", flexShrink:0 }}>
            {item.priceLabel && <div style={{ fontSize:"11px", color:TEXTMUT, marginBottom:"2px" }}>{t(item.priceLabel, lang)}</div>}
            <div style={{ fontSize:"17px", fontWeight:"bold", color:GOLD, whiteSpace:"nowrap", fontFamily:"Georgia,serif" }}>
              {fmt(item.price)}{item.perPerson ? ` ${ui.perPerson}` : ""}
            </div>
          </div>
        )}
      </div>

      {hasVariants && (
        <>
          {item.variantNote && (
            <div style={{ fontSize:"12px", color:TEXTMUT, fontStyle:"italic", marginTop:"6px" }}>{t(item.variantNote, lang)}</div>
          )}
          <VariantSelector variants={item.variants} selected={selectedVariant} onSelect={setSelectedVariant} perPerson={item.perPerson} lang={lang} ui={ui}/>
        </>
      )}

      {item.extra && (
        <div style={{ fontSize:"12px", color:GOLDLT, marginTop:"4px", fontStyle:"italic" }}>{t(item.extra, lang)}</div>
      )}

      <button
        style={btnStyle({ marginTop:"10px" })}
        onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = BG; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}
        onClick={handleAdd}
      >
        {ui.addBtn}
      </button>
    </div>
  );
};

const Cart = ({ cart, onRemove, onClose, onOrder, ui }) => {
  const total = cart.reduce((s, i) => s + (i.price || 0) * i.qty, 0);
  return (
    <div style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={onClose}>
      <div style={{ background:BG2, width:"100%", maxWidth:"560px", borderRadius:"16px 16px 0 0", padding:"28px 24px", maxHeight:"80vh", display:"flex", flexDirection:"column", fontFamily:"Georgia,serif", border:`1px solid ${BG3}`, borderBottom:"none" }} onClick={e => e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
          <div style={{ fontSize:"20px", fontWeight:"bold", color:TEXT, letterSpacing:"2px", textTransform:"uppercase" }}>{ui.order}</div>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:"22px", color:TEXTMUT, cursor:"pointer" }}>×</button>
        </div>
        <GoldDivider/>
        {cart.length === 0
          ? <p style={{ color:TEXTMUT, textAlign:"center", padding:"32px 0", fontStyle:"italic" }}>{ui.empty}</p>
          : <>
              <div style={{ overflowY:"auto", flex:1 }}>
                {cart.map(item => (
                  <div key={item.id + item.name} style={{ display:"flex", alignItems:"center", padding:"12px 0", borderBottom:`1px solid ${BG3}`, gap:"12px" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:"bold", color:TEXT, fontSize:"14px" }}>{item.name}</div>
                      <div style={{ color:TEXTMUT, fontSize:"12px", marginTop:"2px" }}>{item.qty} × {fmt(item.price || 0)}</div>
                    </div>
                    <div style={{ fontWeight:"bold", color:GOLD, fontSize:"15px" }}>{fmt((item.price || 0) * item.qty)}</div>
                    <button onClick={() => onRemove(item.id + item.name)} style={{ background:"none", border:`1px solid ${BG3}`, color:TEXTMUT, borderRadius:"50%", width:"28px", height:"28px", cursor:"pointer", fontSize:"14px", flexShrink:0 }}>×</button>
                  </div>
                ))}
              </div>
              <GoldDivider/>
              <div style={{ display:"flex", justifyContent:"space-between", fontWeight:"bold", fontSize:"18px", color:TEXT, marginBottom:"20px" }}>
                <span>{ui.total}</span><span style={{ color:GOLD }}>{fmt(total)}</span>
              </div>
              <button onClick={onOrder} style={{ width:"100%", background:GOLD, color:BG, border:"none", borderRadius:"2px", padding:"14px", fontSize:"14px", fontFamily:"Georgia,serif", letterSpacing:"2px", textTransform:"uppercase", fontWeight:"bold", cursor:"pointer" }}>{ui.placeOrder}</button>
            </>
        }
      </div>
    </div>
  );
};

const OrderSuccess = ({ onClose, ui }) => (
  <div style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"center", justifyContent:"center" }}>
    <div style={{ background:BG2, borderRadius:"4px", padding:"48px 36px", maxWidth:"380px", width:"90%", textAlign:"center", fontFamily:"Georgia,serif", border:`1px solid ${GOLD}` }}>
      <div style={{ fontSize:"12px", letterSpacing:"4px", textTransform:"uppercase", color:GOLD, marginBottom:"16px" }}>{ui.thankyou}</div>
      <div style={{ fontSize:"26px", fontWeight:"bold", color:TEXT, marginBottom:"12px" }}>{ui.order}</div>
      <GoldDivider/>
      <p style={{ color:TEXTMUT, marginBottom:"28px", fontSize:"14px", lineHeight:1.7 }}>{ui.orderReceived}</p>
      <button onClick={onClose}
        style={btnStyle({ padding:"12px 32px" })}
        onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = BG; }}
        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}
      >{ui.back}</button>
    </div>
  </div>
);


export default function App() {
  const lang = "de";
  const [activeCat, setActiveCat] = useState(CATEGORIES_DATA[0].id);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const ui = {
    cart:"Warenkorb", order:"Bestellung", empty:"Ihr Warenkorb ist leer.", total:"Gesamt",
    placeOrder:"Jetzt bestellen", thankyou:"Vielen Dank",
    orderReceived:"Ihre Bestellung wurde aufgenommen. Wir kümmern uns sofort darum.",
    back:"Zurück zur Karte", addBtn:"+ Bestellen", perPerson:"p.P.",
    restaurant:"Genussrestaurant", menu:"Speisekarte",
    note:"Bei Unverträglichkeiten & Allergien sprechen Sie uns bitte an. Wir beraten Sie gerne. Preise enthalten die gesetzliche MwSt."
  };

  const addToCart = item => setCart(prev => {
    const key = item.id + item.name;
    const ex = prev.find(i => i.id + i.name === key);
    return ex
      ? prev.map(i => i.id + i.name === key ? { ...i, qty: i.qty + 1 } : i)
      : [...prev, { ...item, qty: 1 }];
  });
  const removeFromCart = key => setCart(prev => prev.filter(i => i.id + i.name !== key));
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const handleOrder = () => { setShowCart(false); setShowSuccess(true); setCart([]); };
  const cat = CATEGORIES_DATA.find(c => c.id === activeCat);

  return (
    <div style={{ background:BG, minHeight:"100vh", fontFamily:"Georgia,'Times New Roman',serif", color:TEXT }}>

      {/* HEADER */}
      <header style={{ background:BG, borderBottom:`1px solid ${BG3}`, position:"sticky", top:0, zIndex:40 }}>
        <div style={{ maxWidth:"920px", margin:"0 auto", padding:"14px 20px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"16px", justifyContent:"space-between", marginBottom:"14px" }}>
            <HopmannsLogo size={68}/>
            <div style={{ flex:1, textAlign:"center" }}>
              <div style={{ fontSize:"11px", letterSpacing:"5px", color:GOLD, textTransform:"uppercase", marginBottom:"4px" }}>{ui.restaurant}</div>
              <div style={{ fontSize:"clamp(18px,4vw,26px)", fontWeight:"bold", letterSpacing:"4px", color:TEXT, textTransform:"uppercase" }}>Hopmanns Olive</div>
              <div style={{ fontSize:"10px", letterSpacing:"3px", color:TEXTMUT, marginTop:"2px", textTransform:"uppercase" }}>{ui.menu}</div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"8px", flexShrink:0 }}>
              <button
                onClick={() => setShowCart(true)}
                style={{ ...btnStyle(), position:"relative", padding:"8px 14px", display:"flex", alignItems:"center", gap:"8px" }}
                onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.color = BG; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = GOLD; }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                <span>{ui.cart}</span>
                {totalItems > 0 && (
                  <span style={{ position:"absolute", top:"-8px", right:"-8px", background:GOLD, color:BG, borderRadius:"50%", width:"20px", height:"20px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:"bold" }}>{totalItems}</span>
                )}
              </button>
            </div>
          </div>
          <GoldDivider/>
          <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch", marginTop:"-6px" }}>
            <div style={{ display:"flex", gap:"2px", minWidth:"max-content" }}>
              {CATEGORIES_DATA.map(c => (
                <button key={c.id} onClick={() => setActiveCat(c.id)} style={{
                  padding:"8px 16px", background: activeCat === c.id ? GOLD : "transparent",
                  color: activeCat === c.id ? BG : TEXTMUT, border:"none", cursor:"pointer",
                  fontFamily:"Georgia,serif", fontSize:"12px", letterSpacing:"1.5px",
                  textTransform:"uppercase", whiteSpace:"nowrap", transition:"all .2s",
                  fontWeight: activeCat === c.id ? "bold" : "normal",
                }}>{t(c.name, lang)}</button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* SAVE THE DATE – Banner bleibt immer auf Deutsch */}
      <div style={{ background:"linear-gradient(135deg,#2a2318,#1e1c15)", borderBottom:`1px solid ${GOLD}40`, padding:"10px 20px", textAlign:"center" }}>
        <span style={{ fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase", color:GOLD }}>&#x1F33F;&#x2002;Save the Date&#x2002;&#xB7;&#x2002;</span>
        <span style={{ fontSize:"12px", color:GOLDLT, letterSpacing:"1px" }}>{SAVE}</span>
      </div>

      {/* CONTENT */}
      <main style={{ maxWidth:"920px", margin:"0 auto", padding:"36px 20px 60px" }}>
        <div style={{ marginBottom:"6px" }}>
          {cat.subtitle && <div style={{ fontSize:"11px", letterSpacing:"4px", textTransform:"uppercase", color:GOLD, marginBottom:"4px" }}>{t(cat.subtitle, lang)}</div>}
          <div style={{ fontSize:"clamp(20px,4vw,28px)", fontWeight:"bold", letterSpacing:"3px", textTransform:"uppercase", color:TEXT }}>{t(cat.name, lang)}</div>
        </div>
        <GoldDivider/>
        {cat.menuNote && (
          <div style={{ fontSize:"13px", color:TEXTMUT, background:BG2, border:`1px solid ${BG3}`, borderLeft:`3px solid ${GOLD}`, borderRadius:"2px", padding:"14px 18px", marginBottom:"28px", lineHeight:1.7, fontStyle:"italic" }}>
            {t(cat.menuNote, lang)}
          </div>
        )}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))", gap:"0 48px" }}>
          {cat.items.map(item => (
            <div key={item.id} style={{ borderBottom:`1px solid ${BG3}`, paddingBottom:"2px" }}>
              <MenuItem item={item} onAdd={addToCart} lang={lang} ui={ui}/>
            </div>
          ))}
        </div>
        <div style={{ marginTop:"48px", textAlign:"center" }}>
          <GoldDivider/>
          <p style={{ fontSize:"12px", color:TEXTMUT, fontStyle:"italic", letterSpacing:"0.5px", lineHeight:1.8 }}>{ui.note}</p>
          <div style={{ marginTop:"16px", fontSize:"13px", color:TEXTMUT, letterSpacing:"1px" }}>Hopmanns Olive · Ziegeleiweg 1–3 · 40699 Erkrath · hopmannsolive.de</div>
          <div style={{ marginTop:"8px", fontSize:"10px", color:TEXTMUT, letterSpacing:"1px", opacity:0.4 }}>v 1.0</div>
        </div>
      </main>

      {showCart && <Cart cart={cart} onRemove={removeFromCart} onClose={() => setShowCart(false)} onOrder={handleOrder} ui={ui}/>}
      {showSuccess && <OrderSuccess onClose={() => setShowSuccess(false)} ui={ui}/>}
    </div>
  );
}
