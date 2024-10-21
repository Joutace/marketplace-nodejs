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
import { AddCartProductDto } from './dto/add-cart-product.dto';
import { AddCartProductUseCase } from './usecase/add-cart-product.use-case';
import { DeleteCartProductUseCase } from './usecase/delete-cart-product.use-case';
import { RemoveCartProductDto } from './dto/remove-cart-product.dto';
import { GetCartUseCase } from './usecase/get-cart.use-case';

@Controller('cart')
export class CartController {
  private logger = new Logger(CartController.name);
  @Inject(AddCartProductUseCase)
  private addProduct: AddCartProductUseCase;
  @Inject(DeleteCartProductUseCase)
  private deleteUseCase: DeleteCartProductUseCase;
  @Inject(GetCartUseCase)
  private getByIdUseCase: GetCartUseCase;

  @Post('add-product/:id')
  async create(
    @Param('id') productId: string,
    @Body() addProductDto: AddCartProductDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    this.logger.log(`Route <POST>  '/cart/create' accessed`);
    const output = await this.addProduct.execute(addProductDto, productId);
    return res.status(200).json({
      success: true,
      output,
    });
  }

  @Delete('/delete-product')
  async delete(
    @Body() deletecartProductDto: RemoveCartProductDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      this.logger.log(
        `Route <DELETE> '/cart/delete/:id' accessed ${deletecartProductDto.cartId}`,
      );
      await this.deleteUseCase.execute(deletecartProductDto);
      return res.status(200).json({
        success: true,
        message: 'Produto removido com sucesso',
      });
    } catch (error) {
      this.logger.error(
        this.logger.error(
          `Error to delete Cart product: ${error.message}`,
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
    this.logger.log(`Route <GET> '/cart/:id' accessed`);
    const output = await this.getByIdUseCase.execute({ id });
    return res.status(200).json({
      success: true,
      output,
    });
  }
}
