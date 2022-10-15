import React, { useState } from "react";

// logic for conditional ui inputs
export default function useToggle(init?: boolean) {
  const [toggle, setToggle] = useState(init ? init : false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return { toggle, handleToggle };
}
