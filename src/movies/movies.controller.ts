import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { NotFoundError } from 'rxjs';
import { stringify } from 'querystring';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
	constructor(private readonly moviesService: MoviesService) {}

	@Get()
	getAll(): Movie[] {
		return this.moviesService.getAll();
	}
	
	@Get("/:id")
	getOne(@Param('id') movieId: number) {
		const Movie = this.moviesService.getOne(movieId);
		if (!Movie)
			throw new NotFoundException(`Movie with ID ${movieId} not found.`);
		return Movie;
	}

	@Post()
	create(@Body() movideData: CreateMovieDto) {
		return this.moviesService.create(movideData);
	}

	@Delete('/:id')
	remove(@Param('id') movieId: number) {
		this.getOne(movieId);
		return this.moviesService.deleteOne(movieId);
	}

	@Patch('/:id')
	patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
		this.moviesService.update(movieId, updateData);
	}
}
