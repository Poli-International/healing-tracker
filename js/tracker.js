document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const procedureType = document.getElementById('procedureType');
    const piercingLocationGroup = document.getElementById('piercingLocationGroup');
    const tattooSizeGroup = document.getElementById('tattooSizeGroup');
    const startTracking = document.getElementById('startTracking');
    const resultsSection = document.getElementById('resultsSection');

    // Show/hide based on procedure type
    procedureType.addEventListener('change', function() {
        if (this.value === 'piercing') {
            piercingLocationGroup.style.display = 'block';
            tattooSizeGroup.style.display = 'none';
        } else if (this.value === 'tattoo') {
            piercingLocationGroup.style.display = 'none';
            tattooSizeGroup.style.display = 'block';
        } else {
            piercingLocationGroup.style.display = 'none';
            tattooSizeGroup.style.display = 'none';
        }
    });

    // Start tracking
    startTracking.addEventListener('click', function() {
        const type = procedureType.value;
        const date = document.getElementById('procedureDate').value;

        if (!type || !date) {
            var errEl = document.getElementById('symptomResults');
            if (typeof InputGuards !== 'undefined' && InputGuards.formatError && errEl) {
                errEl.innerHTML = InputGuards.formatError('Please select procedure type and date');
                errEl.style.display = 'block';
            } else {
                alert('Please select procedure type and date');
            }
            return;
        }

        if (isNaN(new Date(date).getTime())) {
            var errEl2 = document.getElementById('symptomResults');
            if (typeof InputGuards !== 'undefined' && InputGuards.formatError && errEl2) {
                errEl2.innerHTML = InputGuards.formatError('Please enter a valid procedure date.');
                errEl2.style.display = 'block';
            } else {
                alert('Please enter a valid date');
            }
            return;
        }

        if (type === 'piercing') {
            const location = document.getElementById('piercingLocation').value;
            if (!location) {
                alert('Please select piercing location');
                return;
            }
            generatePiercingTimeline(location, date);
        } else {
            const size = document.getElementById('tattooSize').value;
            if (!size) {
                alert('Please select tattoo size');
                return;
            }
            generateTattooTimeline(size, date);
        }

        resultsSection.style.display = 'block';
        resultsSection.scrollIntoView({ behavior: 'smooth' });
        generateChecklist(type);
    });

    // Symptom checker
    document.getElementById('checkSymptoms').addEventListener('click', function() {
        const symptoms = Array.from(document.querySelectorAll('.symptom-check:checked'));
        const resultsDiv = document.getElementById('symptomResults');

        if (symptoms.length === 0) {
            alert('Please select at least one symptom');
            return;
        }

        // Check severity
        const concerning = symptoms.filter(s => s.dataset.severity === 'concerning');
        const monitor = symptoms.filter(s => s.dataset.severity === 'monitor');

        // Check for symptoms that healing discs can help with
        const symptomValues = symptoms.map(s => s.value);
        const discHelpfulSymptoms = ['moderate-swelling', 'increased-redness', 'yellow-discharge', 'warmth'];
        const needsHealingDiscs = symptomValues.some(val => discHelpfulSymptoms.includes(val));

        let severity, message, cssClass, healingDiscSolution = '';

        if (concerning.length > 0) {
            severity = 'Concerning';
            cssClass = 'concerning';
            message = '⚠️ These symptoms require professional attention. Contact your piercer/artist or healthcare provider immediately.';
            healingDiscSolution = `
                <div class="symptom-disc-solution">
                    <p><strong>💎 Professional Recommendation:</strong> While you seek medical attention, ask your piercer about Poli International Healing Discs. They may help prevent further irritation and provide antimicrobial protection during recovery.</p>
                </div>
            `;
        } else if (monitor.length > 0) {
            severity = 'Monitor Closely';
            cssClass = 'monitor';
            message = '👀 These symptoms should be monitored. If they worsen or don\'t improve in 24-48 hours, contact your professional.';
            if (needsHealingDiscs) {
                healingDiscSolution = `
                    <div class="symptom-disc-solution">
                        <p><strong>💎 Solution:</strong> These symptoms often indicate metal irritation or bacterial buildup. <strong>Poli International Healing Discs</strong> can help by:</p>
                        <ul>
                            <li>Eliminating metal-to-skin contact that causes irritation</li>
                            <li>Providing antimicrobial silver ion protection against bacteria</li>
                            <li>Preventing irritation bumps from developing further</li>
                            <li>Creating a protective barrier during healing</li>
                        </ul>
                        <p>Many piercers recommend healing discs specifically for these symptoms.</p>
                    </div>
                `;
            }
        } else {
            severity = 'Normal';
            cssClass = 'normal';
            message = '✅ These symptoms are typical for healing. Continue your aftercare routine.';
            healingDiscSolution = `
                <div class="symptom-disc-solution">
                    <p><strong>💎 Prevent Future Issues:</strong> Even with normal healing, Poli International Healing Discs can prevent irritation bumps, keloids, and infections before they start. Recommended for all cartilage, navel, and surface piercings.</p>
                </div>
            `;
        }

        resultsDiv.innerHTML = `
            <h4>${severity}</h4>
            <p>${message}</p>
            ${healingDiscSolution}
        `;
        resultsDiv.className = 'healing-tracker__symptom-results ' + cssClass;
        resultsDiv.style.display = 'block';
    });

    // Reset checklist
    document.getElementById('resetChecklist').addEventListener('click', function() {
        document.querySelectorAll('#aftercareChecklist input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });
    });
});

function generatePiercingTimeline(location, date) {
    const timeline = piercingTimelines[location];
    if (!timeline) return;

    // Validate date input
    if (!date || isNaN(new Date(date).getTime())) {
        if (typeof InputGuards !== 'undefined' && InputGuards.formatError) {
            document.getElementById('symptomResults').innerHTML = InputGuards.formatError('Please enter a valid procedure date.');
            document.getElementById('symptomResults').style.display = 'block';
        } else {
            alert('Please enter a valid procedure date.');
        }
        return;
    }
    const procDate = new Date(date);
    const today = new Date();
    const daysElapsed = Math.max(0, Math.floor((today - procDate) / (1000 * 60 * 60 * 24)));

    // Build healing disc recommendation if applicable
    let healingDiscAlert = '';
    if (timeline.healingDiscRecommended) {
        healingDiscAlert = `
            <div class="healing-disc-recommendation">
                <div class="healing-disc-rec-icon">💎</div>
                <div class="healing-disc-rec-content">
                    <h4>Healing Disc Recommendation for ${timeline.name}</h4>
                    <p>${timeline.healingDiscBenefits}</p>
                    <p class="healing-disc-rec-footer">
                        <strong>Poli International Healing Discs</strong> combine medical-grade elastomer with silver ion antimicrobial technology to prevent bumps, keloids, and infections while eliminating metal-to-skin contact.
                    </p>
                </div>
            </div>
        `;
    }

    document.getElementById('timelineResults').innerHTML = `
        <div class="timeline-header">
            <h3>${timeline.name} Piercing</h3>
            <p>Day ${daysElapsed} of healing</p>
            <p>Typical healing time: ${timeline.healing}</p>
        </div>
        ${healingDiscAlert}
        <div class="timeline-stages">
            ${timeline.stages.map(stage => `
                <div class="stage-card">
                    <h4>${stage.stage}</h4>
                    <p><strong>What to expect:</strong></p>
                    <ul>${stage.symptoms.map(s => `<li>${s}</li>`).join('')}</ul>
                    <p><strong>Care instructions:</strong></p>
                    <ul>${stage.care.map(c => `<li>${c}</li>`).join('')}</ul>
                </div>
            `).join('')}
        </div>
    `;
}

function generateTattooTimeline(size, date) {
    const timeline = tattooTimelines[size];
    if (!timeline) return;

    // Validate date input
    if (!date || isNaN(new Date(date).getTime())) {
        if (typeof InputGuards !== 'undefined' && InputGuards.formatError) {
            document.getElementById('symptomResults').innerHTML = InputGuards.formatError('Please enter a valid procedure date.');
            document.getElementById('symptomResults').style.display = 'block';
        } else {
            alert('Please enter a valid procedure date.');
        }
        return;
    }
    const procDate = new Date(date);
    const today = new Date();
    const daysElapsed = Math.max(0, Math.floor((today - procDate) / (1000 * 60 * 60 * 24)));

    document.getElementById('timelineResults').innerHTML = `
        <div class="timeline-header">
            <h3>${size.charAt(0).toUpperCase() + size.slice(1)} Tattoo</h3>
            <p>Day ${daysElapsed} of healing</p>
            <p>Typical surface healing: ${timeline.healing}</p>
        </div>
        <div class="timeline-stages">
            ${timeline.stages.map(stage => `
                <div class="stage-card">
                    <h4>${stage.stage}</h4>
                    <p><strong>What to expect:</strong></p>
                    <ul>${stage.symptoms.map(s => `<li>${s}</li>`).join('')}</ul>
                    <p><strong>Care instructions:</strong></p>
                    <ul>${stage.care.map(c => `<li>${c}</li>`).join('')}</ul>
                </div>
            `).join('')}
        </div>
    `;
}

function generateChecklist(type) {
    const checklistDiv = document.getElementById('aftercareChecklist');

    const piercingChecklist = [
        'Clean with sterile saline spray 2x daily',
        'Wash hands before touching piercing',
        '💎 Use Poli healing discs to prevent irritation bumps & infections',
        'DO NOT rotate jewelry',
        'Avoid sleeping on piercing if possible',
        'Check for signs of infection (redness, warmth, discharge)',
        'Keep hair products away from piercing',
        'Ensure healing discs are properly positioned on both ends'
    ];

    const tattooChecklist = [
        'Wash gently with fragrance-free soap',
        'Apply thin layer of fragrance-free lotion',
        'DO NOT pick or scratch',
        'Avoid direct sunlight',
        'Wear loose, clean clothing',
        'Drink plenty of water'
    ];

    const items = type === 'piercing' ? piercingChecklist : tattooChecklist;

    checklistDiv.innerHTML = items.map((item, i) => `
        <label class="checklist-item">
            <input type="checkbox" id="check${i}">
            <span>${item}</span>
        </label>
    `).join('');
}
