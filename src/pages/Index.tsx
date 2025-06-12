
import React, { useState } from 'react';
import SkillCard from '@/components/SkillCard';
import DrillDetail from '@/components/DrillDetail';
import TrainingDashboard from '@/components/TrainingDashboard';
import { Dumbbell, Target, Zap, Users, Shield, Goal } from 'lucide-react';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<any>(null);

  const categories = [
    {
      id: 'skills',
      title: 'Football Skills',
      description: 'Master the fundamentals',
      icon: Target,
      color: 'from-green-500 to-emerald-600',
      skills: [
        {
          name: 'Dribbling',
          description: 'Improve ball control and close touches',
          drills: [
            {
              name: 'Cone Weaving',
              description: 'Weave through 6 cones using both feet, focus on keeping ball close',
              duration: '10 minutes',
              difficulty: 'Beginner'
            },
            {
              name: 'Figure 8 Dribbling',
              description: 'Dribble in figure 8 pattern around two cones',
              duration: '15 minutes',
              difficulty: 'Intermediate'
            }
          ]
        },
        {
          name: 'Shooting',
          description: 'Power and accuracy training',
          drills: [
            {
              name: 'Target Practice',
              description: 'Aim for corners of goal from 18-yard box',
              duration: '20 minutes',
              difficulty: 'Beginner'
            },
            {
              name: 'One-Touch Finishing',
              description: 'Practice shooting immediately after receiving pass',
              duration: '25 minutes',
              difficulty: 'Advanced'
            }
          ]
        },
        {
          name: 'Passing',
          description: 'Short and long range accuracy',
          drills: [
            {
              name: 'Wall Passes',
              description: 'Use wall to practice quick give-and-go passes',
              duration: '15 minutes',
              difficulty: 'Beginner'
            },
            {
              name: 'Long Ball Accuracy',
              description: 'Practice 40+ yard passes to target zones',
              duration: '20 minutes',
              difficulty: 'Intermediate'
            }
          ]
        }
      ]
    },
    {
      id: 'muscle',
      title: 'Muscle Groups',
      description: 'Build football-specific strength',
      icon: Dumbbell,
      color: 'from-blue-500 to-cyan-600',
      skills: [
        {
          name: 'Legs',
          description: 'Power and stability for the pitch',
          drills: [
            {
              name: 'Single Leg Squats',
              description: 'Build unilateral leg strength for better balance',
              duration: '3 sets of 12',
              difficulty: 'Intermediate'
            },
            {
              name: 'Plyometric Jumps',
              description: 'Explosive jump training for headers and speed',
              duration: '4 sets of 10',
              difficulty: 'Advanced'
            }
          ]
        },
        {
          name: 'Core',
          description: 'Stability and injury prevention',
          drills: [
            {
              name: 'Plank Variations',
              description: 'Standard, side, and dynamic planks',
              duration: '3 sets of 45 seconds',
              difficulty: 'Beginner'
            },
            {
              name: 'Russian Twists',
              description: 'Rotational core strength for better turning',
              duration: '3 sets of 20',
              difficulty: 'Intermediate'
            }
          ]
        }
      ]
    },
    {
      id: 'fitness',
      title: 'Fitness Goals',
      description: 'Peak physical condition',
      icon: Zap,
      color: 'from-orange-500 to-red-600',
      skills: [
        {
          name: 'Speed',
          description: 'Explosive acceleration and top speed',
          drills: [
            {
              name: 'Sprint Intervals',
              description: '30m sprints with full recovery between reps',
              duration: '8 x 30m',
              difficulty: 'Intermediate'
            },
            {
              name: 'Acceleration Starts',
              description: 'Practice explosive starts from various positions',
              duration: '10 x 10m',
              difficulty: 'Beginner'
            }
          ]
        },
        {
          name: 'Agility',
          description: 'Quick direction changes and coordination',
          drills: [
            {
              name: 'Ladder Drills',
              description: 'Various footwork patterns through agility ladder',
              duration: '15 minutes',
              difficulty: 'Beginner'
            },
            {
              name: 'Cone Cutting',
              description: 'Sharp cuts around cones at different angles',
              duration: '20 minutes',
              difficulty: 'Intermediate'
            }
          ]
        },
        {
          name: 'Endurance',
          description: 'Last the full 90 minutes',
          drills: [
            {
              name: 'Interval Running',
              description: 'Mix of jogging and high-intensity runs',
              duration: '30 minutes',
              difficulty: 'Intermediate'
            },
            {
              name: 'Football-Specific Circuits',
              description: 'Combine running with ball work',
              duration: '25 minutes',
              difficulty: 'Advanced'
            }
          ]
        }
      ]
    }
  ];

  if (selectedSkill) {
    return (
      <DrillDetail 
        skill={selectedSkill} 
        onBack={() => setSelectedSkill(null)} 
      />
    );
  }

  if (selectedCategory) {
    const category = categories.find(cat => cat.id === selectedCategory);
    return (
      <TrainingDashboard 
        category={category!} 
        onBack={() => setSelectedCategory(null)}
        onSelectSkill={setSelectedSkill}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 rounded-full">
              <Goal className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            What do you want to improve today?
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Select a football skill, muscle group, or fitness goal you'd like to work on — and get a list of tailored drills, exercises, and tips to help you improve and perform at your best on the pitch.
          </p>
        </div>

        {/* Category Selection */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {categories.map((category) => (
            <SkillCard
              key={category.id}
              title={category.title}
              description={category.description}
              icon={category.icon}
              gradient={category.color}
              onClick={() => setSelectedCategory(category.id)}
            />
          ))}
        </div>

        {/* Focus Areas */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">🔹 Choose your focus:</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border-2 border-dashed border-green-200 rounded-xl hover:border-green-400 transition-colors">
              <Target className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Skills</h3>
              <p className="text-sm text-gray-600">Dribbling, Shooting, Passing, Defending, Goalkeeping</p>
            </div>
            <div className="text-center p-6 border-2 border-dashed border-blue-200 rounded-xl hover:border-blue-400 transition-colors">
              <Dumbbell className="w-12 h-12 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Muscle Groups</h3>
              <p className="text-sm text-gray-600">Legs, Core, Upper Body</p>
            </div>
            <div className="text-center p-6 border-2 border-dashed border-orange-200 rounded-xl hover:border-orange-400 transition-colors">
              <Zap className="w-12 h-12 text-orange-500 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Fitness Goals</h3>
              <p className="text-sm text-gray-600">Speed, Agility, Endurance, Strength</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">👉 Ready to train?</h3>
            <p className="text-lg opacity-90">
              Choose a category above to get specific football drills, workout routines, and training tips to help you master it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
