import { Box, Card, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ReactNode } from "react";

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
    const schedule = [
        { time: "3:00–3:05", item: "Opening & Welcome Remarks", presenter: "Chairperson – Chief Engineer, DPHE" },
        { time: "3:05–3:10", item: "Context & Importance of Arsenic Mitigation in Bangladesh", presenter: "Prof. Kazi Matin Uddin, University of Dhaka" },
        { time: "3:10–3:25", item: "Technology for Public Good: App & Dashboard Vision", presenter: "Dr. Mo Hoque (iArsenic) & Dr. Ashraf Dewan (Dashboard)" },
        { time: "3:25–3:30", item: "Future Pathways: Customisation for Institutions", presenter: "Mr. Kane Swartz, Technical Lead" },
        { time: "3:30–3:35", item: "Guest Reflections", presenter: "Mr. Ashish Daml" },
        { time: "3:35–3:40", item: "Guest Reflections", presenter: "Prof. Martin Van Kranendonk" },
        { time: "3:40–3:55", item: "Chief Guest Address and Formal Launch Ceremony", presenter: "Md Rezaul Maksud Jahedi, Secretary, LGED" },
    ];

    const tiers = [
        {
            tier: "Tier 1",
            criteria: [
                "≥50% of wells are unsafe (>50 ppb)",
                "Fewer than 5 safe wells (≤10 ppb)",
                "<3 government deep wells",
            ],
            priority: "🚨 High-Risk / Urgent action",
        },
        {
            tier: "Tier 2",
            criteria: [
                "Majority of wells are in the 10–50 ppb range",
                "At least 10% are safe (≤10 ppb)",
                "At least 5 safe government wells installed",
            ],
            priority: "⚠️ Moderate / Manage safe sources",
        },
        {
            tier: "Tier 3",
            criteria: [
                "≥80% of wells are safe (≤10 ppb)",
                "Wells include a range of deeper safe sources (>450 ft)",
            ],
            priority: "✅ Low-Risk / Monitoring only",
        },
    ];

    return (
        <Box
            maxWidth="1200px"
            mx="auto"
            px={2}
        >
            <LaunchPageCard>
                <img
                    src={`/launch-event-banner.png`}
                    alt="Launch Event Banner"
                />

                <Box width='675px'>
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

                <Stack direction='row' gap='20px'>
                    <Box width='55%'>
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

                    <Box width='35%'>
                        <img
                            width='450px'
                            src={`/ui-demo.png`}
                            alt="Launch Event UI Demo"
                        />
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
                    <TableContainer sx={{ width: 'max-content' }}>
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
        </Box>
    );
}