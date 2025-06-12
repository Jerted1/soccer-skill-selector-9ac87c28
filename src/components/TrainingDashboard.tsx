
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, TrendingUp } from 'lucide-react';

interface TrainingDashboardProps {
  category: {
    title: string;
    description: string;
    icon: any;
    color: string;
    skills: any[];
  };
  onBack: () => void;
  onSelectSkill: (skill: any) => void;
}

const TrainingDashboard = ({ category, onBack, onSelectSkill }: TrainingDashboardProps) => {
  const Icon = category.icon;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4 hover:bg-white/80"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className={`bg-gradient-to-r ${category.color} p-3 rounded-lg mr-4`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{category.title}</h1>
            <p className="text-gray-600">{category.description}</p>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.skills.map((skill, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              onClick={() => onSelectSkill(skill)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{skill.name}</span>
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                </CardTitle>
                <p className="text-gray-600 text-sm">{skill.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Available drills:</span>
                    <span className="font-medium">{skill.drills.length}</span>
                  </div>
                  
                  {/* Preview of first drill */}
                  {skill.drills[0] && (
                    <div className="border-t pt-3">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-sm">{skill.drills[0].name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(skill.drills[0].difficulty)}`}>
                          {skill.drills[0].difficulty}
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {skill.drills[0].duration}
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => onSelectSkill(skill)}
                  >
                    View All Drills
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Training Tips */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">💡 Training Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Before Training:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Warm up with light jogging and dynamic stretches</li>
                <li>• Stay hydrated before, during, and after training</li>
                <li>• Set specific goals for each session</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">During Training:</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Focus on quality over quantity</li>
                <li>• Take adequate rest between high-intensity drills</li>
                <li>• Practice with both feet when possible</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDashboard;
