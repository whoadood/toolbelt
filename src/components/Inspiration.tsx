import useInspiration from "../hooks/useInspiration";

export default function Inspiration() {
  const { inspiration, randomQuote, activeQuote } = useInspiration();

  return (
    <div className="flex wrap flex-col gap-2 rounded-b w-[300px] px-4 py-2 min-h-[150px]">
      <p className="font-[cursive]">
        {activeQuote && `"${activeQuote.quote}"`}
      </p>
      <p className="text-gray-200/50">
        {activeQuote && `-${activeQuote.source}`}
      </p>
      {activeQuote && (
        <button
          className="mx-auto p-2 text-gray-200/50 hover:text-white"
          onClick={() => randomQuote(inspiration.data)}
        >
          new
        </button>
      )}
    </div>
  );
}
