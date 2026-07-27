import { isAxiosError } from "axios";

interface BackendApiError {
  status: number;
  error: string;
  message: string;
  path: string;
}

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError<BackendApiError>(error)) {
    if (error.response) {
      return error.response.data?.message ?? "Ocorreu um erro inesperado.";
    }
    return "Não foi possível ligar ao servidor. Verifica se o backend está a correr.";
  }
  return "Ocorreu um erro inesperado.";
}
