export function getErrorMessage(error, fallbackMessage = 'Algo deu errado. Tente novamente.') {
    if (error.message === 'Failed to fetch') {
      return 'Nosso servidor parece estar fora do ar no momento. Por favor, tente novamente em instantes.';
    }
  
    return error.message || fallbackMessage;
  }
  