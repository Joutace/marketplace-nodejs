import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { IFilterQuery } from 'src/interface/query.interface';

import { Request, Response } from 'express';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductUseCase } from './usecase/create-product.use-case';
import { DeleteProductUseCase } from './usecase/delete-product.use-case';
import { GetProductUseCase } from './usecase/get-product.use-case';
import { ListProductUseCase } from './usecase/list-product.use-case';
import { UpdateProductUseCase } from './usecase/update-product.use-case';

@Controller('product')
export class ProductController {
  private logger = new Logger(ProductController.name);
  @Inject(CreateProductUseCase)
  private createUseCase: CreateProductUseCase;
  @Inject(UpdateProductUseCase)
  private updateUseCase: UpdateProductUseCase;
  @Inject(DeleteProductUseCase)
  private deleteUseCase: DeleteProductUseCase;
  @Inject(GetProductUseCase)
  private getByIdUseCase: GetProductUseCase;
  @Inject(ListProductUseCase)
  private listUseCase: ListProductUseCase;

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    this.logger.log(`Route <POST> '/product/create' accessed`);
    const output = await this.createUseCase.execute(createProductDto);
    return res.status(200).json({
      success: true,
      output,
    });
  }

  @Get('list')
  async list(
    @Query() query: IFilterQuery,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    this.logger.log(`Route <GET> '/product/list' accessed`);
    const output = await this.listUseCase.execute(query);
    return res.status(200).json({
      success: true,
      output,
    });
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @Body() editProductDto: UpdateProductDto,
  ) {
    this.logger.log(`Route <PUT> '/product/update' accessed ${id}`);
    const output = await this.updateUseCase.execute(
      id,
      editProductDto,
      'req.userLogged.id',
    );
    return res.json({
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
    try {
      this.logger.log(`Route <DELETE> '/product/delete/:id' accessed ${id}`);
      await this.deleteUseCase.execute('req.userLogged.id', { id });
      return res.status(HttpStatus.OK).json({
        success: true,
        message: 'Produto deletado com sucesso',
      });
    } catch (error) {
      this.logger.error(
        this.logger.error(
          `Error to delete Product: ${error.message}`,
          error.stack,
        ),
      );
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: error.message,
      });
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res()
    res: Response,
  ) {
    this.logger.log(`Route <GET> '/product/:id' accessed`);
    const output = await this.getByIdUseCase.execute({ id });
    return res.status(200).json({
      success: true,
      output,
    });
  }
}
