import { Box, Button, Card, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ReactNode } from "react";
import { schedule } from "./schedule";
import { actions } from "./actions";
import { tiers } from "./tiers";
import { recommendtations } from "./recommendations";

function LaunchPageCard({ children }: { children: ReactNode }) {
    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
                marginBottom: '40px',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '1rem',
                boxSizing: 'border-box',
            }}
        >
            {children}
        </Card>
    );
}

export default function LaunchEvent(): JSX.Element {
    return (
        <Box
            width="1200px"
            maxWidth='100vw'
            mx="auto"
            px={2}
        >
            <LaunchPageCard>
                <img
                    src={`/launch-event-banner.png`}
                    alt="Launch Event Banner"
                    width='100%'
                />

                <Box width='675px' maxWidth='100%'>
                    <Typography variant='h6' textAlign='left'>
                        <strong>DPHE Auditorium</strong> | 3:00–4:00 PM (Dhaka time)
                    </Typography>

                    <Typography variant='h6' textAlign='left'>
                        <strong>Event</strong> Launch of iArsenic App and ARRP DataViewer Dashboard
                    </Typography>

                    <Typography variant='h6' textAlign='left'>
                        <strong>Moderator</strong> Mr. Mohammad Saifur Rahman, Project Director, ARRP, DPHE
                    </Typography>
                </Box>

                <Stack alignItems='center' width='100%' my='32px'>
                    <a href="/iArsenic Launch Brochure.pdf" download style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained" 
                            color="primary"
                            sx={{
                                height: '77px',
                                width: '307px',
                            }}
                        >
                            <Typography variant='h6'>
                                Click Here For The Launch Brochure
                            </Typography>
                        </Button>
                    </a>
                </Stack>
            </LaunchPageCard>

            <LaunchPageCard>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell><strong>Time</strong></TableCell>
                                <TableCell><strong>Item</strong></TableCell>
                                <TableCell><strong>Presenter / Role</strong></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {schedule.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.time}</TableCell>
                                    <TableCell>{row.item}</TableCell>
                                    <TableCell>{row.presenter}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </LaunchPageCard>

            <LaunchPageCard>
                <Typography variant='h4' textAlign='center'>
                    iArsenic Launch Brief
                </Typography>

                <Typography variant='h5'>
                    Citizen Intelligence for Safe Water: A Data-Driven Approach to Arsenic Risk Reduction in Bangladesh
                </Typography>

                <Stack 
                    direction={{ 
                        xs: 'column',
                        sm: 'column',
                        md: 'row',
                        lg: 'row',
                    }}
                    alignItems='center'
                    width='100%'
                    gap='20px'
                >
                    <Box 
                        width={{
                            xs: '100%',
                            sm: '100%',
                            md: '55%',
                            lg: '55%',
                        }}
                    >
                        <Typography mb='1rem'>
                            Bangladesh has made significant progress in tackling the world’s largest mass poisoning crisis1. Since the 1990s, national and international efforts have reduced exposure from over 60 million people to around 20 million by 20242. Yet, the remaining exposed populations are the hardest to reach.
                        </Typography>

                        <Typography mb='1rem'>
                            Many people continue using contaminated wells due to habit, lack of awareness, or forgotten test results. There is no legal mechanism to prevent unsafe use or stop high-risk wells from being installed. Fallback is common, especially because arsenic-related symptoms on humans take years to appear.
                        </Typography>

                        <Typography mb='1rem'>
                            Many people continue using contaminated wells due to habit, lack of awareness, or forgotten test results. There is no legal mechanism to prevent unsafe use or stop high-risk wells from being installed. Fallback is common, especially because arsenic-related symptoms on humans take years to appear.
                        </Typography>
                    </Box>

                    <Box 
                        width={{
                            xs: '100%',
                            sm: '100%',
                            md: '40%',
                            lg: '40%',
                        }}
                    >
                        <Box maxWidth='max-content'>
                            <img
                                width='100%'
                                src={`/ui-demo.png`}
                                alt="Launch Event UI Demo"
                            />
                        </Box>
                    </Box>
                </Stack>

                <Box>
                    <Typography mb='1rem'>
                        This is dangerous. Arsenic is a slow-acting, multi-systemic toxin linked to cardiovascular disease, neurological damage, cancer, and early death. In some areas, it may account for up to 5% of adult mortality.
                    </Typography>

                    <Typography mb='1rem'>
                        We need layered safeguards—from schools to mosques to mobile tools. The iArsenic app and ARRP DataViewer dashboard enable a new model of citizen intelligence, where people are informed, engaged, and empowered to act—building resilience through data, trust, and cooperation. 
                    </Typography>
                </Box>
            </LaunchPageCard>

            <LaunchPageCard>
                <Typography variant='h5'>
                    Why Infrastructure Alone Won’t Solve It — and Who’s Still at Risk
                </Typography>

                <Typography mb='0.5rem'>
                    Despite major progress, millions of people in Bangladesh still rely on arsenic-contaminated wells—often not by choice, but because safer options are limited, unknown, or forgotten.
                </Typography>

                <Typography mb='0.5rem'>
                    To prioritise support, we’ve classified every ward/mouza into three tiers (Table 1), using Arsenic Risk Reduction Project (ARRP) data from over 6 million wells. The system considers contamination levels and the availability of safe wells.
                </Typography>

                <Typography mb='0.5rem'>
                    While most areas are now relatively safe, about 4% of wards remain in Tier 1, where unsafe wells dominate and safer choices are not easily available. These communities need ongoing behavioural nudges, community support, and multiple, reinforcing layers of action.
                </Typography>

                <Typography variant="h6" mb={2}>
                    Tier Classification Based on ARRP Well Data
                </Typography>

                <Stack alignItems='center' width='100%'>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Tier</strong></TableCell>
                                    <TableCell><strong>Criteria</strong></TableCell>
                                    <TableCell><strong>Priority</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tiers.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.tier}</TableCell>
                                        <TableCell>
                                            <ul style={{ paddingLeft: 16, margin: 0 }}>
                                                {row.criteria.map((c, i) => (
                                                    <li key={i}>{c}</li>
                                                ))}
                                            </ul>
                                        </TableCell>
                                        <TableCell>{row.priority}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
                <Typography mb='0.5rem' textAlign='center' variant='body2' width='100%'>
                    <strong>Table 1</strong> Ward-level arsenic risk classification. Every ward is included; where data are incomplete, a provisional Tier 2 classification is assigned.
                </Typography>

            </LaunchPageCard>

            <LaunchPageCard>
                <Typography variant='h5'>
                    How the iArsenic App Supports Safe Water Decisions
                </Typography>

                <Stack 
                    direction={{ 
                        xs: 'column',
                        sm: 'column',
                        md: 'row',
                        lg: 'row',
                    }}
                    width='100%'
                    gap='20px'
                >
                    <Box 
                        width={{
                            xs: '100%',
                            sm: '100%',
                            md: '40%',
                            lg: '40%',
                        }}
                    >
                        <Typography mb='1rem'>
                            The iArsenic web app allows users to assess whether a hand-pump tubewell is likely safe—without chemical testing. By entering a few easy-to-observe details—well location, depth, and staining—the app sends this information to a cloud server, where it is analysed using a hydrochemical AI model. Based on this, it returns an instant risk estimate.
                        </Typography>

                        <Typography mb='1rem'>
                            The iArsenic system links user inputs to scientific models—turning simple field data into instant risk guidance, making hidden dangers visible and helping people protect themselves and others.
                        </Typography>
                    </Box>

                    <Box 
                        width={{
                            xs: '100%',
                            sm: '100%',
                            md: '55%',
                            lg: '55%',
                        }}
                    >
                        <img
                            src={`/scientists-society.png`}
                            alt="Scientists in Society"
                            width='100%'
                        />
                    </Box>
                </Stack>

                <Typography mb='0.5rem'>
                    The model has been validated against 173 points of field data. It achieves an AUC of 0.84.This means that if you randomly pick one unsafe and one safe well, there’s an 84% chance iArsenic will give a higher risk score to the unsafe one. This makes the app highly effective for screening and prioritising wells for action. It is not a replacement for chemical testing, but a practical screening tool to guide decisions.
                </Typography>

                <Typography mb='0.5rem'>
                    Users are also asked whether they still use the well for drinking. These responses are anonymously mapped in real time, helping researchers, planners, and local authorities identify where unsafe usage continues—regardless of prior testing.
                </Typography>

                <Stack alignItems='center' direction='column' width='100%'>
                    <Box maxWidth='max-content'>
                        <img
                            src={`/roc-curve.png`}
                            alt="iArsenic prediction model ROC curve"
                            width='100%'
                        />
                    </Box>
                </Stack>
            </LaunchPageCard>
            
            <LaunchPageCard>
                <Typography variant='h5'>
                    Why One Layer Isn't Enough
                </Typography>

                <Typography mb='0.5rem'>
                    Arsenic exposure in Bangladesh cannot be solved with one tool, one message, or one deep well. Every intervention—whether a painted well, a sermon, or a school lesson—has its gaps. Paint fades. Habits return. Data gets forgotten. But when these actions are layered, they cover each other’s weaknesses.
                </Typography>

                <Typography mb='0.5rem'>
                    This is the logic of the Swiss cheese model3: each layer has holes, but stacked together, they block failure. From schools to mosques to mobile apps, layered safeguards help communities shift behaviour, share water, and stay safe—without waiting for enforcement.
                </Typography>

                <Stack alignItems='center' direction='column' width='100%'>
                    <Box maxWidth='max-content'>
                        <img
                            src={`/cheese.png`}
                            alt="Multilayer Safety Model Diagram"
                            width='100%'
                        />
                    </Box>
                </Stack>

                <Typography mb='0.5rem' textAlign='center' variant='body2' width='100%'>
                    These layers match the 8 actions listed above—each like a slice in the Swiss cheese model—working together to reduce risk. 
                </Typography>
            </LaunchPageCard>

            <LaunchPageCard>
                <Typography variant='h5'>
                    What Actions Can Be Taken
                </Typography>

                <Stack alignItems='center' width='100%'>
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Safeguard Layers</strong></TableCell>
                                    <TableCell><strong>What It Does</strong></TableCell>
                                    <TableCell><strong>Tool Support</strong></TableCell>
                                    <TableCell><strong>Tier Focus</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {actions.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{row.safeguard}</TableCell>
                                        <TableCell>{row.whatItDoes}</TableCell>
                                        <TableCell>{row.toolSupport}</TableCell>
                                        <TableCell>{row.tierFocus}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </LaunchPageCard>

            <LaunchPageCard>
                <Typography variant='h5'>
                    Recommendations
                </Typography>

                <Stack alignItems='center' width='100%'>
                    {recommendtations.map((row, index) => (
                        <Box 
                            key={index}
                            width='820px'
                            maxWidth='100%'
                            p='36px'
                            sx={{
                                backgroundColor: (index % 2 === 1) ?
                                    'rgb(235, 249, 244)' :
                                    'white'
                            }}
                        >
                            <Typography variant='h6' mb='0.5rem'>
                                {row.title}
                            </Typography>

                            <ul style={{ paddingLeft: 16, margin: 0 }}>
                                {row.recommendations.map((c, i) => (
                                    <li key={i}>{c}</li>
                                ))}
                            </ul>

                        </Box>
                    ))}
                </Stack>

                <Typography mb='0.5rem' textAlign='center' variant='body2' width='100%'>
                    Together, these actions can shift arsenic mitigation from one-off responses to a resilient, layered public health system.
                </Typography>
            </LaunchPageCard>

            <LaunchPageCard>
                <Typography variant='h5'>
                    Figures
                </Typography>
                
                <Stack alignSelf='center' width='820px' maxWidth='100%'>
                    <Typography mb='1rem'>
                        <sup>1</sup>Smith, A., et. al. (2000). Contamination of drinking-water by arsenic in Bangladesh: a public health emergency. Bulletin of the World Health Organization, 78(9), 1093–1103.
                    </Typography>

                    <Typography mb='1rem'>
                        <sup>2</sup>Khan M. et al., (2025) Well-water arsenic mitigation in Bangladesh: Benefits outweighing risks of sharing private environmental data, Environmental Science & Technology (under review)
                    </Typography>

                    <Typography mb='1rem'>
                        <sup>3</sup>Reason, J. (2000). Human error: models and management. BMJ, 320(7237), 768–770.
                    </Typography>
                </Stack>

                <Typography variant='h5'>
                    Citations
                </Typography>

                <Stack alignSelf='center' width='820px' maxWidth='100%'>
                    <Typography>
                        Hoque MA*, Dewan A, Swartz K, Kopecky J, Smith J, Ahmed KM, Islam A, Rahman S, and Butler AP (2025), Citizen Intelligence for Safe Water: A Data-Driven Approach to Arsenic Risk Reduction in Bangladesh. iArsenic Launch Event Brief, 01 July 2025, Department of Public Health Engineering (DPHE), Dhaka, Bangladesh. 
                    </Typography>
                </Stack>
            </LaunchPageCard>
        </Box>
    );
}