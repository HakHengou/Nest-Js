import { TaskStatus } from "../task.model";
import { IsOptional, IsNotEmpty, IsIn } from "class-validator";

export class GetTaskFilterDto{
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROCESS, TaskStatus.DONE])
    status: TaskStatus;
    @IsOptional()
    @IsNotEmpty()
    search: string;
}