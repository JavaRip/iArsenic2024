import { useState, useRef, useCallback } from 'react';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Slider,
    Stack,
    Typography,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import PageCard from '../../components/PageCard';
import TranslatableText from '../../components/TranslatableText';
import { User } from '../../models';
import { useAuth } from '../../hooks/useAuth/useAuth';
import { useUsers } from '../../hooks/useUsers/useUsers';
import { navigate } from 'wouter/use-browser-location';

async function getCroppedImg(imageSrc: string, pixelCrop: Area): Promise<File> {
    const image = new Image();
    image.src = imageSrc;
    await new Promise<void>((resolve) => {
        image.onload = () => resolve();
    });
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(
        image,
        pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
        0, 0, pixelCrop.width, pixelCrop.height,
    );
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) { reject(new Error('Canvas is empty')); return; }
            resolve(new File([blob], 'avatar.jpg', { type: 'image/jpeg' }));
        }, 'image/jpeg', 0.9);
    });
}

interface Props {
    user: User;
    setEditMode: (editMode: boolean) => void;
}

export default function ProfileCard({ user, setEditMode }: Props): JSX.Element {
    const logout = useAuth().logout;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [rawFile, setRawFile] = useState<File | null>(null);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const { updateProfileImage } = useUsers();
    const uploadMutation = updateProfileImage(fileInputRef, setRawFile);

    const initials = user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    function handleAvatarClick() {
        fileInputRef.current?.click();
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        setRawFile(file);
        const reader = new FileReader();
        reader.onload = () => setImageSrc(reader.result as string);
        reader.readAsDataURL(file);
    }

    const onCropComplete = useCallback((_: Area, pixels: Area) => {
        setCroppedAreaPixels(pixels);
    }, []);

    async function handleCropConfirm() {
        if (!imageSrc || !croppedAreaPixels) return;
        const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels);
        uploadMutation.mutate({ userId: user.id, file: croppedFile });
        setImageSrc(null);
    }

    function handleCropCancel() {
        setImageSrc(null);
        setRawFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }

    async function handleLogout() {
        try {
            await logout.mutateAsync();
            navigate('/landing');
            location.reload();
        } catch (err) {
            console.error('Logout failed', err);
        }
    }

    return (
        <Box width='100%'>
            <TranslatableText
                width='100%'
                textAlign='center'
                variant='h4'
                mb='1.5rem'
                english='Profile'
                bengali='প্রোফাইল'
            />

            {/* Avatar with upload overlay */}
            <Stack alignItems='center' mb={3}>
                <Box position='relative' display='inline-block'>
                    <Avatar
                        src={user.avatarUrl}
                        sx={{ width: 96, height: 96, fontSize: '2rem', cursor: 'pointer' }}
                        onClick={handleAvatarClick}
                    >
                        {!user.avatarUrl && initials}
                    </Avatar>
                    <IconButton
                        size='small'
                        onClick={handleAvatarClick}
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            bgcolor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            '&:hover': { bgcolor: 'action.hover' },
                        }}
                    >
                        <CameraAltIcon fontSize='small' />
                    </IconButton>
                </Box>

                <Typography variant='h6' mt={1.5}>{user.name}</Typography>
                <Typography variant='body2' color='text.secondary'>{user.email}</Typography>
            </Stack>

            <input
                ref={fileInputRef}
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />

            {/* Crop dialog */}
            <Dialog open={!!imageSrc} fullWidth maxWidth='sm'>
                <DialogTitle>
                    <TranslatableText
                        width='100%'
                        variant='body1'
                        english='Crop Profile Photo'
                        bengali='প্রোফাইল ছবি ক্রপ করুন'
                    />
                </DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    {imageSrc && (
                        <Box position='relative' width='100%' height={320} bgcolor='black'>
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape='round'
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </Box>
                    )}
                    <Box px={3} py={2}>
                        <Typography variant='body2' gutterBottom>Zoom</Typography>
                        <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.05}
                            onChange={(_, v) => setZoom(v as number)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCropCancel}>
                        <TranslatableText
                            width='100%'
                            variant='body1'
                            english='Cancel'
                            bengali='বাতিল'
                        />
                    </Button>
                    <Button
                        variant='contained'
                        onClick={handleCropConfirm}
                        disabled={uploadMutation.isPending}
                    >
                        <TranslatableText
                            width='100%'
                            variant='body1'
                            english='Apply'
                            bengali='প্রয়োগ করুন'
                        />
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Info card */}
            <PageCard>
                <TranslatableText
                    width='100%'
                    variant='body1'
                    english={<><strong>Email Verified: </strong>{user.emailVerified ? 'Yes' : 'No'}</>}
                    bengali={<><strong>ইমেইল যাচাই: </strong>{user.emailVerified ? 'হ্যাঁ' : 'না'}</>}
                />
                <TranslatableText
                    width='100%'
                    variant='body1'
                    english={<><strong>Account Type: </strong>{user.type === 'admin' ? 'Admin' : 'User'}</>}
                    bengali={<><strong>অ্যাকাউন্টের ধরন: </strong>{user.type === 'admin' ? 'প্রশাসক' : 'ব্যবহারকারী'}</>}
                />
                <TranslatableText
                    width='100%'
                    variant='body1'
                    english={
                        <>
                            <strong>Member Since: </strong>{user.createdAt.toLocaleString('en-GB', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                            })}
                        </>
                    }
                    bengali={
                        <>
                            <strong>সদস্যতার তারিখ: </strong>{user.createdAt.toLocaleString('bn-BD', {
                                year: 'numeric',
                                month: 'short',
                                day: '2-digit',
                            })}
                        </>
                    }
                />
                <TranslatableText
                    width='100%'
                    variant='body1'
                    english={<><strong>Language: </strong>{user.language === 'bengali' ? 'Bengali' : 'English'}</>}
                    bengali={<><strong>ভাষা: </strong>{user.language === 'bengali' ? 'বাংলা' : 'ইংরেজি'}</>}
                />
                <TranslatableText
                    width='100%'
                    variant='body1'
                    english={<><strong>Units: </strong>{user.units === 'meters' ? 'Meters' : 'Feet'}</>}
                    bengali={<><strong>একক: </strong>{user.units === 'meters' ? 'মিটার' : 'ফুট'}</>}
                />

                <Stack width='100%' direction='row' justifyContent='space-between' mt={2}>
                    <Button
                        variant='outlined'
                        startIcon={<CreateIcon />}
                        onClick={() => setEditMode(true)}
                    >
                        <TranslatableText
                            width='100%'
                            variant='body1'
                            english='Settings'
                            bengali='সেটিংস'
                        />
                    </Button>

                    <Button
                        variant='outlined'
                        color='error'
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                    >
                        <TranslatableText
                            width='100%'
                            variant='body1'
                            english='Logout'
                            bengali='লগআউট'
                        />
                    </Button>
                </Stack>
            </PageCard>
        </Box>
    );
}

