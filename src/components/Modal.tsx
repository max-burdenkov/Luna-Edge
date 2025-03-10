import React, { useState } from "react";

interface Pokemon {
  name: string;
  sprite: string;
}

interface ModalProps {
  trainer: { firstName: string; lastName: string };
  team: Pokemon[];
}

export const Modal: React.FC<ModalProps> = ({ trainer, team }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (trainer.firstName && trainer.lastName && team.length > 0) {
      setIsOpen(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleOpen}
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
        disabled={!trainer.firstName || !trainer.lastName || team.length === 0}
      >
        Показати команду
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" onClick={handleClose}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-80" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-2">Тренер: {trainer.firstName} {trainer.lastName}</h2>

            <h3 className="text-lg font-semibold mb-2">Команда покемонів:</h3>
            <ul>
              {team.map((pokemon, index) => (
                <li key={index} className="text-gray-700 flex items-center gap-2">
                  <img src={pokemon.sprite} alt={pokemon.name} className="w-12 h-12" />
                  {pokemon.name}
                </li>
              ))}
            </ul>

            <div className="flex justify-center mt-4">
              <button
                onClick={handleClose}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white"
              >
                Закрити
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};