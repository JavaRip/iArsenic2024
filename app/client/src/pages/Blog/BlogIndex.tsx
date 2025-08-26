import TranslatableText from "../../components/TranslatableText";
import { BlogList } from "./BlogList";
import { BlogListItem } from "./BlogListItem";

export default function Briefing(): JSX.Element {
    return (
        <>
            <TranslatableText
                english='The iArsenic Blog'
                bengali=''
                mb='1rem'
                variant='h4'
                textAlign='center'
            />

            <BlogList>
                <BlogListItem
                    title='Empowering Safe Water Access: iArsenic App & ARRP DataViewer Officially Launches in Dhaka'
                    summary='On 1st July 2025, a milestone event was held at the Department of Public Health and Engineering (DPHE) Auditorium in Dhaka to mark the official launch of the iArsenic App and the ARRP DataViewer Dashboard.'
                    coverImage={{
                        src: '/blog/launch-event/cover.jpeg',
                        alt: 'Launch Event',
                    }}
                    date={new Date('2025/08/26')}
                    path='launch-event'
                    authorImage={{
                        src: '/contributors/Mo_Hoque.jpg',
                        alt: 'Dr Mo Hoque',
                    }}
                    authorName='Dr Mohammad Hoque'
                />
            </BlogList>
        </>
    );
}