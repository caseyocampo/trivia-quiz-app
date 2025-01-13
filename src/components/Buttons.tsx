interface ButtonsProps {
  handleCheckAnswers: () => void;
  handleReturnToStartPage: () => void;
  handleNewQuestions: () => void;
}

export default function Buttons({
  handleCheckAnswers,
  handleReturnToStartPage,
  handleNewQuestions,
}: ButtonsProps) {
  return (
    <div className="flex flex-col mt-20 max-w-5xl">
      <div className="flex flex-col lg:flex-row mr-8 mb-8 w-full justify-between">
        <button
          className="button-primary text-xl lg:text-3xl w-full mr-8 mb-10 lg:mb-0"
          onClick={handleCheckAnswers}
        >
          Check answers
        </button>
        <button
          className="button-secondary text-xl lg:text-3xl w-full"
          onClick={handleReturnToStartPage}
        >
          Back to start page
        </button>
      </div>
      <button
        className="button-secondary text-xl lg:text-3xl my-2"
        onClick={handleNewQuestions}
      >
        Load new questions
      </button>
    </div>
  );
}
