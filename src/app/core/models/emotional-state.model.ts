export interface EmotionalState {
  id: string;
  userId: string;
  generalState: number; // 1-10 scale
  emotions: string[];
  associations: string[];
  note: string;
  createdAt: Date;
}

export interface EmotionOption {
  label: string;
  value: string;
  icon?: string;
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  fill?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  tension?: number;
}
