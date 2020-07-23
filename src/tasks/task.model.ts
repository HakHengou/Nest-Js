import { IsNotEmpty } from "class-validator";

export class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}
export enum TaskStatus{
    OPEN = "OPEN",
    IN_PROCESS = "IN PROCESS",
    DONE = "DONE",
}