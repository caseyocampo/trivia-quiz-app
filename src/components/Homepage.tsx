interface HomepageProps {
  handleClick: () => void;
}

export default function Homepage({ handleClick }: HomepageProps) {
  return (
    <section>
      <div className="flex items-center justify-center flex-col h-screen">
        <h1 className="font-bold text-5xl mb-4">Trivia Quiz App</h1>
        <p className="max-w-md text-xl mb-8 text-center">
          Press the Start Quiz button to begin!
        </p>
        <button
          className="button-primary text-xl lg:text-3xl"
          onClick={handleClick}
        >
          Start Quiz
        </button>
      </div>
    </section>
  );
}
