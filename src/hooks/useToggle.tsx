import React, { useState } from "react";

// logic for conditional ui inputs
export default function useToggle() {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle(!toggle);
  return { toggle, handleToggle };
}
