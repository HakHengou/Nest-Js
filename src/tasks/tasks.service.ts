import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreatTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
@Injectable()
export class TasksService {
    private tasks: Task[] = [];
    getAllTasks (): Task[]{
        return this.tasks;
    }
    getTaskFilter(filterDto: GetTaskFilterDto){
        const {status, search}= filterDto;
        let tasks = this.getAllTasks()
        
        if(status){
            tasks = tasks.filter(task => task.status === status);
        }
        if(search){
            tasks = this.tasks.filter(task =>
                task.title.includes(search) ||
                task.description.includes(search)
            )
        }
        return tasks
    }
    getTaskById( id: string){
        return this.tasks.find(task => task.id === id);
    }
    deleteTask( id: string): void{
        this.tasks = this.tasks.filter(task => task.id !== id);
    }
    // createTask(title: string, description: string): Task {
    //     const task: Task = {
    //         id: uuidv4(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }
    createTask(createTaskDto: CreatTaskDto): Task {
        const {title, description} = createTaskDto;
        const task: Task = {
            id: uuidv4(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task);
        return task;
    }
    updateTaskStatus(id: string, status: TaskStatus): Task{
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }
}
