// Application logic for skeleton Latin practice
class SkeletonPractice {
    constructor() {
        this.allBones = this.flattenBones();
        this.currentBone = null;
        this.currentIndex = 0;
        this.currentProfile = this.loadCurrentProfile();
        this.stats = this.loadStats();
        this.mistakes = this.loadMistakes();
        this.practiceMode = 'all'; // 'all' or 'mistakes'
        this.selectedBodyParts = ['all'];
        
        this.initializeApp();
    }

    flattenBones() {
        const bones = [];
        for (const category in skeletalData) {
            skeletalData[category].bones.forEach(bone => {
                bones.push({
                    ...bone,
                    category: skeletalData[category].category,
                    bodyPart: skeletalData[category].bodyPart
                });
            });
        }
        return bones;
    }

    loadCurrentProfile() {
        const saved = localStorage.getItem('currentProfile');
        return saved || 'default';
    }

    saveCurrentProfile() {
        localStorage.setItem('currentProfile', this.currentProfile);
    }

    loadStats() {
        const saved = localStorage.getItem(`skeletonStats_${this.currentProfile}`);
        return saved ? JSON.parse(saved) : {
            totalAttempts: 0,
            correctAnswers: 0,
            bonesMastered: {},
            mistakeCount: {}
        };
    }

    saveStats() {
        localStorage.setItem(`skeletonStats_${this.currentProfile}`, JSON.stringify(this.stats));
    }

    loadMistakes() {
        const saved = localStorage.getItem(`skeletonMistakes_${this.currentProfile}`);
        return saved ? JSON.parse(saved) : [];
    }

    saveMistakes() {
        localStorage.setItem(`skeletonMistakes_${this.currentProfile}`, JSON.stringify(this.mistakes));
    }

    loadProfiles() {
        const saved = localStorage.getItem('userProfiles');
        return saved ? JSON.parse(saved) : ['default'];
    }

    saveProfiles(profiles) {
        localStorage.setItem('userProfiles', JSON.stringify(profiles));
    }

    addMistake(bone) {
        const existing = this.mistakes.find(m => m.id === bone.id);
        if (!existing) {
            this.mistakes.push({
                ...bone,
                timestamp: Date.now(),
                attempts: 1
            });
        } else {
            existing.attempts++;
            existing.timestamp = Date.now();
        }
        
        if (!this.stats.mistakeCount[bone.id]) {
            this.stats.mistakeCount[bone.id] = 0;
        }
        this.stats.mistakeCount[bone.id]++;
        
        this.saveMistakes();
        this.saveStats();
    }

    removeMistake(boneId) {
        this.mistakes = this.mistakes.filter(m => m.id !== boneId);
        this.saveMistakes();
    }

    clearMistakes() {
        if (confirm('Are you sure you want to clear all mistakes?')) {
            this.mistakes = [];
            this.saveMistakes();
            this.renderMistakes();
        }
    }

    initializeApp() {
        this.setupTabs();
        this.setupPracticeMode();
        this.setupBrowseMode();
        this.setupMistakesMode();
        this.setupUserProfiles();
        this.renderStats();
        this.nextQuestion();
    }

    setupTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabName = button.dataset.tab;
                
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));
                
                button.classList.add('active');
                document.getElementById(tabName).classList.add('active');

                if (tabName === 'browse') {
                    this.renderBoneList();
                } else if (tabName === 'mistakes') {
                    this.renderMistakes();
                } else if (tabName === 'stats') {
                    this.renderStats();
                }
            });
        });
    }

    setupPracticeMode() {
        document.getElementById('submitAnswer').addEventListener('click', () => this.checkAnswer());
        document.getElementById('showAnswer').addEventListener('click', () => this.showAnswer());
        document.getElementById('nextQuestion').addEventListener('click', () => this.nextQuestion());
        document.getElementById('playAudio').addEventListener('click', () => this.playPronunciation());
        document.getElementById('resetProgress').addEventListener('click', () => this.resetProgress());
        
        document.getElementById('answerInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.checkAnswer();
            }
        });

        // Setup body part filter buttons
        const bodyPartButtons = document.querySelectorAll('.body-part-btn');
        bodyPartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const part = button.dataset.part;
                
                if (part === 'all') {
                    // Deselect all others
                    bodyPartButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    this.selectedBodyParts = ['all'];
                } else {
                    // Remove 'all' if it's selected
                    const allButton = document.querySelector('.body-part-btn[data-part="all"]');
                    allButton.classList.remove('active');
                    
                    // Toggle this button
                    button.classList.toggle('active');
                    
                    // Update selected body parts
                    const activeButtons = document.querySelectorAll('.body-part-btn.active');
                    if (activeButtons.length === 0) {
                        // If nothing selected, select all
                        allButton.classList.add('active');
                        this.selectedBodyParts = ['all'];
                    } else {
                        this.selectedBodyParts = Array.from(activeButtons).map(btn => btn.dataset.part);
                    }
                }
                
                // Reset to start of practice with new filter
                this.currentIndex = 0;
                this.nextQuestion();
            });
        });
    }

    setupBrowseMode() {
        const categoryFilter = document.getElementById('categoryFilter');
        
        // Populate category filter
        const categories = [...new Set(this.allBones.map(b => b.category))];
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });

        categoryFilter.addEventListener('change', () => this.renderBoneList());
        document.getElementById('searchInput').addEventListener('input', () => this.renderBoneList());
    }

    setupMistakesMode() {
        document.getElementById('practiceMistakes').addEventListener('click', () => {
            if (this.mistakes.length === 0) {
                alert('No mistakes in the bank!');
                return;
            }
            this.practiceMode = 'mistakes';
            this.currentIndex = 0;
            document.querySelector('[data-tab="practice"]').click();
            this.nextQuestion();
        });

        document.getElementById('clearMistakes').addEventListener('click', () => this.clearMistakes());
    }

    setupUserProfiles() {
        const profileSelect = document.getElementById('userProfile');
        const addProfileBtn = document.getElementById('addProfile');
        
        // Load existing profiles
        const profiles = this.loadProfiles();
        profileSelect.innerHTML = '';
        profiles.forEach(profile => {
            const option = document.createElement('option');
            option.value = profile;
            option.textContent = profile.charAt(0).toUpperCase() + profile.slice(1);
            if (profile === this.currentProfile) {
                option.selected = true;
            }
            profileSelect.appendChild(option);
        });

        // Handle profile change
        profileSelect.addEventListener('change', () => {
            this.currentProfile = profileSelect.value;
            this.saveCurrentProfile();
            this.stats = this.loadStats();
            this.mistakes = this.loadMistakes();
            this.renderMistakes();
            this.renderStats();
        });

        // Handle add new profile
        addProfileBtn.addEventListener('click', () => {
            const name = prompt('Enter new profile name:');
            if (name && name.trim()) {
                const profileName = name.trim().toLowerCase().replace(/\s+/g, '_');
                const profiles = this.loadProfiles();
                if (!profiles.includes(profileName)) {
                    profiles.push(profileName);
                    this.saveProfiles(profiles);
                    
                    // Add to select
                    const option = document.createElement('option');
                    option.value = profileName;
                    option.textContent = name.trim();
                    profileSelect.appendChild(option);
                    
                    // Switch to new profile
                    profileSelect.value = profileName;
                    this.currentProfile = profileName;
                    this.saveCurrentProfile();
                    this.stats = this.loadStats();
                    this.mistakes = this.loadMistakes();
                    this.renderMistakes();
                    this.renderStats();
                } else {
                    alert('Profile already exists!');
                }
            }
        });
    }

    getFilteredBones() {
        if (this.practiceMode === 'mistakes') {
            return this.mistakes;
        }

        if (this.selectedBodyParts.includes('all')) {
            return this.allBones;
        }

        return this.allBones.filter(bone => 
            this.selectedBodyParts.includes(bone.bodyPart)
        );
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    nextQuestion() {
        const bones = this.getFilteredBones();
        
        if (bones.length === 0) {
            document.getElementById('feedback').innerHTML = '<p class="info">No bones to practice</p>';
            return;
        }

        // Randomize the bones if starting a new cycle
        if (this.currentIndex === 0 || this.currentIndex >= bones.length) {
            this.shuffledBones = this.shuffleArray(bones);
            this.currentIndex = 0;
        }

        this.currentBone = this.shuffledBones[this.currentIndex];
        this.displayQuestion();
        this.updateProgress();
        
        document.getElementById('answerInput').value = '';
        document.getElementById('feedback').innerHTML = '';
        document.getElementById('answerInput').focus();

        if (document.getElementById('playPronunciation').checked) {
            setTimeout(() => this.playPronunciation(), 500);
        }
    }

    displayQuestion() {
        document.getElementById('boneCategory').textContent = this.currentBone.category;
        document.getElementById('boneName').textContent = this.currentBone.english;
        
        let description = this.currentBone.description;
        
        if (this.currentBone.features && this.currentBone.features.length > 0) {
            description += '<br><strong>Key Features:</strong><br>';
            description += '<ul>';
            this.currentBone.features.forEach(feature => {
                description += `<li>${feature}</li>`;
            });
            description += '</ul>';
        }
        
        document.getElementById('boneDescription').innerHTML = description;
    }

    checkAnswer() {
        const userAnswer = document.getElementById('answerInput').value.trim();
        const correctAnswer = this.currentBone.latin;
        
        if (!userAnswer) {
            document.getElementById('feedback').innerHTML = '<p class="warning">Please enter an answer</p>';
            return;
        }

        this.stats.totalAttempts++;
        
        const isCorrect = this.normalizeAnswer(userAnswer) === this.normalizeAnswer(correctAnswer);
        
        if (isCorrect) {
            this.stats.correctAnswers++;
            if (!this.stats.bonesMastered[this.currentBone.id]) {
                this.stats.bonesMastered[this.currentBone.id] = 0;
            }
            this.stats.bonesMastered[this.currentBone.id]++;
            
            // Remove from mistakes if answered correctly 3 times
            if (this.stats.bonesMastered[this.currentBone.id] >= 3) {
                this.removeMistake(this.currentBone.id);
            }
            
            document.getElementById('feedback').innerHTML = `
                <p class="correct">✓ Correct!</p>
                <p>Latin name: <strong>${correctAnswer}</strong></p>
                <p>Pronunciation: ${this.currentBone.pronunciation}</p>
            `;
        } else {
            this.addMistake(this.currentBone);
            document.getElementById('feedback').innerHTML = `
                <p class="incorrect">✗ Incorrect</p>
                <p>Your answer: <strong>${userAnswer}</strong></p>
                <p>Correct answer: <strong>${correctAnswer}</strong></p>
                <p>Pronunciation: ${this.currentBone.pronunciation}</p>
            `;
        }
        
        this.saveStats();
        this.renderStats();
        
        setTimeout(() => {
            this.currentIndex++;
            this.nextQuestion();
        }, 3000);
    }

    normalizeAnswer(answer) {
        return answer.toLowerCase()
            .replace(/\s+/g, ' ')
            .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
            .trim();
    }

    showAnswer() {
        document.getElementById('feedback').innerHTML = `
            <p class="info">Answer: <strong>${this.currentBone.latin}</strong></p>
            <p>Pronunciation: ${this.currentBone.pronunciation}</p>
        `;
        this.addMistake(this.currentBone);
    }

    playPronunciation() {
        // Text-to-speech for pronunciation
        const text = this.currentBone.latin;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 0.7;
        window.speechSynthesis.speak(utterance);
    }

    updateProgress() {
        const bones = this.getFilteredBones();
        const current = this.currentIndex + 1;
        const total = bones.length;
        
        document.getElementById('progressText').textContent = `${current}/${total}`;
        
        const percentage = (current / total) * 100;
        document.getElementById('progressFill').style.width = `${percentage}%`;
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This will clear statistics and mistakes.')) {
            localStorage.removeItem(`skeletonStats_${this.currentProfile}`);
            localStorage.removeItem(`skeletonMistakes_${this.currentProfile}`);
            this.stats = this.loadStats();
            this.mistakes = this.loadMistakes();
            this.practiceMode = 'all';
            this.currentIndex = 0;
            this.renderStats();
            this.nextQuestion();
        }
    }

    renderBoneList() {
        const categoryFilter = document.getElementById('categoryFilter').value;
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        
        let bones = this.allBones;
        
        if (categoryFilter !== 'all') {
            bones = bones.filter(b => b.category === categoryFilter);
        }
        
        if (searchTerm) {
            bones = bones.filter(b => 
                b.english.toLowerCase().includes(searchTerm) ||
                b.latin.toLowerCase().includes(searchTerm)
            );
        }

        // Group bones by category
        const groupedBones = {};
        bones.forEach(bone => {
            if (!groupedBones[bone.category]) {
                groupedBones[bone.category] = [];
            }
            groupedBones[bone.category].push(bone);
        });
        
        const boneList = document.getElementById('boneList');
        boneList.innerHTML = '';
        
        // Render bones grouped by category
        Object.keys(groupedBones).forEach(category => {
            const categorySection = document.createElement('div');
            categorySection.className = 'category-section';
            
            const categoryHeader = document.createElement('h3');
            categoryHeader.className = 'category-header';
            categoryHeader.textContent = category;
            categorySection.appendChild(categoryHeader);
            
            const categoryGrid = document.createElement('div');
            categoryGrid.className = 'bone-grid';
            
            groupedBones[category].forEach(bone => {
                const card = document.createElement('div');
                card.className = 'bone-card';
                
                let featuresHtml = '';
                if (bone.features && bone.features.length > 0) {
                    featuresHtml = '<ul class="features-list">';
                    bone.features.forEach(feature => {
                        featuresHtml += `<li>${feature}</li>`;
                    });
                    featuresHtml += '</ul>';
                }
                
                card.innerHTML = `
                    <h4>${bone.english}</h4>
                    <p><strong>Latin:</strong> ${bone.latin}</p>
                    <p><strong>Pronunciation:</strong> ${bone.pronunciation}</p>
                    <p>${bone.description}</p>
                    ${featuresHtml}
                `;
                
                categoryGrid.appendChild(card);
            });
            
            categorySection.appendChild(categoryGrid);
            boneList.appendChild(categorySection);
        });
        
        if (bones.length === 0) {
            boneList.innerHTML = '<p class="info">No matching bones found</p>';
        }
    }

    renderMistakes() {
        const mistakesList = document.getElementById('mistakesList');
        mistakesList.innerHTML = '';
        
        if (this.mistakes.length === 0) {
            mistakesList.innerHTML = '<p class="info">No mistakes yet - keep practicing!</p>';
            return;
        }
        
        // Sort by most recent
        const sorted = [...this.mistakes].sort((a, b) => b.timestamp - a.timestamp);
        
        sorted.forEach(bone => {
            const card = document.createElement('div');
            card.className = 'mistake-card';
            
            const date = new Date(bone.timestamp).toLocaleString('en-US');
            
            card.innerHTML = `
                <h3>${bone.english}</h3>
                <p><strong>Latin:</strong> ${bone.latin}</p>
                <p><strong>Pronunciation:</strong> ${bone.pronunciation}</p>
                <p><strong>Mistake count:</strong> ${bone.attempts || 1}</p>
                <p><strong>Last mistake:</strong> ${date}</p>
                <button class="remove-mistake" data-id="${bone.id}">Remove</button>
            `;
            
            card.querySelector('.remove-mistake').addEventListener('click', () => {
                this.removeMistake(bone.id);
                this.renderMistakes();
            });
            
            mistakesList.appendChild(card);
        });
    }

    renderStats() {
        document.getElementById('totalQuestions').textContent = this.stats.totalAttempts;
        
        const accuracy = this.stats.totalAttempts > 0 
            ? ((this.stats.correctAnswers / this.stats.totalAttempts) * 100).toFixed(1)
            : 0;
        document.getElementById('accuracy').textContent = `${accuracy}%`;
        
        document.getElementById('mistakeCount').textContent = this.mistakes.length;
        
        const masteredCount = Object.keys(this.stats.bonesMastered).filter(
            id => this.stats.bonesMastered[id] >= 3
        ).length;
        document.getElementById('masteredCount').textContent = `${masteredCount}/${this.allBones.length}`;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SkeletonPractice();
});
