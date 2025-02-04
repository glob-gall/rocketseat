import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database/database.module'

import { CreateAccountController } from './controllers/create-account.controller'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateQuestionController } from './controllers/create-question.controller'
import { CreateQuestionUsecase } from '@/domain/forum/application/usecases/create-question'
import { FetchRecentQuestionsUsecase } from '@/domain/forum/application/usecases/fetch-recent-questions'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateStudentUsecase } from '@/domain/forum/application/usecases/authenticate-student'
import { RegisterStudentUsecase } from '@/domain/forum/application/usecases/register-student'
import { getQuestionBySlugController } from './controllers/get-question-by-slug.controller'
import { GetQuestionBySlugUsecase } from '@/domain/forum/application/usecases/get-question-by-slug'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller'
import { EditQuestionController } from './controllers/edit-question.controller'
import { EditQuestionUsecase } from '@/domain/forum/application/usecases/edit-question'
import { DeleteQuestionController } from './controllers/delete-question.controller'
import { DeleteQuestionUsecase } from '@/domain/forum/application/usecases/delete-question'
import { AnswerQuestionController } from './controllers/answer-question.controller'
import { AnswerQuestionUsecase } from '@/domain/forum/application/usecases/answer-question'
import { EditAnswerController } from './controllers/edit-answer.controller'
import { EditAnswerUsecase } from '@/domain/forum/application/usecases/edit-answer'
import { DeleteAnswerController } from './controllers/delete-answer.controller'
import { DeleteAnswerUsecase } from '@/domain/forum/application/usecases/delete-answer'
import { FetchQuestionAnswersController } from './controllers/fetch-question-answers.controller'
import { FetchQuestionAnswersUsecase } from '@/domain/forum/application/usecases/fetch-question-answers'
import { ChooseQuestionBestAnswerController } from './controllers/choose-question-best-answer.controller'
import { ChooseQuestionBestAnswerUsecase } from '@/domain/forum/application/usecases/choose-question-best-answer'
import { CommentOnQuestionController } from './controllers/comment-on-question.controller'
import { CommentOnQuestionUsecase } from '@/domain/forum/application/usecases/comment-on-question'
import { DeleteQuestionCommentController } from './controllers/delete-question-comment.controller'
import { DeleteQuestionCommentUsecase } from '@/domain/forum/application/usecases/delete-question-comment'
import { DeleteAnswerCommentController } from './controllers/delete-answer-comment.controller'
import { DeleteAnswerCommentUsecase } from '@/domain/forum/application/usecases/delete-answer-comment'
import { FetchQuestionCommentsController } from './controllers/fetch-question-comments.controller'
import { FetchQuestionCommentsUsecase } from '@/domain/forum/application/usecases/fetch-question-comments'
import { FetchAnswerCommentsController } from './controllers/fetch-answer-comments.controller'
import { FetchAnswerCommentsUsecase } from '@/domain/forum/application/usecases/fetch-answer-comments'
import { CommentOnAnswerController } from './controllers/comment-on-answer.controller'
import { CommentOnAnswerUsecase } from '@/domain/forum/application/usecases/comment-on-answer'
import { uploadAttachmentController } from './controllers/upload-attachment.controller'
import { StorageModule } from '../storage/storage.module'

@Module({
  imports: [DatabaseModule, CryptographyModule, StorageModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    CreateAccountController,
    getQuestionBySlugController,
    FetchRecentQuestionsController,
    EditQuestionController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswersController,
    ChooseQuestionBestAnswerController,
    CommentOnQuestionController,
    CommentOnAnswerController,
    DeleteQuestionCommentController,
    DeleteAnswerCommentController,
    FetchQuestionCommentsController,
    FetchAnswerCommentsController,
    uploadAttachmentController,
  ],
  providers: [
    CreateQuestionUsecase,
    FetchRecentQuestionsUsecase,
    AuthenticateStudentUsecase,
    RegisterStudentUsecase,
    GetQuestionBySlugUsecase,
    FetchRecentQuestionsUsecase,
    EditQuestionUsecase,
    DeleteQuestionUsecase,
    AnswerQuestionUsecase,
    EditAnswerUsecase,
    DeleteAnswerUsecase,
    FetchQuestionAnswersUsecase,
    ChooseQuestionBestAnswerUsecase,
    CommentOnQuestionUsecase,
    CommentOnAnswerUsecase,
    DeleteQuestionCommentUsecase,
    DeleteAnswerCommentUsecase,
    FetchQuestionCommentsUsecase,
    FetchAnswerCommentsUsecase,
  ],
})
export class HttpModule {}
