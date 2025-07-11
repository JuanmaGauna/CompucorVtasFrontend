type Props = {
    message: string;
  };
  
  export default function ErrorMessage({ message }: Props) {
    return (
      <div className="bg-red-100 text-red-700 p-3 rounded border border-red-300 my-4 text-sm">
        ⚠️ {message}
      </div>
    );
  }
  