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
import { PhoneNumbers } from './phone-numbers'
import { Users } from './users'
import { useMemo } from 'react'

export function AppSidebar() {
  const { setSelectedPhoneId, selectedPhoneId } = useSelectedPhoneNumber()
  const { phoneNumbers, phoneIdToUsers, isPhoneNumbersLoading } =
    usePhoneNumbersQuery()

  const isLoading = isPhoneNumbersLoading || !selectedPhoneId
  const users = useMemo(
    () => (selectedPhoneId ? phoneIdToUsers[selectedPhoneId] : []),
    [phoneIdToUsers, selectedPhoneId]
  )

  if (isLoading) {
    return <Skeleton className="w-full h-full" />
  }

  return (
    <Sidebar>
      <SidebarHeader className="space-y-4">
        <div className="text-xl font-bold p-2 text-purple-500">OpenChat</div>
      </SidebarHeader>

      <SidebarContent className="px-2 space-y-6">
        {/* Phone Numbers Section */}
        <SidebarMenu>
          <SidebarGroupLabel>Workspace phone numbers</SidebarGroupLabel>
          <PhoneNumbers
            phoneNumbers={phoneNumbers}
            selectedPhoneNumberId={selectedPhoneId}
            setSelectedPhoneId={setSelectedPhoneId}
          />
        </SidebarMenu>

        {/* Team Section */}
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel>
                Your Team
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <Users users={users} />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}
