import React, { useState } from "react";

export default function useTodoRounds() {
  const [rounds, setRounds] = useState(1);

  const addRound = () => setRounds((prev) => prev + 1);
  const subRound = () => setRounds((prev) => (prev - 1 > 0 ? prev - 1 : 1));
  const resetRounds = () => setRounds(1);
  return { rounds, addRound, subRound, resetRounds };
}
