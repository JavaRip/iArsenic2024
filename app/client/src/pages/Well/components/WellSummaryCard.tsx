import { Stack } from "@mui/material";
import PageCard from "../../../components/PageCard";
import TranslatableText from "../../../components/TranslatableText";
import { Well } from "../../../models";
import { RegionTranslations } from "../../../types";

export default function WellSummaryCard(
    {
        userEmail,
        well,
        rt,
        units,
    }: {
        userEmail: string | 'guest',
        well: Well,
        rt: RegionTranslations,
        units: 'feet' | 'meters'
    }
): JSX.Element {
    return (
        <PageCard>
            <TranslatableText
                variant="h4"
                english="Well Summary"
                bengali="নলকূপের সারসংক্ষেপ" // chatgpt generated
            />

            <Stack width='100%'>
                <TranslatableText
                    variant="body1"
                    english="Metadata"
                    bengali="মেটাডেটা" // chatgpt generated
                    fontWeight='bold'
                />

                <TranslatableText
                    variant="body1"
                    english={
                        <>
                            <strong>Uploaded By</strong> {userEmail}
                        </>
                    }
                    bengali={
                        <>
                            <strong>আপলোড করেছেন</strong> {userEmail}
                        </>
                    } // chatgpt generated
                />

                <TranslatableText
                    variant="body1"
                    english={
                        <>
                            <strong>Uploaded At</strong>{" "}
                            {well.createdAt.toLocaleString(
                                "en-GB",
                                {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                }
                            )}{" "}
                            (UK)
                        </>
                    }
                    bengali={
                        <>
                            <strong>আপলোডের সময়</strong>{" "}
                            {well.createdAt.toLocaleString(
                                "bn-BD",
                                {
                                    dateStyle: "medium",
                                    timeStyle: "short",
                                }
                            )}{" "}
                            (যুক্তরাজ্য)
                        </>
                    } // chatgpt generated
                />

                <TranslatableText
                    variant="body1"
                    english={
                        <>
                            <strong>Geolocation</strong> {
                                (() => {
                                    if (well.geolocation || well.mouzaGeolocation) {
                                        return (
                                            well.geolocation ?
                                                `
                                                    lat ${well.geolocation[0]},
                                                    lon ${well.geolocation[1]}
                                                ` :
                                                'Mouza'
                                        )
                                    } else return (
                                        'Incomplete Data'
                                    )
                                })()
                            }
                        </>
                    }
                    bengali={
                        <>
                            <strong>ভৌগোলিক অবস্থান</strong>{" "}
                            {
                                (() => {
                                    if (well.geolocation || well.mouzaGeolocation) {
                                        return (
                                            well.geolocation
                                                ? `
                                                    অক্ষাংশ ${well.geolocation[0].toLocaleString('bn-BD')},
                                                    দ্রাঘিমাংশ ${well.geolocation[1].toLocaleString('bn-BD')}
                                                `
                                                : "মৌজা"
                                        )
                                    } else return (
                                        "তথ্য অসম্পূর্ণ"
                                    )
                                })()
                            }
                        </>
                    } // chatgpt generated
                />
            </Stack>

            <Stack width='100%'>
                {well.division ? (
                    <>
                        <TranslatableText
                            variant="body1"
                            english="Region"
                            bengali="অঞ্চল"
                            fontWeight='bold'
                        />

                        <TranslatableText
                            variant="body1"
                            english={<>
                                <strong>Division</strong> {well.division}
                            </>}
                            bengali={<>
                                <strong>{rt.Divisions.division}</strong> {
                                    rt.Divisions[well.division.toLowerCase()]
                                }
                            </>}
                        />
                        <TranslatableText
                            variant="body1"
                            english={<>
                                <strong>District</strong> {well.district}
                            </>}
                            bengali={<>
                                <strong>{rt.Districts.district}</strong> {
                                    rt.Districts[well.district!.toLowerCase()]
                                }
                            </>}
                        />
                        <TranslatableText
                            variant="body1"
                            english={<>
                                <strong>Upazila</strong> {well.upazila}
                            </>}
                            bengali={<>
                                <strong>{rt.Upazilas.upazila}</strong> {
                                    rt.Upazilas[well.upazila!.toLowerCase()]
                                }
                            </>}
                        />
                        <TranslatableText
                            variant="body1"
                            english={<>
                                <strong>Union</strong> {well.union}
                            </>}
                            bengali={<>
                                <strong>{rt.Unions.union}</strong> {
                                    rt.Unions[well.union!.toLowerCase()]
                                }
                            </>}
                        />
                        <TranslatableText
                            variant="body1"
                            english={<>
                                <strong>Mouza</strong> {well.mouza}
                            </>}
                            bengali={<>
                                <strong>{rt.Mouzas.mouza}</strong> {
                                    rt.Mouzas[well.mouza!.toLowerCase()]
                                }
                            </>}
                        />
                    </>
                ) : (
                    <TranslatableText
                        variant="body1"
                        english='Incomplete Data'
                        bengali='তথ্য অসম্পূর্ণ'
                    />
                )}
            </Stack>

            <Stack width='100%'>
                <TranslatableText
                    variant="body1"
                    english="Staining"
                    bengali="পাকা মেঝের দাগের ধরন"
                    fontWeight='bold'
                />

                {well.staining ? (
                    <>
                        <TranslatableText
                            variant="body1"
                            english={
                                <>
                                    <strong>Well Staining</strong>{' '}
                                    {
                                        (() => {
                                            if (well.staining === 'red') return 'Red'
                                            if (well.staining === 'black') return 'Black'
                                            if (well.staining === 'not sure') return 'Mixed or Unsure'
                                        })()
                                    }
                                </>
                            }
                            bengali={
                                <>
                                    <strong>নলকূপের দাগ</strong>{' '}
                                    {
                                        (() => {
                                            if (well.staining === 'red') {
                                                return 'লালচে দাগ'
                                            }
                                            if (well.staining === 'black') {
                                                return 'কালচে দাগ'
                                            }
                                            if (well.staining === 'not sure') {
                                                return 'মিশ্র বা নিশ্চিত নন'
                                            }
                                        })()
                                    }
                                </>
                            } // chatgpt generated
                        />
                        {well.utensilStaining && (
                            <TranslatableText
                                variant="body1"
                                english={
                                    <>
                                        <strong>Utensil Staining</strong>{' '}
                                        {
                                            (() => {
                                                if (well.utensilStaining === 'red') return 'Red'
                                                if (well.utensilStaining === 'black') return 'Black'
                                            })()
                                        }
                                    </>
                                }
                                bengali={
                                    <>
                                        <strong>জল সরঞ্জামের দাগ</strong>{' '}
                                        {
                                            (() => {
                                                if (well.utensilStaining === 'red') {
                                                    return 'লালচে দাগ পড়ে'
                                                }
                                                if (well.utensilStaining === 'black') {
                                                    return 'দাগ নেই বা হালকা কালচে দাগ পড়ে'
                                                }
                                            })()
                                        }
                                    </>
                                } // chatgpt generated
                            />
                        )}
                    </>
                ) : (
                    <TranslatableText
                        variant="body1"
                        english='Incomplete Data'
                        bengali='তথ্য অসম্পূর্ণ'
                    />
                )}
            </Stack>

            <Stack width='100%'>
                <TranslatableText
                    variant="body1"
                    english="Depth"
                    bengali="গভীরতা"
                    fontWeight='bold'
                />

                {well.depth ? (
                    <TranslatableText
                        variant="body1"
                        english={
                            <>
                                <strong>Depth</strong>{' '}
                                {
                                    units === 'meters' ?
                                        `${well.depth} meters` :
                                        `${(well.depth * 3.28084).toFixed(2)} feet`
                                }
                            </>
                        }
                        bengali={
                            <>
                                <strong>গভীরতা</strong>{" "}
                                {units === "meters"
                                    ? `${well.depth} মিটার`
                                    : `${
                                        Number(
                                            (well.depth * 3.28084).toFixed(2)
                                        ).toLocaleString('bn-BD')
                                    } ফুট`}
                            </>
                        } // chatgpt generated
                    />
                ): (
                    <TranslatableText
                        variant="body1"
                        english='Incomplete Data'
                        bengali='তথ্য অসম্পূর্ণ'
                    />
                )}
            </Stack>

            <Stack width='100%'>
                <TranslatableText
                    variant="body1"
                    english="Drinking Source"
                    bengali="নলকূপ ব্যবহার"
                    fontWeight='bold'
                />
                {typeof well.wellInUse === 'boolean' ? (
                    <TranslatableText
                        variant="body1"
                        english={
                            <>
                                <strong>Well in Use</strong>{' '}
                                {well.wellInUse ? 'Yes' : 'No'}
                            </>
                        }
                        bengali={
                            <>
                                <strong>নলকূপ ব্যবহৃত হচ্ছে কি না</strong>{" "}
                                {well.wellInUse ? "হ্যাঁ" : "না"}
                            </>
                        }
                    />
                ) : (
                    <TranslatableText
                        variant="body1"
                        english='Incomplete Data'
                        bengali='তথ্য অসম্পূর্ণ'
                    />
                )}
            </Stack>
        </PageCard>
    )
}
