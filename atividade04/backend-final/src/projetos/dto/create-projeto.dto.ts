import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

// Cores permitidas para um projeto (o frontend usa as mesmas).
export const CORES_PERMITIDAS = ['vermelho', 'verde', 'azul', 'amarelo', 'roxo'];

export class CreateProjetoDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(3, { message: 'O nome deve ter ao menos 3 caracteres.' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres.' })
  nome: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser um texto.' })
  @MaxLength(300, { message: 'A descrição deve ter no máximo 300 caracteres.' })
  descricao?: string;

  @IsOptional()
  @IsIn(CORES_PERMITIDAS, {
    message: `A cor deve ser uma das opções: ${CORES_PERMITIDAS.join(', ')}.`,
  })
  cor?: string;
}
