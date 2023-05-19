import { Body, Controller, Get, Post } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './models/course.model';
import { CreateCourseDto } from './dtos/create-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  async createCourse(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    return this.coursesService.createCourse(createCourseDto);
  }

  @Get()
  async getCourses(): Promise<Course[]> {
    return this.coursesService.getCourses();
  }
}
