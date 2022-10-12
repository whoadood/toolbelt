import React, { useState } from "react";

// logic for incrementor/decrementor selector input
export default function useTodoRounds(todoRounds: number = 1) {
  const [rounds, setRounds] = useState(todoRounds);

  const addRound = () => setRounds((prev) => prev + 1);
  const subRound = () => setRounds((prev) => (prev - 1 > 0 ? prev - 1 : 1));
  const resetRounds = () => setRounds(1);
  return { rounds, addRound, subRound, resetRounds };
}
