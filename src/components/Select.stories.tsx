import React, { useState } from "react";
import { Select } from "./Select";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Select> = {
  title: "Компоненти/Select",
  component: Select,
};

export default meta;

export const Default: StoryObj<typeof Select> = {
  render: () => {
    const [team, setTeam] = useState<{ name: string; sprite: string }[]>([]);
    return <Select team={team} setTeam={setTeam} />;
  },
};