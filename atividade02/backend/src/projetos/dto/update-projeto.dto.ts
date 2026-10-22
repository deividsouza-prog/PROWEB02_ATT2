import { PartialType } from '@nestjs/mapped-types';
import { CreateProjetoDto } from './create-projeto.dto';

// PartialType deixa todos os campos de CreateProjetoDto opcionais,
// mantendo as mesmas validações quando o campo for enviado.
export class UpdateProjetoDto extends PartialType(CreateProjetoDto) {}
