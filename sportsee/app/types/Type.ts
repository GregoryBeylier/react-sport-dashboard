export type HeartRate = {
  min: number;
  max: number;
  average: number;
};

export type UserActivity = {
  date: string;
  distance: number;
  duration: number;
  heartRate: HeartRate;
  caloriesBurned: number;
};

export type WeeklyGoal = {
  completed: number;
  target: number,
}

