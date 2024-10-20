import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { IFilterQuery } from 'src/interface/query.interface';
import { CreateReviewDto } from './dto/create-review.dto';
import { CreateReviewUseCase } from './usecase/create-review.use-case';
import { DeleteReviewUseCase } from './usecase/delete-review.use-case';
import { ListReviewUseCase } from './usecase/list-review.use-case';
import { DeleteReviewDto } from './dto/delete-review.dto';

@Controller('review')
export class ReviewController {
  private logger = new Logger(ReviewController.name);

  @Inject(CreateReviewUseCase)
  private createUseCase: CreateReviewUseCase;
  @Inject(DeleteReviewUseCase)
  private deleteUseCase: DeleteReviewUseCase;
  @Inject(ListReviewUseCase)
  private listUseCase: ListReviewUseCase;

  @Post()
  async create(
    @Body() createReviewDto: CreateReviewDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    this.logger.log(`Route <POST> '/review/create' accessed`);
    const output = await this.createUseCase.execute(
      'req.userLogged.id',
      createReviewDto,
    );
    return res.status(200).json({
      success: true,
      output,
    });
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    this.logger.log(`Route <DELETE> '/review/delete' accessed ${id}`);

    const reviewData: DeleteReviewDto = {
      id,
    };
    await this.deleteUseCase.execute(reviewData);
    return res.status(200).json({
      success: true,
      message: 'Review deletado com sucesso',
    });
  }

  @Get('list')
  async list(@Query() query: IFilterQuery, @Res() res: Response) {
    this.logger.log(`Route <GET> '/review/list' accessed`);
    const output = await this.listUseCase.execute(query);
    return res.status(200).json({
      success: true,
      output,
    });
  }
}
