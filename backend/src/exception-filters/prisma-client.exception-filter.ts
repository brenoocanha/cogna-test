/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientExceptionFilter as BaseFilter } from 'nestjs-prisma';

@Catch(Prisma.PrismaClientKnownRequestError)
export class CustomPrismaClientExceptionFilter extends BaseFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    // console.log(
    //   'Exception caught in CustomPrismaClientExceptionFilter:',
    //   exception.meta,
    // );

    if (exception.code === 'P2002') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      const fields = exception.meta?.target as string[] | undefined;

      return response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: `Já existe um registro com os seguintes campos únicos: ${fields?.join(', ')}`,
      });
    }

    if (exception.code === 'P2025') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      const modelName = exception.meta?.modelName as string | undefined;

      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Registro não encontrado para a tabela: ${modelName}.`,
      });
    }

    if (exception.code === 'P2023') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.meta?.message || 'Erro ao processar a requisição.',
      });
    }

    if (exception.code === 'P2003') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Erro de chave estrangeira na tabela: ${exception.meta?.modelName}. Campo: ${exception.meta?.field_name}.`,
      });
    }

    if (exception.code === 'P2018') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `Erro de validação na tabela: ${exception.meta?.modelName}.`,
        details: exception.meta?.details,
      });
    }

    super.catch(exception, host);
  }
}
