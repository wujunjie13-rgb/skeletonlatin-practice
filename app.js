// Application logic for skeleton Latin practice
class SkeletonPractice {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'zh';
        this.allBones = this.flattenBones();
        this.currentBone = null;
        this.currentIndex = 0;
        this.stats = this.loadStats();
        this.mistakes = this.loadMistakes();
        this.practiceMode = 'all'; // 'all' or 'mistakes'
        this.currentBodyPart = 'all'; // Body part filter
        
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

    translate(key) {
        return translations[this.currentLanguage][key] || key;
    }

    updateLanguage() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[this.currentLanguage] && translations[this.currentLanguage][key]) {
                element.textContent = translations[this.currentLanguage][key];
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[this.currentLanguage] && translations[this.currentLanguage][key]) {
                element.placeholder = translations[this.currentLanguage][key];
            }
        });

        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === this.currentLanguage);
        });

        // Refresh current view
        this.displayQuestion();
        this.renderBoneList();
        this.renderMistakes();
        this.renderStats();
        this.updateBodyPartFilter();
    }

    updateBodyPartFilter() {
        const filter = document.getElementById('bodyPartFilter');
        filter.innerHTML = '';
        
        for (const partKey in bodyParts) {
            const option = document.createElement('option');
            option.value = partKey;
            option.textContent = bodyParts[partKey][this.currentLanguage];
            if (partKey === this.currentBodyPart) {
                option.selected = true;
            }
            filter.appendChild(option);
        }
    }

    getCategoryText(category) {
        if (typeof category === 'object') {
            return category[this.currentLanguage] || category.zh;
        }
        return category;
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
        const confirmMsg = {
            zh: '确定要清空错题库吗？',
            en: 'Are you sure you want to clear all mistakes?',
            fi: 'Haluatko varmasti tyhjentää kaikki virheet?'
        };
        if (confirm(confirmMsg[this.currentLanguage])) {
            this.mistakes = [];
            this.saveMistakes();
            this.renderMistakes();
        }
    }

    initializeApp() {
        this.setupLanguageSwitcher();
        this.setupTabs();
        this.setupPracticeMode();
        this.setupBrowseMode();
        this.setupMistakesMode();
        this.updateLanguage();
        this.renderStats();
        this.nextQuestion();
    }

    setupLanguageSwitcher() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentLanguage = btn.dataset.lang;
                localStorage.setItem('language', this.currentLanguage);
                this.updateLanguage();
            });
        });
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

        // Body part filter
        document.getElementById('bodyPartFilter').addEventListener('change', (e) => {
            this.currentBodyPart = e.target.value;
            this.currentIndex = 0;
            this.nextQuestion();
        });
    }

    setupBrowseMode() {
        const categoryFilter = document.getElementById('categoryFilter');
        
        // Populate category filter - will be updated when language changes
        this.updateCategoryFilter();

        categoryFilter.addEventListener('change', () => this.renderBoneList());
        document.getElementById('searchInput').addEventListener('input', () => this.renderBoneList());
    }

    updateCategoryFilter() {
        const categoryFilter = document.getElementById('categoryFilter');
        const currentValue = categoryFilter.value;
        categoryFilter.innerHTML = '';
        
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = this.translate('allCategories');
        categoryFilter.appendChild(allOption);
        
        const categories = [...new Set(Object.values(skeletalData).map(s => s.category))];
        categories.forEach(cat => {
            const option = document.createElement('option');
            const catText = this.getCategoryText(cat);
            option.value = catText;
            option.textContent = catText;
            categoryFilter.appendChild(option);
        });
        
        categoryFilter.value = currentValue || 'all';
    }

    setupMistakesMode() {
        document.getElementById('practiceMistakes').addEventListener('click', () => {
            if (this.mistakes.length === 0) {
                const emptyMsg = {
                    zh: '错题库为空！',
                    en: 'Mistake bank is empty!',
                    fi: 'Virhepankki on tyhjä!'
                };
                alert(emptyMsg[this.currentLanguage]);
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
        let bones = this.practiceMode === 'mistakes' ? this.mistakes : this.allBones;
        
        // Filter by body part
        if (this.currentBodyPart !== 'all') {
            bones = bones.filter(b => b.bodyPart === this.currentBodyPart);
        }
        
        if (bones.length === 0) {
            const noContentMsg = {
                zh: '没有可练习的内容',
                en: 'No content available for practice',
                fi: 'Ei harjoiteltavaa sisältöä'
            };
            document.getElementById('feedback').innerHTML = `<p class="info">${noContentMsg[this.currentLanguage]}</p>`;
            return;
        }

        this.currentBone = bones[this.currentIndex % bones.length];
        this.displayQuestion();
        this.updateProgress(bones.length);
        
        document.getElementById('answerInput').value = '';
        document.getElementById('feedback').innerHTML = '';
        document.getElementById('answerInput').focus();

        if (document.getElementById('playPronunciation').checked) {
            setTimeout(() => this.playPronunciation(), 500);
        }
    }

    displayQuestion() {
        if (!this.currentBone) return;
        
        const showFinnish = document.getElementById('showFinnish').checked;
        
        document.getElementById('boneCategory').textContent = this.getCategoryText(this.currentBone.category);
        
        // Create bone image placeholder
        const bonePlaceholder = `<div class="bone-image-placeholder">🦴</div>`;
        
        document.getElementById('boneName').innerHTML = bonePlaceholder + this.currentBone.chinese;
        
        let description = this.currentBone.description;
        if (showFinnish && this.currentBone.finnish) {
            description += `<br><strong>${this.translate('finnishName')}:</strong> ${this.currentBone.finnish}`;
        }
        
        if (this.currentBone.features && this.currentBone.features.length > 0) {
            description += `<br><strong>${this.translate('features')}:</strong><br>`;
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
            const messages = {
                zh: '请输入答案',
                en: 'Please enter an answer',
                fi: 'Syötä vastaus'
            };
            document.getElementById('feedback').innerHTML = `<p class="warning">${messages[this.currentLanguage]}</p>`;
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
            
            const correctMsg = {
                zh: '✓ 正确！',
                en: '✓ Correct!',
                fi: '✓ Oikein!'
            };
            
            document.getElementById('feedback').innerHTML = `
                <p class="correct">${correctMsg[this.currentLanguage]}</p>
                <p><strong>${this.translate('latinName')}:</strong> ${correctAnswer}</p>
                <p><strong>${this.translate('pronunciation')}:</strong> ${this.currentBone.pronunciation}</p>
            `;
        } else {
            this.addMistake(this.currentBone);
            
            const incorrectMsg = {
                zh: '✗ 错误',
                en: '✗ Incorrect',
                fi: '✗ Väärin'
            };
            const yourAnswerMsg = {
                zh: '您的答案',
                en: 'Your answer',
                fi: 'Vastauksesi'
            };
            const correctAnswerMsg = {
                zh: '正确答案',
                en: 'Correct answer',
                fi: 'Oikea vastaus'
            };
            
            document.getElementById('feedback').innerHTML = `
                <p class="incorrect">${incorrectMsg[this.currentLanguage]}</p>
                <p><strong>${yourAnswerMsg[this.currentLanguage]}:</strong> ${userAnswer}</p>
                <p><strong>${correctAnswerMsg[this.currentLanguage]}:</strong> ${correctAnswer}</p>
                <p><strong>${this.translate('pronunciation')}:</strong> ${this.currentBone.pronunciation}</p>
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
        const answerMsg = {
            zh: '答案',
            en: 'Answer',
            fi: 'Vastaus'
        };
        document.getElementById('feedback').innerHTML = `
            <p class="info"><strong>${answerMsg[this.currentLanguage]}:</strong> ${this.currentBone.latin}</p>
            <p><strong>${this.translate('pronunciation')}:</strong> ${this.currentBone.pronunciation}</p>
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

    updateProgress(totalBones) {
        let bones = this.practiceMode === 'mistakes' ? this.mistakes : this.allBones;
        
        // Filter by body part
        if (this.currentBodyPart !== 'all') {
            bones = bones.filter(b => b.bodyPart === this.currentBodyPart);
        }
        
        const total = totalBones || bones.length;
        const current = total > 0 ? (this.currentIndex % total) + 1 : 0;
        
        document.getElementById('progressText').textContent = `${current}/${total}`;
        
        const percentage = total > 0 ? (current / total) * 100 : 0;
        document.getElementById('progressFill').style.width = `${percentage}%`;
    }

    resetProgress() {
        const confirmMsg = {
            zh: '确定要重置所有进度吗？这将清除统计数据和错题库。',
            en: 'Are you sure you want to reset all progress? This will clear statistics and mistakes.',
            fi: 'Haluatko varmasti nollata kaiken edistyksen? Tämä tyhjentää tilastot ja virheet.'
        };
        if (confirm(confirmMsg[this.currentLanguage])) {
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
            bones = bones.filter(b => this.getCategoryText(b.category) === categoryFilter);
        }
        
        if (searchTerm) {
            bones = bones.filter(b => 
                b.chinese.toLowerCase().includes(searchTerm) ||
                b.latin.toLowerCase().includes(searchTerm) ||
                (b.finnish && b.finnish.toLowerCase().includes(searchTerm))
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
                <p><strong>${this.translate('latinName')}:</strong> ${bone.latin}</p>
                <p><strong>${this.translate('finnishName')}:</strong> ${bone.finnish}</p>
                <p><strong>${this.translate('pronunciation')}:</strong> ${bone.pronunciation}</p>
                <p><strong>${this.translate('category')}:</strong> ${this.getCategoryText(bone.category)}</p>
                <p>${bone.description}</p>
                ${featuresHtml}
            `;
            
            boneList.appendChild(card);
        });
        
        if (bones.length === 0) {
            const noMatchMsg = {
                zh: '未找到匹配的骨骼',
                en: 'No matching bones found',
                fi: 'Ei vastaavia luita löytynyt'
            };
            boneList.innerHTML = `<p class="info">${noMatchMsg[this.currentLanguage]}</p>`;
        }
    }

    renderMistakes() {
        const mistakesList = document.getElementById('mistakesList');
        mistakesList.innerHTML = '';
        
        if (this.mistakes.length === 0) {
            const emptyMsg = {
                zh: '错题库为空，继续加油！',
                en: 'Mistake bank is empty, keep it up!',
                fi: 'Virhepankki on tyhjä, jatka samaan malliin!'
            };
            mistakesList.innerHTML = `<p class="info">${emptyMsg[this.currentLanguage]}</p>`;
            return;
        }
        
        // Sort by most recent
        const sorted = [...this.mistakes].sort((a, b) => b.timestamp - a.timestamp);
        
        const mistakeCountLabel = {
            zh: '错误次数',
            en: 'Mistake count',
            fi: 'Virheiden määrä'
        };
        const lastMistakeLabel = {
            zh: '最后错误时间',
            en: 'Last mistake',
            fi: 'Viimeisin virhe'
        };
        const removeLabel = {
            zh: '移除',
            en: 'Remove',
            fi: 'Poista'
        };
        
        sorted.forEach(bone => {
            const card = document.createElement('div');
            card.className = 'mistake-card';
            
            const date = new Date(bone.timestamp).toLocaleString(this.currentLanguage === 'fi' ? 'fi-FI' : this.currentLanguage === 'en' ? 'en-US' : 'zh-CN');
            
            card.innerHTML = `
                <h3>${bone.chinese}</h3>
                <p><strong>${this.translate('latinName')}:</strong> ${bone.latin}</p>
                <p><strong>${this.translate('finnishName')}:</strong> ${bone.finnish}</p>
                <p><strong>${this.translate('pronunciation')}:</strong> ${bone.pronunciation}</p>
                <p><strong>${mistakeCountLabel[this.currentLanguage]}:</strong> ${bone.attempts || 1}</p>
                <p><strong>${lastMistakeLabel[this.currentLanguage]}:</strong> ${date}</p>
                <button class="remove-mistake" data-id="${bone.id}">${removeLabel[this.currentLanguage]}</button>
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
