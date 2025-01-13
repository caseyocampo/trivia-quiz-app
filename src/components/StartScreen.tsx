import { useState, useEffect } from "react";
import { decode } from "html-entities";
import Homepage from "./Homepage";
import Buttons from "./Buttons.tsx";
import "../assets/css/index.css";

export default function StartScreen() {
  const [isStartScreen, setIsStartScreen] = useState(false);

  const [questions, setQuestions] = useState({
    results: [
      {
        question: "",
        correct_answer: "",
        incorrect_answers: [],
        category: "",
      },
    ],
  });

  const [isAnswersChecked, setIsAnswersChecked] = useState(false);
  const [isNewQuestion, setIsNewQuestions] = useState(false);
  const [score, setScore] = useState(0);
  const [isAlreadyRendered, setIsAlreadyRendered] = useState(false);
  const [isErrorMessage, setIsErrorMessage] = useState(false);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results) {
          setQuestions(data);
        }
        return { errorCode: data.status };
      });
  }, [isNewQuestion]);

  function handleClick() {
    setIsStartScreen((prev) => !prev);
    setIsAlreadyRendered(false);
  }

  function handleReturnToStartPage() {
    setIsStartScreen((prev) => !prev);
    setIsAnswersChecked(false);
    setIsAlreadyRendered((prev) => !prev);
    setIsErrorMessage(false);
  }

  function handleCheckAnswers() {
    const selectedAnswers = document.querySelectorAll(
      'input[type="radio"]:checked'
    ).length;
    if (selectedAnswers === 5) {
      setIsAnswersChecked((prev) => !prev);
      setIsErrorMessage(false);
    } else {
      setIsErrorMessage(true);
    }
  }

  function handleNewQuestions() {
    setIsNewQuestions((prev) => !prev);
    setIsAnswersChecked(false);
    setIsErrorMessage(false);
  }

  useEffect(() => {
    const selectedAnswers = document.querySelectorAll(
      'input[type="radio"]:checked'
    ).length;
    const numberOfCorrectAnswers = document.querySelectorAll(
      'input[type="radio"]:checked + label.correct-answer.selected'
    ).length;
    if (isAnswersChecked && selectedAnswers < 5) {
      setScore(0);
      setIsErrorMessage(true);
    } else {
      setScore(numberOfCorrectAnswers);
    }
  }, [isAnswersChecked]);

  function getUniqueKey(string: string) {
    string = string.replace(/\s+/g, "");
    return string;
  }

  function shuffle(a: any, b: any[]) {
    let c = a;
    b.push(c);
    for (let i = b.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [b[i], b[j]] = [b[j], b[i]];
    }
    const unshuffledAnswers = b;
    const shuffledAnswers = [...new Set(unshuffledAnswers)];
    return shuffledAnswers;
  }

  useEffect(() => {
    const content = document.getElementById("main");
    const focusable =
      content?.querySelectorAll('button, [href], input, [tabindex="0"]') || [];
    const firstFocusable = focusable ? focusable[0] : null;
    isStartScreen && firstFocusable && (firstFocusable as HTMLElement).focus();
  }, [isStartScreen]);

  useEffect(() => {
    const content = document.getElementById("main");
    const focusable = content?.querySelectorAll(
      'button, [href], input, [tabindex="0"]'
    );
    const firstFocusable = focusable ? focusable[0] : null;
    isAlreadyRendered &&
      firstFocusable &&
      (firstFocusable as HTMLElement).focus();
  }, [isAlreadyRendered]);

  return (
    <section>
      {!isStartScreen && <Homepage handleClick={handleClick} />}
      {isStartScreen && (
        <div className="my-8 max-w-4xl mx-auto">
          <h1 className="font-bold text-5xl mb-8">
            {questions.results[0].category} Questions
          </h1>
          {questions.results.map((question, index) => (
            <div
              //   className="bg-red-300"
              className="mt-8"
              key={`question-container-${index}`}
              id={`question-container-${index}`}
            >
              <fieldset className="flex flex-col lg:flex-row">
                <legend>
                  <p className="text-3xl font-bold" key={`question-${index}`}>
                    <span className="sr-only">Quiz question {index + 1}</span>
                    {decode(question.question)}
                  </p>
                </legend>

                {shuffle(question.correct_answer, question.incorrect_answers)
                  .sort()
                  .map((answer, index) => (
                    <span
                      className="inline-block mt-6"
                      key={`${getUniqueKey(
                        decode(question.correct_answer)
                      )}-fieldset-${index}`}
                      id={`${getUniqueKey(
                        decode(question.correct_answer)
                      )}-fieldset-${index}`}
                    >
                      <input
                        type="radio"
                        id={`${getUniqueKey(
                          decode(question.correct_answer)
                        )}-${index}`}
                        name={`${getUniqueKey(
                          decode(question.correct_answer)
                        )}`}
                        value={decode(question.correct_answer)}
                      />
                      <label
                        htmlFor={`${getUniqueKey(
                          decode(question.correct_answer)
                        )}-${index}`}
                        className={`button ${
                          isAnswersChecked &&
                          (decode(question.correct_answer) == decode(answer)
                            ? "correct-answer selected"
                            : "selected-wrong-answer incorrect-answer")
                        }
                            `}
                      >
                        {decode(answer)}
                      </label>
                    </span>
                  ))}
              </fieldset>
              <hr className="question-divider my-4" />
            </div>
          ))}
          <section aria-live="polite">
            {isAnswersChecked && (
              <div
                className={`text-center font-bold text-2xl ${
                  isErrorMessage ? "hidden" : ""
                }`}
              >
                <p>You scored {score} out of 5 correct answers</p>
              </div>
            )}
            {isErrorMessage && (
              <div className="text-center font-bold text-2xl">
                <p>Please complete the quiz to calculate score.</p>
              </div>
            )}
          </section>
          <Buttons
            handleCheckAnswers={handleCheckAnswers}
            handleReturnToStartPage={handleReturnToStartPage}
            handleNewQuestions={handleNewQuestions}
          />
        </div>
      )}
    </section>
  );
}
