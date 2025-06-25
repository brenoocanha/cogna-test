import { Token, TokenType } from '@prisma/client';
import { Optional } from '@prisma/client/runtime/library';

export interface TokenRepositoryInterface {
  createOrUpdateToken(
    userId: string,
    tokenValue: string,
    type: TokenType,
  ): Promise<Token>;
  findToken(
    userId: string,
    tokenValue: string,
    type: TokenType,
  ): Optional<Token>;
  invalidateTokens(userId: string): Promise<void>;
}
