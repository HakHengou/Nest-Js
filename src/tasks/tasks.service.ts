import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuidv4 } from 'uuid';
import { CreatTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { BaseExceptionFilter } from '@nestjs/core';
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
        const found = this.tasks.find(task => task.id === id);
        if(!found){
            throw new NotFoundException(`Task with ID "${id}" not found!`);
        }
        else{
            return found;
        }
        // return this.tasks.find(task => task.id === id);
    }
    deleteTask( id: string): void{
        const found = this.getTaskById(id)
        this.tasks = this.tasks.filter(task => task.id !== found.id);
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
    updateTask(id: string, title: string, description: string): any{
        // const {title, description} = createTaskDto;
        const task = this.getTaskById(id);
        
        if(title == '' || description == ''){
            throw new BadRequestException("Title or Description can not be null !!!")
        }else{
            task.title = title;
            task.description = description;
            return task;






































        }
        
    }
}
