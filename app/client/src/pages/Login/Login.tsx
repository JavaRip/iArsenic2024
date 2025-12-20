import { Stack } from "@mui/material";
import GoogleLoginSection from "./components/googleLoginSection";
import LoginSection from "./components/loginSection";
import RegisterSection from "./components/registerSection";
import PageCard from "../../components/PageCard";

export default function Login(): JSX.Element {
    return (
        <>
            <Stack width="100%" alignItems="center" justifyContent="center">
                <PageCard>
                    <LoginSection />
                </PageCard>

                <PageCard>
                    <GoogleLoginSection />
                </PageCard>

                <PageCard>
                    <RegisterSection />
                </PageCard>
            </Stack>
        </>
    );
}
