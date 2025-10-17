// Anatomy Practice Application
class AnatomyPractice {
    constructor() {
        this.boneParts = [];
        this.learnedBones = new Set();
        this.currentQuizQuestion = null;
        this.quizScore = 0;
        this.quizTotal = 0;
        this.quizQuestions = [];
        this.currentQuestionIndex = 0;
        
        this.init();
    }

    init() {
        // Get all bone parts
        this.boneParts = Array.from(document.querySelectorAll('.bone-part'));
        
        // Update total count
        document.getElementById('total-count').textContent = this.boneParts.length;
        
        // Add click event listeners to all bone parts
        this.boneParts.forEach(bone => {
            bone.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleBoneClick(bone);
            });
        });

        // Setup button event listeners
        document.getElementById('close-info').addEventListener('click', () => {
            this.hideBoneInfo();
        });

        document.getElementById('quiz-btn').addEventListener('click', () => {
            this.startQuiz();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.reset();
        });

        document.getElementById('close-quiz-btn').addEventListener('click', () => {
            this.closeQuiz();
        });

        document.getElementById('next-question-btn').addEventListener('click', () => {
            this.nextQuestion();
        });

        // Click outside bone info to close
        document.addEventListener('click', (e) => {
            const boneInfo = document.getElementById('bone-info');
            if (!boneInfo.contains(e.target) && !e.target.closest('.bone-part')) {
                this.hideBoneInfo();
            }
        });
    }

    handleBoneClick(bone) {
        // Mark as clicked
        this.boneParts.forEach(b => b.classList.remove('clicked'));
        bone.classList.add('clicked');
        
        // Mark as learned
        if (!this.learnedBones.has(bone.id)) {
            this.learnedBones.add(bone.id);
            bone.classList.add('learned');
            this.updateLearnedCount();
        }

        // Show bone information
        this.showBoneInfo(bone);
    }

    showBoneInfo(bone) {
        const latinName = bone.dataset.name;
        const chineseName = bone.dataset.chinese;
        
        document.getElementById('bone-name-latin').textContent = latinName;
        document.getElementById('bone-name-chinese').textContent = chineseName;
        document.getElementById('bone-info').classList.remove('hidden');
    }

    hideBoneInfo() {
        document.getElementById('bone-info').classList.add('hidden');
        this.boneParts.forEach(b => b.classList.remove('clicked'));
    }

    updateLearnedCount() {
        document.getElementById('learned-count').textContent = this.learnedBones.size;
    }

    reset() {
        if (confirm('确定要重置所有进度吗？ / Are you sure you want to reset all progress?')) {
            this.learnedBones.clear();
            this.boneParts.forEach(bone => {
                bone.classList.remove('learned', 'clicked');
            });
            this.updateLearnedCount();
            this.hideBoneInfo();
        }
    }

    startQuiz() {
        if (this.learnedBones.size < 4) {
            alert('请至少学习4个骨骼部位才能开始测验！\nPlease learn at least 4 bone parts before starting the quiz!');
            return;
        }

        // Generate quiz questions from learned bones
        this.quizQuestions = Array.from(this.learnedBones).map(boneId => {
            const bone = document.getElementById(boneId);
            return {
                id: boneId,
                latinName: bone.dataset.name,
                chineseName: bone.dataset.chinese
            };
        });

        // Shuffle questions
        this.quizQuestions = this.shuffleArray(this.quizQuestions);
        
        this.currentQuestionIndex = 0;
        this.quizScore = 0;
        this.quizTotal = 0;

        // Show quiz modal
        document.getElementById('quiz-modal').classList.remove('hidden');
        
        this.showQuestion();
    }

    showQuestion() {
        if (this.currentQuestionIndex >= this.quizQuestions.length) {
            this.showQuizResults();
            return;
        }

        const question = this.quizQuestions[this.currentQuestionIndex];
        this.currentQuizQuestion = question;

        // Generate options (correct answer + 3 random wrong answers)
        const options = [question];
        const otherBones = this.quizQuestions.filter(q => q.id !== question.id);
        
        while (options.length < 4 && otherBones.length > 0) {
            const randomIndex = Math.floor(Math.random() * otherBones.length);
            const randomBone = otherBones.splice(randomIndex, 1)[0];
            if (!options.find(o => o.id === randomBone.id)) {
                options.push(randomBone);
            }
        }

        // Shuffle options
        const shuffledOptions = this.shuffleArray(options);

        // Display question
        document.getElementById('quiz-question').textContent = 
            `请选择这个骨骼的拉丁文名称 / Select the Latin name: ${question.chineseName}`;

        // Display options
        const optionsContainer = document.getElementById('quiz-options');
        optionsContainer.innerHTML = '';
        
        shuffledOptions.forEach(option => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'quiz-option';
            optionDiv.textContent = option.latinName;
            optionDiv.dataset.boneId = option.id;
            
            optionDiv.addEventListener('click', () => {
                this.checkAnswer(option.id, optionDiv);
            });
            
            optionsContainer.appendChild(optionDiv);
        });

        // Hide result and next button
        document.getElementById('quiz-result').classList.add('hidden');
        document.getElementById('next-question-btn').classList.add('hidden');
    }

    checkAnswer(selectedId, optionElement) {
        const isCorrect = selectedId === this.currentQuizQuestion.id;
        
        this.quizTotal++;
        if (isCorrect) {
            this.quizScore++;
        }

        // Update score display
        document.getElementById('quiz-score').textContent = this.quizScore;
        document.getElementById('quiz-total').textContent = this.quizTotal;

        // Disable all options
        const allOptions = document.querySelectorAll('.quiz-option');
        allOptions.forEach(opt => {
            opt.classList.add('disabled');
            opt.style.pointerEvents = 'none';
            
            // Highlight correct answer
            if (opt.dataset.boneId === this.currentQuizQuestion.id) {
                opt.classList.add('correct');
            } else if (opt === optionElement && !isCorrect) {
                opt.classList.add('incorrect');
            }
        });

        // Show result
        const resultDiv = document.getElementById('quiz-result');
        resultDiv.classList.remove('hidden', 'correct', 'incorrect');
        
        if (isCorrect) {
            resultDiv.textContent = '正确！ / Correct!';
            resultDiv.classList.add('correct');
        } else {
            resultDiv.textContent = `错误！正确答案是 / Wrong! The correct answer is: ${this.currentQuizQuestion.latinName}`;
            resultDiv.classList.add('incorrect');
        }

        // Show next button
        document.getElementById('next-question-btn').classList.remove('hidden');
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.showQuestion();
    }

    showQuizResults() {
        const percentage = Math.round((this.quizScore / this.quizTotal) * 100);
        
        document.getElementById('quiz-question').textContent = '测验完成！ / Quiz Complete!';
        
        const resultsDiv = document.createElement('div');
        resultsDiv.className = 'quiz-completion';
        
        const scoreHeading = document.createElement('h3');
        scoreHeading.textContent = `${this.quizScore} / ${this.quizTotal}`;
        resultsDiv.appendChild(scoreHeading);
        
        const accuracyPara = document.createElement('p');
        accuracyPara.textContent = `准确率 / Accuracy: ${percentage}%`;
        resultsDiv.appendChild(accuracyPara);
        
        const encouragementPara = document.createElement('p');
        encouragementPara.className = 'encouragement';
        encouragementPara.textContent = percentage >= 80 ? '太棒了！/ Excellent!' : 
                                         percentage >= 60 ? '做得好！/ Good job!' : 
                                         '继续练习！/ Keep practicing!';
        resultsDiv.appendChild(encouragementPara);
        
        document.getElementById('quiz-options').innerHTML = '';
        document.getElementById('quiz-options').appendChild(resultsDiv);
        
        document.getElementById('quiz-result').classList.add('hidden');
        document.getElementById('next-question-btn').classList.add('hidden');
    }

    closeQuiz() {
        document.getElementById('quiz-modal').classList.add('hidden');
    }

    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AnatomyPractice();
});
