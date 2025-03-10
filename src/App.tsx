import React, { useState } from "react";
import { Form } from "./components/Form";
import { Select } from "./components/Select";
import { Modal } from "./components/Modal";

interface Trainer {
  firstName: string;
  lastName: string;
}

interface Pokemon {
  name: string;
  sprite: string;
}

const App: React.FC = () => {
  const [team, setTeam] = useState<Pokemon[]>([]);
  const [trainer, setTrainer] = useState<Trainer>({ firstName: "", lastName: "" });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Pokémon Battle Tower</h1>
      <Form setTrainer={setTrainer} />
      <Select team={team} setTeam={setTeam} />
      <Modal trainer={trainer} team={team} />
    </div>
  );
};

export default App;
