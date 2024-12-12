'use client';

import { createContext, PropsWithChildren, useContext } from 'react';

interface ICurrentUser {
    name: string;
    id: string;
    imageUrl: string;
    email: string;
    plan: string;
}

interface IAuthContextProps {
    isAuthenticated: boolean;
    currentUser: ICurrentUser;
}

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

interface IAuthProviderProps extends PropsWithChildren {
    currentUser: ICurrentUser;
    isAuthenticated: boolean;
}

export default function AuthProvider(props: IAuthProviderProps) {
    const { children, currentUser, isAuthenticated } = props;
    return (
        <AuthContext.Provider value={{ isAuthenticated, currentUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useCurrentUser = () => useContext(AuthContext);
