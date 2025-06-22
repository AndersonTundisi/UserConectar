import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  /**
   * Gera um hash a partir de uma senha simples
   * @param password - A senha original em texto
   * @returns - O hash gerado
   */
  async hash(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compara uma senha em texto com um hash
   * @param password - A senha original em texto
   * @param hash - O hash previamente armazenado
   * @returns - true se a senha corresponder ao hash
   */
  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}