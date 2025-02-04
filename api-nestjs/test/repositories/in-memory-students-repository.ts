import { DomainEvents } from '@/core/events/domain-events'
import { StudentsRepository } from '@/domain/forum/application/repositories/students.repository'
import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentsRepository {
  public items: Student[] = []

  async findByEmail(email: string): Promise<Student | null> {
    const student = this.items.find((item) => item.email === email)
    return student ?? null
  }

  async create(student: Student): Promise<void> {
    this.items.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)
  }

  // async save(student: Student): Promise<void> {
  //   const studentIndex = this.items.findIndex((item) => item.id === student.id)
  //   this.items[studentIndex] = student
  //   DomainEvents.dispatchEventsForAggregate(student.id)
  // }
}
