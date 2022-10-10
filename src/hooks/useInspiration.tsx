import React, { useCallback, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Quote } from "../types/global";

const fetchQuote = async (): Promise<Quote[]> => {
  const res = await fetch(
    "https://inspirational-quotes-api.herokuapp.com/quotes",
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
  const inspiration = useQuery(["inspiration"], fetchQuote, {
    staleTime: 60 * 1000 * 60 * 24,
  });

  const [activeQuote, setActiveQuote] = useState<Quote | undefined>();
  useEffect(() => {
    if (inspiration.data) {
      randomQuote(inspiration.data);
    }
  }, [inspiration.data]);
  const randomQuote = useCallback(
    (quotes: any) => {
      const randomNumber = Math.floor(Math.random() * quotes.length);
      setActiveQuote(quotes[randomNumber]);
    },
    [inspiration.data]
  );

  return { inspiration, randomQuote, activeQuote };
}
