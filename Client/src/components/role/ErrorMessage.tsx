interface ErrorMessageProps {
  error: string | null;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;
  
  return (
    <div className="rounded-lg p-4 bg-red-50 border border-red-200">
      <p className="text-sm text-red-600">{error}</p>
    </div>
  );
};

export default ErrorMessage;