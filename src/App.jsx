import { useState } from "react";

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

const CATEGORIES = [
  {
    id:"vorspeisen", name:"Vorspeisen",
    items:[
      { id:1, name:"B\u00e4rlauch-Schaumsuppe", desc:"",
        variants:[
          { label:"Ohne Beilage", price:12.00 },
          { label:"+ Fischkonfekt & Dillcreme", price:15.00 },
        ],
      },
      { id:3, name:"\u201eFr\u00fchjahrs Bowl\u201c",
        desc:"Teriyaki Reis | Mizuna Salat | Pak Choi | Mango | Avocado | Erdnuss | Sesam | Ponzu-Dressing",
        variants:[
          { label:"Bowl", price:16.00 },
          { label:"+ Riesengarnele im Knuspermantel", price:21.00 },
        ],
        variantNote:"Upgrade: Riesengarnele pro St\u00fcck +5,00 \u20ac",
      },
      { id:4, name:"Zweierlei vom Kohlrabi", desc:"Ger\u00f6stet & Eingelegt | Apfel | Buttermilch | Haselnuss", price:15.00 },
      { id:5, name:"Mild gebeiztes Saiblingsfilet", desc:"Miso | Rettich | Gurke", price:22.00 },
      { id:6, name:"Tatar vom Rinderfilet", desc:"Handgeschnitten | Confiertes Eigelb | Kr\u00e4utersponge | Umami-Creme", price:22.00 },
      { id:7, name:"Gambas \u201epikant\u201c", desc:"Oliven\u00f6l | Knoblauch | Chili", price:20.00 },
    ],
  },
  {
    id:"hauptspeisen", name:"Hauptspeisen",
    items:[
      { id:10, name:"Sardische Fregula", desc:"Kr\u00e4uterseitlinge | Treviso | Buchweizen-Crunch | Blutorangen-Beurre blanc | Kr\u00e4uter\u00f6l", price:30.00 },
      { id:11, name:"Lotte und Gambas", desc:"Gebraten in Oliven\u00f6l | Knoblauch | Mediterrane Kr\u00e4uter | Pikante Spaghetti", price:40.00 },
      { id:12, name:"Island-Saiblingsfilet", desc:"Gebraten | Zitronen-Risotto | Lauchtexturen | Miso-Hollandaise", price:44.00 },
      { id:13, name:"Maish\u00e4hnchenbrust Supreme", desc:"Spitzkohl | Confierte Kartoffeln | Soja-Karamell", price:38.00 },
      { id:14, name:"R\u00fcckenfilet vom Holsteiner Salzwiesenlamm", desc:"Im Heu gegart | M\u00f6hrenvielfalt | Kartoffelvelout\u00e9 | Jus", price:46.00 },
    ],
  },
  {
    id:"steak", name:"Black Angus Rind", subtitle:"Australisches Fleisch",
    items:[
      { id:20, name:"Rumpsteak", desc:"Black Angus Rind aus Australien",
        variants:[{ label:"250g", price:32.00 },{ label:"350g", price:42.00 },{ label:"450g", price:52.00 }],
      },
      { id:21, name:"Filetsteak", desc:"Black Angus Rind aus Australien",
        variants:[{ label:"200g", price:40.00 },{ label:"300g", price:52.00 }],
      },
      { id:30, name:"Saucen je 3,50 \u20ac", desc:"Gew\u00fcrzbutter | Pfefferrahmsauce | BBQ-Jus | Sauce B\u00e9arnaise", sectionLabel:true },
      { id:34, name:"Beilagen je 6,00 \u20ac", desc:"Belgische Pommes frites & Tr\u00fcffelmayonnaise | Pfl\u00fccksalat mit Hausdressing | Getr\u00fcffeltes Kartoffelp\u00fcree", sectionLabel:true },
      { id:37, name:"Beilagen je 9,50 \u20ac", desc:"Genuss Pommes mit Tr\u00fcffel & Parmesan", sectionLabel:true },
    ],
  },
  {
    id:"kaese", name:"K\u00e4seauswahl",
    items:[
      { id:60, name:"Auswahl von Rohmilchk\u00e4se", desc:"3 St\u00fcck", price:15.00 },
      { id:61, name:"Dazu servieren wir", desc:"Fr\u00fcchtebrot | Feigensenf | Hausgemachte schwarze Waln\u00fcsse", sectionLabel:true },
    ],
  },
  {
    id:"dessert", name:"Dessert",
    items:[
      { id:40, name:"\u201eCaf\u00e9 gourmand\u201c", desc:"Kaffee-Spezialit\u00e4t | Kleine Patisserie", price:12.00 },
      { id:41, name:"Eine Kugel hausgemachtes Sorbet", desc:"Aufgegossen mit Sekt oder mit \u201eWudka\u201c aus dem Kaiserstuhl", price:11.00 },
      { id:42, name:"Auswahl unserer Sorbets", desc:"", price:4.50, priceLabel:"pro Kugel" },
      { id:43, name:"Cremeeis \u201eDame Blanche\u201c", desc:"Hausgemachtes Vanille-Cremeeis mit hei\u00dfer Schokoladensauce", price:13.00 },
      { id:44, name:"Pina Colada 2.0", desc:"Ananas | Kokosnuss", price:15.00 },
      { id:45, name:"\u201eRhabarberkuchen\u201c", desc:"Pochierter Rhabarber | Kuchencreme | Kardamom Crumble | Sushi-Ingwergel | Yuzu-Sauerrahm Eis", price:15.00 },
    ],
  },
  {
    id:"menues", name:"Unsere Men\u00fcs",
    menuNote:"Bitte haben Sie Verst\u00e4ndnis, das wir unsere Men\u00fcs aufgrund des Ablaufs nur tischweise servieren. Letzte Annahme jeweils 13.30\u00a0Uhr\u00a0|\u00a019.30\u00a0Uhr",
    items:[
      { id:50, name:"4-Gang Surprise-Men\u00fc", headline:"Schon probiert?",
        desc:"Unser Men\u00fc f\u00fcr Genu\u00df-Entdecker: Unerwartete Kombinationen, \u00fcberraschende Nuancen und die besondere Handschrift unserer K\u00fcche laden ein, Neues zu entdecken.",
        variants:[{ label:"Surprise-Men\u00fc", price:85.00 },{ label:"Vegetarisches Surprise-Men\u00fc", price:75.00 }],
        perPerson:true,
      },
      { id:51, name:"Hopmanns Olive-Men\u00fc (6 G\u00e4nge)", headline:"Unser Klassiker", italic:true,
        desc:"Einstimmung\nZweierlei vom Kohlrabi | Ger\u00f6stet & Eingelegt | Apfel | Buttermilch | Haselnuss\n\nIsland-Saiblingsfilet\nGebraten | Zitronen-Risotto | Lauchtexturen | Miso-Hollandaise\n\nPulpo & Chorizo | Sellerie | Blutorange\n\nR\u00fcckenfilet vom Holsteiner Salzwiesenlamm\nIm Heu gegart | M\u00f6hrenvielfalt | Kartoffelvelout\u00e9 | Jus\n\n\u201eRhabarberkuchen\u201c\nPochierter Rhabarber | Kuchencreme | Kardamom Crumble | Sushi-Ingwergel | Yuzu-Sauerrahm Eis\n\nS\u00fc\u00dfer Abschluss\nKleine Patisserie | Espresso oder Kaffee",
        variants:[{ label:"Mit Pulpo", price:108.00 },{ label:"Ohne Pulpo", price:98.00 }],
        perPerson:true,
        extra:"Weinbegleitung +40,00\u00a0\u20ac\u00a0p.P. (oder 34,00\u00a0\u20ac\u00a0p.P.)",
      },
    ],
  },
];

const SAVE = "13. Juni 2026 \u2013 Gro\u00dfes Sommerfest \u00b7 25 Jahre Hopmanns Olive";
const NOTE = "Bei Unvertr\u00e4glichkeiten & Allergien sprechen Sie uns bitte an. Wir beraten Sie gerne. Preise enthalten die gesetzliche MwSt.";

const btn = (extra={}) => ({
  background:"transparent", color:GOLD, border:`1px solid ${GOLD}`, borderRadius:"2px",
  padding:"6px 20px", fontSize:"12px", cursor:"pointer", fontFamily:"Georgia,serif",
  letterSpacing:"1.5px", textTransform:"uppercase", transition:"all .2s", ...extra,
});

const VariantSelector = ({ variants, selected, onSelect, perPerson }) => (
  <div style={{ display:"flex", flexWrap:"wrap", gap:"8px", margin:"10px 0" }}>
    {variants.map((v,i) => (
      <button key={i} onClick={()=>onSelect(i)} style={{
        padding:"6px 14px", borderRadius:"2px", border:`1px solid ${selected===i?GOLD:BG3}`,
        background:selected===i?`${GOLD}22`:"transparent", cursor:"pointer",
        fontFamily:"Georgia,serif", fontSize:"12px", transition:"all .2s",
        display:"flex", flexDirection:"column", alignItems:"center", gap:"2px",
      }}>
        <span style={{ color:selected===i?GOLD:TEXTMUT, letterSpacing:"0.5px" }}>{v.label}</span>
        <span style={{ color:GOLD, fontWeight:"bold", fontSize:"13px" }}>{fmt(v.price)}{perPerson?" p.P.":""}</span>
      </button>
    ))}
  </div>
);

const MenuItem = ({ item, onAdd }) => {
  const [sel, setSel] = useState(0);
  if (item.sectionLabel) return (
    <div style={{ marginBottom:"14px", paddingTop:"4px" }}>
      <div style={{ fontSize:"12px", fontWeight:"bold", color:GOLD, letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:"4px" }}>{item.name}</div>
      <div style={{ fontSize:"13px", color:TEXTMUT, lineHeight:1.6 }}>{item.desc}</div>
    </div>
  );
  const hasV = item.variants && item.variants.length > 0;
  const price = hasV ? item.variants[sel].price : item.price;
  const label = hasV ? item.variants[sel].label : null;
  return (
    <div style={{ marginBottom:"22px" }}>
      {item.headline && <div style={{ fontSize:"10px", letterSpacing:"3px", textTransform:"uppercase", color:GOLDLT, marginBottom:"4px" }}>{item.headline}</div>}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"16px" }}>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:"bold", fontSize:item.italic?"18px":"16px", color:TEXT, fontFamily:"Georgia,serif", fontStyle:item.italic?"italic":"normal", lineHeight:1.3, marginBottom:"5px" }}>{item.name}</div>
          {item.desc && <div style={{ fontSize:"13px", color:TEXTMUT, whiteSpace:"pre-line", lineHeight:1.7 }}>{item.desc}</div>}
        </div>
        {!hasV && item.price!=null && (
          <div style={{ textAlign:"right", flexShrink:0 }}>
            {item.priceLabel && <div style={{ fontSize:"11px", color:TEXTMUT, marginBottom:"2px" }}>{item.priceLabel}</div>}
            <div style={{ fontSize:"17px", fontWeight:"bold", color:GOLD, whiteSpace:"nowrap", fontFamily:"Georgia,serif" }}>{fmt(item.price)}{item.perPerson?" p.P.":""}</div>
          </div>
        )}
      </div>
      {hasV && (
        <>
          {item.variantNote && <div style={{ fontSize:"12px", color:TEXTMUT, fontStyle:"italic", marginTop:"6px" }}>{item.variantNote}</div>}
          <VariantSelector variants={item.variants} selected={sel} onSelect={setSel} perPerson={item.perPerson}/>
        </>
      )}}
      {item.extra && <div style={{ fontSize:"12px", color:GOLDLT, marginTop:"4px", fontStyle:"italic" }}>{item.extra}</div>}
      <button style={btn({ marginTop:"10px" })}
        onMouseEnter={e=>{e.currentTarget.style.background=GOLD;e.currentTarget.style.color=BG;}}
        onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=GOLD;}}
        onClick={()=>onAdd({...item, price, name:hasV?`${item.name} (${label})`:item.name})}>
        + Bestellen
      </button>
    </div>
  );
};

const Cart = ({ cart, onRemove, onClose, onOrder }) => {
  const total = cart.reduce((s,i)=>s+(i.price||0)*i.qty, 0);
  return (
    <div style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(0,0,0,0.75)", display:"flex", alignItems:"flex-end", justifyContent:"center" }} onClick={onClose}>
      <div style={{ background:BG2, width:"100%", maxWidth:"560px", borderRadius:"16px 16px 0 0", padding:"28px 24px", maxHeight:"80vh", display:"flex", flexDirection:"column", fontFamily:"Georgia,serif", border:`1px solid ${BG3}`, borderBottom:"none" }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"6px" }}>
          <div style={{ fontSize:"20px", fontWeight:"bold", color:TEXT, letterSpacing:"2px", textTransform:"uppercase" }}>Ihre Bestellung</div>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:"22px", color:TEXTMUT, cursor:"pointer" }}>&times;</button>
        </div>
        <GoldDivider/>
        {cart.length===0
          ? <p style={{ color:TEXTMUT, textAlign:"center", padding:"32px 0", fontStyle:"italic" }}>Ihr Warenkorb ist leer.</p>
          : <>
              <div style={{ overflowY:"auto", flex:1 }}>
                {cart.map(item=>(
                  <div key={item.id+item.name} style={{ display:"flex", alignItems:"center", padding:"12px 0", borderBottom:`1px solid ${BG3}`, gap:"12px" }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:"bold", color:TEXT, fontSize:"14px" }}>{item.name}</div>
                      <div style={{ color:TEXTMUT, fontSize:"12px", marginTop:"2px" }}>{item.qty} &times; {fmt(item.price||0)}</div>
                    </div>
                    <div style={{ fontWeight:"bold", color:GOLD, fontSize:"15px" }}>{fmt((item.price||0)*item.qty)}</div>
                    <button onClick={()=>onRemove(item.id+item.name)} style={{ background:"none", border:`1px solid ${BG3}`, color:TEXTMUT, borderRadius:"50%", width:"28px", height:"28px", cursor:"pointer", fontSize:"14px", flexShrink:0 }}>&times;</button>
                  </div>
                ))}
              </div>
              <GoldDivider/>
              <div style={{ display:"flex", justifyContent:"space-between", fontWeight:"bold", fontSize:"18px", color:TEXT, marginBottom:"20px" }}>
                <span>Gesamt</span><span style={{ color:GOLD }}>{fmt(total)}</span>
              </div>
              <button onClick={onOrder} style={{ width:"100%", background:GOLD, color:BG, border:"none", borderRadius:"2px", padding:"14px", fontSize:"14px", fontFamily:"Georgia,serif", letterSpacing:"2px", textTransform:"uppercase", fontWeight:"bold", cursor:"pointer" }}>Jetzt bestellen</button>
            </>
        }
      </div>
    </div>
  );
};

const OrderSuccess = ({ onClose }) => (
  <div style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(0,0,0,0.8)", display:"flex", alignItems:"center", justifyContent:"center" }}>
    <div style={{ background:BG2, borderRadius:"4px", padding:"48px 36px", maxWidth:"380px", width:"90%", textAlign:"center", fontFamily:"Georgia,serif", border:`1px solid ${GOLD}` }}>
      <div style={{ fontSize:"12px", letterSpacing:"4px", textTransform:"uppercase", color:GOLD, marginBottom:"16px" }}>Vielen Dank</div>
      <div style={{ fontSize:"26px", fontWeight:"bold", color:TEXT, marginBottom:"12px" }}>Ihre Bestellung</div>
      <GoldDivider/>
      <p style={{ color:TEXTMUT, marginBottom:"28px", fontSize:"14px", lineHeight:1.7 }}>Ihre Bestellung wurde aufgenommen. Wir k\u00fcmmern uns sofort darum.</p>
      <button onClick={onClose} style={btn({ padding:"12px 32px" })}
        onMouseEnter={e=>{e.currentTarget.style.background=GOLD;e.currentTarget.style.color=BG;}}
        onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=GOLD;}}
      >Zur\u00fcck zur Karte</button>
    </div>
  </div>
);

export default function App() {
  const [activeCat, setActiveCat] = useState(CATEGORIES[0].id);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const addToCart = item => setCart(prev => {
    const key = item.id+item.name;
    const ex = prev.find(i=>i.id+i.name===key);
    return ex ? prev.map(i=>i.id+i.name===key?{...i,qty:i.qty+1}:i) : [...prev,{...item,qty:1}];
  });
  const removeFromCart = key => setCart(prev=>prev.filter(i=>i.id+i.name!==key));
  const totalItems = cart.reduce((s,i)=>s+i.qty,0);
  const handleOrder = () => { setShowCart(false); setShowSuccess(true); setCart([]); };
  const cat = CATEGORIES.find(c=>c.id===activeCat);

  return (
    <div style={{ background:BG, minHeight:"100vh", fontFamily:"Georgia,'Times New Roman',serif", color:TEXT }}>
      <header style={{ background:BG, borderBottom:`1px solid ${BG3}`, position:"sticky", top:0, zIndex:40 }}>
        <div style={{ maxWidth:"920px", margin:"0 auto", padding:"14px 20px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"16px", justifyContent:"space-between", marginBottom:"14px" }}>
            <HopmannsLogo size={68}/>
            <div style={{ flex:1, textAlign:"center" }}>
              <div style={{ fontSize:"11px", letterSpacing:"5px", color:GOLD, textTransform:"uppercase", marginBottom:"4px" }}>Genussrestaurant</div>
              <div style={{ fontSize:"clamp(18px,4vw,26px)", fontWeight:"bold", letterSpacing:"4px", color:TEXT, textTransform:"uppercase" }}>Hopmanns Olive</div>
              <div style={{ fontSize:"10px", letterSpacing:"3px", color:TEXTMUT, marginTop:"2px", textTransform:"uppercase" }}>Speisekarte</div>
            </div>
            <button onClick={()=>setShowCart(true)}
              style={{ ...btn(), position:"relative", padding:"10px 16px", display:"flex", alignItems:"center", gap:"8px", flexShrink:0 }}
              onMouseEnter={e=>{e.currentTarget.style.background=GOLD;e.currentTarget.style.color=BG;}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=GOLD;}}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span>Warenkorb</span>
              {totalItems>0 && <span style={{ position:"absolute", top:"-8px", right:"-8px", background:GOLD, color:BG, borderRadius:"50%", width:"20px", height:"20px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:"bold" }}>{totalItems}</span>}
            </button>
          </div>
          <GoldDivider/>
          <div style={{ overflowX:"auto", WebkitOverflowScrolling:"touch", marginTop:"-6px" }}>
            <div style={{ display:"flex", gap:"2px", minWidth:"max-content" }}>
              {CATEGORIES.map(c=>(
                <button key={c.id} onClick={()=>setActiveCat(c.id)} style={{
                  padding:"8px 16px", background:activeCat===c.id?GOLD:"transparent",
                  color:activeCat===c.id?BG:TEXTMUT, border:"none", cursor:"pointer",
                  fontFamily:"Georgia,serif", fontSize:"12px", letterSpacing:"1.5px",
                  textTransform:"uppercase", whiteSpace:"nowrap", transition:"all .2s",
                  fontWeight:activeCat===c.id?"bold":"normal",
                }}>{c.name}</button>
              ))}
            </div>
          </div>
        </div>
      </header>
      <div style={{ background:"linear-gradient(135deg,#2a2318,#1e1c15)", borderBottom:`1px solid ${GOLD}40`, padding:"10px 20px", textAlign:"center" }}>
        <span style={{ fontSize:"11px", letterSpacing:"3px", textTransform:"uppercase", color:GOLD }}>&#x1F33F;&#x2002;Save the Date&#x2002;&#xB7;&#x2002;</span>
        <span style={{ fontSize:"12px", color:GOLDLT, letterSpacing:"1px" }}>{SAVE}</span>
      </div>
      <main style={{ maxWidth:"920px", margin:"0 auto", padding:"36px 20px 60px" }}>
        <div style={{ marginBottom:"6px" }}>
          {cat.subtitle && <div style={{ fontSize:"11px", letterSpacing:"4px", textTransform:"uppercase", color:GOLD, marginBottom:"4px" }}>{cat.subtitle}</div>}
          <div style={{ fontSize:"clamp(20px,4vw,28px)", fontWeight:"bold", letterSpacing:"3px", textTransform:"uppercase", color:TEXT }}>{cat.name}</div>
        </div>
        <GoldDivider/>
        {cat.menuNote && (
          <div style={{ fontSize:"13px", color:TEXTMUT, background:BG2, border:`1px solid ${BG3}`, borderLeft:`3px solid ${GOLD}`, borderRadius:"2px", padding:"14px 18px", marginBottom:"28px", lineHeight:1.7, fontStyle:"italic" }}>
            {cat.menuNote}
          </div>
        )}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(340px, 1fr))", gap:"0 48px" }}>
          {cat.items.map(item=>(
            <div key={item.id} style={{ borderBottom:`1px solid ${BG3}`, paddingBottom:"2px" }}>
              <MenuItem item={item} onAdd={addToCart}/>
            </div>
          ))}
        </div>
        <div style={{ marginTop:"48px", textAlign:"center" }}>
          <GoldDivider/>
          <p style={{ fontSize:"12px", color:TEXTMUT, fontStyle:"italic", letterSpacing:"0.5px", lineHeight:1.8 }}>{NOTE}</p>
          <div style={{ marginTop:"16px", fontSize:"11px", color:BG3, letterSpacing:"1px" }}>Hopmanns Olive \u00b7 Ziegeleiweg 1\u20133 \u00b7 40699 Erkrath \u00b7 hopmannsolive.de</div>
        </div>
      </main>
      {showCart && <Cart cart={cart} onRemove={removeFromCart} onClose={()=>setShowCart(false)} onOrder={handleOrder}/>}
      {showSuccess && <OrderSuccess onClose={()=>setShowSuccess(false)}/>}
    </div>
  );
}
