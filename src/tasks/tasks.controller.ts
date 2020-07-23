import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreatTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { TaskStatusValidatePipes } from './pipes/tasks-status-validator.pipes';
import { title } from 'process';

@Controller('tasks')
export class TasksController {
    constructor (private taskService: TasksService){}
    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTaskFilterDto): Task[]{
        if(Object.keys(filterDto).length){
            return this.taskService.getTaskFilter(filterDto);
        }else{
            return this.taskService.getAllTasks();
        }
    }
    @Get('/:id')
    getTaskById(
        @Param('id')id: string
    ): Task {
        return this.taskService.getTaskById(id)
    }
    @Post()
    @UsePipes(ValidationPipe)
    createTask(
        @Body() creatTaskDto: CreatTaskDto,
    ): Task {
        return this.taskService.createTask(creatTaskDto);
    }
    @Delete('/:id')
    deleteTask(
        @Param('id') id: string
    ): void{
        this.taskService.deleteTask(id);
    }
    // createTask(
    //     // @Body('id') id : string,
    //     @Body('title') title: string,
    //     @Body('description') description: string): Task {
    //         return this.taskService.createTask(title, description)
    // }
    @Patch('/:id/status')
    updateTaskStatus(
        @Param('id') id: string,
        @Body('status', TaskStatusValidatePipes) status: TaskStatus,
    ): Task {
        return this.taskService.updateTaskStatus(id, status)
    }
    @Patch('/update/:id')
    updateTask(
        @Param('id') id: string,
        @Body('title') title: string,
        @Body('description') description: string,
    ):Task{
        return this.taskService.updateTask(id, title, description)
    }
}
