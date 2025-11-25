import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Briefcase, GraduationCap, TrendingUp } from "lucide-react";

interface ResultProfile {
  profile: string;
  description: string;
  careers: string[];
  education: string[];
  skills: string[];
}

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState<ResultProfile | null>(null);

  useEffect(() => {
    const answers = location.state?.answers;
    
    if (!answers) {
      navigate("/test");
      return;
    }

    const answerValues = Object.values(answers) as string[];
    const categories = {
      tech: 0,
      people: 0,
      creative: 0,
      science: 0
    };

    answerValues.forEach((answer: string) => {
      if (answer.includes("tech") || answer === "office" || answer === "math" || answer === "logical") {
        categories.tech++;
      }
      if (answer.includes("people") || answer === "socialize" || answer === "team" || answer === "help") {
        categories.people++;
      }
      if (answer.includes("creative") || answer === "create" || answer === "arts" || answer === "express") {
        categories.creative++;
      }
      if (answer.includes("science") || answer === "lab" || answer === "biology" || answer === "discover") {
        categories.science++;
      }
    });

    const dominantCategory = Object.entries(categories).reduce((a, b) => 
      categories[a[0] as keyof typeof categories] > categories[b[0] as keyof typeof categories] ? a : b
    )[0];

    const profiles: Record<string, ResultProfile> = {
      tech: {
        profile: "Технологічний профіль",
        description: "Ти маєш схильність до технічних наук та інформаційних технологій. Тобі подобається працювати з комп'ютерами, розв'язувати логічні задачі та створювати щось нове у цифровому світі.",
        careers: [
          "Розробник програмного забезпечення",
          "Data Scientist / Аналітик даних",
          "Інженер з кібербезпеки",
          "DevOps інженер",
          "UX/UI дизайнер"
        ],
        education: [
          "Комп'ютерні науки",
          "Програмна інженерія",
          "Інформаційні технології",
          "Кібербезпека"
        ],
        skills: ["Програмування", "Логічне мислення", "Аналітика", "Технічна грамотність"]
      },
      people: {
        profile: "Соціальний профіль",
        description: "Твої сильні сторони - це комунікація та робота з людьми. Ти любиш допомагати іншим, організовувати заходи та працювати в команді. Емпатія та лідерські якості - твої головні переваги.",
        careers: [
          "HR-менеджер",
          "Психолог",
          "Вчитель / Викладач",
          "Event-менеджер",
          "Соціальний працівник"
        ],
        education: [
          "Психологія",
          "Педагогіка",
          "Соціологія",
          "Менеджмент"
        ],
        skills: ["Комунікація", "Емпатія", "Організація", "Лідерство"]
      },
      creative: {
        profile: "Творчий профіль",
        description: "Ти народжений для творчості! Тобі подобається створювати щось унікальне, виражати себе через мистецтво та працювати над проектами, де можна проявити фантазію та оригінальність.",
        careers: [
          "Графічний дизайнер",
          "Архітектор",
          "Режисер / Продюсер",
          "Копірайтер",
          "Fashion-дизайнер"
        ],
        education: [
          "Графічний дизайн",
          "Архітектура",
          "Кіномистецтво",
          "Реклама та PR"
        ],
        skills: ["Креативність", "Візуальне мислення", "Художні здібності", "Інновації"]
      },
      science: {
        profile: "Науковий профіль",
        description: "Ти маєш дослідницький склад розуму. Тобі цікаво розуміти, як влаштований світ, проводити експерименти та робити відкриття. Наука та дослідження - твоє покликання.",
        careers: [
          "Біолог-дослідник",
          "Медичний працівник",
          "Еколог",
          "Хімік",
          "Науковий співробітник"
        ],
        education: [
          "Біологія",
          "Медицина",
          "Хімія",
          "Екологія"
        ],
        skills: ["Аналітичне мислення", "Увага до деталей", "Дослідження", "Наукова методологія"]
      }
    };

    setResult(profiles[dominantCategory]);
  }, [location.state, navigate]);

  if (!result) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
            <GraduationCap className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-foreground">
            Твої результати
          </h1>
          <Badge className="text-lg px-6 py-2 bg-primary text-primary-foreground">
            {result.profile}
          </Badge>
        </div>

        <Card className="mb-8 border-border shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary" />
              Опис твого профілю
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {result.description}
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-foreground flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-accent" />
                Рекомендовані професії
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.careers.map((career, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <span className="text-primary font-bold">{index + 1}.</span>
                    <span className="text-foreground">{career}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-foreground flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-accent" />
                Напрями навчання
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {result.education.map((edu, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <span className="text-primary font-bold">{index + 1}.</span>
                    <span className="text-foreground">{edu}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Твої ключові навички
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {result.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="secondary"
                  className="text-base px-4 py-2"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button 
            size="lg" 
            onClick={() => navigate("/strengths")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Підібрати університет
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate("/test")}
            className="border-border"
          >
            Пройти тест знову
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            onClick={() => navigate("/")}
            className="border-border"
          >
            На головну
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Results;
