import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Brain, TrendingUp, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const problems = [
    {
      icon: AlertCircle,
      title: "Невпевненість у виборі",
      description: "Багато підлітків не знають, яка професія їм підходить, та бояться зробити неправильний вибір"
    },
    {
      icon: Brain,
      title: "Незнання своїх сильних сторін",
      description: "Часто важко самостійно визначити свої таланти та здібності без професійної допомоги"
    },
    {
      icon: TrendingUp,
      title: "Відсутність чіткого плану",
      description: "Без структурованого підходу складно побудувати шлях до бажаної професії"
    },
    {
      icon: Users,
      title: "Тиск оточення",
      description: "Думка батьків та друзів може заважати прийняти власне рішення про майбутнє"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-16">
        <section className="mb-20">
          <HeroSlider />
        </section>

        <section className="mb-20 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Про наш сервіс
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Наша платформа профорієнтації допомагає підліткам знайти свій шлях у житті. 
            Ми використовуємо науково обґрунтовані методики для визначення ваших здібностей, 
            інтересів та особливостей характеру, щоб надати найкращі рекомендації щодо вибору професії.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8"
              onClick={() => navigate("/test")}
            >
              Пройти тест профорієнтації
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 border-primary text-primary hover:bg-primary/10"
              onClick={() => navigate("/strengths")}
            >
              Підібрати університет
            </Button>
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-foreground">
            Проблеми підлітків при виборі професії
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <Card 
                  key={index} 
                  className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                        <Icon className="h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-3 text-foreground">
                          {problem.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {problem.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <section className="text-center bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl p-12">
          <h2 className="text-4xl font-bold mb-6 text-foreground">
            Готовий визначитись із майбутнім?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Пройди наш тест з 10 питань та отримай персональні рекомендації щодо профілю навчання, 
            майбутньої професії та найкращих університетів для тебе!
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl px-12 py-6"
            onClick={() => navigate("/test")}
          >
            Розпочати зараз
          </Button>
        </section>
      </main>

      <footer className="bg-card border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 ПрофОрієнтація. Всі права захищені.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
