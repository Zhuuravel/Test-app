import { Button } from 'reactstrap';

interface NPSubmitButtonProps {
  onClick?: () => void;
  text: string;
  disabled?: boolean;
  isSubmitting?: boolean;
  type?: 'button' | 'submit';
}

export const NPSubmitButton = ({
  onClick,
  text,
  disabled = false,
  isSubmitting = false,
  type = 'button',
}: NPSubmitButtonProps) => {
  return (
      <Button
          type={type}
          color="primary"
          onClick={onClick}
          disabled={disabled || isSubmitting}
      >
        {text}
      </Button>
  );
};
