import { IsNotEmpty } from 'class-validator';

export class DeleteReviewDto {
  @IsNotEmpty()
  id: string;
}
