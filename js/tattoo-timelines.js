const tattooTimelines = {
    small: {
        healing: '1-2 weeks surface',
        stages: [
            {
                stage: 'Day 1-3: Open Wound',
                symptoms: ['Bright and vibrant', 'Redness around tattoo', 'Mild swelling', 'Oozing plasma/ink', 'Feels like sunburn'],
                care: ['Wash gently 2-3x daily', 'Apply thin layer fragrance-free lotion', 'No soaking/swimming', 'Loose clean clothing']
            },
            {
                stage: 'Day 4-7: Peeling Phase',
                symptoms: ['Looks dull/cloudy', 'Peeling like sunburn', 'VERY itchy', 'Light scabbing'],
                care: ['Continue washing', 'Moisturize frequently', 'SLAP don\'t scratch', 'DO NOT PICK']
            },
            {
                stage: 'Day 8-14: Settling',
                symptoms: ['Looking better', 'Mostly done peeling', 'Less itchy'],
                care: ['Continue washing daily', 'Keep moisturized', 'Protect from sun']
            }
        ]
    },
    medium: {
        healing: '2-3 weeks surface',
        stages: [
            {
                stage: 'Day 1-3: Open Wound',
                symptoms: ['Vibrant colors', 'Moderate redness/swelling', 'Oozing', 'Tender'],
                care: ['Wash 2-3x daily', 'Thin layer lotion', 'No submersion', 'Clean sheets']
            },
            {
                stage: 'Day 4-10: Peeling Phase',
                symptoms: ['Dull appearance', 'Significant peeling', 'Very itchy', 'Scabbing possible'],
                care: ['Continue washing', 'Moisturize often', 'Never pick or scratch', 'Let peel naturally']
            },
            {
                stage: 'Day 10-21: Settling',
                symptoms: ['Color returning', 'Smooth again', 'Minimal symptoms'],
                care: ['Daily washing', 'Continue moisturizing', 'SPF 50+ in sun']
            }
        ]
    },
    large: {
        healing: '3-4 weeks surface',
        stages: [
            {
                stage: 'Day 1-4: Open Wound',
                symptoms: ['Beautiful vibrant ink', 'Significant redness/swelling', 'Lots of oozing', 'Quite sore'],
                care: ['Wash 3x daily', 'Thin lotion application', 'Wrap in plastic wrap for sleep', 'Loose clothing only']
            },
            {
                stage: 'Day 5-14: Major Peeling',
                symptoms: ['Looks terrible (normal!)', 'Heavy peeling', 'Extreme itchiness', 'Possible scabbing'],
                care: ['Keep washing', 'Frequent moisturizing', 'HANDS OFF', 'Absolutely no picking']
            },
            {
                stage: 'Day 14-28: Settling & Healing',
                symptoms: ['Improving appearance', 'Less peeling', 'Color brightening'],
                care: ['Daily care continues', 'Keep very moisturized', 'Always use SPF outside']
            }
        ]
    }
};
