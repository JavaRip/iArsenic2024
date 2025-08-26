import { CardMedia, Stack, Typography, Avatar, Box } from "@mui/material";
import PageCard from "../../components/PageCard";
import { navigate } from "wouter/use-browser-location";

interface BlogListItemProps {
  title: string,
  summary: string,
  date: string | Date,
  path: string,
  coverImage: { src: string; alt: string },
  authorImage: { src: string; alt: string },
  authorName: string,
};

function formatDate(d: string | Date) {
  const date = new Date(d);
  return date.toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "2-digit" });
}

export function BlogListItem({
    title,
    summary,
    date,
    coverImage,
    authorImage,
    authorName,
}: BlogListItemProps) {
    return (
        <PageCard expandable='900px'>
            <Box
                onClick={() => navigate('/blog/launch-event')}
                sx={{ cursor: 'pointer' }}
            >
                <Stack 
                    direction='row'
                    width='100%' 
                    mb='32px'
                    mt='16px'
                    sx={{ 
                        justifyItems: 'cetner',
                        alignItems: 'center',
                    }}
                >
                    <Avatar 
                        src={authorImage.src} 
                        alt={authorImage.alt}
                        sx={{ 
                            height: '80px', 
                            width: '80px', 
                            mx: '8px',
                        }}
                    />

                    <Typography variant='h5' mr='16px'>{authorName}</Typography>

                    <Typography variant='h5' color="text.secondary">
                        {formatDate(date)}
                    </Typography>
                </Stack>

                <CardMedia
                    component="img"
                    height="480"
                    image={coverImage.src}
                    alt={coverImage.alt || title}
                />

                <Stack spacing={4} mt='16px'>
                    <Typography 
                        variant='h5'
                        alignContent='center' 
                        textAlign='center'
                        mt={2}
                    >
                        {title}
                    </Typography>

                    <Typography>
                        {summary}
                    </Typography>
                </Stack>
            </Box>
        </PageCard>
    );
}