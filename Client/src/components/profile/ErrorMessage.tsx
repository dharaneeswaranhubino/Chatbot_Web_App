interface ErrorMessageProps {
  error: string;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  if (!error) return null;
  
  return (
    <div className="m-6 mb-0 rounded-lg p-4 bg-red-50 border border-red-200">
      <p className="text-sm text-red-600">{error}</p>
    </div>
  );
};

export default ErrorMessage;