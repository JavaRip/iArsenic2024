import { Stack, CircularProgress } from "@mui/material";
import { useState } from "react";
import EditProfileCard from "./EditProfileCard";
import ProfileCard from "./ProfileCard";
import { useAuth } from "../../hooks/useAuth/useAuth";
import { useUsers } from "../../hooks/useUsers/useUsers";

export default function ProfilePage(): JSX.Element {
    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);

    const auth = useAuth()
    const {
        data: token,
        isLoading: tokenLoading,
        isError: tokenIsError,
        error: tokenError,
    } = auth.getAccessToken;

    const { getUser } = useUsers()

    const {
        data: user,
        isLoading: userLoading,
        isError: userIsError,
        error: userError,
    } = getUser(token?.userId)

    if (tokenLoading) {
        return (
            <Stack alignItems="center" mt={4}>
                <CircularProgress />
            </Stack>
        )
    }

    if (tokenIsError || !token) {
        console.error(tokenError)
        throw new Error('Cannot show profile user not logged in')
    }

    if (userLoading) {
        return (
            <Stack alignItems='center' justifyContent='center'>
                <CircularProgress />
            </Stack>
        );
    }

    if (userIsError || !user) {
        console.error(userError)
        throw new Error('Cannot show profile error loading user')
    }

    if (editMode) {
        return (
            <>
                {saving && (
                    <Stack alignItems='center' justifyContent='center'>
                        <CircularProgress />
                    </Stack>
                )}
                <EditProfileCard
                    user={user}
                    setEditMode={setEditMode}
                    setSaving={setSaving}
                />
            </>
        );
    }

    return <ProfileCard user={user} setEditMode={setEditMode} />;
}
