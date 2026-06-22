// components/CardPreview.tsx
import React from 'react';

export default function CardPreview({ data }: { data: any }) {
  const stars = data.rarity === 'comum' ? 1 : data.rarity === 'elite' ? 2 : data.rarity === 'lendario' ? 3 : 4;

  // Mapeamento dos layouts dinâmicos por posição
  let layoutFileName = '';
  if (data.cardType === 'jogador' || data.cardType === 'hissatsu') {
    layoutFileName = `${data.element || 'montanha'}-${data.cardType}`;
  } else {
    // Para evento, suporte e tática, o nome do arquivo é o próprio tipo
    layoutFileName = data.cardType;
  }
  const currentLayout = `/assets/layouts/${layoutFileName}.png`;

  const EFFECT_KEYWORDS = [
    'Disparo Direto', 'Golpe Final', 'Impulso', 'Combinação', 'Interceptação',
    'Assinatura', 'Atordoado', 'Afinidade', 'Condição', 'Perfurante', 'Despertar',
    'Investida', 'Hissatsu', 'Técnica', 'Suporte', 'Estagio', 'Jogador', 'Exausto',
    'Bloqueio', 'Defesa', 'Cadeia', 'Chutes', 'Roubar', 'Mover', 'Posse', 'Jogadores',
    'Descarte', 'Nível', 'Rápido'
  ];
  
  // Ordenamos da palavra mais longa para a mais curta. 
  // Isso evita bugs (ex: o sistema tentar pintar "Disparo" e ignorar o "Direto" logo depois).
  const SORTED_KEYWORDS = [...EFFECT_KEYWORDS].sort((a, b) => b.length - a.length);
  
  // Cria o separador. O "gi" significa Global e Case-Insensitive (ignora maiúsculas/minúsculas)
  const KEYWORD_REGEX = new RegExp(`(${SORTED_KEYWORDS.join('|')})`, 'gi');

 // const currentLayout = layoutMaps[data.position?.toLowerCase()] || layoutMaps['goleiro'];

  const renderEffectText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\{.*?\})/g);
    
    return parts.map((part, index) => {
      if (part.toLowerCase() === '{r}') return <img key={index} src="/assets/icons/shield.png" alt="Res" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      if (part.toLowerCase() === '{a}') return <img key={index} src="/assets/icons/atk.png" alt="Atk" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      if (part.toLowerCase() === '{raimon}') return <img key={index} src="/assets/teams/raimon.png" alt="Raimon" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      if (part.toLowerCase() === '{genesis}') return <img key={index} src="/assets/teams/genesis.png" alt="Raimon" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      if (part.toLowerCase() === '{royal}') return <img key={index} src="/assets/teams/royal.png" alt="Raimon" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      if (part.toLowerCase() === '{zeus}') return <img key={index} src="/assets/teams/zeus.png" alt="Raimon" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      if (part.toLowerCase() === '{agarrar}') return <img key={index} src="/assets/skills/agarrar.png" alt="Raimon" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      if (part.toLowerCase() === '{chute}') return <img key={index} src="/assets/skills/chute.png" alt="Raimon" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      if (part.toLowerCase() === '{defender}') return <img key={index} src="/assets/skills/defender.png" alt="Raimon" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      if (part.toLowerCase() === '{drible}') return <img key={index} src="/assets/skills/drible.png" alt="Raimon" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      if (part.toLowerCase() === '{fogo}') return <img key={index} src="/assets/elements/fogo.png" alt="Raimon" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      if (part.toLowerCase() === '{montanha}') return <img key={index} src="/assets/elements/montanha.png" alt="Raimon" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      if (part.toLowerCase() === '{natureza}') return <img key={index} src="/assets/elements/natureza.png" alt="Raimon" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      if (part.toLowerCase() === '{nulo}') return <img key={index} src="/assets/elements/nulo.png" alt="Raimon" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      if (part.toLowerCase() === '{vento}') return <img key={index} src="/assets/elements/vento.png" alt="Raimon" className="inline-block w-[40px] h-[40px] mx-0.5 align-middle object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />;
      
      if (!part.startsWith('{')) {
        // Ao invés de quebrar por espaço, quebramos pelas nossas palavras-chave.
        const fragments = part.split(KEYWORD_REGEX);
        
        return (
          <React.Fragment key={index}>
            {fragments.map((fragment, fIndex) => {
              // Verifica se o pedaço atual é uma das palavras do nosso array
              const isKeyword = SORTED_KEYWORDS.some(
                (kw) => kw.toLowerCase() === fragment.toLowerCase()
              );

              if (isKeyword) {
                return (
                  <span key={`${index}-${fIndex}`} className="text-blue-700 font-black">
                    {fragment}
                  </span>
                );
              }
              
              // Se não for palavra-chave (se for pontuação, texto comum ou espaço), retorna normal
              return fragment;
            })}
          </React.Fragment>
        );
      }
      return part;
    });
  };


  return (
    <div className="w-full flex justify-center items-start overflow-visible">
      
      {/* Injeção local das fontes customizadas */}
      <style>{`
        @font-face {
          font-family: 'Balmont';
          src: url('/assets/fonts/Balmont.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        @font-face {
          font-family: 'Stormfaze';
          src: url('/assets/fonts/Stormfaze.otf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        .font-balmont { font-family: 'Balmont', sans-serif; }
        .font-stormfaze { font-family: 'Stormfaze', sans-serif; }

        /* Escalonamento via zoom mantém as proporções reais intocadas no Canvas */
        .card-container-scaler {
          zoom: 0.45;
        }
        @media (min-width: 640px) { .card-container-scaler { zoom: 0.5; } }
        @media (min-width: 768px) { .card-container-scaler { zoom: 0.6; } }
        @media (min-width: 1024px) { .card-container-scaler { zoom: 0.7; } }
      `}</style>

      {/* Wrapper com o controle de escala visual limpo */}
      <div className="card-container-scaler shrink-0 select-none">
        
        {/* CONTAINER DA CARTA TRAVADO EM 750x1050 */}
        <div 
          id="card-canvas"
          style={{ width: '750px', height: '1050px' }}
          className="relative bg-black overflow-hidden shrink-0 shadow-2xl"
        >
        
        {/* =========================================================
            CAMADA 1: Arte do Personagem (Fundo)
          ========================================================= */}
        <div className="absolute inset-0 z-0 bg-neutral-900 overflow-hidden">
          {data.artUrl ? (
            <img 
              src={data.artUrl} 
              alt="Arte" 
              style={{
                objectFit: (data.artFit as any) || 'cover',
                objectPosition: `${data.artPositionX ?? 50}% ${data.artPositionY ?? 50}%`,
                transform: `scale(${data.artScale ?? 1})`,
              }}
              className="w-full h-full block" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 text-[40px] font-bold font-stormfaze">
              Insira uma Arte
            </div>
          )}
        </div>

        {/* =========================================================
            CAMADA 2: Layout / Template da Posição (Meio)
           ========================================================= */}
        <div className="absolute inset-0 z-10 pointer-events-none">
        <img 
          src={currentLayout} 
          alt="Template Layout" 
          className="w-full h-full object-fill absolute inset-0" 
        />
      </div>

        {/* =========================================================
            CAMADA 3: Textos e Ícones Dinâmicos (Topo)
           ========================================================= */}
        
        {/* Custo (Fica centralizado perfeitamente sobre a bola/círculo do topo esquerdo) */}
        <div className="absolute top-[15px] left-[15px] w-[105px] h-[105px] flex items-center justify-center z-20">
          <span className="font-stormfaze text-[60px] text-white leading-none select-none [-webkit-text-stroke:3px_black]">
            {data.cost || '0'}
          </span>
        </div>

        {/* Raridade (Estrelas abaixo do custo) */}
        {data.cardType === 'jogador' && (
        <div className="absolute top-[130px] left-[45px] flex flex-col gap-2 z-20">
          {Array.from({ length: stars }).map((_, i) => (
            <img 
              key={i} 
              src="/assets/icons/star.png" 
              className="w-[55px] h-[55px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.6)] object-contain" 
              alt="Star" 
              onError={(e) => e.currentTarget.style.display = 'none'} 
            />
          ))}
        </div>
        )}

                    {/* Elemento  (Flutuando no topo direito) */}
        {(data.cardType === 'jogador' || data.cardType === 'hissatsu') && (
        <div className="absolute top-[32px] right-[32px] w-[105px] h-[105px] z-20 flex items-center justify-center">
          <img 
            src={`/assets/elements/${data.element || 'montanha'}.png`} 
            alt="Elemento" 
            className="w-[85px] h-[85px] object-contain drop-shadow-[0_5px_5px_rgba(0,0,0,0.6)]" 
            onError={(e) => e.currentTarget.style.display = 'none'} 
          />
        </div>
        )}

        {/* Caixa de Efeito (Ajustada com a fonte Balmont e opacidade 80%) */}
        <div className="absolute bottom-[245px] left-[50px] right-[50px] bg-white/70 backdrop-blur-[2px] rounded-[25px] px-[35px] py-[25px] z-20 shadow-md min-h-[140px] flex items-center">
          <div className="font-balmont text-black text-[22px] leading-snug whitespace-pre-wrap w-full">
            {renderEffectText(data.effect)}
          </div>
        </div>

        {/* Nome da Posição (se Jogador) ou Tipo da Carta */}
          <div className="absolute bottom-[155px] left-0 right-0 flex justify-center z-20">
            <span className="font-stormfaze text-[38px] tracking-wide uppercase text-white [-webkit-text-stroke:2px_black]">
              {data.cardType === 'jogador' 
                ? (data.position || 'Goleiro') 
                : data.cardType === 'tatica' 
                  ? 'Tática' 
                  : data.cardType}
            </span>
          </div>

        
        {/* Valor de Ataque (Centralizado perfeitamente sobre a rede do rodapé esquerdo) */}
        {data.cardType === 'jogador' && (
        <div className="absolute bottom-[2px] left-[15px] w-[95px] h-[95px] flex items-center justify-center z-20">
          <span className="font-stormfaze text-[55px] text-white leading-none [-webkit-text-stroke:3px_black]">
            {data.atk || '—'}
          </span>
        </div>
        )}

        {/* Nome do Jogador & Ícone do Time (Centro do rodapé) */}
        <div className="absolute bottom-[15px] left-[150px] right-[150px] h-[140px] flex flex-col items-center justify-center z-20">
          {/* Nome com fonte Balmont (Deslocado 5px para baixo) */}
          <span className="font-balmont text-[52px] text-white tracking-wide text-center uppercase whitespace-nowrap mb-1 translate-y-[10px] [-webkit-text-stroke:3px_black]">
            {data.name || 'NOME'}
          </span>
          {/* Ícone do Time miniaturizado (Com sombra projetada de 5px) */}
          
          <div className="w-[75px] h-[75px]">
          {data.cardType === 'jogador' && (
            <img 
              src={`/assets/teams/${data.team || 'raimon'}.png`} 
              alt="Time" 
              className="w-full h-full object-contain drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] translate-y-[-7px]" 
              onError={(e) => e.currentTarget.style.display = 'none'} 
            />
          )}
          </div>
          <div className="w-[60px] h-[60px]">
          {/* RENDERIZA TIPO DE HABILIDADE SE FOR HISSATSU */}
          {data.cardType === 'hissatsu' && (
            <img 
              src={`/assets/skills/${data.skillType || 'chute'}.png`} 
              alt="Habilidade" 
              className="w-full h-full object-contain drop-shadow-[0_5px_5px_rgba(0,0,0,0.6)] translate-y-[-7px]" 
            />
          )}
          </div>
        </div>

        {/* Valor de Resistência (Centralizado perfeitamente sobre o escudo do rodapé direito) */}
        {data.cardType === 'jogador' && (
        <div className="absolute bottom-[2px] right-[6px] w-[95px] h-[95px] flex items-center justify-center z-20">
          <span className="font-stormfaze text-[55px] text-white leading-none [-webkit-text-stroke:3px_black]">
            {data.res || '0'}
          </span>
        </div>
        )}

      </div>
    </div>
    </div>
  );
}
