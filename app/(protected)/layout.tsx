import { ReactNode } from 'react'
import AuthProvider from '@/components/providers/AuthProvider'
import { getCurrentUser } from '@/utils/data-access/getCurrentUser'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Sidebar } from '@/components/common/Sidebar'
import { ProjectsDropdownMenu } from '@/components/common/ProjectsDropdownMenu'
import { Header } from '@/components/common/Header'

export default async function ProtectedRoutesLayout({
    children,
}: Readonly<{
    children: ReactNode
}>) {
    const currentUser = await getCurrentUser({
        id: true,
        name: true,
        surname: true,
        email: true,
        imageUrl: true,
        plan: true,
    })

    let providerProps
    if ('data' in currentUser) {
        const name = currentUser.data?.name as string
        const surname = currentUser.data?.surname as string
        providerProps = {
            currentUser: {
                id: currentUser.data?.id as string,
                name: `${name} ${surname}`,
                imageUrl: currentUser.data?.imageUrl as string,
                email: currentUser.data?.email as string,
                plan: currentUser.data?.plan as string,
            },
            isAuthenticated: Boolean(currentUser.data?.id),
        }
    } else {
        providerProps = {
            currentUser: {
                id: '',
                name: '',
                imageUrl: '',
                email: '',
                plan: '',
            },
            isAuthenticated: false,
        }
    }

    return (
        <AuthProvider
            currentUser={providerProps.currentUser}
            isAuthenticated={providerProps.isAuthenticated}
        >
            <SidebarProvider>
                <Sidebar>
                    <ProjectsDropdownMenu />
                </Sidebar>
                <Header />
                {children}
            </SidebarProvider>
        </AuthProvider>
    )
}
