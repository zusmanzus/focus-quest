import React, { createContext, useState, useContext } from 'react';
import { Task, Character } from '../types';

// тип для контекста (что будет доступно)
type GameContextType = {
  tasks: Task[];
  character: Character;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  completeTask: (taskId: string) => void;
  addXp: (amount: number) => void;
};

// контекст с начальным значением
const GameContext = createContext<GameContextType | undefined>(undefined);

// провайдер компонент
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [character, setCharacter] = useState<Character>({
    name: 'Psyduck',
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    coins: 0,
    streak: 0,
    tasksCompleted: 0
  });

  const addTask = (task: Omit<Task, 'id' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Math.random().toString(36).substr(2, 9),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const completeTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId)); // TODO: можно пометить как completed, а не удалять
    setCharacter(prev => ({
      ...prev,
      tasksCompleted: prev.tasksCompleted + 1,
      xp: prev.xp + 10 // TODO: найти задачу и добавить её xpReward, а не фиксированные 10 XP
    }));
  }; 

  const addXp = (amount: number) => {
    setCharacter(prev => ({
      ...prev,
      xp: prev.xp + amount // TODO: добавить логику повышения уровня, если XP превышает xpToNextLevel
    }));
  };

  
  return (
    <GameContext.Provider value={{ tasks, character, addTask, completeTask, addXp }}>
      {children}
    </GameContext.Provider>
  );
};

// хук для удобного использования
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};