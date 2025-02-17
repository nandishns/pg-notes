import { useEffect, useState } from "react";
import { BookOpen, Download, CheckCircle } from "lucide-react";
import { Quote as QuoteType, getRandomQuote } from "@/lib/quotes";

interface QuoteProps {
  text: string;
  author: string;
}

const Quote = ({ text, author }: QuoteProps) => (
  <div className="bg-gradient-to-r from-blue-600/60 to-indigo-600/60 text-white p-8 rounded-lg shadow-lg">
    <p className="text-base opacity-90 mb-2 italic">
      "{text}"
    </p>
    <p className="text-sm text-right">- {author}</p>
  </div>
);

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <h3 className="font-medium">{title}</h3>
    </div>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export function WelcomeSection() {
  const [quote, setQuote] = useState<QuoteType>({
    text: "Pure mathematics is, in its way, the poetry of logical ideas.",
    author: "Albert Einstein"
  });

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  return (
    <div className="container mx-auto">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-card p-6 rounded-lg border shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-center">Welcome <span role="img" aria-label="welcome" className="animate-wave">
              👋
            </span> </h2>
          <p className="text-sm text-center text-muted-foreground mb-6">
            Select a subject above to start exploring our comprehensive collection of mathematics study materials.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <FeatureCard
              title="Structured Learning"
              description="Step-by-step lessons designed for clear understanding"
              icon={<BookOpen className="h-4 w-4 text-blue-500" />}
            />
            <FeatureCard
              title="Easy Access"
              description="View or download notes at your convenience"
              icon={<Download className="h-4 w-4 text-green-500" />}
            />
          </div>
        </div>
        <Quote 
          text={quote.text}
          author={quote.author}
        />
      </div>
    </div>
  );
} 