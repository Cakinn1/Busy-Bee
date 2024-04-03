import { createContext, useState } from "react";

interface ContextProps {
  feed: string;
  setFeed: (value: string) => void;
}

export const feedContext = createContext<ContextProps>({
  feed: "",
  setFeed: () => "",
});

export default function FeedContext({ children }: any) {
  const [feed, setFeed] = useState<string>("tweets");

  const contextValue = {
    feed,
    setFeed,
  };

  return (
    <feedContext.Provider value={contextValue}>{children}</feedContext.Provider>
  );
}
