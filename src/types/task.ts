export type TaskDifficulty = 'easy' | 'medium' | 'hard';

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  difficulty: TaskDifficulty;
  xpReward: number;
}

export interface Character {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  coins: number;
  streak: number;
  tasksCompleted: number;
}