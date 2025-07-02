import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import EmailIcon from '@mui/icons-material/Email';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
// import LoginIcon from '@mui/icons-material/Login';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import PublicIcon from '@mui/icons-material/Public';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import { navigate } from 'wouter/use-browser-location';
import { SvgIconComponent } from '@mui/icons-material';
import { Avatar, Button, keyframes, Stack, Typography } from '@mui/material';
import { useLanguage } from '../../utils/useLanguage';
import TranslatableText from '../TranslatableText';

interface props {
    open: boolean;
    setOpen: (open: boolean) => void;
    role: 'admin' | 'user' | undefined;
}

function NavListItem(
    { path, label, Icon }: {
        path: string;
        label: JSX.Element;
        Icon: SvgIconComponent;
    }
): JSX.Element {
    const handleClick = () => {
        if (path.startsWith('mailto:')) {
            window.location.href = path;
        } else {
            navigate(`/${path}`);
        }
    };
    return (
        <ListItem key={path}>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
                <ListItemText primary={label} />
            </ListItemButton>
        </ListItem>
    );
}

const shine = keyframes`
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 200% 50%;
    }
`;

export default function NavMenu({ open, setOpen, role }: props): JSX.Element {
    const { setLanguage } = useLanguage();

    return (
        <Drawer open={open} onClose={() => setOpen(false)}>
            <Box sx={{ width: 300 }} onClick={() => setOpen(false)}>
                <List>
                    <ListItem key='launch-event'>
                        <Box
                            sx={{
                                p: '2px',
                                borderRadius: '12px',
                                background: 'linear-gradient(270deg, #00ffcc, #ff00cc, #00ffcc)',
                                backgroundSize: '400% 400%',
                                animation: `${shine} 18s ease-in-out infinite alternate`,
                                height: '100%',
                                width: '100%',
                            }}
                            onClick={() => navigate(`/launch-event`)}
                        >
                            <Box
                                sx={{
                                    backgroundColor: 'background.paper',
                                    borderRadius: '10px',
                                    margin: '1px',
                                }}
                            >
                                <ListItemButton sx={{ padding: '20px' }}>
                                    <ListItemIcon>
                                        <RocketLaunchIcon />
                                    </ListItemIcon>
                                    <ListItemText 
                                        primary={
                                            <TranslatableText
                                                english="Launch Event"
                                                bengali="লঞ্চ ইভেন্ট"
                                                variant="body1"
                                            />
                                        }
                                    />
                                </ListItemButton>
                            </Box>
                        </Box>
                    </ListItem>

                    <NavListItem
                        path='landing'
                        Icon={AccountCircleIcon}
                        label={<TranslatableText english="Landing" bengali="ল্যান্ডিং" variant="body1" />}
                    />
                    <NavListItem
                        path='briefing'
                        Icon={InfoIcon}
                        label={<TranslatableText english="Briefing" bengali="ব্রিফিং" variant="body1" />}
                    />
                    <NavListItem
                        path='privacy-policy'
                        Icon={PrivacyTipIcon}
                        label={<TranslatableText english="Privacy Policy" bengali="গোপনীয়তা নীতি" variant="body1" />}
                    />
                    <NavListItem
                        path='understanding-risk'
                        Icon={HealthAndSafetyIcon}
                        label={<TranslatableText english="Understanding Risk" bengali="ঝুঁকি বোঝা" variant="body1" />}
                    />
                    <NavListItem
                        path='map'
                        Icon={FmdGoodIcon}
                        label={<TranslatableText english="Maps" bengali="মানচিত্র" variant="body1" />}
                    />
                    {/* <NavListItem
                        path='login'
                        Icon={LoginIcon}
                        label={<TranslatableText english="Login" bengali="লগইন করুন" variant="body1" />}
                    /> */}
                    <ListItem key='powerbi-dash'>
                        <ListItemButton onClick={() => {
                            window.open(
                                'https://app.powerbi.com/view?r=eyJrIjoiMjA0NWJiMjAtOWNjNi00MzBkLWI2ZjQtYTgyY2I5YzI2M2JmIiwidCI6IjAwNTIzMDdjLTU2NGQtNGZkYy05ODc5LTVhNDQ2Y2Y2Yzc0NiIsImMiOjh9', 
                                '_blank',
                            )?.focus()
                        }}>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText 
                                primary={
                                    <TranslatableText
                                        english='ARRP DataViewer'
                                        bengali='ARRP DataViewer'
                                        variant='body1'
                                    />
                                } 
                            />
                        </ListItemButton>
                    </ListItem>
                    <NavListItem
                        path="mailto:contact@iarsenic.com"
                        Icon={EmailIcon}
                        label={
                            <TranslatableText
                                english="Get in touch"
                                bengali="আমাদের ইমেইল করুন"
                                variant="body1"
                            />
                        }
                    />

                </List>

                {role && (
                    <>
                        <Divider />
                        <List>
                            <NavListItem 
                                path='profile' 
                                Icon={AccountCircleIcon} 
                                label={<TranslatableText english='My Profile' bengali="আমার প্রোফাইল" variant='body1' />}
                            />
                            <NavListItem
                                path='my-wells'
                                Icon={LocalDrinkIcon}
                                label={<TranslatableText english="My Wells" bengali="আমার কূপসমূহ" variant="body1" />}
                            />
                        </List>
                    </>
                )}

                {role === 'admin' && (
                    <>
                        <Divider />
                        <TranslatableText
                            english='Admins Only'
                            bengali='PLACEHOLDER BENGALI'
                            variant='h6'
                        />
                        <List>
                            <NavListItem 
                                path='all-users' 
                                Icon={GroupsIcon}
                                label={<TranslatableText english='All Users' bengali="সকল ব্যবহারকারী" variant='body1' />}
                            />
                            <NavListItem 
                                path='all-wells' 
                                Icon={PublicIcon}
                                label={<TranslatableText english='All Wells' bengali="সকল নলকূপ" variant='body1' />}
                            />
                        </List>
                    </>
                )}

                <Divider />
                <TranslatableText
                    ml={2}
                    my={2}
                    english='Select Language' 
                    bengali='ভাষা নির্বাচন করুন' // chatgpt generated
                    variant='h6'
                />

                <Stack direction='column'>
                    <Stack
                        direction='row'
                        alignItems='center'
                        ml={2}
                        columnGap={3}
                        onClick={() => setLanguage('english')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Button
                            startIcon={
                                <Avatar
                                    sx={{ height: '100%', width: '4rem', borderRadius: '8px' }}
                                    src={`/british.png`}
                                />
                            }
                        />
                        <Typography>English</Typography>
                    </Stack>

                    <Stack
                        direction='row'
                        alignItems='center'
                        ml={2}
                        columnGap={3}
                        onClick={() => setLanguage('bengali')}
                        sx={{ cursor: 'pointer' }}
                    >
                        <Button
                            startIcon={
                                <Avatar
                                    sx={{ height: '100%', width: '4rem', borderRadius: '8px' }}
                                    src={`/bangladesh.jpg`}
                                />
                            }
                        />
                        <Typography>বাংলা</Typography>
                    </Stack>
                </Stack>
            </Box>
        </Drawer>
    );
}
