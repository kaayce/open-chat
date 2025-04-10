import { ChevronDown } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar'
import { Skeleton } from './ui/skeleton'
import { usePhoneNumbersQuery } from '@/hooks/usePhoneNumbersQuery'
import { useSelectedPhoneNumber } from '@/hooks/useSelectedPhoneNumber'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import { User } from './user'
import { PhoneNumber } from './phone-number'

export function AppSidebar() {
  const { setSelectedPhoneId, selectedPhoneId } = useSelectedPhoneNumber()
  const { phoneNumbers, phoneIdToUsers, isPhoneNumbersLoading } =
    usePhoneNumbersQuery()

  if (isPhoneNumbersLoading || !selectedPhoneId) {
    return <Skeleton className="w-full h-full" />
  }

  return (
    <Sidebar>
      <SidebarHeader className="space-y-4">
        <div className="text-xl font-bold p-2 text-purple-500">OpenChat</div>
      </SidebarHeader>
      <SidebarContent className="px-2">
        <SidebarMenu>
          <SidebarGroupLabel>Workspace phone numbers</SidebarGroupLabel>
          {!phoneNumbers ||
            (isPhoneNumbersLoading && <Skeleton className="h-4 w-full" />)}
          {phoneNumbers.map((phoneNumber) => (
            <PhoneNumber
              key={phoneNumber.id}
              phoneNumber={phoneNumber}
              selectedPhoneNumberId={selectedPhoneId}
              setSelectedPhoneId={setSelectedPhoneId}
            />
          ))}
        </SidebarMenu>

        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup title="Your Team">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>
                Your Team
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent />
              {selectedPhoneId &&
                phoneIdToUsers[selectedPhoneId]?.map((user) => (
                  <User user={user} key={user.id} />
                ))}
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
