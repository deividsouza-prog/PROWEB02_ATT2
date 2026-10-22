import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

// Cores permitidas para um projeto.
export const CORES_PERMITIDAS = ['vermelho', 'verde', 'azul', 'amarelo', 'roxo'];

export class CreateProjetoDto {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @MinLength(3, { message: 'O nome deve ter ao menos 3 caracteres.' })
  @MaxLength(60, { message: 'O nome deve ter no máximo 60 caracteres.' })
  nome: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser um texto.' })
  @MaxLength(200, { message: 'A descrição deve ter no máximo 200 caracteres.' })
  descricao?: string;

  @IsIn(CORES_PERMITIDAS, {
    message: `A cor deve ser uma das opções: ${CORES_PERMITIDAS.join(', ')}.`,
  })
  cor: string;
}
