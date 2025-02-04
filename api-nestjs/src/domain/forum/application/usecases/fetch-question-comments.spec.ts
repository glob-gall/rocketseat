import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUsecase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

let studentsRepository: InMemoryStudentsRepository
let questionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUsecase

describe('Fetch question comments Use Case', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    questionCommentsRepository = new InMemoryQuestionCommentsRepository(
      studentsRepository,
    )
    sut = new FetchQuestionCommentsUsecase(questionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    const student1 = makeStudent({
      name: 'author-1',
    })
    const student2 = makeStudent({
      name: 'author-2',
    })
    const comment1 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student1.id,
    })
    const comment2 = makeQuestionComment({
      questionId: new UniqueEntityID('question-1'),
      authorId: student2.id,
    })
    const comment3 = makeQuestionComment({
      questionId: new UniqueEntityID('question-2'),
      authorId: student2.id,
    })

    studentsRepository.items.push(student1, student2)

    await questionCommentsRepository.create(comment1)
    await questionCommentsRepository.create(comment2)
    await questionCommentsRepository.create(comment3)

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(2)
    expect(result.value?.comments).toEqual([
      expect.objectContaining({
        author: 'author-1',
        commentId: comment1.id,
      }),
      expect.objectContaining({
        author: 'author-2',
        commentId: comment2.id,
      }),
    ])
  })

  it('should be able to fetch paginated question answers correctly', async () => {
    const student = makeStudent({ name: 'author-1' })

    for (let i = 1; i <= 22; i++) {
      await questionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityID('question-1'),
          createdAt: new Date(2025, 0, i),
          authorId: student.id,
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)

    expect(result.value?.comments).toEqual([
      expect.objectContaining({
        createdAt: new Date(2025, 0, 2),
      }),
      expect.objectContaining({
        createdAt: new Date(2025, 0, 1),
      }),
    ])
  })
})
