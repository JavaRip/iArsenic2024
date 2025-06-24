import { useEffect, useState } from 'react';
import { useAccessToken } from './useAccessToken';
import { useQueryClient } from '@tanstack/react-query';

const UNITS_KEY = 'units';

export function useUnits() {
    const { data: token } = useAccessToken();
    const queryClient = useQueryClient();

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

    async function setUnits(newUnits: 'meters' | 'feet') {
        localStorage.setItem(UNITS_KEY, newUnits);
        setUnitsState(newUnits);

        if (token?.user) {
            await fetch(`/api/v1/self/user`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${token.id}`,
                },
                body: JSON.stringify({ units: newUnits }),
            });

            queryClient.invalidateQueries({ queryKey: ['accessToken'] });
        }
    }

    return {
        units,
        setUnits,
    };
}
