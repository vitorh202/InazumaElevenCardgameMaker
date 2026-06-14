// utils/parseEffect.tsx
import React from 'react';

export const parseEffectText = (text: string) => {
  // Regex para encontrar {X} e quebrar o texto nesses pontos
  const parts = text.split(/(\{.*?\})/g);

  return parts.map((part, index) => {
    // Substitui por ícones
    if (part === '{R}') return <img key={index} src="/assets/icons/res.png" alt="Res" className="inline w-4 h-4 mx-1" />;
    if (part === '{A}') return <img key={index} src="/assets/icons/atk.png" alt="Atk" className="inline w-4 h-4 mx-1" />;
    
    // Podemos fazer o mesmo para times: {RAIMON}
    if (part === '{RAIMON}') return <img key={index} src="/assets/teams/raimon.png" alt="Raimon" className="inline w-4 h-4 mx-1" />;

    // Destacando palavras-chave (Ex: hissatsu)
    // O ideal aqui é processar o texto sem chaves também
    let processedText = part;
    if (!part.startsWith('{')) {
       // Separa por palavras e verifica o dicionário
       const words = processedText.split(' ');
       return <span key={index}>{
         words.map((word, wIndex) => {
            const cleanWord = word.replace(/[.,]/g, ''); // Remove pontuação para checar
            if (cleanWord.toLowerCase() === 'hissatsu') {
               return <span key={wIndex} className="text-blue-600 font-bold">{word} </span>;
            }
            return word + ' ';
         })
       }</span>;
    }
    return part;
  });
};