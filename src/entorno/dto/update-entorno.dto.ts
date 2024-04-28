import { PartialType } from '@nestjs/mapped-types';
import { CreateEntornoDto } from './create-entorno.dto';

export class UpdateEntornoDto extends PartialType(CreateEntornoDto) {}
