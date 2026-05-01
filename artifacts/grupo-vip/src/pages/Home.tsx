import { useEffect, useState, useRef } from "react";

const PROFILES = [
  { name: "Bianca, 35",   online: true,  bg: "/p1.png" },
  { name: "Carla, 28",    online: true,  bg: "/p2.jpg" },
  { name: "Amanda, 32",   online: true,  bg: "/p3.png" },
  { name: "Fernanda, 30", online: true,  bg: "/p4.png" },
  { name: "Julia, 25",    online: true,  bg: "/p5.jpeg" },
  { name: "Patricia, 29", online: false, bg: "/p6.jpeg" },
];

const REVIEWS = [
  {
    name: "R.S. - São Paulo",
    text: '"Melhor grupo que já participei! Já fui em 3 encontros em apenas 2 semanas. Vale muito a pena o VIP!"',
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face",
  },
  {
    name: "M.C. - Rio de Janeiro",
    text: '"As minas são muito gostosas e respondem rápido! O cardápio de bucetas do VIP é sensacional!"',
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=60&h=60&fit=crop&crop=face",
  },
  {
    name: "J.T. - Fortaleza",
    text: '"Comecei com o plano básico e logo fiz upgrade pro VIP. A diferença é ABSURDA, recomendo direto o VIP!"',
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
  },
];

function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => {
        if (s <= 0) return 59;
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return {
    mins: String(mins).padStart(2, "0"),
    secs: String(secs).padStart(2, "0"),
  };
}

function ProfileCarousel() {
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>(0);
  const pausedRef = useRef(false);
  const CARD_W = 200;
  const GAP = 12;
  const STEP = CARD_W + GAP;
  const TOTAL = PROFILES.length * STEP;

  useEffect(() => {
    let last = 0;
    const speed = 0.6;

    const tick = (ts: number) => {
      if (!pausedRef.current) {
        const delta = last ? Math.min(ts - last, 50) : 0;
        setOffset((prev) => {
          let next = prev + speed * (delta / 16);
          if (next >= TOTAL) next -= TOTAL;
          return next;
        });
      }
      last = ts;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [TOTAL]);

  const doubled = [...PROFILES, ...PROFILES];

  return (
    <div
      className="relative w-full bg-[#111] overflow-hidden py-3"
      style={{ height: "300px" }}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
    >
      <div
        className="flex gap-3 absolute top-3"
        style={{ transform: `translateX(${-offset}px)`, willChange: "transform" }}
      >
        {doubled.map((p, i) => {
          const pos = (i * STEP - offset + TOTAL * 2) % TOTAL;
          const isCenter = pos > STEP * 0.8 && pos < STEP * 2.5;
          return (
            <div
              key={i}
              className="relative flex-shrink-0 rounded-2xl overflow-hidden"
              style={{
                width: `${CARD_W}px`,
                height: "270px",
                transform: isCenter ? "scale(1.05)" : "scale(0.92)",
                transition: "transform 0.3s ease",
                boxShadow: isCenter ? "0 0 0 2px #dc2626, 0 8px 24px rgba(0,0,0,0.6)" : "0 4px 12px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={p.bg}
                alt={p.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-black text-sm leading-tight">{p.name}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{
                      background: p.online ? "#22c55e" : "#9ca3af",
                      boxShadow: p.online ? "0 0 5px #22c55e" : "none",
                    }}
                  />
                  <span className="text-xs text-white/90 font-semibold">
                    {p.online ? "Online agora" : "Offline"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Home() {
  const { mins, secs } = useCountdown(46);
  const [onlineCount] = useState(267);

  return (
    <div className="min-h-screen bg-[#111] text-white font-sans max-w-md mx-auto">
      {/* WARNING BANNER */}
      <div className="bg-red-600 text-white text-center py-3 px-4 font-bold text-sm uppercase tracking-wide">
        ⚠️ ATENÇÃO: ESTA PÁGINA SERÁ REMOVIDA EM BREVE ⚠️
      </div>

      {/* HERO HEADER */}
      <div className="bg-red-700 text-center py-6 px-4">
        <h1 className="text-4xl font-black uppercase tracking-tight leading-none">
          GRUPO VIP 🔥
        </h1>
        <p className="mt-2 text-white/90 font-semibold text-base uppercase tracking-wider">
          O MELHOR GRUPO DE PUTARIA E<br />ENCONTROS DO BRASIL 🇧🇷
        </p>
      </div>

      {/* HERO IMAGE */}
      <div className="relative w-full overflow-hidden bg-black">
        <img
          src="/hero.png"
          alt="grupo"
          className="w-full h-full object-cover"
        />
      </div>

      {/* ONLINE COUNT */}
      <div className="bg-[#111] py-4 px-4 text-center border-b border-white/10">
        <div className="flex items-center justify-center gap-3 text-lg font-black uppercase tracking-widest">
          <span className="online-dot" />
          <span>{onlineCount} MULHERES ONLINE AGORA</span>
          <span className="online-dot" />
        </div>
      </div>

      {/* PROFILES CAROUSEL */}
      <ProfileCarousel />

      {/* COUNTDOWN + OFFER */}
      <div className="bg-[#111] px-4 py-6 text-center">
        <p className="text-red-500 font-black text-sm uppercase tracking-widest mb-3">
          OFERTA EXPIRA EM:
        </p>
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="bg-red-600 text-white font-black text-3xl rounded-md w-16 h-16 flex items-center justify-center timer-box">
            {mins}
          </div>
          <span className="text-white font-black text-3xl">:</span>
          <div className="bg-red-600 text-white font-black text-3xl rounded-md w-16 h-16 flex items-center justify-center timer-box">
            {secs}
          </div>
        </div>
        <p className="text-red-500 font-black uppercase tracking-wider text-sm mb-6">
          ÚLTIMA VAGA RESTANTE HOJE!
        </p>

        <h2 className="text-white font-black text-2xl uppercase mb-4">ESCOLHA SEU ACESSO</h2>

        {/* BASIC PLAN */}
        <div className="bg-[#1a1a1a] rounded-xl border border-white/10 p-5 mb-4 text-left">
          <h3 className="text-white font-black text-xl uppercase text-center mb-3">ACESSO BÁSICO</h3>
          <p className="text-center text-white/50 line-through text-sm mb-1">De R$47,90</p>
          <p className="text-red-500 font-black text-4xl text-center mb-4">R$19,90</p>
          <ul className="space-y-2 mb-5">
            {[
              "ACESSO AO GRUPO PRINCIPAL",
              "FOTOS DIÁRIAS DE MULHERES",
              "VÍDEOS AMADORES EXCLUSIVOS",
              "CONTEÚDOS +18 ILIMITADOS",
              "MULHERES DE TODO BRASIL",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-white text-sm font-semibold">
                <span className="text-green-400 font-black text-base leading-none mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <button className="glow-btn w-full bg-red-600 hover:bg-red-500 text-white font-black text-lg uppercase py-4 rounded-full tracking-wider">
            QUERO ESSE
          </button>
          <p className="text-center text-white/50 text-xs mt-2">🔒 Pagamento Seguro e Discreto</p>
        </div>

        {/* VIP PLAN */}
        <div className="vip-card bg-[#1a1a1a] rounded-xl p-5 mb-4 text-left relative">
          <div className="absolute -top-3 right-4 bg-red-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-widest">
            MAIS VENDIDO
          </div>
          <h3 className="text-white font-black text-xl uppercase text-center mb-3">
            ACESSO VIP 🔥
          </h3>
          <p className="text-center text-white/50 line-through text-sm mb-1">De R$97,90</p>
          <p className="text-red-500 font-black text-5xl text-center mb-4">R$29</p>
          <ul className="space-y-2 mb-5">
            {[
              "TUDO DO PLANO BÁSICO +",
              "ACESSO ILIMITADO A TODAS AS GOSTOSAS",
              "GRUPO SECRETO EXCLUSIVO NO ZAP",
              "NÚMERO PESSOAL DAS GAROTAS",
              "SEXO GARANTIDO OU DINHEIRO DE VOLTA",
              "CHAMADAS DE VÍDEO AO VIVO",
              "CARDÁPIO COMPLETO DE BUCETAS",
              "APP EXCLUSIVO TIPO TINDER DO SEXO",
              "CONTEÚDO RARO E PROIBIDO +18",
              "BÔNUS: ENCONTRO PRESENCIAL",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-white text-sm font-semibold">
                <span className="text-green-400 font-black text-base leading-none mt-0.5">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <button className="glow-btn w-full bg-red-600 hover:bg-red-500 text-white font-black text-lg uppercase py-4 rounded-full tracking-wider">
            GARANTIR MINHA VAGA VIP
          </button>
          <p className="text-center text-white/50 text-xs mt-2">🔒 Cobrança Discreta na Fatura</p>
        </div>

        {/* GUARANTEE */}
        <div className="flex items-center gap-3 bg-[#1a1a1a] rounded-xl p-4 border border-white/10 mb-6">
          <span className="text-2xl">🛡️</span>
          <p className="text-white/80 text-sm font-semibold">
            Garantia de 7 dias ou seu dinheiro de volta
          </p>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="px-4 pb-6">
        <h2 className="text-white font-black text-2xl uppercase text-center mb-4">
          O QUE DIZEM OS MEMBROS
        </h2>
        <div className="space-y-3">
          {REVIEWS.map((r) => (
            <div key={r.name} className="bg-[#1a1a1a] rounded-xl p-4 border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-red-600"
                />
                <div>
                  <p className="text-white font-bold text-sm">{r.name}</p>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className="text-yellow-400 text-sm">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-sm italic leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>

        {/* AGE DISCLAIMER */}
        <div className="flex items-center gap-2 mt-6 mb-4 text-white/40 text-xs">
          <span className="border border-white/30 rounded px-1 py-0.5 font-bold text-white/50">18</span>
          <span>Conteúdo exclusivo para maiores de 18 anos</span>
        </div>

        {/* CTA BUTTON */}
        <button className="glow-btn w-full bg-red-600 hover:bg-red-500 text-white font-black text-xl uppercase py-5 rounded-full tracking-wider">
          ENTRAR AGORA
        </button>
      </div>
    </div>
  );
}
