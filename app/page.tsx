'use client'
import { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import CardPreview from '../components/CardPreview';
import CardForm from '../components/CardForm';

export default function Home() {
  const [cardData, setCardData] = useState({
    name: 'Mamoru Endo',
    cost: '2',
    element: 'montanha',
    rarity: 'elite',
    effect: '• Hissatsu que você usar nesse personagem que tenha "mão" no nome custam -1.\n\n• Outros personagens {RAIMON} que você controla recebem +1 de {R}.',
    position: 'Goleiro',
    atk: '',
    res: '8',
    team: 'raimon',
    artUrl: null as string | null,
    artFit: 'cover',    // Controla o object-fit
    artScale: 1,        // Controla o zoom
    artPositionX: 50,   // Posição horizontal (%)
    artPositionY: 50,   // Posição vertical (%)
    cardType: 'jogador', // 'jogador' | 'hissatsu' | 'evento' | 'suporte' | 'tatica'
    skillType: 'agarrar', // 'agarrar' | 'defender' | 'drible' | 'chute' (Usado apenas para Hissatsu)
  });

  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (cardRef.current === null) return;
    
    toPng(cardRef.current, { 
      cacheBust: true,
      pixelRatio: 1,       
      canvasWidth: 750,    
      canvasHeight: 1050,  
 
      style: {
        transform: 'scale(1)', 
        transformOrigin: 'top left',
        width: '750px',        
        height: '1050px',      
        margin: '0',
        padding: '0',
        zoom: '1'  
      } as any 
    })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${cardData.name || 'carta'}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error('Erro ao gerar imagem:', err));
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white p-4 md:p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Super 11 Cardmaker</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        {/* Lado Esquerdo: Formulário */}
        <div className="flex-1 bg-gray-800 p-6 rounded-xl shadow-lg overflow-y-auto max-h-[80vh]">
          <CardForm cardData={cardData} setCardData={setCardData} />
        </div>

        {/* Lado Direito: Preview e Download */}
        <div className="flex-1 flex flex-col items-center justify-start sticky top-8">
          {/* A div que será transformada em imagem precisa ter tamanho fixo */}
          <div ref={cardRef} className="bg-white rounded-[20px] overflow-hidden shadow-2xl">
             <CardPreview data={cardData} />
          </div>
          
          <button 
            onClick={handleDownload}
            className="mt-6 w-full max-w-[400px] bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition-colors"
          >
            Baixar Carta
          </button>
        </div>
      </div>
    </main>
  );
}