export interface Task {
    id: number;
    title: string;
    completed: boolean;
    message?: string;
    date?: Date | null;
}
