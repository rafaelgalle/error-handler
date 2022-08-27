import { UserDto } from "./UserDto"
import { UserEntity } from "./UserEntity"

export class UserMapper {
  public static toDto (raw: unknown): UserDto {
    const dto: UserDto = raw as UserDto
    return dto
  }
  public static toEntity (raw: unknown): UserEntity {
    const dto: UserEntity = raw as UserEntity
    return dto
  }
}
