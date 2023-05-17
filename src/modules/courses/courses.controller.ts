import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './models/courses.model';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async createCourse(@Body() course: any): Promise<any> {
    return this.coursesService.createCourse(course);
  }

  @Get()
  async getCourses(): Promise<Course[]> {
    return this.coursesService.getCourses();
  }
}
