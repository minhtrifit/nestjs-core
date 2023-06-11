import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { createTaskDto } from './dto/task-create.dto';
import { updateTaskDto } from './dto/task-update.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.tasksRepository.find();
  }

  async getTaskById(id: number): Promise<Task> {
    const foundTask = await this.tasksRepository.findOneBy({ id });
    if (!foundTask) {
      throw new NotFoundException('Task not found');
    }
    return foundTask;
  }

  async addTask(createTaskDto: createTaskDto): Promise<Task> {
    return await this.tasksRepository.save(createTaskDto);
  }

  async updateTask(id: number, updateTaskDto: updateTaskDto) {
    const foundTask = await this.tasksRepository.findOneBy({ id });

    if (!foundTask) {
      throw new NotFoundException('Task not found');
    }

    await this.tasksRepository.update(updateTaskDto.id, updateTaskDto);
    return {
      message: 'Update successfully',
      data: updateTaskDto,
    };
  }

  async deleteTask(id: number): Promise<{ id: number }> {
    const foundTask = await this.tasksRepository.findOneBy({ id });
    if (!foundTask) {
      throw new NotFoundException('Task not found');
    }
    await this.tasksRepository.delete(id);
    return { id: id };
  }
}
