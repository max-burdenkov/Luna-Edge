import React, { useState } from "react";

interface FormProps {
  setTrainer: React.Dispatch<React.SetStateAction<{ firstName: string; lastName: string }>>;
}

export const Form: React.FC<FormProps> = ({ setTrainer }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;
    setTrainer({ firstName, lastName });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md mb-4 w-80">
      <h2 className="text-lg font-bold mb-2">Введіть ім'я тренера</h2>

      <input
        type="text"
        placeholder="Ім'я"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="border p-2 rounded w-full mb-2 focus:border-purple-500 hover:border-purple-500"
        required
      />

      <input
        type="text"
        placeholder="Прізвище"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="border p-2 rounded w-full mb-2 focus:border-purple-500 hover:border-purple-500"
        required
      />

      <button
        type="submit"
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 w-full"
        disabled={!firstName.trim() || !lastName.trim()}
      >
        Зберегти
      </button>
    </form>
  );
};