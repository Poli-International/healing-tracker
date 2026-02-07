const piercingTimelines = {
    // ============================================
    // EAR PIERCINGS
    // ============================================

    earlobe: {
        name: 'Earlobe',
        category: 'Ear',
        healing: '6-8 weeks',
        difficulty: 'Easy',
        stages: [
            {
                stage: 'Week 1-2: Initial Healing',
                symptoms: ['Mild redness', 'Slight swelling', 'Clear discharge (crusties)', 'Tenderness'],
                care: ['Spray saline 2-3x daily', 'Don\'t touch except when cleaning', 'Sleep on clean pillowcase']
            },
            {
                stage: 'Week 3-6: Active Healing',
                symptoms: ['Decreasing redness', 'Minimal crusties', 'Less tender'],
                care: ['Continue saline 2x daily', 'Can start to sleep on it if comfortable', 'Avoid changing jewelry yet']
            },
            {
                stage: 'Week 6-8: Fully Healed',
                symptoms: ['No redness', 'No discharge', 'Can change jewelry'],
                care: ['Clean jewelry regularly', 'Continue good hygiene']
            }
        ]
    },

    helix: {
        name: 'Helix (Upper Cartilage)',
        category: 'Ear',
        healing: '3-6 months',
        difficulty: 'Moderate',
        healingDiscRecommended: true,
        healingDiscBenefits: 'HIGHLY RECOMMENDED: Cartilage piercings are extremely prone to irritation bumps. Healing discs prevent metal-to-skin contact that causes bumps, while antimicrobial silver ions protect against infection during the long healing process.',
        stages: [
            {
                stage: 'Month 1-2: Initial Inflammation',
                symptoms: ['Moderate swelling', 'Redness', 'Crusties', 'Quite tender'],
                care: ['Saline spray 2-3x daily', 'AVOID sleeping on it', 'No touching', 'Use Poli healing discs to prevent metal contact and irritation bumps', 'Downsize jewelry at 6-8 weeks']
            },
            {
                stage: 'Month 2-4: Tissue Formation',
                symptoms: ['Less swelling', 'Possible irritation bumps', 'Occasional tenderness'],
                care: ['Continue saline 2x daily', 'If irritation bumps develop, ensure healing discs are in place', 'Ensure jewelry isn\'t too long', 'Antimicrobial discs prevent bacterial buildup']
            },
            {
                stage: 'Month 4-6: Maturation',
                symptoms: ['Looks healed', 'Minimal symptoms'],
                care: ['Continue gentle care', 'Can change jewelry carefully at 3+ months', 'Continue using healing discs until fully healed']
            }
        ]
    },

    industrial: {
        name: 'Industrial (Scaffold)',
        category: 'Ear',
        healing: '6-12 months',
        difficulty: 'Difficult',
        healingDiscRecommended: true,
        healingDiscBenefits: 'CRITICAL FOR SUCCESS: Industrial piercings have TWO cartilage holes healing simultaneously with constant bar pressure. Healing discs on both ends prevent irritation bumps and reduce the risk of one hole rejecting. The antimicrobial protection is essential for this long healing process.',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Significant swelling both holes', 'Moderate pain', 'Heavy crusties', 'Very tender'],
                care: ['Saline spray 3x daily both holes', 'Never sleep on it', 'No touching bar', 'Use healing discs on BOTH ends to prevent bumps', 'May need longer bar initially']
            },
            {
                stage: 'Month 3-9: Long Healing',
                symptoms: ['Gradual improvement', 'Occasional irritation bumps', 'One hole may heal faster than other'],
                care: ['Continue saline 2x daily', 'Healing discs prevent metal bar irritation', 'Downsize bar at 2-3 months', 'Be very patient', 'Avoid snagging hair']
            },
            {
                stage: 'Month 9-12: Final Maturation',
                symptoms: ['Both holes should look healed'],
                care: ['Can change jewelry carefully', 'Continue discs until completely healed', 'Monitor for irritation']
            }
        ]
    },

    daith: {
        name: 'Daith (Inner Cartilage)',
        category: 'Ear',
        healing: '6-9 months',
        difficulty: 'Difficult',
        healingDiscRecommended: true,
        healingDiscBenefits: 'HIGHLY RECOMMENDED: Daith piercings are in a difficult-to-clean fold and highly prone to bumps. Healing discs with antimicrobial protection keep bacteria away from this hard-to-reach area while preventing metal irritation.',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Moderate to significant swelling', 'Deep cartilage pain', 'Crusties hard to reach', 'Tender'],
                care: ['Saline spray carefully into fold 2-3x daily', 'No sleeping on it', 'Use healing discs to protect this vulnerable cartilage', 'No earbuds/headphones', 'Avoid bumping']
            },
            {
                stage: 'Month 3-9: Maturation',
                symptoms: ['Decreasing swelling', 'Less tender', 'Crusties reduce'],
                care: ['Continue saline 2x daily', 'Antimicrobial discs prevent infection in this fold', 'Can resume headphones carefully after 4-5 months', 'No jewelry changes until fully healed']
            }
        ]
    },

    rook: {
        name: 'Rook (Anti-Helix Fold)',
        category: 'Ear',
        healing: '6-12 months',
        difficulty: 'Difficult',
        healingDiscRecommended: true,
        healingDiscBenefits: 'HIGHLY RECOMMENDED: Rook piercings are notoriously prone to irritation bumps and have one of the longest healing times. Healing discs dramatically reduce bump formation and protect against infection.',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Significant swelling in fold', 'Moderate pain', 'Crusties', 'Very tender to touch'],
                care: ['Saline spray into fold 2-3x daily', 'Absolutely no sleeping on it', 'Use healing discs on both ends of curved barbell', 'No touching', 'Curved barbell needed']
            },
            {
                stage: 'Month 3-12: Long Healing',
                symptoms: ['Slow improvement', 'Occasional bumps common', 'Crusties decrease'],
                care: ['Be very patient', 'Healing discs prevent the bumps this piercing is famous for', 'Continue saline 2x daily', 'Downsize at 2-3 months', 'Avoid irritation']
            }
        ]
    },

    tragus: {
        name: 'Tragus',
        category: 'Ear',
        healing: '4-8 months',
        difficulty: 'Moderate',
        healingDiscRecommended: true,
        healingDiscBenefits: 'RECOMMENDED: Tragus piercings face constant pressure from headphones and phones. Healing discs create a protective barrier that prevents irritation from these daily activities.',
        stages: [
            {
                stage: 'Month 1-2: Initial Healing',
                symptoms: ['Moderate swelling', 'Tender especially with headphones', 'Crusties', 'Slight throbbing'],
                care: ['Saline spray 2-3x daily', 'Use healing discs to buffer pressure from phones', 'No earbuds for 2-3 months', 'Be careful with phones', 'Don\'t sleep on it']
            },
            {
                stage: 'Month 2-8: Maturation',
                symptoms: ['Decreasing swelling', 'Can tolerate gentle pressure', 'Less crusties'],
                care: ['Continue saline 2x daily', 'Healing discs allow earlier return to headphone use', 'Downsize at 6-8 weeks', 'Can change jewelry at 4+ months']
            }
        ]
    },

    anti_tragus: {
        name: 'Anti-Tragus',
        category: 'Ear',
        healing: '6-12 months',
        difficulty: 'Difficult',
        healingDiscRecommended: true,
        healingDiscBenefits: 'HIGHLY RECOMMENDED: Anti-tragus piercings are extremely prone to bumps due to the anatomy and pressure. Healing discs are essential for successful healing.',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Significant swelling', 'Quite painful', 'Crusties', 'Pressure sensitive'],
                care: ['Saline spray 2-3x daily carefully', 'Use healing discs immediately to prevent bumps', 'No earbuds', 'No sleeping on it', 'Avoid touching']
            },
            {
                stage: 'Month 3-12: Long Healing',
                symptoms: ['Slow improvement', 'Bumps common if irritated', 'Less painful'],
                care: ['Very patient approach needed', 'Healing discs prevent common bump problems', 'Continue saline 2x daily', 'Downsize at 2-3 months']
            }
        ]
    },

    conch: {
        name: 'Conch (Inner or Outer)',
        category: 'Ear',
        healing: '6-12 months',
        difficulty: 'Moderate',
        healingDiscRecommended: true,
        healingDiscBenefits: 'RECOMMENDED: Conch piercings benefit from healing discs especially when sleeping on them is unavoidable or when transitioning to a ring.',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Moderate swelling', 'Tender', 'Crusties', 'Throbbing possible'],
                care: ['Saline spray 2-3x daily', 'No sleeping on it', 'Use healing discs to prevent pressure irritation', 'Stud recommended initially', 'No headphones on that ear']
            },
            {
                stage: 'Month 3-12: Maturation',
                symptoms: ['Gradual improvement', 'Can try ring at 6+ months', 'Looks mostly healed'],
                care: ['Continue saline 2x daily', 'Healing discs especially helpful when switching to ring', 'Downsize at 8-12 weeks', 'Be patient for jewelry changes']
            }
        ]
    },

    snug: {
        name: 'Snug (Anti-Helix)',
        category: 'Ear',
        healing: '9-12 months',
        difficulty: 'Very Difficult',
        healingDiscRecommended: true,
        healingDiscBenefits: 'CRITICAL: Snug piercings have the highest rejection and complication rate. Healing discs are absolutely essential - they may be the difference between keeping or retiring this piercing. Prevents the notorious bumps and reduces rejection risk.',
        stages: [
            {
                stage: 'Month 1-4: Initial Healing',
                symptoms: ['Very significant swelling', 'Quite painful', 'Heavy crusties', 'Very tender'],
                care: ['Saline spray 3x daily', 'Never sleep on it', 'Use healing discs immediately - non-negotiable for this piercing', 'Curved barbell essential', 'Avoid all pressure']
            },
            {
                stage: 'Month 4-12: Long Healing',
                symptoms: ['Very slow improvement', 'Bumps very common', 'Rejection possible'],
                care: ['Extreme patience required', 'Healing discs are your best defense against bumps and rejection', 'Continue saline 2x daily', 'Monitor for migration', 'Many people retire this piercing']
            }
        ]
    },

    forward_helix: {
        name: 'Forward Helix',
        category: 'Ear',
        healing: '4-6 months',
        difficulty: 'Moderate',
        healingDiscRecommended: true,
        healingDiscBenefits: 'RECOMMENDED: Forward helix piercings are prone to snagging and pressure from glasses. Healing discs provide protection and prevent irritation bumps.',
        stages: [
            {
                stage: 'Month 1-2: Initial Healing',
                symptoms: ['Moderate swelling', 'Tender', 'Crusties', 'Sensitive to touch'],
                care: ['Saline spray 2-3x daily', 'Use healing discs to protect from glasses and hair', 'No sleeping on it', 'Watch for snagging hair', 'Be careful with glasses']
            },
            {
                stage: 'Month 2-6: Maturation',
                symptoms: ['Decreasing symptoms', 'Looks good', 'Less tender'],
                care: ['Continue saline 2x daily', 'Healing discs prevent bump formation', 'Downsize at 6-8 weeks', 'Can change jewelry at 3-4 months']
            }
        ]
    },

    orbital: {
        name: 'Orbital (Connected Hoops)',
        category: 'Ear',
        healing: '6-9 months',
        difficulty: 'Difficult',
        healingDiscRecommended: true,
        healingDiscBenefits: 'RECOMMENDED: Like industrial piercings, orbitals have two holes healing with constant tension. Healing discs on both sides prevent irritation and ensure both holes heal evenly.',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Both holes swollen', 'Moderate pain', 'Crusties on both holes', 'Ring may feel tight'],
                care: ['Saline spray both holes 2-3x daily', 'No sleeping on it', 'Use healing discs on both holes', 'May need larger ring initially', 'No rotating ring']
            },
            {
                stage: 'Month 3-9: Maturation',
                symptoms: ['Gradual improvement', 'Both holes may heal at different rates'],
                care: ['Continue saline 2x daily', 'Healing discs help both holes heal at similar rates', 'Can downsize ring at 2-3 months', 'Both holes must be healed before changing']
            }
        ]
    },

    // ============================================
    // FACIAL PIERCINGS
    // ============================================

    nostril: {
        name: 'Nostril',
        category: 'Face',
        healing: '3-4 months',
        difficulty: 'Moderate',
        healingDiscRecommended: true,
        healingDiscBenefits: 'HIGHLY RECOMMENDED: Nostril piercings are extremely prone to irritation bumps (nose bumps). Healing discs prevent the metal stud backing from irritating the inside of your nose, which is the #1 cause of bumps. Antimicrobial protection also prevents infection from nasal bacteria.',
        stages: [
            {
                stage: 'Month 1: Initial Healing',
                symptoms: ['Moderate redness', 'Mild swelling', 'Crusties inside and outside nose'],
                care: ['Spray saline 2-3x daily including inside nostril', 'Use healing disc inside nose to prevent bumps', 'Blow nose gently', 'Keep makeup away', 'Antimicrobial protection critical with nasal bacteria']
            },
            {
                stage: 'Month 2-4: Tissue Strengthening',
                symptoms: ['Decreasing redness', 'Less discharge'],
                care: ['Continue saline 1-2x daily', 'If bump develops, ensure healing disc is properly positioned', 'Can try ring at 2-3 months', 'Continue disc use until fully healed']
            }
        ]
    },

    septum: {
        name: 'Septum',
        category: 'Face',
        healing: '2-3 months',
        difficulty: 'Easy to Moderate',
        stages: [
            {
                stage: 'Week 1-4: Initial Healing',
                symptoms: ['Mild redness inside nose', 'Boogers stick to jewelry', 'Tender when moving jewelry'],
                care: ['Saline spray 2-3x daily up into nose', 'Can flip up/down once per day max', 'Blow nose gently']
            },
            {
                stage: 'Month 2-3: Fully Healed',
                symptoms: ['No tenderness', 'Looks healed'],
                care: ['Can change jewelry at 6-8+ weeks', 'Keep clean']
            }
        ]
    },

    bridge: {
        name: 'Bridge (Nose Bridge)',
        category: 'Face',
        healing: '8-12 months',
        difficulty: 'Difficult',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Moderate swelling on bridge', 'Tender', 'Crusties', 'May affect glasses'],
                care: ['Saline spray 2-3x daily', 'No glasses if possible', 'Watch for migration', 'Straight barbell only']
            },
            {
                stage: 'Month 3-12: Maturation',
                symptoms: ['Slow healing', 'Monitor for rejection'],
                care: ['Continue saline 2x daily', 'Watch for thinning skin', 'May need to retire if migrating']
            }
        ]
    },

    high_nostril: {
        name: 'High Nostril',
        category: 'Face',
        healing: '6-9 months',
        difficulty: 'Difficult',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Swelling higher on nose', 'Tender', 'Crusties', 'Longer healing than standard nostril'],
                care: ['Saline spray 2-3x daily', 'No makeup near piercing', 'Straight jewelry recommended', 'Be very patient']
            },
            {
                stage: 'Month 3-9: Long Healing',
                symptoms: ['Gradual improvement', 'Crusties decrease'],
                care: ['Continue saline 2x daily', 'No jewelry changes until fully healed', 'Avoid irritation']
            }
        ]
    },

    eyebrow: {
        name: 'Eyebrow',
        category: 'Face',
        healing: '6-8 weeks',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Week 1-4: Initial Healing',
                symptoms: ['Swelling around eyebrow', 'Bruising possible', 'Tender', 'Crusties'],
                care: ['Saline spray 2-3x daily', 'No makeup on piercing', 'Watch for rejection', 'Curved barbell needed']
            },
            {
                stage: 'Week 4-8: Maturation',
                symptoms: ['Swelling decreases', 'Looks healed'],
                care: ['Continue saline 2x daily', 'Monitor for migration', 'Can change jewelry at 6+ weeks']
            }
        ]
    },

    anti_eyebrow: {
        name: 'Anti-Eyebrow (Teardrop)',
        category: 'Face',
        healing: '6-12 months',
        difficulty: 'Difficult',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Swelling on cheekbone', 'Tender', 'Crusties', 'High rejection risk'],
                care: ['Saline spray 2-3x daily', 'Watch for migration', 'Surface bar needed', 'May need to retire early']
            },
            {
                stage: 'Month 3-12: Monitoring Phase',
                symptoms: ['May look healed but watch for rejection'],
                care: ['Continue care', 'Monitor for skin thinning', 'Many people eventually retire this']
            }
        ]
    },

    cheek: {
        name: 'Cheek (Dimple)',
        category: 'Face',
        healing: '8-12 months',
        difficulty: 'Very Difficult',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Significant facial swelling', 'Quite painful', 'Heavy discharge', 'Eating difficult'],
                care: ['Saline spray outside 2-3x daily', 'Alcohol-free mouthwash inside 2x daily', 'Long labret needed initially', 'Soft foods']
            },
            {
                stage: 'Month 3-12: Long Healing',
                symptoms: ['Gradual improvement', 'Scarring normal (dimple effect)', 'Eating returns to normal'],
                care: ['Continue both internal and external care', 'Downsize at 2-3 months', 'Full healing takes long time']
            }
        ]
    },

    medusa: {
        name: 'Medusa (Philtrum)',
        category: 'Face',
        healing: '8-12 weeks',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Week 1-4: Initial Healing',
                symptoms: ['Swelling of upper lip', 'Tender', 'Crusties outside', 'Slight lisp possible'],
                care: ['Saline spray outside 2-3x daily', 'Alcohol-free mouthwash inside after eating', 'Long labret initially', 'Avoid spicy/acidic foods']
            },
            {
                stage: 'Week 4-12: Maturation',
                symptoms: ['Swelling decreases', 'Speech returns to normal', 'Looks healed'],
                care: ['Continue care', 'Downsize at 4-6 weeks', 'Monitor gum erosion']
            }
        ]
    },

    monroe: {
        name: 'Monroe/Madonna',
        category: 'Face',
        healing: '8-12 weeks',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Week 1-4: Initial Healing',
                symptoms: ['Swelling of upper lip area', 'Tender', 'Crusties', 'Slight discomfort with smiling'],
                care: ['Saline spray outside 2-3x daily', 'Alcohol-free mouthwash inside', 'Long labret needed', 'Avoid makeup on it']
            },
            {
                stage: 'Week 4-12: Maturation',
                symptoms: ['Swelling goes down', 'Looks good', 'No discomfort'],
                care: ['Continue care', 'Downsize at 4-6 weeks', 'Can wear flat disc jewelry']
            }
        ]
    },

    labret: {
        name: 'Labret (Lower Lip Center)',
        category: 'Face',
        healing: '6-8 weeks',
        difficulty: 'Easy to Moderate',
        stages: [
            {
                stage: 'Week 1-3: Initial Healing',
                symptoms: ['Swelling of lower lip', 'Tender', 'Crusties outside', 'Slight speech changes'],
                care: ['Saline spray outside 2-3x daily', 'Alcohol-free mouthwash inside after eating/drinking', 'Long labret initially', 'Cold foods help swelling']
            },
            {
                stage: 'Week 3-8: Maturation',
                symptoms: ['Swelling decreases', 'Speech normal', 'Looks healed'],
                care: ['Continue care', 'Downsize at 3-4 weeks', 'Monitor for gum erosion']
            }
        ]
    },

    vertical_labret: {
        name: 'Vertical Labret',
        category: 'Face',
        healing: '6-8 weeks',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Week 1-3: Initial Healing',
                symptoms: ['Lip swelling both exit points', 'Tender', 'Curved barbell visible top and bottom', 'Eating carefully'],
                care: ['Saline spray 2-3x daily both holes', 'Rinse mouth after eating', 'No oral contact', 'Curved barbell needed']
            },
            {
                stage: 'Week 3-8: Maturation',
                symptoms: ['Swelling decreases', 'Both holes look good'],
                care: ['Continue care', 'Downsize at 3-4 weeks', 'Heals faster than regular labret (no inside hole)']
            }
        ]
    },

    snake_bites: {
        name: 'Snake Bites (Lower Lip Pair)',
        category: 'Face',
        healing: '6-8 weeks',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Week 1-3: Initial Healing',
                symptoms: ['Swelling both sides of lower lip', 'Tender both holes', 'Crusties', 'Speech slightly affected'],
                care: ['Saline spray outside 2-3x daily', 'Alcohol-free mouthwash inside frequently', 'Long jewelry both sides', 'Symmetrical placement important']
            },
            {
                stage: 'Week 3-8: Maturation',
                symptoms: ['Both healing at similar rate hopefully', 'Swelling decreases'],
                care: ['Continue care both piercings', 'Downsize both at same time', 'Monitor gum erosion both sides']
            }
        ]
    },

    angel_bites: {
        name: 'Angel Bites (Upper Lip Pair)',
        category: 'Face',
        healing: '8-12 weeks',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Week 1-4: Initial Healing',
                symptoms: ['Upper lip swelling both sides', 'Tender', 'Monroe on each side', 'Eating carefully'],
                care: ['Saline spray outside 2-3x daily', 'Mouthwash inside frequently', 'Long labrets both sides', 'Avoid spicy foods']
            },
            {
                stage: 'Week 4-12: Maturation',
                symptoms: ['Both sides healing', 'Swelling decreases'],
                care: ['Continue care', 'Downsize both at 4-6 weeks', 'Symmetry important']
            }
        ]
    },

    smiley: {
        name: 'Smiley (Upper Frenulum)',
        category: 'Face',
        healing: '4-8 weeks',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Week 1-2: Initial Healing',
                symptoms: ['Tender frenulum', 'Slight discomfort smiling', 'Visible when smiling'],
                care: ['Alcohol-free mouthwash 2-3x daily', 'Be gentle brushing', 'Check frenulum isn\'t tearing', 'Circular barbell or curved barbell']
            },
            {
                stage: 'Week 2-8: Maturation',
                symptoms: ['Heals quickly usually', 'No discomfort'],
                care: ['Continue mouthwash', 'Monitor for gum damage', 'May need to retire if problematic']
            }
        ]
    },

    frowny: {
        name: 'Frowny (Lower Frenulum)',
        category: 'Face',
        healing: '4-8 weeks',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Week 1-2: Initial Healing',
                symptoms: ['Tender lower frenulum', 'Visible when pulling lip down', 'Slight discomfort'],
                care: ['Alcohol-free mouthwash 2-3x daily', 'Check for tearing', 'Small circular barbell', 'May reject more than smiley']
            },
            {
                stage: 'Week 2-8: Maturation',
                symptoms: ['Usually heals quickly', 'Monitor for rejection'],
                care: ['Continue mouthwash', 'Watch for gum/tooth damage', 'Higher rejection risk']
            }
        ]
    },

    // ============================================
    // ORAL PIERCINGS
    // ============================================

    tongue: {
        name: 'Tongue (Center)',
        category: 'Oral',
        healing: '4-6 weeks',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Week 1-2: Initial Healing',
                symptoms: ['Significant tongue swelling', 'Speech difficulty', 'Eating difficulty', 'White tongue coating normal'],
                care: ['Alcohol-free mouthwash after everything', 'Long barbell needed', 'Cold foods/drinks help', 'No oral contact', 'Ibuprofen for swelling']
            },
            {
                stage: 'Week 2-6: Maturation',
                symptoms: ['Swelling decreases rapidly', 'Speech returns to normal', 'Eating easier'],
                care: ['Continue mouthwash', 'MUST downsize at 2 weeks', 'Avoid playing with jewelry', 'Monitor tooth/gum damage']
            }
        ]
    },

    tongue_web: {
        name: 'Tongue Web (Frenulum)',
        category: 'Oral',
        healing: '4-8 weeks',
        difficulty: 'Easy to Moderate',
        stages: [
            {
                stage: 'Week 1-2: Initial Healing',
                symptoms: ['Tender under tongue', 'Slight speech changes', 'Minimal swelling'],
                care: ['Alcohol-free mouthwash frequently', 'Small jewelry needed', 'Usually easy healing', 'Check for tearing']
            },
            {
                stage: 'Week 2-8: Maturation',
                symptoms: ['Heals quickly usually', 'No discomfort'],
                care: ['Continue mouthwash', 'Higher rejection risk than tongue', 'Monitor for embedding']
            }
        ]
    },

    venom: {
        name: 'Venom (Double Tongue)',
        category: 'Oral',
        healing: '4-6 weeks',
        difficulty: 'Moderate to Difficult',
        stages: [
            {
                stage: 'Week 1-2: Initial Healing',
                symptoms: ['Very significant tongue swelling', 'More speech difficulty than single', 'Eating very difficult', 'Two barbells visible'],
                care: ['Mouthwash after everything', 'Long barbells both sides', 'Cold foods essential', 'Ibuprofen', 'May have more swelling than single tongue']
            },
            {
                stage: 'Week 2-6: Maturation',
                symptoms: ['Both sides healing', 'Swelling decreases'],
                care: ['Continue mouthwash', 'Downsize both at 2 weeks', 'Monitor both for tooth damage', 'More challenging than single tongue']
            }
        ]
    },

    uvula: {
        name: 'Uvula',
        category: 'Oral',
        healing: '4-8 weeks',
        difficulty: 'Very Difficult',
        stages: [
            {
                stage: 'Week 1-2: Initial Healing',
                symptoms: ['Significant swelling of uvula', 'Gag reflex issues', 'Difficulty swallowing', 'Speech very affected'],
                care: ['Mouthwash frequently', 'Very small jewelry', 'High rejection/migration risk', 'May need to retire early']
            },
            {
                stage: 'Week 2-8: Monitoring',
                symptoms: ['IF it doesn\'t reject, heals moderately', 'Gag reflex usually adapts'],
                care: ['Continue care', 'Very rare piercing', 'Many people can\'t keep it', 'Professional only']
            }
        ]
    },

    // ============================================
    // BODY PIERCINGS
    // ============================================

    navel: {
        name: 'Navel (Belly Button)',
        category: 'Body',
        healing: '6-12 months',
        difficulty: 'Difficult',
        healingDiscRecommended: true,
        healingDiscBenefits: 'CRITICAL: Navel piercings are THE MOST notorious for irritation bumps and keloid formation. Healing discs are absolutely essential - they prevent metal contact with the skin during movement (sitting, bending) which is the primary cause of navel bumps. Many navel piercings fail without this protection.',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Moderate redness', 'Crusties', 'Tender with movement'],
                care: ['Saline spray 2x daily', 'Use healing discs on BOTH top and bottom balls immediately', 'Loose clothing', 'Discs prevent bump formation from waistband pressure', 'Avoid core exercises', 'Watch for migration']
            },
            {
                stage: 'Month 3-6: Strengthening',
                symptoms: ['Less tender', 'Looks better'],
                care: ['Continue saline daily', 'Keep discs in place - bumps can develop even mid-healing', 'Can resume exercise gradually', 'Antimicrobial protection prevents sweat-related infections']
            },
            {
                stage: 'Month 6-12: Maturation',
                symptoms: ['Looks healed externally'],
                care: ['Can change jewelry at 6+ months', 'Continue using discs until 100% healed', 'Monitor for rejection', 'If keloid-prone, use discs long-term']
            }
        ]
    },

    nipple: {
        name: 'Nipple',
        category: 'Body',
        healing: '6-12 months',
        difficulty: 'Difficult',
        healingDiscRecommended: true,
        healingDiscBenefits: 'HIGHLY RECOMMENDED: Nipple piercings are prone to metal sensitivity reactions and irritation from clothing. Healing discs eliminate metal-to-skin contact (preventing nickel reactions) and cushion against bra/clothing friction. Essential for those with sensitive skin or metal allergies.',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Significant swelling', 'Very tender', 'Crusties', 'Sensitivity changes'],
                care: ['Saline spray 2x daily', 'Use healing discs on both ends of barbell', 'Soft supportive bra', 'Discs prevent metal allergies and bra friction', 'NO oral contact for 6+ months', 'Avoid rough clothing']
            },
            {
                stage: 'Month 3-12: Long-term Healing',
                symptoms: ['Gradual improvement', 'Decreasing tenderness'],
                care: ['Continue daily care', 'Healing discs especially important if any metal sensitivity', 'Downsize at 2-3 months', 'Be patient - takes long time', 'Antimicrobial protection prevents fabric bacteria transfer']
            }
        ]
    },

    // ============================================
    // SURFACE & DERMAL PIERCINGS
    // ============================================

    surface: {
        name: 'Surface Piercing (Various Locations)',
        category: 'Surface',
        healing: '6-12 months',
        difficulty: 'Very Difficult',
        healingDiscRecommended: true,
        healingDiscBenefits: 'ABSOLUTELY CRITICAL: Surface piercings have the highest rejection rate of ALL piercings. Healing discs are your best chance at success - they minimize metal movement against shallow tissue and reduce the friction that causes rejection. Without discs, rejection rate is 70-90%. With discs, significantly improved success.',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Moderate swelling', 'Tender', 'Crusties both holes', 'High rejection risk'],
                care: ['Saline spray 2-3x daily', 'Surface bar only', 'Use healing discs on BOTH ends immediately', 'Discs reduce micro-movement that causes rejection', 'Avoid all pressure/movement', 'Watch for migration']
            },
            {
                stage: 'Month 3-12: Monitoring Phase',
                symptoms: ['May look healed but watch for rejection', 'Skin thinning is rejection sign'],
                care: ['Continue gentle care', 'Keep healing discs - they improve long-term success', 'Monitor closely', 'Retire if rejecting', 'Location affects success rate', 'Antimicrobial protection prevents infection during vulnerable healing']
            }
        ]
    },

    dermal_anchor: {
        name: 'Dermal Anchor/Microdermal',
        category: 'Surface',
        healing: '3-6 months',
        difficulty: 'Difficult',
        healingDiscRecommended: true,
        healingDiscBenefits: 'HIGHLY RECOMMENDED: Dermal anchors are prone to snagging and pressure that can cause rejection. Healing discs on the visible top create a cushion that prevents snags and reduces pressure on the anchor base, significantly improving retention.',
        stages: [
            {
                stage: 'Month 1-2: Initial Healing',
                symptoms: ['Swelling around anchor', 'Tender', 'Crusties', 'Anchor visible'],
                care: ['Saline spray 2-3x daily', 'Use healing disc on the top to prevent snagging', 'No touching/playing with top', 'Avoid pressure', 'Watch for rejection']
            },
            {
                stage: 'Month 2-6: Maturation',
                symptoms: ['Skin heals around anchor plate', 'Looks flush with skin'],
                care: ['Continue care', 'Healing disc protects from clothing snags', 'Can change tops carefully', 'Monitor for rejection', 'May last years or reject', 'Antimicrobial protection prevents infection around anchor']
            }
        ]
    },

    nape: {
        name: 'Nape (Back of Neck)',
        category: 'Surface',
        healing: '6-12 months',
        difficulty: 'Very Difficult',
        healingDiscRecommended: true,
        healingDiscBenefits: 'CRITICAL: Nape piercings have extremely high rejection rates due to constant movement and collar friction. Healing discs are essential - they cushion against neck movement and prevent clothing irritation. Without them, almost certain to reject.',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Swelling back of neck', 'Tender', 'Crusties', 'Collars irritate it'],
                care: ['Saline spray 2-3x daily', 'Surface bar needed', 'Use healing discs on both ends - non-negotiable', 'Discs buffer neck movement and collar pressure', 'No high collars', 'Avoid sleeping on back', 'Very high rejection risk']
            },
            {
                stage: 'Month 3-12: Monitoring',
                symptoms: ['Watch for migration', 'May reject'],
                care: ['Continue care', 'Keep healing discs to maximize retention chance', 'Monitor skin thickness', 'Many people retire this', 'Hair can irritate']
            }
        ]
    },

    sternum: {
        name: 'Sternum (Chest Surface)',
        category: 'Surface',
        healing: '6-12 months',
        difficulty: 'Very Difficult',
        healingDiscRecommended: true,
        healingDiscBenefits: 'CRITICAL: Sternum piercings face constant chest movement (breathing, posture changes). Healing discs minimize the bar movement that causes rejection and protect from bra/clothing pressure. Essential for any chance of success.',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Swelling on chest', 'Tender', 'Movement affects it', 'Clothing irritates'],
                care: ['Saline spray 2-3x daily', 'Surface bar essential', 'Use healing discs on both ends immediately', 'Discs cushion against chest movement', 'Loose clothing', 'High rejection risk']
            },
            {
                stage: 'Month 3-12: Monitoring',
                symptoms: ['May look good or may reject'],
                care: ['Continue care', 'Healing discs improve long-term success significantly', 'Watch for migration', 'Retire if skin thinning', 'Antimicrobial protection critical for chest area']
            }
        ]
    },

    madison: {
        name: 'Madison (Front Neck)',
        category: 'Surface',
        healing: '6-12 months',
        difficulty: 'Very Difficult',
        healingDiscRecommended: true,
        healingDiscBenefits: 'ABSOLUTELY CRITICAL: Madison piercings have one of the absolute highest rejection rates due to neck swallowing/talking movement. Healing discs are mandatory - they cushion constant throat movement. Even with discs, rejection is common, but without them, almost guaranteed to fail.',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Swelling on front neck', 'Very tender', 'Crusties', 'Movement affects it'],
                care: ['Saline spray 2-3x daily', 'Surface bar', 'Use healing discs on both ends - absolute requirement', 'Discs buffer swallowing and talking movement', 'No high necks', 'Very high rejection', 'Not for everyone']
            },
            {
                stage: 'Month 3-12: Monitoring',
                symptoms: ['High rejection rate'],
                care: ['Monitor closely', 'Keep healing discs for best chance', 'Many reject this', 'Retire if migrating', 'Antimicrobial protection important for neck bacteria']
            }
        ]
    },

    // ============================================
    // MALE GENITAL PIERCINGS
    // ============================================

    prince_albert: {
        name: 'Prince Albert (PA)',
        category: 'Male Genital',
        healing: '4-6 months',
        difficulty: 'Moderate',
        healingDiscRecommended: true,
        healingDiscBenefits: 'RECOMMENDED: Genital piercings benefit greatly from healing discs. They eliminate metal contact with sensitive genital tissue (important for those with metal sensitivities), cushion against underwear/movement friction, and provide critical antimicrobial protection in this bacteria-rich area. Increases comfort dramatically during healing.',
        stages: [
            {
                stage: 'Month 1-2: Initial Healing',
                symptoms: ['Bleeding first few days normal', 'Swelling', 'Tender', 'Urination may spray initially'],
                care: ['Saline soaks 2x daily', 'Use healing discs to protect sensitive tissue from metal', 'Rinse after urination', 'Antimicrobial discs prevent bacterial infections from urine', 'No sexual contact 4-6 weeks minimum', 'Circular barbell or ring', 'Sea salt soaks']
            },
            {
                stage: 'Month 2-6: Maturation',
                symptoms: ['Heals relatively quickly', 'Urination normalizes', 'Less tender'],
                care: ['Continue soaks daily', 'Healing discs reduce friction from underwear/movement', 'Can have sexual contact after 6-8 weeks with care', 'Condoms recommended initially', 'Can stretch later if desired']
            }
        ]
    },

    reverse_pa: {
        name: 'Reverse Prince Albert',
        category: 'Male Genital',
        healing: '6-9 months',
        difficulty: 'Difficult',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['More painful than standard PA', 'Bleeding', 'Swelling', 'Tender'],
                care: ['Saline soaks 2-3x daily', 'Rinse after urination', 'No sexual contact 6-8 weeks', 'Curved barbell needed', 'More difficult healing than PA']
            },
            {
                stage: 'Month 3-9: Long Healing',
                symptoms: ['Slow healing', 'Takes longer than PA'],
                care: ['Continue soaks', 'Be patient', 'Sexual contact only when fully healed']
            }
        ]
    },

    ampallang: {
        name: 'Ampallang (Horizontal Through Glans)',
        category: 'Male Genital',
        healing: '6-12 months',
        difficulty: 'Very Difficult',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Significant pain and swelling', 'Bleeding', 'Very tender', 'Urination affected'],
                care: ['Saline soaks 2-3x daily', 'Rinse after urination always', 'NO sexual contact minimum 3 months', 'Straight barbell', 'Pain management important']
            },
            {
                stage: 'Month 3-12: Long Healing',
                symptoms: ['Slow gradual improvement', 'Very long healing time'],
                care: ['Continue soaks daily', 'Be very patient', 'Full healing takes long time', 'Worth the wait for many']
            }
        ]
    },

    apadravya: {
        name: 'Apadravya (Vertical Through Glans)',
        category: 'Male Genital',
        healing: '6-12 months',
        difficulty: 'Very Difficult',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Significant pain and swelling', 'Bleeding', 'Very tender', 'Urination through piercing'],
                care: ['Saline soaks 2-3x daily', 'Rinse after urination', 'NO sexual contact minimum 3 months', 'Straight barbell through urethra', 'Very challenging healing']
            },
            {
                stage: 'Month 3-12: Long Healing',
                symptoms: ['Slow healing', 'Both entry and exit points heal'],
                care: ['Continue soaks', 'Very long healing', 'Sexual contact only when fully healed']
            }
        ]
    },

    frenum: {
        name: 'Frenum',
        category: 'Male Genital',
        healing: '3-5 months',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Month 1-2: Initial Healing',
                symptoms: ['Moderate swelling', 'Tender', 'Slight bleeding initially'],
                care: ['Saline soaks 2x daily', 'Rinse after urination', 'No sexual contact 4-6 weeks', 'Curved barbell or ring']
            },
            {
                stage: 'Month 2-5: Maturation',
                symptoms: ['Heals relatively well', 'Can do multiple (frenum ladder)'],
                care: ['Continue soaks', 'Sexual contact after 6-8 weeks with care']
            }
        ]
    },

    lorum: {
        name: 'Lorum (Scrotal)',
        category: 'Male Genital',
        healing: '3-6 months',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Month 1-2: Initial Healing',
                symptoms: ['Swelling at base of scrotum', 'Tender', 'Crusties'],
                care: ['Saline soaks 2x daily', 'Wear supportive underwear', 'No sexual contact 4-6 weeks', 'Curved barbell']
            },
            {
                stage: 'Month 2-6: Maturation',
                symptoms: ['Heals moderately well', 'Can do multiple'],
                care: ['Continue soaks', 'Supportive underwear helpful']
            }
        ]
    },

    hafada: {
        name: 'Hafada (Scrotal Surface)',
        category: 'Male Genital',
        healing: '3-6 months',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Month 1-2: Initial Healing',
                symptoms: ['Swelling on scrotum', 'Tender', 'Can do multiple'],
                care: ['Saline soaks 2x daily', 'Supportive underwear', 'No sexual contact 4-6 weeks', 'Ring or curved barbell']
            },
            {
                stage: 'Month 2-6: Maturation',
                symptoms: ['Heals well usually', 'Popular for multiple piercings'],
                care: ['Continue soaks', 'Can have multiple in various positions']
            }
        ]
    },

    dydoe: {
        name: 'Dydoe (Coronal Rim)',
        category: 'Male Genital',
        healing: '3-6 months',
        difficulty: 'Moderate to Difficult',
        stages: [
            {
                stage: 'Month 1-2: Initial Healing',
                symptoms: ['Swelling on rim of glans', 'Quite painful', 'Tender', 'Usually done in pairs'],
                care: ['Saline soaks 2-3x daily', 'No sexual contact 6-8 weeks', 'Curved barbell', 'Circumcised only usually']
            },
            {
                stage: 'Month 2-6: Maturation',
                symptoms: ['Gradual healing', 'Can do multiple pairs'],
                care: ['Continue soaks', 'Be patient']
            }
        ]
    },

    guiche: {
        name: 'Guiche (Perineum)',
        category: 'Male Genital',
        healing: '3-6 months',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Month 1-2: Initial Healing',
                symptoms: ['Swelling in perineum', 'Tender especially sitting', 'Crusties'],
                care: ['Saline soaks 2x daily', 'Careful sitting', 'No sexual contact 4-6 weeks', 'Curved barbell or ring']
            },
            {
                stage: 'Month 2-6: Maturation',
                symptoms: ['Heals moderately well', 'Sitting becomes comfortable'],
                care: ['Continue soaks', 'Can do multiple']
            }
        ]
    },

    foreskin: {
        name: 'Foreskin',
        category: 'Male Genital',
        healing: '2-4 months',
        difficulty: 'Easy to Moderate',
        stages: [
            {
                stage: 'Month 1-2: Initial Healing',
                symptoms: ['Swelling of foreskin', 'Tender', 'Usually heals quickly'],
                care: ['Saline soaks 2x daily', 'Keep clean', 'No sexual contact 4 weeks', 'Ring jewelry', 'Uncircumcised only']
            },
            {
                stage: 'Month 2-4: Fully Healed',
                symptoms: ['Heals quickly usually', 'Easy maintenance'],
                care: ['Continue hygiene', 'One of easier genital piercings']
            }
        ]
    },

    // ============================================
    // FEMALE GENITAL PIERCINGS
    // ============================================

    vch: {
        name: 'Vertical Clitoral Hood (VCH)',
        category: 'Female Genital',
        healing: '4-8 weeks',
        difficulty: 'Easy to Moderate',
        healingDiscRecommended: true,
        healingDiscBenefits: 'HIGHLY RECOMMENDED: VCH piercings benefit immensely from healing discs. They prevent metal balls from irritating sensitive genital tissue, cushion against underwear/pad friction, eliminate metal sensitivity issues, and provide antimicrobial protection critical for the genital area. Dramatically increases comfort and prevents irritation.',
        stages: [
            {
                stage: 'Week 1-4: Initial Healing',
                symptoms: ['Moderate swelling', 'Tender', 'Some bleeding initially', 'Sensation changes'],
                care: ['Saline soaks 2x daily', 'Use healing discs on both balls for comfort and protection', 'Rinse after urination', 'Antimicrobial protection prevents bacterial infections', 'No sexual contact 4-6 weeks', 'Curved barbell', 'Discs cushion against underwear/pad friction', 'Cotton underwear']
            },
            {
                stage: 'Week 4-8: Fully Healed',
                symptoms: ['Heals relatively quickly', 'Most popular female genital piercing'],
                care: ['Continue soaks', 'Healing discs eliminate metal sensitivity concerns', 'Can have sexual contact after 6 weeks', 'Good hygiene important', 'Discs provide ongoing comfort']
            }
        ]
    },

    hch: {
        name: 'Horizontal Clitoral Hood (HCH)',
        category: 'Female Genital',
        healing: '6-12 weeks',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Week 1-6: Initial Healing',
                symptoms: ['Swelling', 'Tender', 'Slightly longer healing than VCH'],
                care: ['Saline soaks 2x daily', 'Rinse after urination', 'No sexual contact 6-8 weeks', 'Circular barbell', 'Anatomy dependent']
            },
            {
                stage: 'Week 6-12: Maturation',
                symptoms: ['Heals moderately well', 'Not as common as VCH'],
                care: ['Continue soaks', 'Monitor for migration']
            }
        ]
    },

    inner_labia: {
        name: 'Inner Labia',
        category: 'Female Genital',
        healing: '4-8 weeks',
        difficulty: 'Moderate',
        stages: [
            {
                stage: 'Week 1-4: Initial Healing',
                symptoms: ['Swelling of inner labia', 'Tender', 'Can do multiple'],
                care: ['Saline soaks 2x daily', 'Rinse after urination', 'No sexual contact 4-6 weeks', 'Ring or curved barbell', 'Cotton underwear']
            },
            {
                stage: 'Week 4-8: Fully Healed',
                symptoms: ['Heals relatively quickly', 'Can do multiple piercings'],
                care: ['Continue good hygiene', 'Popular for multiple piercings']
            }
        ]
    },

    outer_labia: {
        name: 'Outer Labia',
        category: 'Female Genital',
        healing: '3-6 months',
        difficulty: 'Moderate to Difficult',
        stages: [
            {
                stage: 'Month 1-2: Initial Healing',
                symptoms: ['Swelling of outer labia', 'Tender', 'Longer healing than inner'],
                care: ['Saline soaks 2x daily', 'Rinse after urination', 'No sexual contact 6-8 weeks', 'Ring jewelry', 'Cotton underwear']
            },
            {
                stage: 'Month 2-6: Maturation',
                symptoms: ['Slow healing', 'Can do multiple pairs'],
                care: ['Continue soaks', 'Be patient', 'Good hygiene essential']
            }
        ]
    },

    triangle: {
        name: 'Triangle',
        category: 'Female Genital',
        healing: '3-6 months',
        difficulty: 'Difficult',
        stages: [
            {
                stage: 'Month 1-2: Initial Healing',
                symptoms: ['Swelling', 'Tender', 'Goes under clitoris', 'Anatomy dependent - not everyone can get this'],
                care: ['Saline soaks 2x daily', 'Rinse after urination', 'No sexual contact 6-8 weeks', 'Circular barbell', 'Experienced piercer only']
            },
            {
                stage: 'Month 2-6: Long Healing',
                symptoms: ['Slow healing', 'Worth the wait for many'],
                care: ['Continue soaks', 'Very patient approach', 'Unique piercing']
            }
        ]
    },

    christina: {
        name: 'Christina (Pubic Mound Surface)',
        category: 'Female Genital',
        healing: '6-12 months',
        difficulty: 'Very Difficult',
        stages: [
            {
                stage: 'Month 1-3: Initial Healing',
                symptoms: ['Swelling on pubic mound', 'Tender', 'Surface piercing', 'High rejection risk'],
                care: ['Saline soaks 2-3x daily', 'Surface bar needed', 'No sexual contact 8-12 weeks', 'Watch for migration', 'Anatomy dependent']
            },
            {
                stage: 'Month 3-12: Monitoring',
                symptoms: ['May heal or may reject', 'Beautiful if it heals'],
                care: ['Monitor for rejection', 'Many people retire this', 'Skin thinning = rejection']
            }
        ]
    },

    fourchette: {
        name: 'Fourchette (Posterior)',
        category: 'Female Genital',
        healing: '3-6 months',
        difficulty: 'Moderate to Difficult',
        stages: [
            {
                stage: 'Month 1-2: Initial Healing',
                symptoms: ['Swelling at bottom of vaginal opening', 'Tender', 'Affected by movement'],
                care: ['Saline soaks 2x daily', 'Rinse after urination', 'No sexual contact 8 weeks', 'Curved barbell', 'Anatomy dependent']
            },
            {
                stage: 'Month 2-6: Maturation',
                symptoms: ['Slow healing', 'Not for everyone anatomically'],
                care: ['Continue soaks', 'Be patient', 'May migrate if anatomy not suitable']
            }
        ]
    }
};
