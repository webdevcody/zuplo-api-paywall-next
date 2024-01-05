"use client";

import {
  DefaultApiKeyManagerProvider,
  type ApiKeyManagerProvider,
} from "@zuplo/react-api-key-manager";
import { PropsWithChildren, createContext, useContext, useMemo } from "react";

export const ZuploContext = createContext<ApiKeyManagerProvider | undefined>(
  undefined
);

export function useZuploContext() {
  return useContext(ZuploContext);
}

export const ZuploProvider = ({
  children,
  token,
}: PropsWithChildren & { token: string | undefined }) => {
  const provider = useMemo(() => {
    if (!token) return;
    return new DefaultApiKeyManagerProvider(
      process.env.NEXT_PUBLIC_ZUPLO_URL!,
      token
    );
  }, [token]);

  if (!provider) {
    return children;
  }

  return (
    <ZuploContext.Provider value={provider}>{children}</ZuploContext.Provider>
  );
};
