import { useEffect, useState } from 'react';
import { useAuth } from './useAuth/useAuth';
import { useUsers } from './useUser';

const LANGUAGE_KEY = 'language';

export function useLanguage() {
    const { data: token } = useAuth().getAccessToken
    const { updateUser } = useUsers()

    const {
        error,
        isError,
        isPending,
        mutate: updateUserMutate,
        status,
    } = updateUser()

    const [language, setLanguageState] = useState<'bengali' | 'english'>(() => {
        const stored = localStorage.getItem(LANGUAGE_KEY) || 'bengali'
        return stored === 'bengali' ? 'bengali' : 'english'
    })

    useEffect(() => {
        const stored = localStorage.getItem(LANGUAGE_KEY);
        document.body.className = language;
        if (stored && stored !== language) {
            setLanguageState(stored === 'english' ? 'english' : 'bengali');
        }
    }, []);

    async function setLanguage(newLanguage: 'english' | 'bengali') {
        localStorage.setItem(LANGUAGE_KEY, newLanguage)
        setLanguageState(newLanguage)
        document.body.className = newLanguage;

        if (token?.user) {
            updateUserMutate({
                userId: token.user.id,
                data: { language: newLanguage },
            })
        }
    }

    return {
        error,
        isError,
        isPending,
        setLanguage,
        status,
        language,
    };
}
