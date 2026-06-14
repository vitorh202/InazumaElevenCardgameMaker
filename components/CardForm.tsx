// components/CardForm.tsx
import React, { ChangeEvent } from 'react';

export default function CardForm({ cardData, setCardData }: { cardData: any, setCardData: any }) {
  
  // Função para lidar com mudanças nos inputs normais
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  // Função para lidar com o upload de imagem usando FileReader
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCardData({ ...cardData, artUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold border-b border-gray-600 pb-2 mb-4">Atributos do Personagem</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nome */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Nome do Jogador</label>
          <input type="text" name="name" value={cardData.name} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>

        {/* Custo */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Custo</label>
          <input type="text" name="cost" value={cardData.cost} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>

        {/* Elemento */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Elemento</label>
          <select name="element" value={cardData.element} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option value="fogo">Fogo</option>
            <option value="vento">Vento</option>
            <option value="madeira">Madeira</option>
            <option value="montanha">Montanha</option>
          </select>
        </div>

        {/* Raridade */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Raridade</label>
          <select name="rarity" value={cardData.rarity} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option value="comum">Comum (1 Estrela)</option>
            <option value="elite">Elite (2 Estrelas)</option>
            <option value="lendario">Lendário (3 Estrelas)</option>
            <option value="icone">Ícone (4 Estrelas)</option>
          </select>
        </div>

        {/* Posição */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Posição</label>
          <select name="position" value={cardData.position} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option value="Goleiro">Goleiro</option>
            <option value="Defensor">Defensor</option>
            <option value="Meio">Meio</option>
            <option value="Atacante">Atacante</option>
          </select>
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Time</label>
          <select name="team" value={cardData.team} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500">
            <option value="Raimon">Raimon</option>
            <option value="Royal">Instituto Imperial</option>
            <option value="Zeus">Zeus</option>
            <option value="genesis">Gênesis</option>
          </select>
        </div>

        {/* ATK */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Ataque (ATK)</label>
          <input type="text" name="atk" value={cardData.atk} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>

        {/* RES */}
        <div>
          <label className="block text-sm mb-1 text-gray-300">Resistência (RES)</label>
          <input type="text" name="res" value={cardData.res} onChange={handleChange} className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500" />
        </div>
      </div>

      {/* Arte (Upload) */}
      <div className="mt-4">
        <label className="block text-sm mb-1 text-gray-300">Arte da Carta</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 rounded bg-gray-700 text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600 focus:outline-none" />
      </div>

      {/* Só mostra os ajustes se o usuário já tiver feito upload de uma arte */}
{cardData.artUrl && (
  <div className="mt-4 p-4 bg-gray-700/50 border border-gray-600 rounded-lg space-y-4">
    <h3 className="font-bold text-sm text-gray-300 uppercase tracking-wider">Ajustes da Arte</h3>
    
    {/* Modo de Preenchimento */}
    <div>
      <label className="block text-xs text-gray-400 mb-1">Modo de Preenchimento</label>
      <select 
        value={cardData.artFit || 'cover'}
        onChange={(e) => setCardData({...cardData, artFit: e.target.value})}
        className="w-full p-2 bg-gray-900 rounded border border-gray-600 text-sm focus:ring-2 focus:ring-yellow-500 outline-none"
      >
        <option value="cover">Preencher Espaço (Cover)</option>
        <option value="contain">Caber na Carta (Contain)</option>
        <option value="fill">Esticar (Fill)</option>
      </select>
    </div>

    {/* Escala (Zoom) */}
    <div>
      <label className="block text-xs text-gray-400 mb-1 flex justify-between">
        <span>Zoom</span>
        <span>{cardData.artScale || 1}x</span>
      </label>
      <input 
        type="range" 
        min="0.5" max="3" step="0.05"
        value={cardData.artScale || 1}
        onChange={(e) => setCardData({...cardData, artScale: parseFloat(e.target.value)})}
        className="w-full accent-yellow-500"
      />
    </div>

    {/* Posicionamento X e Y */}
    <div className="flex gap-4">
      <div className="flex-1">
        <label className="block text-xs text-gray-400 mb-1 flex justify-between">
          <span>Eixo X</span>
          <span>{cardData.artPositionX ?? 50}%</span>
        </label>
        <input 
          type="range" 
          min="0" max="100" 
          value={cardData.artPositionX ?? 50}
          onChange={(e) => setCardData({...cardData, artPositionX: parseInt(e.target.value)})}
          className="w-full accent-yellow-500"
        />
      </div>
      
      <div className="flex-1">
        <label className="block text-xs text-gray-400 mb-1 flex justify-between">
          <span>Eixo Y</span>
          <span>{cardData.artPositionY ?? 50}%</span>
        </label>
        <input 
          type="range" 
          min="0" max="100" 
          value={cardData.artPositionY ?? 50}
          onChange={(e) => setCardData({...cardData, artPositionY: parseInt(e.target.value)})}
          className="w-full accent-yellow-500"
        />
      </div>
    </div>
    
  </div>
)}

      {/* Efeito (Textarea) */}
      <div className="mt-4">
        <label className="block text-sm mb-1 text-gray-300">Efeito (Use {'{R}'}, {'{A}'}, {'{RAIMON}'} para ícones)</label>
        <textarea name="effect" value={cardData.effect} onChange={handleChange} rows={5} className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none" placeholder="Digite os efeitos da carta..."></textarea>
      </div>
    </div>
  );
}