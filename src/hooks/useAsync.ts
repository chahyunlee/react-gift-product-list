import { useState, useCallback } from "react";

export function useAsync<T>(initialValue: T) {
  const [data, setData] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const execute = useCallback(
    async (asyncFunction: () => Promise<T>) => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await asyncFunction();
        setData(result);
      } catch (err) {
        setError(err);
        setData(initialValue);
      } finally {
        setIsLoading(false);
      }
    },
    [initialValue]
  );

  return { data, isLoading, error, execute };
}
