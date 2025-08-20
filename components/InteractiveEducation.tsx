"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Award, ChevronRight, CheckCircle } from "lucide-react";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number | number[];
  explanation: string;
  monsterReaction: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "What does HTTPS stand for?",
    options: [
      "HyperText Transfer Protocol Secure",
      "High Tech Transfer Protocol System",
      "HyperText Transport Protocol Safe",
      "Home Transfer Protocol Secure",
    ],
    correct: 0,
    explanation:
      "HTTPS encrypts data between your browser and the website, protecting it from eavesdroppers.",
    monsterReaction:
      "CORRECT! HTTPS like putting cookies in secure jar with lock! 🍪🔒",
  },
  {
    question: "What is a tracking cookie?",
    options: [
      "A cookie that makes websites load faster",
      "A cookie that stores your login information",
      "A cookie that follows your browsing across websites",
      "A cookie that saves your preferences",
    ],
    correct: 2,
    explanation:
      "Tracking cookies are used by advertisers to follow your browsing habits across different websites.",
    monsterReaction:
      "YES! Tracking cookies follow you like Cookie Monster follows cookie smell! 🍪👃",
  },
  {
    question: "What is browser fingerprinting?",
    options: [
      "Using your actual fingerprint to log in",
      "A way to identify you based on browser characteristics",
      "A security feature that protects your data",
      "A method to speed up website loading",
    ],
    correct: 1,
    explanation:
      "Browser fingerprinting uses your browser's unique characteristics (screen size, fonts, etc.) to identify you.",
    monsterReaction:
      "SMART COOKIE! Fingerprinting like recognizing Cookie Monster by his blue fur! 🍪🔍",
  },
  {
    question:
      "True or False: Incognito mode makes you completely anonymous online.",
    options: ["True", "False"],
    correct: 1,
    explanation:
      "Incognito just hides browsing history locally. Websites and ISPs can still track you.",
    monsterReaction:
      "FALSE! Incognito no magic invisibility cloak. Me still see cookie crumbs! 🍪🕵️",
  },
  {
    question: "Which of these can websites use to track you? (Select all that apply)",
    options: [
      "Cookies",
      "Browser fingerprinting",
      "IP address",
      "Your favorite cookie recipe",
    ],
    correct: [0, 1, 2],
    explanation:
      "Websites use cookies, fingerprinting, and IP addresses to track you. Your cookie recipe is safe... for now.",
    monsterReaction: "HAHA! Recipe safe, but IP not safe! 🍪💻",
  },
  {
    question: "What’s the safest password?",
    options: ["password123", "ILoveCookies", "9#vT!4pZ@Q2", "cookie"],
    correct: 2,
    explanation:
      "Strong passwords are long, random, and use symbols. Sorry Cookie Monster, 'cookie' is not safe.",
    monsterReaction: "OOF! Cookie Monster sad... but safe password better. 🍪🔐",
  },
];

export function InteractiveEducation() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<boolean[]>(
    new Array(QUIZ_QUESTIONS.length).fill(false)
  );

  const question = QUIZ_QUESTIONS[currentQuestion];

  const toggleAnswer = (index: number) => {
    if (showResult) return; // prevent changes after submit
    setSelectedAnswers((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const submitAnswer = () => {
    let correct = false;
    if (Array.isArray(question.correct)) {
      const correctSet = new Set(question.correct);
      const selectedSet = new Set(selectedAnswers);
      correct =
        correctSet.size === selectedSet.size &&
        Array.from(correctSet).every((i) => selectedSet.has(i));
    } else {
      correct = selectedAnswers.length === 1 && selectedAnswers[0] === question.correct;
    }

    if (correct) setScore((prev) => prev + 1);

    setShowResult(true);
    const newCompleted = [...completedQuestions];
    newCompleted[currentQuestion] = true;
    setCompletedQuestions(newCompleted);
  };

  const nextQuestion = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswers([]);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setScore(0);
    setCompletedQuestions(new Array(QUIZ_QUESTIONS.length).fill(false));
  };

  const quizCompleted = completedQuestions.every((c) => c);

  return (
    <Card className="border-2 border-green-300 bg-gradient-to-br from-green-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-800">
          <BookOpen className="h-6 w-6" />
          Cookie Monster's Security Quiz
        </CardTitle>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-semibold">
              Score: {score}/{QUIZ_QUESTIONS.length}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {!quizCompleted ? (
          <>
            <div className="bg-white rounded-lg p-4 border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-4">
                {question.question}
              </h3>

              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => toggleAnswer(index)}
                    disabled={showResult}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                      selectedAnswers.includes(index)
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-200 hover:border-green-300 hover:bg-green-50"
                    } ${
                      showResult && Array.isArray(question.correct)
                        ? question.correct.includes(index)
                          ? "border-green-500 bg-green-100 text-green-800"
                          : selectedAnswers.includes(index)
                          ? "border-red-500 bg-red-100 text-red-800"
                          : ""
                        : showResult && index === question.correct
                        ? "border-green-500 bg-green-100 text-green-800"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult &&
                        ((Array.isArray(question.correct) &&
                          question.correct.includes(index)) ||
                          (!Array.isArray(question.correct) &&
                            index === question.correct)) && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {!showResult ? (
              <div className="text-center mt-4">
                <Button
                  onClick={submitAnswer}
                  disabled={selectedAnswers.length === 0}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit Answer
                </Button>
              </div>
            ) : (
              <div
                className={`rounded-lg p-4 border-2 ${
                  (Array.isArray(question.correct)
                    ? new Set(selectedAnswers).size ===
                        new Set(question.correct).size &&
                      question.correct.every((i) => selectedAnswers.includes(i))
                    : selectedAnswers[0] === question.correct)
                    ? "border-green-300 bg-green-50"
                    : "border-red-300 bg-red-50"
                }`}
              >
                <div className="text-center mb-3">
                  <div className="text-4xl mb-2">
                    {(Array.isArray(question.correct)
                      ? new Set(selectedAnswers).size ===
                          new Set(question.correct).size &&
                        question.correct.every((i) =>
                          selectedAnswers.includes(i)
                        )
                      : selectedAnswers[0] === question.correct)
                      ? "🎉🍪"
                      : "😅🍪"}
                  </div>
                  <Badge
                    className={
                      (Array.isArray(question.correct)
                        ? new Set(selectedAnswers).size ===
                            new Set(question.correct).size &&
                          question.correct.every((i) =>
                            selectedAnswers.includes(i)
                          )
                        : selectedAnswers[0] === question.correct)
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {(Array.isArray(question.correct)
                      ? new Set(selectedAnswers).size ===
                          new Set(question.correct).size &&
                        question.correct.every((i) =>
                          selectedAnswers.includes(i)
                        )
                      : selectedAnswers[0] === question.correct)
                      ? "Correct!"
                      : "Not quite!"}
                  </Badge>
                </div>

                <p className="text-gray-700 mb-3">{question.explanation}</p>

                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                  <p className="text-blue-800 font-comic-sans italic">
                    "{question.monsterReaction}"
                  </p>
                </div>

                {currentQuestion < QUIZ_QUESTIONS.length - 1 && (
                  <div className="text-center mt-4">
                    <Button
                      onClick={nextQuestion}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Next Question <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="text-center space-y-4">
            <div className="text-6xl mb-4">🏆🍪</div>
            <h3 className="text-2xl font-bold text-green-800">
              Quiz Complete!
            </h3>
            <div className="bg-white rounded-lg p-6 border border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {score}/{QUIZ_QUESTIONS.length}
              </div>
              <p className="text-gray-700 mb-4">
                {score === QUIZ_QUESTIONS.length
                  ? "Perfect score! You're a cybersecurity expert!"
                  : score >= QUIZ_QUESTIONS.length / 2
                  ? "Great job! You know your security basics!"
                  : "Keep learning! Security is important!"}
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded mb-4">
                <p className="text-blue-800 font-comic-sans italic">
                  "
                  {score === QUIZ_QUESTIONS.length
                    ? "AMAZING! You know cookies better than Cookie Monster! 🍪🎓"
                    : "GOOD JOB! Keep learning about cookie safety! 🍪📚"}
                  "
                </p>
              </div>
              <Button onClick={resetQuiz} variant="outline">
                Take Quiz Again
              </Button>
            </div>
          </div>
        )}

        {/* Progress indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {QUIZ_QUESTIONS.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                completedQuestions[index]
                  ? "bg-green-500"
                  : index === currentQuestion
                  ? "bg-blue-500"
                  : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
