import { Box, Button, Card, CircularProgress, Stack, Typography } from "@mui/material";
import PageCard from "../../../components/PageCard";
import TranslatableText from "../../../components/TranslatableText";
import PhotoItem from "../../../components/PhotoItem";
import { useWells } from "../../../hooks/useWells/useWells";
import { useRef, useState } from "react";
import ImageIcon from '@mui/icons-material/Image';
import extractPathFromSignedUrl from "../../../utils/extractPathFromSignedUrl";
import { useAuth } from "../../../hooks/useAuth/useAuth";
import { Well } from "../../../models";

export default function PhotoCard(
    {
        well,
    }: {
        well: Well,
    }
): JSX.Element {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);

    const { getImages, addImage, deleteImage } = useWells();

    const auth = useAuth();
    const { data: token, isLoading: tokenLoading } = auth.getAccessToken;

    const {
        mutate: deleteImageMutation,
        isPending: deleteImagePending,
        isError: deleteImageIsError,
        error: deleteImageError,
    } = deleteImage()

    const {
        mutate: addImageMutation,
        isPending: addImagePending,
        isError: addImageIsError,
        error: addImageError,
    } = addImage(fileInputRef, setFile)

    const {
        data: wellImages,
        isLoading: imagesLoading,
        isError: imagesIsError,
        error: imagesError,
    } = getImages(well.id);

    if (
        imagesLoading ||
        deleteImagePending ||
        tokenLoading
    ) {
        return (
            <PageCard>
                <CircularProgress />
            </PageCard>
        );
    }

    if (
        addImageIsError ||
        imagesIsError ||
        deleteImageIsError
    ) {
        console.error(addImageError)
        console.error(imagesError)
        console.error(deleteImageError)

        return (
            <Stack>
                <Typography>Error loading page data</Typography>
            </Stack>
        );
    }

    return (
        <PageCard>
            <TranslatableText
                variant="h4"
                english="Well Images"
                bengali="নলকূপের ছবি" // chatgpt generated
            />

            {wellImages!.length === 0 ? (
                <TranslatableText
                    color="text.secondary"
                    english='No images uploaded.'
                    bengali="কোনো ছবি আপলোড করা হয়নি।" // chatgpt generated
                />
            ) : (
                <Box
                    flexWrap="wrap"
                    gap="1rem"
                    display="flex"
                    justifyContent="center"
                >
                    {wellImages!.map((url, i) => (
                        <PhotoItem
                            key={url}
                            url={url}
                            index={i}
                            deletable={token!.userId !== 'guest' && token!.userId === well.userId}
                            onDelete={async () => {
                                const path = extractPathFromSignedUrl(url)
                                deleteImageMutation({ wellId: well.id, path })
                            }}
                        />
                    ))}
                </Box>
            )}

            {token!.userId === well.userId && (
                <Card
                    variant="outlined"
                    sx={{
                        width: '100%',
                        padding: '24px',
                        marginBottom: '16px',
                        borderWidth: 2,
                    }}
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        gap={2}
                    >
                        <input
                            type="file"
                            accept="image/*"
                            capture="environment"
                            onChange={(e) => {
                                setFile(e.target.files?.[0] || null)
                            }}
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            id="image-upload"
                        />

                        <label htmlFor="image-upload">
                            <Button
                                variant="outlined"
                                component="span"
                                startIcon={<ImageIcon />}
                                sx={{
                                    borderColor: "#4caf50",
                                    color: "#4caf50",
                                    fontWeight: 'bold',
                                    padding: "12px 24px",
                                    '&:hover': {
                                        borderColor: "#388e3c",
                                        backgroundColor: "#e8f5e9",
                                    },
                                }}
                            >
                                Select Image
                            </Button>
                        </label>

                        {file && (
                            <Typography variant='subtitle2'>
                                {file.name}
                            </Typography>
                        )}

                        <Button
                            variant="contained"
                            onClick={() => {
                                if (file != null) {
                                    addImageMutation({ wellId: well.id, file })
                                }
                            }}
                            disabled={
                                !file ||
                                addImagePending ||
                                wellImages!.length >= 5
                            }
                            sx={{
                                width: "100%",
                                height: "3.5rem",
                                fontWeight: 'bold',
                                backgroundColor: "#4caf50",
                                '&:hover': {
                                    backgroundColor: "#388e3c",
                                }
                            }}
                        >
                            <TranslatableText
                                variant='body1'
                                english={
                                    wellImages!.length >= 5
                                    ? "Max images reached"
                                    : addImagePending
                                        ? "Uploading..."
                                        : "Upload"
                                }
                                bengali={
                                    wellImages!.length >= 5
                                    ? "সর্বোচ্চ সংখ্যক ছবি আপলোড করা হয়েছে"
                                    : addImagePending
                                        ? "আপলোড হচ্ছে..."
                                        : "আপলোড করুন"
                                } // chatgpt generated
                            />
                        </Button>
                    </Box>
                </Card>
            )}
        </PageCard>
    )
}