import { User } from './user'

type UsersProps = {
  users: User[]
}

export const Users = ({ users }: UsersProps) => {
  if (users.length === 0) {
    return (
      <div className="text-sm text-muted-foreground px-2 py-1">
        No team members assigned
      </div>
    )
  }

  return (
    <>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
    </>
  )
}
