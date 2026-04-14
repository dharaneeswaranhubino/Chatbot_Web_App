interface SuccessMessageProps {
  message: string;
}

const SuccessMessage = ({ message }: SuccessMessageProps) => {
  if (!message) return null;
  
  return (
    <div className="rounded-lg p-4 bg-green-50 border border-green-200">
      <p className="text-sm text-green-600">{message}</p>
    </div>
  );
};

export default SuccessMessage;