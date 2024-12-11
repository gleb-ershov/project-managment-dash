import { ToggleSidebarButton } from './ToggleSidebarButton'

export const Header = () => {
    return (
        <header className="fixed h-12 w-full bg-red-200 md:hidden">
            <ToggleSidebarButton />
        </header>
    )
}
