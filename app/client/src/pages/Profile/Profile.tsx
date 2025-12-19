import { Stack, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import EditProfileCard from "./EditProfileCard";
import ProfileCard from "./ProfileCard";
import { User } from "iarsenic-types";
import { useAuth } from "../../hooks/useAuth/useAuth";

export default function ProfilePage(): JSX.Element {
    const [editMode, setEditMode] = useState(false);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState<User>();

    const auth = useAuth()
    const { data: token } = auth.getAccessToken;

    console.log('--')
    console.log(token)
    console.log(user)

    useEffect(() => {
        if (!token) return
        if (token.user === undefined) return

        setUser(token.user)
    }, [token])

    if (!user) {
        return (
            <Stack alignItems='center' justifyContent='center'>
                <CircularProgress />
            </Stack>
        );
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
                    setUser={setUser}
                />
            </>
        );
    }

    return <ProfileCard user={user} setEditMode={setEditMode} />;
}
