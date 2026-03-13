import { Button } from 'reactstrap';

interface NPCancelButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

export const NPCancelButton = ({
  onClick,
  text,
  disabled = false,
}: NPCancelButtonProps) => {
  return (
      <Button
          type="button"
          color="secondary"
          onClick={onClick}
          disabled={disabled}
      >
        {text}
      </Button>
  );
};
