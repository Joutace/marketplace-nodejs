import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserUseCase } from './usecase/create-user.use-case';
import { DeleteUserUseCase } from './usecase/delete-user.use-case';
import { GetUserUseCase } from './usecase/get-user.use-case';
import { Response } from 'express';

@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);

  @Inject(CreateUserUseCase)
  private createUseCase: CreateUserUseCase;
  @Inject(DeleteUserUseCase)
  private deleteUseCase: DeleteUserUseCase;
  @Inject(GetUserUseCase)
  private getByIdUseCase: GetUserUseCase;

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    this.logger.log(`Route <POST> '/user ' accessed`);
    const output = await this.createUseCase.execute(createUserDto);
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
    this.logger.log(`Route <DELETE> '/user delete' accessed ${id}`);
    await this.deleteUseCase.execute(`req.userLogged.id`, { id });
    return res.status(200).json({
      success: true,
      message: 'Usuário deletado com sucesso',
    });
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    this.logger.log(`Route <GET> '/user/:id' accessed`);
    const output = await this.getByIdUseCase.execute({ id });
    return res.json({
      success: true,
      output,
    });
  }
}
