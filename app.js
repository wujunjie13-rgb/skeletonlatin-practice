// Application logic for skeleton Latin practice
class SkeletonPractice {
    constructor() {
        this.allBones = this.flattenBones();
        this.currentBone = null;
        this.currentIndex = 0;
        this.stats = this.loadStats();
        this.mistakes = this.loadMistakes();
        this.practiceMode = 'all'; // 'all' or 'mistakes'
        
        this.initializeApp();
    }

    flattenBones() {
        const bones = [];
        for (const category in skeletalData) {
            skeletalData[category].bones.forEach(bone => {
                bones.push({
                    ...bone,
                    category: skeletalData[category].category
                });
            });
        }
        return bones;
    }

    loadStats() {
        const saved = localStorage.getItem('skeletonStats');
        return saved ? JSON.parse(saved) : {
            totalAttempts: 0,
            correctAnswers: 0,
            bonesMastered: {},
            mistakeCount: {}
        };
    }

    saveStats() {
        localStorage.setItem('skeletonStats', JSON.stringify(this.stats));
    }

    loadMistakes() {
        const saved = localStorage.getItem('skeletonMistakes');
        return saved ? JSON.parse(saved) : [];
    }

    saveMistakes() {
        localStorage.setItem('skeletonMistakes', JSON.stringify(this.mistakes));
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
        if (confirm('Are you sure you want to clear the mistake bank?')) {
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
                alert('Mistake bank is empty!');
                return;
            }
            this.practiceMode = 'mistakes';
            this.currentIndex = 0;
            document.querySelector('[data-tab="practice"]').click();
            this.nextQuestion();
        });

        document.getElementById('clearMistakes').addEventListener('click', () => this.clearMistakes());
    }

    nextQuestion() {
        const bones = this.practiceMode === 'mistakes' ? this.mistakes : this.allBones;
        
        if (bones.length === 0) {
            document.getElementById('feedback').innerHTML = '<p class="info">No content available to practice</p>';
            return;
        }

        this.currentBone = bones[this.currentIndex % bones.length];
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
        const showFinnish = document.getElementById('showFinnish').checked;
        
        document.getElementById('boneCategory').textContent = this.currentBone.category;
        document.getElementById('boneName').textContent = this.currentBone.latin;
        
        let description = this.currentBone.description;
        if (showFinnish) {
            description += `<br><strong>Finnish:</strong> ${this.currentBone.finnish}`;
        }
        
        if (this.currentBone.features && this.currentBone.features.length > 0) {
            description += '<br><strong>Main features:</strong><br>';
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
        utterance.lang = 'en-US'; // Use English for better TTS support
        utterance.rate = 0.7;
        window.speechSynthesis.speak(utterance);
    }

    updateProgress() {
        const bones = this.practiceMode === 'mistakes' ? this.mistakes : this.allBones;
        const current = (this.currentIndex % bones.length) + 1;
        const total = bones.length;
        
        document.getElementById('progressText').textContent = `${current}/${total}`;
        
        const percentage = (current / total) * 100;
        document.getElementById('progressFill').style.width = `${percentage}%`;
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This will clear statistics and mistake bank.')) {
            localStorage.removeItem('skeletonStats');
            localStorage.removeItem('skeletonMistakes');
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
                b.latin.toLowerCase().includes(searchTerm) ||
                b.finnish.toLowerCase().includes(searchTerm)
            );
        }
        
        const boneList = document.getElementById('boneList');
        boneList.innerHTML = '';
        
        bones.forEach(bone => {
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
                <h3>${bone.latin}</h3>
                <p><strong>Finnish:</strong> ${bone.finnish}</p>
                <p><strong>Pronunciation:</strong> ${bone.pronunciation}</p>
                <p><strong>Category:</strong> ${bone.category}</p>
                <p>${bone.description}</p>
                ${featuresHtml}
            `;
            
            boneList.appendChild(card);
        });
        
        if (bones.length === 0) {
            boneList.innerHTML = '<p class="info">No matching bones found</p>';
        }
    }

    renderMistakes() {
        const mistakesList = document.getElementById('mistakesList');
        mistakesList.innerHTML = '';
        
        if (this.mistakes.length === 0) {
            mistakesList.innerHTML = '<p class="info">Mistake bank is empty. Keep it up!</p>';
            return;
        }
        
        // Sort by most recent
        const sorted = [...this.mistakes].sort((a, b) => b.timestamp - a.timestamp);
        
        sorted.forEach(bone => {
            const card = document.createElement('div');
            card.className = 'mistake-card';
            
            const date = new Date(bone.timestamp).toLocaleString('en-US');
            
            card.innerHTML = `
                <h3>${bone.latin}</h3>
                <p><strong>Finnish:</strong> ${bone.finnish}</p>
                <p><strong>Pronunciation:</strong> ${bone.pronunciation}</p>
                <p><strong>Error count:</strong> ${bone.attempts || 1}</p>
                <p><strong>Last error:</strong> ${date}</p>
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
