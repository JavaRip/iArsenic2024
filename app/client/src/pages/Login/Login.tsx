import { Stack, Card } from "@mui/material";
import GoogleLoginSection from "./components/googleLoginSection";
import LoginSection from "./components/loginSection";
import RegisterSection from "./components/registerSection";

export default function Login(): JSX.Element {
    return (
        <>
            <Stack width="100%" alignItems="center" justifyContent="center">
                <Card>
                    <LoginSection />
                </Card>

                <Card>
                    <GoogleLoginSection />
                </Card>

                <Card>
                    <RegisterSection />
                </Card>
            </Stack>
        </>
    );
}
