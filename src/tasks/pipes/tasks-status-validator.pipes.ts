import { TaskStatus } from "../task.model";
import { PipeTransform, BadRequestException } from "@nestjs/common";

export class TaskStatusValidatePipes implements PipeTransform{
    readonly allowedStatus = [
        TaskStatus.DONE,
        TaskStatus.IN_PROCESS,
        TaskStatus.OPEN
    ];
    transform(value: any){
        value = value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}"is invalid status`);
        }
        return value
    }
    private isStatusValid(status: any){
        const index = this.allowedStatus.indexOf(status);
        return index !== -1;
    }
    
}