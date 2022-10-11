import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Wow } from "../types/global";

const fetchWow = async (): Promise<Wow[]> => {
  const res = await fetch(
    "https://owen-wilson-wow-api.herokuapp.com/wows/random?results=5",
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }
  );
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
};

export default function useInspiration() {
  const owen = useQuery(["owen"], fetchWow, {
    staleTime: 60 * 1000 * 60 * 2,
  });

  const [activeWow, setActiveWow] = useState<string | undefined>();
  useEffect(() => {
    if (owen.data) {
      randomWow(owen.data);
    }
  }, [owen.data]);
  const randomWow = useCallback(
    (wows: Wow[]) => {
      const randomNumber = Math.floor(Math.random() * wows.length);
      setActiveWow(wows[randomNumber].audio);
    },
    [owen.data]
  );

  return { owen, randomWow, activeWow };
}
