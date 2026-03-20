import { useState, useEffect, useCallback } from "react";
import getNextGame from "../services/ApiService.ts";
import { GameProp } from "../types/GameProp.ts";

interface UseGameDataReturn {
  dados: GameProp | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useGameData(): UseGameDataReturn {
  const [dados, setDados] = useState<GameProp | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getNextGame();
      setDados(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Erro ao carregar dados do jogo"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    dados,
    loading,
    error,
    refetch: fetchData,
  };
}
