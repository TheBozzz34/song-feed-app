type ErrorMessageProps = {
    message: string;
  };
  
  export function ErrorMessage({ message }: ErrorMessageProps) {
    return (
      <div className="bg-red-900/30 border border-red-500 text-red-200 p-4 rounded-lg mb-4">
        <p>{message}</p>
      </div>
    );
  }