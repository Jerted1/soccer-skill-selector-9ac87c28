
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface SkillCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  onClick: () => void;
}

const SkillCard = ({ title, description, icon: Icon, gradient, onClick }: SkillCardProps) => {
  return (
    <Card 
      className="cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl group overflow-hidden"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className={`bg-gradient-to-br ${gradient} p-8 text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
          <Icon className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-white/90">{description}</p>
        </div>
        <div className="p-6 bg-white">
          <div className="flex items-center text-gray-600 group-hover:text-gray-800 transition-colors">
            <span className="font-medium">Explore training options</span>
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillCard;
