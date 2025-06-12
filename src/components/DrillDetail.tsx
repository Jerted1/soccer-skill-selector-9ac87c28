
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, Star, CheckCircle, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DrillDetailProps {
  skill: {
    name: string;
    description: string;
    drills: Array<{
      name: string;
      description: string;
      duration: string;
      difficulty: string;
    }>;
  };
  onBack: () => void;
}

const DrillDetail = ({ skill, onBack }: DrillDetailProps) => {
  const [completedDrills, setCompletedDrills] = useState<Set<number>>(new Set());
  const { toast } = useToast();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyStars = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 1;
      case 'intermediate': return 2;
      case 'advanced': return 3;
      default: return 1;
    }
  };

  const toggleDrillComplete = (index: number) => {
    const newCompleted = new Set(completedDrills);
    if (newCompleted.has(index)) {
      newCompleted.delete(index);
      toast({
        title: "Drill unmarked",
        description: "Keep training to improve!",
      });
    } else {
      newCompleted.add(index);
      toast({
        title: "Great job! 🎉",
        description: "Drill completed successfully!",
      });
    }
    setCompletedDrills(newCompleted);
  };

  const startTraining = () => {
    toast({
      title: "Training started! 🏃‍♂️",
      description: "Give it your best effort!",
    });
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
          <div>
            <h1 className="text-4xl font-bold text-gray-800">{skill.name} Training</h1>
            <p className="text-xl text-gray-600 mt-2">{skill.description}</p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Training Progress</h2>
            <Button onClick={startTraining} className="bg-green-500 hover:bg-green-600">
              <Play className="w-4 h-4 mr-2" />
              Start Training Session
            </Button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-1 bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(completedDrills.size / skill.drills.length) * 100}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium text-gray-600">
              {completedDrills.size}/{skill.drills.length} completed
            </span>
          </div>
        </div>

        {/* Drills */}
        <div className="space-y-6">
          {skill.drills.map((drill, index) => (
            <Card 
              key={index}
              className={`transition-all duration-300 ${
                completedDrills.has(index) 
                  ? 'border-green-300 bg-green-50' 
                  : 'hover:shadow-lg border-gray-200'
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-400">
                        {(index + 1).toString().padStart(2, '0')}
                      </span>
                      <span className={completedDrills.has(index) ? 'line-through text-gray-500' : ''}>
                        {drill.name}
                      </span>
                      {completedDrills.has(index) && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </CardTitle>
                    <p className="text-gray-600 mt-2 ml-12">{drill.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between ml-12">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span className="text-sm">{drill.duration}</span>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getDifficultyColor(drill.difficulty)}`}>
                      <div className="flex items-center space-x-1">
                        <span>{drill.difficulty}</span>
                        <div className="flex space-x-1 ml-2">
                          {[...Array(3)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${
                                i < getDifficultyStars(drill.difficulty) 
                                  ? 'fill-current' 
                                  : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant={completedDrills.has(index) ? "secondary" : "default"}
                    onClick={() => toggleDrillComplete(index)}
                    className={completedDrills.has(index) ? 'bg-green-100 text-green-700 hover:bg-green-200' : ''}
                  >
                    {completedDrills.has(index) ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Completed
                      </>
                    ) : (
                      'Mark Complete'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Completion Message */}
        {completedDrills.size === skill.drills.length && (
          <div className="mt-8 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">🏆 Excellent Work!</h3>
            <p className="text-lg opacity-90 mb-4">
              You've completed all {skill.name.toLowerCase()} drills. Keep practicing to maintain and improve your skills!
            </p>
            <Button 
              variant="secondary" 
              onClick={onBack}
              className="bg-white text-green-600 hover:bg-gray-100"
            >
              Choose Another Skill
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrillDetail;
