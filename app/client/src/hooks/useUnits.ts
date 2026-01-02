import { useEffect, useState } from 'react';
import { useAuth } from './useAuth/useAuth';
import { useUsers } from './useUser';

const UNITS_KEY = 'units';

export function useUnits() {
    const { data: token } = useAuth().getAccessToken
    const { updateUser } = useUsers()

    const {
        error,
        isError,
        isPending,
        mutate: updateUserMutate,
        status,
    } = updateUser()

    const [units, setUnitsState] = useState<'meters' | 'feet'>(() => {
        const stored = localStorage.getItem(UNITS_KEY) || 'feet';
        return stored === 'meters' ? 'meters' : 'feet';
    });

    useEffect(() => {
        const stored = localStorage.getItem(UNITS_KEY);
        if (stored && stored !== units) {
            setUnitsState(stored === 'meters' ? 'meters' : 'feet');
        }
    }, []);

    function getUnits() {
        return units
    }

    async function setUnits(newUnits: 'meters' | 'feet') {
        localStorage.setItem(UNITS_KEY, newUnits);
        setUnitsState(newUnits);

        if (token) {
            updateUserMutate({
                userId: token.userId,
                updates: { units: newUnits },
            })
        }
    }

    return {
        error,
        getUnits,
        isError,
        isPending,
        setUnits,
        status,
        units,
    };
}
