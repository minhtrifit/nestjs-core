import {
  Body,
  Controller,
  Delete,
  Put,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { createTaskDto } from './dto/task-create.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { updateTaskDto } from './dto/task-update.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/all')
  getAllTasks() {
    return this.taskService.getAllTasks();
  }

  @Get('/:taskId')
  getTaskById(@Param('taskId', ParseIntPipe) taskId: number) {
    return this.taskService.getTaskById(taskId);
  }

  @Post('/add')
  addTask(@Body() createTaskDto: createTaskDto) {
    return this.taskService.addTask(createTaskDto);
  }

  @Put('/update')
  updateTask(@Body() updateTaskDto: updateTaskDto) {
    return this.taskService.updateTask(updateTaskDto.id, updateTaskDto);
  }

  @Delete('/delete')
  deleteTask(@Body() body: { id: number }) {
    return this.taskService.deleteTask(body.id);
  }
}
