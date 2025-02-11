import { useTranslation } from 'next-i18next';

interface CreateLobbyButtonProps {
  onClick: () => void;
  isCreating?: boolean;
}

export const CreateLobbyButton = ({ onClick, isCreating = false }: CreateLobbyButtonProps) => {
  const { t } = useTranslation();
  
  return (
    <button
      onClick={onClick}
      disabled={isCreating}
      className={`
        px-6 py-2 rounded-md transition-colors
        ${isCreating
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
        }
      `}
    >
      {isCreating ? t('lobby.creating') : t('lobby.createRoom')}
    </button>
  );
}; 