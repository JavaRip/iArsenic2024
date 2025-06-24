export const tiers = [
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