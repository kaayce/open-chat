import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export const User = ({ user }: { user: User }) => {
  return (
    <div className="flex items-center gap-4 p-3 relative">
      <Avatar className="text-xs border-2 border-gray-200">
        <AvatarFallback>
          {user.firstName.charAt(0)}
          {user.lastName.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-gray-900">
          {user.firstName} {user.lastName}
        </p>
      </div>

      <Badge
        variant={user.role === 'owner' ? 'default' : 'secondary'}
        className={cn('absolute right-2 top-2', {
          'bg-purple-100 text-purple-800 hover:bg-purple-100':
            user.role === 'owner',
          'bg-gray-100 text-gray-800 hover:bg-gray-100': user.role === 'member',
        })}
      >
        {user.role}
      </Badge>
    </div>
  )
}
