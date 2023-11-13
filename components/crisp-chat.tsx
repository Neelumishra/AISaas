"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("a911dfc4-75cd-4c89-86f9-1e9aaef9dfae");
  }, []);

  return null;
};
