import { Button, useTheme } from '@mui/material';
import Section from './Section';
import CallToAction from './CallToAction';
import Credits from './Credits';
import { navigate } from 'wouter/use-browser-location';
import { useAccessToken } from '../../utils/useAccessToken';
import TranslatableText from '../../components/TranslatableText';
import MapSection from './MapSection';

const sectionFontStyle = {
    color: 'whitesmoke',
    textAlign: 'justify',
    m: 4,
    mb: '2rem',
};

export default function SplashPage(): JSX.Element {
    const { data: token } = useAccessToken()
    const theme = useTheme();

    function handleTryAppClick() {
        if (token) navigate(`/my-wells`);
        else navigate(`/landing`);
    }

    return (
        <>
            <CallToAction
                tryAppClick={handleTryAppClick}
            />

            <Section
                title={
                    <TranslatableText
                        variant='h3'
                        english='The History'
                        bengali='ইতিহাস'
                    />
                }
                texts={[
                    <TranslatableText
                        sx={{ ...sectionFontStyle }}
                        variant='h5'
                        english={`
                            Groundwater has long been an attractive source of drinking water in 
                            Bangladesh due to its low microbial content and ease of access without 
                            treatment. To avoid waterborne diseases, governments and NGOs promoted 
                            the installation of millions of hand-pump tubewells across the country. 
                            This approach led to the proliferation of over 10 million wells, but 
                            inadvertently exposed large segments of the population to arsenic, a 
                            naturally occurring contaminant. Over two decades, roughly 6.3 million 
                            wells have been chemically tested—first during the BAMWSP survey (2000–2005) 
                            and again in 2021–2023 under the government’s Arsenic Risk Reduction 
                            Project (ARRP). However, due to the limited lifespan of tubewells (~10 years) 
                            and ongoing well installations, many of the current wells remain untested or 
                            their results forgotten by users. While the proportion of wells exceeding 
                            the national arsenic standard (50 µg/L) dropped from 41% to 26% in this 
                            period, approximately 20 million people are still drinking unsafe water. 
                            This exposure has serious health consequences, including multi-system effects and cancers. 
                            Switching to a safe well remains the most practical mitigation strategy. 
                            However, targeted communication and data access remain critical barriers. 
                            Building on past research, we believe digital tools and geochemical modelling—like those 
                            underpinning the iArsenic platform—can now help address these enduring 
                            challenges and guide both households and policymakers toward safer water choices.
                        `}
                        bengali={`
                            বাংলাদেশে পানযোগ্য পানির উৎস হিসেবে ভূগর্ভস্থ পানি দীর্ঘদিন ধরেই জনপ্রিয়, কারণ এতে রোগ জীবাণুর পরিমাণ কম এবং এটি সহজেই সংগ্রহযোগ্য—প্রায়ই কোনো প্রক্রিয়াকরণ ছাড়াই ব্যবহার করা যায়। পানিবাহিত রোগ প্রতিরোধে সরকার ও বিভিন্ন এনজিও দেশব্যাপী লাখ লাখ হাত-পাম্প নলকূপ বসানোর উদ্যোগ নেয়। এর ফলে ১ কোটিরও বেশি নলকূপ স্থাপন হয়, কিন্তু অনিচ্ছাকৃতভাবে এর মাধ্যমে বহু মানুষ প্রাকৃতিকভাবে থাকা আর্সেনিকের ঝুঁকিতে পড়ে যায়।
                            গত দুই দশকে মোট প্রায় ১ কোটি নলকূপে রাসায়নিক পরীক্ষা করা হয়েছে—প্রথমবার BAMWSP প্রকল্পে (২০০০–২০০৫) এবং সাম্প্রতিকবার ২০২১–২০২৩ সালে সরকারের Arsenic Risk Reduction Project (ARRP) এর অধীনে। তবে যেহেতু একেকটি নলকূপের গড় আয়ু প্রায় ১০ বছর এবং নতুন নলকূপও নিয়মিত বসানো হচ্ছে, তাই বহু বর্তমান নলকূপ এখনো পরীক্ষা হয়নি বা আগের পরীক্ষার ফলাফল ব্যবহারকারীরা ভুলে গেছেন।
                            এই সময়ে, ৫০ মাইক্রোগ্রাম/লিটার মাত্রা অতিক্রম করা নলকূপের হার ৪১% থেকে কমে ২৬% হয়েছে, তবুও প্রায় ২ কোটি মানুষ এখনো ঝুঁকিপূর্ণ পানি পান করছেন। এই আর্সেনিক গ্রহণের ফলে শরীরের একাধিক অঙ্গে প্রভাব পড়ে এবং ক্যানসারের মতো মারাত্মক রোগও হতে পারে।
                            নিরাপদ নলকূপ থেকে পানি পানই এখনো সবচেয়ে বাস্তবসম্মত প্রতিকার হিসেবে বিবেচিত। তবে এই লক্ষ্যভিত্তিক তথ্য প্রচার এবং পরীক্ষার ফলাফল সাধারণ মানুষের কাছে পৌঁছানো এখনো বড় চ্যালেঞ্জ।
                            পূর্ববর্তী গবেষণার ভিত্তিতে, আমরা বিশ্বাস করি যে iArsenic-এর মতো ডিজিটাল টুল এবং ভূ-রসায়নভিত্তিক মডেলিং এই দীর্ঘস্থায়ী সমস্যাগুলোর সমাধানে গুরুত্বপূর্ণ ভূমিকা রাখতে পারে এবং পরিবার ও নীতিনির্ধারকদের আরও নিরাপদ পানির উৎস নির্ধারণে সহায়তা করতে পারে।
                        `}
                    />,
                ]}
                imageConfig={{
                    imageSide: 'right',
                    imageUrl: `/splashPage/well_with_chickens.jpg`,
                    imageAlt: 'Well With Chicken',
                }}
                backgroundColor={theme.palette.primary.dark}
                maxTextWidth='50%'
            />

            <Section
                title={
                    <TranslatableText 
                        variant='h3'
                        english='The Research' 
                        bengali='গবেষণা'
                    />
                }
                texts={[
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
                    />,
                    <TranslatableText
                        variant='h5'
                        sx={{ ...sectionFontStyle }}
                        english={`
                            Over time, scientists working across Bangladesh and other arsenic-affected regions have uncovered important patterns in groundwater quality. Deep wells — typically deeper than 150 metres — are often arsenic-safe, especially in the south of the country. In the north, arsenic tends to be less widespread, and safe water can sometimes be found at shallower depths. There are also places where arsenic-safe water occurs in isolated pockets, even at intermediate depths.
                        `}
                        bengali={`
                            বাংলাদেশসহ আর্সেনিক-প্রবণ অনেক অঞ্চলে কাজ করা বিজ্ঞানীরা পানির গুণগত মান নিয়ে কয়েকটি গুরুত্বপূর্ণ বৈজ্ঞানিক ধারা খুঁজে পেয়েছেন। সাধারণভাবে, ১৫০ মিটার বা তার চেয়ে গভীর টিউবওয়েলগুলো বেশি নিরাপদ, বিশেষ করে বাংলাদেশের দেশের দক্ষিণাঞ্চলে। উত্তরাঞ্চলে আর্সেনিকের মাত্রা তুলনামূলকভাবে কম, এবং অনেক সময় তুলনামূলক কম গভীরতাতেও নিরাপদ পানির উৎস পাওয়া যায়। কিছু এলাকায় আবার মাঝামাঝি গভীরতায় বিচ্ছিন্নভাবে নিরাপদ পানির স্তরও পাওয়া যায়।
                        `}
                    />,
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
                ]}
                imageConfig={{
                    imageUrl: `/splashPage/red_vs_black_staining.jpg`,
                    imageSide: 'left',
                    imageAlt: 'Image showing red and black staining on a well platform',
                }}
                backgroundColor='dimgray'
                maxTextWidth='50%'
            />

            <Section
                title={
                    <TranslatableText 
                        variant='h3'
                        english='The Vision' 
                        bengali='ভবিষ্যৎ পরিকল্পনা' // chatgpt generated
                    />
                }
                texts={[
                    <TranslatableText 
                        variant='h5'
                        sx={{ ...sectionFontStyle }}
                        english={`
                            How iArsenic Works: Field inputs — such as depth, location, and staining — are processed in the cloud using artificial intelligence and past arsenic data. The system then returns a clear, colour-coded risk estimate to the user — empowering communities with instant, science-backed guidance.
                        `}
                        bengali={`
                            iArsenic কীভাবে কাজ করে: মাঠপর্যায়ের ইনপুট — যেমন টিউবওয়েলের গভীরতা, অবস্থান, এবং প্ল্যাটফর্মে থাকা দাগের রং — ক্লাউড-ভিত্তিক একটি AI মডেলের মাধ্যমে বিশ্লেষণ করা হয়। পূর্বের পরীক্ষার ডেটার সাথে মিলিয়ে, এটি ব্যবহারকারীকে রঙের মাধ্যমে স্পষ্টভাবে ঝুঁকির মাত্রা জানিয়ে দেয় — ফলে কমিউনিটিগুলো মুহূর্তেই সিদ্ধান্ত নিতে পারে।
                        `}
                    />,
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
                ]}
                imageConfig={{
                    imageSide: 'right',
                    imageUrl: `/scientists-society.png`,
                    imageAlt: 'Project Concept Diagram',
                }}
                backgroundColor='cornflowerblue'
                maxTextWidth='50%'
            />

            <Section
                title={
                    <TranslatableText
                        variant='h3'
                        english='The Solution'
                        bengali='সমাধান'
                    />
                }
                texts={[
                    <TranslatableText
                        variant='h5'
                        sx={{ ...sectionFontStyle }}
                        english={`
                            We have reported that the presence or absence of arsenic in a tubewell can be assessed with >90% confidence using: staining of the tubewell platform (a geochemical indicator), the well depth, and street address (producing a 3D location indicator). People living in rural Bangladesh can identify the staining and generally will know the well-depth to sufficient accuracy. We have already utilised these observational indicators and a sample of a public tubewell arsenic-level dataset to develop a computer model. 
                        `}
                        bengali={`
                            আমরা দেখিয়েছি যে, একটি নলকূপে আর্সেনিক আছে কি না তা ৯০% এর বেশি নির্ভরযোগ্যতায় অনুমান করা যায় তিনটি তথ্য ব্যবহার করে:
                            ১) নলকূপের চৌকাঠে পড়া দাগ (একটি ভূ-রসায়নিক নির্দেশক),
                            ২) নলকূপের গভীরতা, এবং
                            ৩) রাস্তার ঠিকানা (যা মিলে একটি ৩-মাত্রিক অবস্থান নির্ধারণে সাহায্য করে)।
                            বাংলাদেশের গ্রামীণ মানুষেরা সহজেই দাগের রঙ চিনতে পারে এবং নলকূপের গভীরতা সাধারণত প্রায় ঠিকভাবে জানে।
                            আমরা ইতোমধ্যে এই পর্যবেক্ষণভিত্তিক তথ্য এবং একটি পাবলিক ডেটাসেটের নমুনা ব্যবহার করে একটি কম্পিউটার মডেল তৈরি করেছি যা নলকূপের আর্সেনিক মাত্রা অনুমান করতে পারে।
                            আমাদের প্রস্তাব হলো—এই মডেলটিকে আরও উন্নত করা, যাতে ব্যবহারকারীরা নতুন জায়গায় নলকূপের দাগের তথ্য (যেমন কালো বা লালচে) প্রদান করলে তা বিদ্যমান ডেটাসেটের সঙ্গে যুক্ত করে বিশ্লেষণ করা যায়।
                        `}
                    />,
                    <TranslatableText
                        variant='h5'
                        sx={{ ...sectionFontStyle }}
                        english={`
                            We propose to further extend the model to couple user-derived information (attested platform-staining in new locations) with available datasets. The existing prototype uses a small subset of the available data samples from over 4 million tubewells; in this project we would clean more data, focusing on identified gaps, especially where arsenic is a widespread problem. In effect, the project would provide, for the first time, an instant arsenic level assessment to tubewell owners.
                        `}
                        bengali={`
                            বর্তমানে ব্যবহৃত প্রোটোটাইপটি ৪ মিলিয়নেরও বেশি নলকূপের মধ্যে ছোট একটি ডেটাসেট নিয়ে কাজ করে। এই প্রকল্পের মাধ্যমে আমরা আরও ডেটা পরিষ্কার করব এবং বিশেষভাবে সেইসব এলাকার উপর গুরুত্ব দেব যেখানে আর্সেনিক একটি বড় সমস্যা।
                            এইভাবে, প্রকল্পটি নলকূপ মালিকদের জন্য প্রথমবারের মতো তাৎক্ষণিকভাবে আর্সেনিক ঝুঁকির মাত্রা মূল্যায়ন করার একটি উপায় প্রদান করবে। 
                        `}
                    />
                ]}
                imageConfig={{
                    imageUrl: `/splashPage/app_screenshot.png`,
                    imageSide: 'right',
                    imageAlt: 'Screenshot of iArsenic application',
                }}
                backgroundColor='#005a78'
                maxTextWidth='75%'
                imageBorderRadius='15px'
            />

            <MapSection
                title={
                    <TranslatableText
                        variant='h3'
                        english='Interactive Maps'
                        bengali='ইন্টারেক্টিভ মানচিত্র'
                    />
                }
                texts={[
                    <TranslatableText
                        variant='h5'
                        sx={{ ...sectionFontStyle, maxWidth: '100%' }}
                        english={`
                            User location data appear on an interactive map in real time. This dynamic map allows you to observe the current usage and adoption of the application, as well as the assessments provided by the app for various tubewells. The map features a colour-coded background indicating the general arsenic concentration levels across different areas, helping you identify regions with higher or lower levels of contamination. This visual tool enables a better understanding of arsenic risk distribution and the effectiveness of the app.
                        `}
                        bengali={`
                            রিয়েল-টাইমে একটি ইন্টারেক্টিভ মানচিত্রে ব্যবহারকারীর অবস্থান ডেটা প্রদর্শিত হবে । এই ক্রমাগত  হালনাগাত মানচিত্রটি আপনাকে অ্যাপ্লিকেশনের বর্তমান ব্যবহার এবং গ্রহণযোগ্যতা পর্যবেক্ষণ করতে দেয়, পাশাপাশি বিভিন্ন নলকূপের জন্য অ্যাপ দ্বারা প্রদত্ত মূল্যায়নগুলোও দেখায়। মানচিত্রের ব্যাকগ্রাউন্ড রং বিভিন্ন এলাকার সাধারণ আর্সেনিক স্তরের মাত্রা নির্দেশ করে, যা আপনাকে দূষণের উচ্চ বা নিম্ন স্তরের অঞ্চলগুলি চিহ্নিত করতে সাহায্য করবে। এই ভিজ্যুয়াল টুলটি আর্সেনিক ঝুঁকির বিতরণ এবং অ্যাপের কার্যকারিতা সম্পর্কে ধারনা দিতে সহায়তা করে।
                        `}
                    />
                ]}
                backgroundColor='#1d5e16'
                maxTextWidth='50%'
            />

            <Section
                title={
                    <TranslatableText
                        variant='h3'
                        english='The Bottom Line'
                        bengali='মূল কথা'
                    />
                }
                texts={[
                    <TranslatableText
                        variant='h5'
                        sx={{ ...sectionFontStyle }}
                        english={`
                            The iArsenic project will enable citizens to assess tubewell water quality without the need for expensive chemical testing kits or any specific training and knowledge.
                        `}
                        bengali={`
                            iArsenic প্রকল্পের মাধ্যমে সাধারণ মানুষ কোনো ব্যয়বহুল রাসায়নিক কিট বা বিশেষ প্রশিক্ষণ ছাড়াই নলকূপের পানির আর্সেনিক ঝুঁকি  যাচাই করতে পারবে।
                        `}
                    />,
                    <TranslatableText
                        variant='h5'
                        sx={{ ...sectionFontStyle }}
                        english={`
                            A conservative estimate is that the use of the fully developed application could bring clean water to few million people in a few years by encouraging well-switching. Also, this will help the government to save screening costs, adopt risk-based mitigation strategies for safeguarding health and wellbeing of the rural inhabitants and ultimately, for the country’s increased economic productivity.
                        `}
                        bengali={`
                            আমাদের অনুমান অনুযায়ী, সম্পূর্ণরূপে উন্নত এই অ্যাপ্লিকেশন কয়েক বছরের মধ্যে কয়েক মিলিয়ন মানুষকে নিরাপদ পানিতে স্থানান্তরিত হতে উৎসাহিত করবে ।  বিশুদ্ধ পানির নাগাল এনে দিতে পারবে।
                            এছাড়াও, এই প্রযুক্তি সরকারের পরীক্ষার খরচ বাঁচাতে, স্বাস্থ্যঝুঁকি-ভিত্তিক প্রতিকারমূলক কৌশল নিতে এবং গ্রামীণ জনগণের স্বাস্থ্য ও কল্যাণ নিশ্চিত করতে সহায়তা করবে—যা দেশের অর্থনৈতিক উৎপাদনশীলতা বৃদ্ধির পথেও ভূমিকা রাখবে।
                        `}
                    />
                ]}
                backgroundColor='#1e1e1e'
                maxTextWidth='70%'
                textAlign='center'
                appendage={
                    <Button
                        variant='contained'
                        color='primary'
                        sx={{ 
                            height: '6rem',
                            width: '24rem',
                            maxWidth: '80%',
                            padding: '1rem 2rem', 
                        }}
                        onClick={handleTryAppClick}
                    >
                        <TranslatableText 
                            variant='h5' 
                            english='Try the App'
                            bengali='অ্যাপটি ব্যবহার করুন'
                        />
                    </Button>
                }
            />

            <Credits />
        </>
    );
}
