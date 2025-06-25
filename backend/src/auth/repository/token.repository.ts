import { Injectable } from '@nestjs/common';
import { TokenType } from '@prisma/client';
import type { Token } from '@prisma/client';
import { TokenRepositoryInterface } from './token-repository.interface';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TokenRepository implements TokenRepositoryInterface {
  constructor(private readonly prisma: DatabaseService) {}

  async createOrUpdateToken(
    userId: string,
    tokenValue: string,
    type: TokenType,
  ): Promise<Token> {
    return await this.prisma.token.upsert({
      where: { user_id_type: { user_id: userId, type } },
      update: { token: tokenValue },
      create: {
        token: tokenValue,
        type,
        user_id: userId,
      },
    });
  }

  async findToken(
    userId: string,
    tokenValue: string,
    type: TokenType,
  ): Promise<Token | null> {
    return await this.prisma.token.findFirst({
      where: { user_id: userId, token: tokenValue, type },
    });
  }

  async invalidateTokens(userId: string): Promise<void> {
    await this.prisma.token.deleteMany({
      where: { user_id: userId },
    });
  }
}
