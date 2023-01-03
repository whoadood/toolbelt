import useInspiration from "../hooks/useInspiration";

export default function Inspiration() {
  const { inspiration, randomQuote, activeQuote } = useInspiration();

  return (
    <div className="wrap flex min-h-[150px] w-[300px] flex-col items-start justify-center gap-2 rounded-b px-4 py-2">
      <p className="font-[cursive] text-lg">
        {activeQuote && `"${activeQuote.text}"`}
      </p>
      <p className="text-gray-200/50">
        {activeQuote && `-${activeQuote.author}`}
      </p>
      {activeQuote && (
        <button
          aria-label="get new quote"
          className="mx-auto p-2 text-gray-200/50 hover:text-white"
          onClick={() => randomQuote(inspiration.data)}
        >
          new
        </button>
      )}
    </div>
  );
}
