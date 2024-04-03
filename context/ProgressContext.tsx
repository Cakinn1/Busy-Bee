import { createContext, useState } from "react";

interface ContextProps {
  progress: number;
  setProgress: (value: number) => void;
}

export const progressContext = createContext<ContextProps>({
  progress: 0,
  setProgress: () => 0,
});

export default function ProgressContext({ children }: any) {
  const [progress, setProgress] = useState<number>(0);

  const contextValue: ContextProps = {
    progress,
    setProgress,
  };
  return (
    <progressContext.Provider value={contextValue}>
      {children}
    </progressContext.Provider>
  );
}
