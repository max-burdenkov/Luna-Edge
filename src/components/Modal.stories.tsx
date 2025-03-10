import { Modal } from "./Modal";

export default {
  title: "Компоненти/Modal",
  component: Modal,
};

export const Default = () => {
  const trainer = { firstName: "Ash", lastName: "Ketchum" };
  const team = [
    { name: "Pikachu", sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
  ];

  return <Modal trainer={trainer} team={team} />;
};