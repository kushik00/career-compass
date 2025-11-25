import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, MapPin, Star } from "lucide-react";

const strengths = [
  { id: "analytical", label: "Аналітичне мислення" },
  { id: "creative", label: "Креативність" },
  { id: "communication", label: "Комунікабельність" },
  { id: "leadership", label: "Лідерські якості" },
  { id: "technical", label: "Технічні навички" },
  { id: "organized", label: "Організованість" },
  { id: "empathy", label: "Емпатія" },
  { id: "problem-solving", label: "Вирішення проблем" },
  { id: "teamwork", label: "Робота в команді" },
  { id: "attention", label: "Увага до деталей" },
  { id: "adaptability", label: "Адаптивність" },
  { id: "research", label: "Дослідницькі здібності" }
];

interface University {
  name: string;
  city: string;
  programs: string[];
  rating: number;
  strengths: string[];
}

const universities: University[] = [
  {
    name: "Київський національний університет імені Тараса Шевченка",
    city: "Київ",
    programs: ["Комп'ютерні науки", "Психологія", "Міжнародні відносини", "Біологія"],
    rating: 5,
    strengths: ["analytical", "research", "technical", "problem-solving"]
  },
  {
    name: "Національний технічний університет України 'КПІ імені Ігоря Сікорського'",
    city: "Київ",
    programs: ["Інженерія програмного забезпечення", "Кібербезпека", "Прикладна математика"],
    rating: 5,
    strengths: ["technical", "analytical", "problem-solving", "attention"]
  },
  {
    name: "Львівський національний університет імені Івана Франка",
    city: "Львів",
    programs: ["Філологія", "Історія", "Журналістика", "Економіка"],
    rating: 4,
    strengths: ["communication", "research", "creative", "organized"]
  },
  {
    name: "Харківський національний університет імені В.Н. Каразіна",
    city: "Харків",
    programs: ["Фізика", "Хімія", "Медицина", "Соціологія"],
    rating: 5,
    strengths: ["analytical", "research", "attention", "problem-solving"]
  },
  {
    name: "Одеський національний університет імені І.І. Мечникова",
    city: "Одеса",
    programs: ["Біологія", "Екологія", "Право", "Туризм"],
    rating: 4,
    strengths: ["research", "empathy", "communication", "adaptability"]
  },
  {
    name: "Київський національний економічний університет",
    city: "Київ",
    programs: ["Економіка", "Менеджмент", "Фінанси", "Маркетинг"],
    rating: 4,
    strengths: ["analytical", "leadership", "organized", "communication"]
  },
  {
    name: "Національна академія образотворчого мистецтва і архітектури",
    city: "Київ",
    programs: ["Архітектура", "Графічний дизайн", "Образотворче мистецтво"],
    rating: 4,
    strengths: ["creative", "attention", "problem-solving", "adaptability"]
  },
  {
    name: "Дніпровський національний університет імені Олеся Гончара",
    city: "Дніпро",
    programs: ["Інформаційні технології", "Бізнес-адміністрування", "Екологія"],
    rating: 4,
    strengths: ["technical", "analytical", "teamwork", "organized"]
  }
];

const Strengths = () => {
  const [selectedStrengths, setSelectedStrengths] = useState<string[]>([]);
  const [recommendations, setRecommendations] = useState<University[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleStrengthToggle = (strengthId: string) => {
    setSelectedStrengths(prev =>
      prev.includes(strengthId)
        ? prev.filter(id => id !== strengthId)
        : [...prev, strengthId]
    );
  };

  const handleSubmit = () => {
    if (selectedStrengths.length === 0) return;

    const scored = universities.map(uni => {
      const matchCount = uni.strengths.filter(s => 
        selectedStrengths.includes(s)
      ).length;
      return { ...uni, score: matchCount };
    });

    const filtered = scored
      .filter(uni => uni.score > 0)
      .sort((a, b) => b.score - a.score || b.rating - a.rating)
      .slice(0, 5);

    setRecommendations(filtered);
    setShowResults(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-accent text-accent" : "text-muted"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16 max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
            <GraduationCap className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-foreground">
            Підбір університету
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Обери свої сильні сторони, і ми порекомендуємо найкращі університети для тебе
          </p>
        </div>

        {!showResults ? (
          <Card className="border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                Обери свої сильні сторони (мінімум 1)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {strengths.map((strength) => (
                  <div
                    key={strength.id}
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedStrengths.includes(strength.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/30"
                    }`}
                    onClick={() => handleStrengthToggle(strength.id)}
                  >
                    <Checkbox
                      id={strength.id}
                      checked={selectedStrengths.includes(strength.id)}
                      onCheckedChange={() => handleStrengthToggle(strength.id)}
                    />
                    <Label
                      htmlFor={strength.id}
                      className="flex-1 cursor-pointer text-base font-medium"
                    >
                      {strength.label}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="text-center pt-6">
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={selectedStrengths.length === 0}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-12"
                >
                  Показати рекомендації
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-foreground">
                Рекомендовані університети
              </h2>
              <Button
                variant="outline"
                onClick={() => {
                  setShowResults(false);
                  setSelectedStrengths([]);
                  setRecommendations([]);
                }}
                className="border-border"
              >
                Змінити вибір
              </Button>
            </div>

            {recommendations.length === 0 ? (
              <Card className="border-border">
                <CardContent className="text-center py-12">
                  <p className="text-xl text-muted-foreground">
                    На жаль, не знайдено університетів за вашими критеріями. 
                    Спробуйте обрати інші сильні сторони.
                  </p>
                </CardContent>
              </Card>
            ) : (
              recommendations.map((uni, index) => (
                <Card 
                  key={index} 
                  className="border-border shadow-lg hover:shadow-xl transition-all"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl text-foreground mb-2">
                          {uni.name}
                        </CardTitle>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{uni.city}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {renderStars(uni.rating)}
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-accent text-accent-foreground">
                        Топ {index + 1}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-foreground">
                          Популярні програми:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {uni.programs.map((program, idx) => (
                            <Badge key={idx} variant="secondary">
                              {program}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-foreground">
                          Відповідає твоїм сильним сторонам:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {uni.strengths
                            .filter(s => selectedStrengths.includes(s))
                            .map((strengthId) => {
                              const strength = strengths.find(s => s.id === strengthId);
                              return strength ? (
                                <Badge 
                                  key={strengthId} 
                                  className="bg-primary/10 text-primary border-primary/20"
                                >
                                  {strength.label}
                                </Badge>
                              ) : null;
                            })}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Strengths;
