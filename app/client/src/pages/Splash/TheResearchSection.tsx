import { Box, Stack } from '@mui/material';
import TranslatableText from '../../components/TranslatableText';
import { sectionFontStyle } from './Splash';

const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '2rem',
    textAlign: 'center',
    color: 'white',
    overflow: 'hidden',
    rowGap: '3rem',
    position: 'relative',
};

export default function TheResearchSection(): JSX.Element {
    return (
        <Box 
            sx={{ 
                ...sectionStyle, 
                backgroundColor: 'cornflowerblue',
            }} 
            px={{ 
                xs: 1, 
                sm: 1, 
                md: 4,
            }}>
            <TranslatableText 
                variant='h3'
                english='The Research' 
                bengali='গবেষণা'
            />

            <Stack
                direction={{
                    xs: 'column',
                    sm: 'column',
                    md: 'column',
                    lg: 'row-reverse',
                }}
                alignItems='center'
                justifyContent='center'
            >
                <Box maxWidth={{ md: '100%', lg: '50%' }}>
                    <TranslatableText 
                        variant='h5'
                        sx={{ ...sectionFontStyle }}
                        english={`
                            iArsenic is built on decades of groundwater research and collective scientific understanding. The app uses simple, easy-to-observe inputs — such as well depth, location, and platform staining — to estimate whether a tubewell is likely safe.
                        `}
                        bengali={<>
                            iArsenic অ্যাপটি বহু বছরের গবেষণা এবং বিজ্ঞানীদের যৌথ জ্ঞান ও অভিজ্ঞতার ভিত্তিতে তৈরি হয়েছে। এই অ্যাপটি সহজ কিছু তথ্য — যেমন টিউবওয়েলের গভীরতা, অবস্থান, এবং প্ল্যাটফর্মে থাকা দাগের রং — ব্যবহার করে একটি টিউবওয়েল নিরাপদ কি না তা অনুমান করে।
                            {/* <strong>চিত্র ১</strong> নলকূপের চৌকাঠ ও ব্যবহৃত বাসনপত্রে যে দাগ পড়ে, তার রঙ দেখে ভূগর্ভস্থ ভূতত্ত্ব ও রাসায়নিক অবস্থার ইঙ্গিত পাওয়া যায়।
                            <strong>(বাঁ পাশের ছবি)</strong> কালো দাগ সাধারণত ভূগর্ভস্থ পানিতে ম্যাঙ্গানিজ অক্সাইড জমে তৈরি হয় এবং এটি নির্দেশ করে যে ঐ নলকূপে আর্সেনিক নেই বা খুবই কম।
                            <strong>(ডান পাশের ছবি)</strong> লালচে দাগ পানিতে লৌহ অক্সাইডের উপস্থিতির কারণে দেখা যায় এবং এটি ইঙ্গিত দেয় যে ঐ নলকূপে আর্সেনিক থাকতে পারে, বিশেষ করে যদি নলকূপটি অগভীর হয় (মাটির নিচে ১০০ মিটারের কম গভীরতায়) এবং আর্সেনিক-প্রবণ অঞ্চলে অবস্থান করে।
                            (ছবিগুলো পশ্চিম-মধ্য বাংলাদেশের, প্রকল্প পরিচালকের তোলা।) */}
                        </>}
                    />

                    <TranslatableText
                        variant='h5'
                        sx={{ ...sectionFontStyle }}
                        english={`
                            Over time, scientists working across Bangladesh and other arsenic-affected regions have uncovered important patterns in groundwater quality. Deep wells — typically deeper than 150 metres — are often arsenic-safe, especially in the south of the country. In the north, arsenic tends to be less widespread, and safe water can sometimes be found at shallower depths. There are also places where arsenic-safe water occurs in isolated pockets, even at intermediate depths.
                        `}
                        bengali={`
                            বাংলাদেশসহ আর্সেনিক-প্রবণ অনেক অঞ্চলে কাজ করা বিজ্ঞানীরা পানির গুণগত মান নিয়ে কয়েকটি গুরুত্বপূর্ণ বৈজ্ঞানিক ধারা খুঁজে পেয়েছেন। সাধারণভাবে, ১৫০ মিটার বা তার চেয়ে গভীর টিউবওয়েলগুলো বেশি নিরাপদ, বিশেষ করে বাংলাদেশের দেশের দক্ষিণাঞ্চলে। উত্তরাঞ্চলে আর্সেনিকের মাত্রা তুলনামূলকভাবে কম, এবং অনেক সময় তুলনামূলক কম গভীরতাতেও নিরাপদ পানির উৎস পাওয়া যায়। কিছু এলাকায় আবার মাঝামাঝি গভীরতায় বিচ্ছিন্নভাবে নিরাপদ পানির স্তরও পাওয়া যায়।
                        `}
                    />

                    <TranslatableText
                        variant='h5'
                        sx={{ ...sectionFontStyle }}
                        english={`
                            These patterns are not obvious to the eye, but they leave a signature in the data. The iArsenic app combines these global and regional insights with field observations, feeding them into a cloud-based AI model trained on millions of test results. This allows the app to instantly make location-specific estimate risk — giving people guidance that’s grounded in science, even when no chemical test is available.
                        `}
                        bengali={`
                            এই ধরণগুলো চোখে দেখা যায় না, তবে ডেটার মধ্যে এগুলোর স্পষ্ট ছাপ থাকে। iArsenic অ্যাপটি এই ধরণের সার্বজনীন ও আঞ্চলিক ধরণগুলো মাঠপর্যায়ের তথ্যের সঙ্গে একত্র করে, এবং সেগুলোকে ক্লাউড-ভিত্তিক একটি কৃত্রিম বুদ্ধিমত্তা (AI) মডেলের মাধ্যমে বিশ্লেষণ করে। এই মডেলটি লক্ষ লক্ষ আর্সেনিক পরীক্ষার ফলাফলের ওপর প্রশিক্ষিত। এর ফলে, কোনো রাসায়নিক পরীক্ষা ছাড়াই এটি একটি নির্দিষ্ট অবস্থানের জন্য তাৎক্ষণিক ঝুঁকির অনুমান দিতে পারে — যা মানুষের নিরাপদ পানি বেছে নেওয়ার সিদ্ধান্তকে বিজ্ঞানসম্মতভাবে সহায়তা করে।
                        `}
                    />

                    <TranslatableText
                        variant='h5'
                        sx={{ ...sectionFontStyle }}
                        english={`
                            How iArsenic Works: Field inputs — such as depth, location, and staining — are processed in the cloud using artificial intelligence and past arsenic data. The system then returns a clear, colour-coded risk estimate to the user — empowering communities with instant, science-backed guidance.
                        `}
                        bengali={`
                            iArsenic কীভাবে কাজ করে: মাঠপর্যায়ের ইনপুট — যেমন টিউবওয়েলের গভীরতা, অবস্থান, এবং প্ল্যাটফর্মে থাকা দাগের রং — ক্লাউড-ভিত্তিক একটি AI মডেলের মাধ্যমে বিশ্লেষণ করা হয়। পূর্বের পরীক্ষার ডেটার সাথে মিলিয়ে, এটি ব্যবহারকারীকে রঙের মাধ্যমে স্পষ্টভাবে ঝুঁকির মাত্রা জানিয়ে দেয় — ফলে কমিউনিটিগুলো মুহূর্তেই সিদ্ধান্ত নিতে পারে।
                        `}
                    />
                </Box>

                <Box mx={{ xs: 1, sm: 1, md: 4 }}>
                    <img
                        style={{
                            maxWidth: '100%',
                            maxHeight: '50rem',
                            height: 'auto',
                            borderRadius: '15px',
                        }}
                        src='/scientists-society.png'
                        alt='Project Concept Diagram'
                    />
                </Box>
            </Stack>

            <Stack
                direction={{
                    xs: 'column',
                    sm: 'column',
                    md: 'column',
                    lg: 'row',
                }}
                alignItems='center'
                justifyContent='center'
            >
                <Box maxWidth={{ md: '100%', lg: '50%' }}>
                    <TranslatableText
                        variant='h5'
                        sx={{ ...sectionFontStyle }}
                        english={`
                            When you're at a tubewell, one thing you can look for is the colour of stains on the platform, as shown in these photos. This kind of visual clue about underground water conditions was first observed by UCL Professor John McArthur in West Bengal. In the left photo, black staining from manganese oxide suggests that the well is likely arsenic-free. In the right photo, red or yellow staining from iron oxide may indicate the presence of arsenic, especially in shallow wells. (Photos by the PI, west-central Bangladesh.)
                        `}
                        bengali={`
                            যখন আপনি কোনো টিউবওয়েলের পাশে থাকবেন, তখন প্ল্যাটফর্মে থাকা দাগের রঙ লক্ষ্য করুন — উপরের ছবিগুলোতে যেমন দেখা যাচ্ছে। মাটির নিচের পানির গুনগত অবস্থার এমন চিহ্ন প্রথম নজরে আনেন বিশ্ববিদ্যালয়-এর অধ্যাপক জন ম্যাকআর্থার, যিনি পশ্চিমবঙ্গে এটি লক্ষ্য করেন। বাম ছবিতে, কালো দাগটি ম্যাঙ্গানিজ অক্সাইড থেকে এসেছে, যা ইঙ্গিত দেয় যে ঐ টিউবওয়েলের পানি সম্ভবত আর্সেনিকমুক্ত। ডান ছবিতে, লাল বা হলদে দাগ দ্রবীভূত লোহা থেকে তৈরি অক্সাইডের কারণে হয়েছে, যা বিশেষ করে অগভীর টিউবওয়েলে আর্সেনিক থাকার সম্ভাবনা নির্দেশ করে। (ছবি: প্রকল্প পরিচালক কর্তৃক বাংলাদেশের পশ্চিমাঞ্চল থেকে তোলা)
                        `}
                    />
                </Box>

                <Box mx={{ xs: 1, sm: 1, md: 4 }}>
                    <img
                        style={{
                            maxWidth: '100%',
                            maxHeight: '50rem',
                            height: 'auto',
                            borderRadius: '15px',
                        }}
                        src='/splashPage/red_vs_black_staining.jpg'
                        alt='Image showing red and black staining on a well platform'
                    />
                </Box>

            </Stack>
        </Box>
    );
}

