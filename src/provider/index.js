"use client";

import { useState } from "react";
import { StoreContext } from "@/context";

export default function StoreProvider({ children }) {
  const [cardData, setCardData] = useState([]);

  return (
    <StoreContext.Provider value={{ cardData, setCardData }}>
      {children}
    </StoreContext.Provider>
  );
}
