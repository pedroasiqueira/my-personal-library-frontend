export const formatStatus = (status) => {
    switch (status) {
      case 'lido':
        return 'Lido';
      case 'lendo':
        return 'Lendo';
      case 'quero-ler':
        return 'Quero ler';
      default:
        return status;
    }
  };
  