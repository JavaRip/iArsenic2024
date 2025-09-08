import { Box, Button, Card, Divider, Link, List, ListItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ReactNode } from "react";
import { schedule } from "./schedule";
import { recommendtations } from "./recommendations";
import EmailIcon from '@mui/icons-material/Email';

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
            <Typography variant='h3' textAlign='center' mb={4}>
                Empowering Safe Water Access: iArsenic App & ARRP DataViewer Dashboard Officially Launched in Dhaka
            </Typography>

            <LaunchPageCard>
                <img
                    src={`/launch-event-banner.png`}
                    alt="Launch Event Banner"
                    width='100%'
                />

                <Stack alignItems='center' width='100%' my='32px'>
                    <Typography mb={2}>
                        On 1 July 2025, a milestone event was held at the Department of Public Health Engineering (DPHE) Auditorium in Dhaka to mark the official launch of the iArsenic App and the ARRP DataViewer Dashboard. These tools aim to revolutionise arsenic risk screening in Bangladesh—a country where more than 20 million people still drink arsenic-contaminated water. The event was attended by a packed hall of engineers, scientists, NGO leaders, media professionals, and government officials. The Chief Guest was Md Rezaul Maksud Jahedi, Secretary of the Local Government Division, Government of Bangladesh.
                    </Typography>

                    <Typography mb={4}>
                        Organised by DPHE in collaboration with the University of Portsmouth, Curtin University, Imperial College London, and University of Dhaka, the launch event marked a new chapter in citizen-led environmental intelligence and cross-sector collaboration.
                    </Typography>

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
                <Typography variant='h4'>
                    🔍 What is iArsenic?
                </Typography>

                <Typography>
                    The <Link href='https://iarsenic.com'>iArsenic web application</Link> is a mobile-friendly tool that allows rural users to instantly assess the likely arsenic risk of their hand pump tubewells using just depth, location, and staining information—no lab tests required. Validated against field datawith 84% prediction accuracy, it empowers households to make informed water safety decisions.
                </Typography>
            </LaunchPageCard>

            <LaunchPageCard>
                <Typography variant='h4'>
                    📊 What Is the ARRP DataViewer?
                </Typography>

                <Typography>
                    The <Link href='https://app.powerbi.com/view?r=eyJrIjoiMjA0NWJiMjAtOWNjNi00MzBkLWI2ZjQtYTgyY2I5YzI2M2JmIiwidCI6IjAwNTIzMDdjLTU2NGQtNGZkYy05ODc5LTVhNDQ2Y2Y2Yzc0NiIsImMiOjh9'>ARRP Dashboard</Link> visualises over 6.5 million tubewell arsenic test results collected by DPHE between 2021 and 2023 under Arsenic Risk Reduction Project (ARRP). This interactive platform allows policymakers, NGOs, and local leaders to identify risk hotspots and plan infrastructure accordingly. It introduces a Tier-based mitigation strategy—prioritising high-risk zones for deeper interventions. Based on analysis of over 6.5 million wells, the dashboard identifies approximately 18,000 wards and villages as Tier 1 areas where people have very limited or no access to safe drinking water alternatives, and where the majority of current arsenic exposure is concentrated.
                </Typography>
            </LaunchPageCard>

            <LaunchPageCard>
                <Typography variant='h4'>
                    🗓️ Launch Event Highlights
                </Typography>

                <Typography>
                    The event, titled "Empowering Safe Water Access Through Data and Technology", featured a distinguished lineup of government leaders, academic partners, and technical innovators:
                </Typography>

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
                <Typography variant='h4'>
                    📷 Visual Glimpses from the Event 
                </Typography>

                <Stack>
                    <Typography variant='h5' mb={4}>
                        A packed hall of engineers, scientists, NGO leaders, and government officials
                    </Typography>

                    <Box alignSelf='center' width='80%' mb={4}>
                        <img 
                            src={`/blog/launch-event-blog/kane_speaking.jpg`}
                            alt="iArsenic Technical Lead Kane Swartz Speaking"
                            width='100%'
                        />
                    </Box>

                    <Box alignSelf='center' width='80%'>
                        <img 
                            src={`/blog/launch-event-blog/applaus.png`}
                            alt="Successful completion of demonstration applaus"
                            width='100%'
                        />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant='h5' mb={4}>
                        Interactive demonstration of the app and dashboardInteractive demonstration of the app and dashboard
                    </Typography>

                    <Box alignSelf='center' width='80%' mb={4}>
                        <img 
                            src={`/blog/launch-event-blog/applaus.png`}
                            alt="Successful completion of demonstration applaus"
                            width='100%'
                        />
                    </Box>

                    <Box alignSelf='center' width='80%'>
                        <img 
                            src={`/blog/launch-event-blog/mo_and_jahedi.png`}
                            alt="Rezaul maksud Jahedi Congratulating Dr Mohammad Hoque"
                            width='100%'
                        />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant='h5' mb={4}>
                        Group photo with the national and international collaborators
                    </Typography>

                    <Box alignSelf='center' width='80%'>
                        <img 
                            src={`/blog/launch-event-blog/event_group_photo.jpg`}
                            alt="Post event group photo"
                            width='100%'
                        />
                    </Box>
                </Stack>
            </LaunchPageCard>

            <LaunchPageCard>
                <Typography variant='h4'>
                    📰 Media Coverage
                </Typography>

                <Stack justifyContent='center' width='100%'>
                    <Link 
                        href='https://www.thedailystar.net/news/bangladesh/news/app-help-detect-arsenic-tubewells-3929626?'
                        width='100%'
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                    >
                        <Typography variant='h5' mb={4} width='100%'>
                            Article in The Daily Star
                        </Typography>

                        <Box width='80%' justifyContent='center'>
                            <img 
                                src={`/blog/launch-event-blog/daily_star.png`}
                                alt="Daily Star article webpage"
                                width='100%'
                            />
                        </Box>
                    </Link>

                    <Divider sx={{ my: 2 }} />

                    <Link
                        href='https://youtu.be/Q6eE2Xu4lO0'
                        width='100%'
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                    >
                        <Typography variant='h5' mb={4} width='100%'>
                            Independent TV Coverage
                        </Typography>

                        <Box width='80%'>
                            <img 
                                src={`/blog/launch-event-blog/television.png`}
                                alt="Coverage from local independent television station"
                                width='100%'
                            />
                        </Box>
                    </Link>

                    <Divider sx={{ my: 2 }} />

                    <Link
                        href='https://www.port.ac.uk/news-events-and-blogs/news/new-app-aims-to-end-arsenic-crisis-in-bangladeshs-water-supply-using-ai-and-local-knowledge'
                        width='100%'
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                    >
                        <Typography variant='h5' mb={4} width='100%'>
                            News Publication from The University of Portsmouth
                        </Typography>

                        <Box width='80%'>
                            <img 
                                src={`/blog/launch-event-blog/uop_news.png`}
                                alt="Article cover from The University of Portsmouth"
                                width='100%'
                            />
                        </Box>
                    </Link>
                </Stack>
            </LaunchPageCard>

            <LaunchPageCard>
                <Typography variant='h4'>
                    💡 Why This Matters
                </Typography>

                <Typography>
                    Despite decades of work, arsenic remains a <b>“silent killer”</b>—its symptoms often emerge slowly, and millions still rely on contaminated wells. The <b>iArsenic ecosystem</b> introduces <b>layered protection</b> by enabling:
                </Typography>

                <List>
                    <ListItem>
                        <Typography>
                            • Personal Risk Prediction
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography>
                            • Community Level Dashboard Planning
                        </Typography>
                    </ListItem>

                    <ListItem>
                        <Typography>
                            • Behavioural Change Nudges through Schools, Mosques and Health Workers
                        </Typography>
                    </ListItem>
                </List>

                <Typography>
                    These tools align with the Swiss Cheese Model of public health—where each layer compensates for the limitations of another.
                </Typography>

                <Box alignSelf='center'>
                    <img
                        src={`/cheese.png`}
                        alt="Multilayer Safety Model Diagram"
                        width='100%'
                    />

                    <Typography variant='body2' textAlign='center'>
                        These layers match the 8 actions listed brochure—each like a slice in the Swiss cheese model—working together to reduce risk.
                    </Typography>
                </Box>
            </LaunchPageCard>

            <LaunchPageCard>
                <Typography variant='h4'>
                    🤝 Who Can Use These Tools?
                </Typography>

                <Stack alignItems='center' width='100%'>
                    {recommendtations.map((row, index) => (
                        <Box 
                            key={index}
                            width='820px'
                            maxWidth='100%'
                            p='36px'
                            sx={{
                                backgroundColor: (index % 2 === 0) ?
                                    'rgb(235, 249, 244)' :
                                    'white'
                            }}
                        >
                            <Typography variant='h5' mb='0.5rem'>
                                {row.title}
                            </Typography>

                            <ul style={{ paddingLeft: 16, margin: 0 }}>
                                {row.recommendations.map((c, i) => (
                                    <li key={i}>
                                       <Typography>{c}</Typography>
                                    </li>
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
                <Typography variant='h4'>
                    📲 Try the App & Explore the Dashboard
                </Typography>

                <Stack width='100%' alignItems='center'>
                    <List>
                        <ListItem>
                            <Link href='https://iarsenic.com'>
                                <Button variant='outlined' sx={{ maxWidth: '90%', width: '400px', textTransform: 'none' }}>
                                    <Typography variant='h5'>
                                        🌐 iArsenic App →
                                    </Typography>
                                </Button>
                            </Link>
                        </ListItem>

                        <ListItem>
                            <Link href='https://app.powerbi.com/view?r=eyJrIjoiMjA0NWJiMjAtOWNjNi00MzBkLWI2ZjQtYTgyY2I5YzI2M2JmIiwidCI6IjAwNTIzMDdjLTU2NGQtNGZkYy05ODc5LTVhNDQ2Y2Y2Yzc0NiIsImMiOjh9'>
                                <Button variant='outlined' sx={{ maxWidth: '90%', width: '400px', textTransform: 'none' }}>
                                    <Typography variant='h5'>
                                        📈 ARRP DataViewer →
                                    </Typography>
                                </Button>
                            </Link>
                        </ListItem>
                    </List>
                </Stack>
            </LaunchPageCard>

            <LaunchPageCard>
                <Typography variant='h4'>
                    🔁 Share the Message
                </Typography>

                <Typography>
                    If you’re active on social media, especially in <b>Bangladesh</b>, help spread the word. Every share brings the message of <b>safe water</b> to more communities at risk.
                </Typography>

                <Button
                    sx={{ 
                        width: '30rem',
                        maxWidth: '90%',
                        height: '6rem',
                        marginTop: '1rem',
                        alignSelf: 'center',
                    }}
                    onClick={() => {
                        window.location.href = `mailto:contact@iarsenic.com?subject=Launch Event Blog Contact`
                    }}
                    variant='contained'
                    startIcon={<EmailIcon />}
                >
                    <Typography>
                        Get in touch!
                    </Typography>
                </Button>
            </LaunchPageCard>
        </Box>
    );
}