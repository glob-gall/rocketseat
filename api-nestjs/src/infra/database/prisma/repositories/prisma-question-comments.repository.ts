// import { PaginationParams } from '@/core/repositories/pagination-params'
import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments.repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionCommentMapper } from '../mappers/prisma-question-comment-mapper'
import { CommentWithAuthor } from '@/core/entities/value-objetcs/comment-with-author'
import { PrismaCommentWithAuthorMapper } from '../mappers/prisma-comment-with-author-mapper'

@Injectable()
export class PrismaQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(questionComment: QuestionComment): Promise<void> {
    const data = PrismaQuestionCommentMapper.toPrisma(questionComment)
    await this.prisma.comment.create({
      data,
    })
  }

  async findById(id: string): Promise<QuestionComment | null> {
    const questionComment = await this.prisma.comment.findUnique({
      where: { id },
    })

    if (!questionComment) return null
    return PrismaQuestionCommentMapper.toDomain(questionComment)
  }

  async delete(question: QuestionComment): Promise<void> {
    await this.prisma.comment.delete({
      where: { id: question.id.toString() },
    })
  }

  async findByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionComments = await this.prisma.comment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        questionId,
      },
      take: 20,
      skip: (params.page - 1) * 20,
    })
    return questionComments.map(PrismaQuestionCommentMapper.toDomain)
  }

  async findManyByQuestionIdWithAuthor(
    questionId: string,
    params: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const questionComments = await this.prisma.comment.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        author: true,
      },
      where: {
        questionId,
      },
      take: 20,
      skip: (params.page - 1) * 20,
    })
    return questionComments.map(PrismaCommentWithAuthorMapper.toDomain)
  }
}
