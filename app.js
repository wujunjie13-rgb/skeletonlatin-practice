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
        if (confirm('确定要清空错题库吗？')) {
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
                alert('错题库为空！');
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
            document.getElementById('feedback').innerHTML = '<p class="info">没有可练习的内容</p>';
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
        document.getElementById('boneName').textContent = this.currentBone.chinese;
        
        let description = this.currentBone.description;
        if (showFinnish) {
            description += `<br><strong>芬兰语:</strong> ${this.currentBone.finnish}`;
        }
        
        if (this.currentBone.features && this.currentBone.features.length > 0) {
            description += '<br><strong>主要特征:</strong><br>';
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
            document.getElementById('feedback').innerHTML = '<p class="warning">请输入答案</p>';
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
                <p class="correct">✓ 正确！</p>
                <p>拉丁名: <strong>${correctAnswer}</strong></p>
                <p>发音: ${this.currentBone.pronunciation}</p>
            `;
        } else {
            this.addMistake(this.currentBone);
            document.getElementById('feedback').innerHTML = `
                <p class="incorrect">✗ 错误</p>
                <p>您的答案: <strong>${userAnswer}</strong></p>
                <p>正确答案: <strong>${correctAnswer}</strong></p>
                <p>发音: ${this.currentBone.pronunciation}</p>
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
            <p class="info">答案: <strong>${this.currentBone.latin}</strong></p>
            <p>发音: ${this.currentBone.pronunciation}</p>
        `;
        this.addMistake(this.currentBone);
    }

    playPronunciation() {
        // Text-to-speech for pronunciation
        const text = this.currentBone.latin;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'la'; // Latin
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
        if (confirm('确定要重置所有进度吗？这将清除统计数据和错题库。')) {
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
                b.chinese.toLowerCase().includes(searchTerm) ||
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
                <h3>${bone.chinese}</h3>
                <p><strong>拉丁名:</strong> ${bone.latin}</p>
                <p><strong>芬兰语:</strong> ${bone.finnish}</p>
                <p><strong>发音:</strong> ${bone.pronunciation}</p>
                <p><strong>分类:</strong> ${bone.category}</p>
                <p>${bone.description}</p>
                ${featuresHtml}
            `;
            
            boneList.appendChild(card);
        });
        
        if (bones.length === 0) {
            boneList.innerHTML = '<p class="info">未找到匹配的骨骼</p>';
        }
    }

    renderMistakes() {
        const mistakesList = document.getElementById('mistakesList');
        mistakesList.innerHTML = '';
        
        if (this.mistakes.length === 0) {
            mistakesList.innerHTML = '<p class="info">错题库为空，继续加油！</p>';
            return;
        }
        
        // Sort by most recent
        const sorted = [...this.mistakes].sort((a, b) => b.timestamp - a.timestamp);
        
        sorted.forEach(bone => {
            const card = document.createElement('div');
            card.className = 'mistake-card';
            
            const date = new Date(bone.timestamp).toLocaleString('zh-CN');
            
            card.innerHTML = `
                <h3>${bone.chinese}</h3>
                <p><strong>拉丁名:</strong> ${bone.latin}</p>
                <p><strong>芬兰语:</strong> ${bone.finnish}</p>
                <p><strong>发音:</strong> ${bone.pronunciation}</p>
                <p><strong>错误次数:</strong> ${bone.attempts || 1}</p>
                <p><strong>最后错误时间:</strong> ${date}</p>
                <button class="remove-mistake" data-id="${bone.id}">移除</button>
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
