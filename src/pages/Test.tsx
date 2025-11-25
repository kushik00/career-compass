import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const questions = [
  {
    id: 1,
    question: "Що тебе більше приваблює?",
    options: [
      { value: "tech", label: "Робота з технологіями та комп'ютерами" },
      { value: "people", label: "Спілкування та робота з людьми" },
      { value: "creative", label: "Творчість та мистецтво" },
      { value: "science", label: "Дослідження та наука" }
    ]
  },
  {
    id: 2,
    question: "Який тип завдань тобі подобається найбільше?",
    options: [
      { value: "analytical", label: "Аналітичні задачі з числами та даними" },
      { value: "organizational", label: "Організація та планування" },
      { value: "hands-on", label: "Практична робота руками" },
      { value: "theoretical", label: "Теоретичні дослідження" }
    ]
  },
  {
    id: 3,
    question: "Як ти вирішуєш проблеми?",
    options: [
      { value: "logical", label: "Логічно та послідовно" },
      { value: "intuitive", label: "Інтуїтивно та творчо" },
      { value: "collaborative", label: "Шукаю допомоги у інших" },
      { value: "experimental", label: "Через експерименти та спроби" }
    ]
  },
  {
    id: 4,
    question: "У вільний час ти любиш:",
    options: [
      { value: "read", label: "Читати книги або вивчати щось нове" },
      { value: "socialize", label: "Проводити час з друзями" },
      { value: "create", label: "Створювати щось своїми руками" },
      { value: "sport", label: "Займатися спортом або активностями" }
    ]
  },
  {
    id: 5,
    question: "Яке середовище роботи тобі підходить?",
    options: [
      { value: "office", label: "Офіс з комп'ютером" },
      { value: "outdoor", label: "На відкритому повітрі" },
      { value: "lab", label: "Лабораторія або майстерня" },
      { value: "dynamic", label: "Динамічне з постійними змінами" }
    ]
  },
  {
    id: 6,
    question: "Які предмети тобі найлегше даються?",
    options: [
      { value: "math", label: "Математика та фізика" },
      { value: "languages", label: "Мови та література" },
      { value: "arts", label: "Мистецтво та креатив" },
      { value: "biology", label: "Біологія та хімія" }
    ]
  },
  {
    id: 7,
    question: "Як ти ставишся до роботи в команді?",
    options: [
      { value: "leader", label: "Люблю бути лідером" },
      { value: "team", label: "Комфортно працюю в команді" },
      { value: "solo", label: "Вважаю за краще працювати самостійно" },
      { value: "flexible", label: "Залежить від ситуації" }
    ]
  },
  {
    id: 8,
    question: "Що для тебе найважливіше в майбутній роботі?",
    options: [
      { value: "salary", label: "Висока зарплата" },
      { value: "interest", label: "Цікава робота" },
      { value: "impact", label: "Корисність для суспільства" },
      { value: "stability", label: "Стабільність та надійність" }
    ]
  },
  {
    id: 9,
    question: "Як ти реагуєш на стрес?",
    options: [
      { value: "calm", label: "Залишаюся спокійним та аналізую" },
      { value: "active", label: "Стаю більш активним" },
      { value: "need-support", label: "Шукаю підтримки" },
      { value: "avoid", label: "Намагаюся уникнути" }
    ]
  },
  {
    id: 10,
    question: "Яка твоя мрія на майбутнє?",
    options: [
      { value: "innovate", label: "Створити щось інноваційне" },
      { value: "help", label: "Допомагати людям" },
      { value: "express", label: "Виражати себе через творчість" },
      { value: "discover", label: "Робити наукові відкриття" }
    ]
  }
];

const Test = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers({ ...answers, [questions[currentQuestion].id]: selectedAnswer });
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[questions[currentQuestion + 1].id] || "");
      } else {
        navigate("/results", { state: { answers: { ...answers, [questions[currentQuestion].id]: selectedAnswer } } });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[questions[currentQuestion - 1].id] || "");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-foreground text-center">
            Тест профорієнтації
          </h1>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Питання {currentQuestion + 1} з {questions.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
              {questions[currentQuestion].options.map((option) => (
                <div key={option.value} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer border border-transparent hover:border-primary/20">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer text-base"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between gap-4 pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="border-border"
              >
                Назад
              </Button>
              <Button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {currentQuestion === questions.length - 1 ? "Завершити" : "Далі"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Test;
