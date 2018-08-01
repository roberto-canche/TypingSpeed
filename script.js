const PARAGRAPH = `NIH (Not Invented Here) isn't a 4-letter word. We're all presumably 
programmers because we like programming. We shouldn't have to resign ourselves to the 
plumbing together of existing, poorly understood software, spending our days to write 
glue code we hate to produce a Frankenstein, monster system that sucks. We can do noble 
work and have it address problems from first principles. And that, in turn, makes us 
better more able engineers in the doing. NIH is a derogatory term for what I think is 
actually an incredibly important and virtuous impulse that is to invent and to create, 
to learn by doing. Of course, we have to strike a balance between self-actualizing and 
getting the job done, but I don't think we should take inventing something from first 
principles out of our tool belt kind of reflexively. Sometimes it can be the right thing 
to do and it can help us grow as professionals and as human beings.`
new Vue({
    el: '#app',
    data: {
        title: 'Vue typer',
        originalText: PARAGRAPH,
        typedText: '',
        typoIndex: -1,
        timer: 60,
        typing: false,
        timerInterval: {},
        typos: 0,
        scores: []
    },
    methods: {
        startTimer: function() {
            this.timerInterval = setInterval( () => {
                if(this.timer === 0) {
                    this.endTypingSpeed()
                    this.calculateScore()
                    return
                }
                this.timer--
            }, 1000)
        },
        // Cambiar valor a true de typing al empezar a escribir
        // Y empezar contador
        startTypingSpeed: function() {
            this.typing = true
            this.startTimer()
        },
        // Al terminar de teclear cambiar valor de typing a false
        // blur en area a escribir
        endTypingSpeed: function() {
            clearInterval(this.timerInterval)
            this.typing = false
            this.timer = 60
            document.activeElement.blur()
        },
        // Resetear todos los valore
        reset: function(){
            clearInterval(this.timerInterval)
            this.typing = false
            this.typoIndex = -1
            this.typedText = ''
            this.timer = 60
        },
        calculateScore: function(){
            let score = {}
            let correctlyTypedText = this.typedText
            if(this.typoIndex != -1) {
                correctlyTypedText = this.originalText.substring(0, this.typoIndex)
            }
            let words = correctlyTypedText.split(' ').length
            score = {
                wpm: words,
                typos: this.typos
            }

            // reset typos
            this.typos = 0
            this.scores.push(score)
        }
    },
    computed: {
        outputHTML: function() {
            let newHtml = '<span class="correct">'
            if(this.typoIndex === -1) {
                // We do not a typo index
                newHtml += this.originalText.substr(0, this.typedText.length)
                newHtml += '</span>'
                newHtml += this.originalText.substr(this.typedText.length)

                return newHtml
            }

            // else we have a typo index
            newHtml += this.originalText.substr(0, this.typoIndex)
            newHtml += '</span>'
            newHtml += '<span class="typo">'
            newHtml += this.originalText.substring(this.typoIndex, this.typedText.length)
            newHtml += '</span>'
            newHtml += this.originalText.substr(this.typedText.length)

            return newHtml
        },
        sortedScores: function() {
            return this.scores.sort((a, b) => {
                return a.wpm + a.typos - (b.wpm + b.typos);
            })
        }
    },
    watch: {
        typedText: function(value) {
            if(!this.typing) {
                this.startTypingSpeed()
            }
            for (let i = 0; i < value.length; i++) {
                if (value[i] !== this.originalText[i]) {
                    this.typoIndex = i
                    this.typos++
                    break
                }
                this.typoIndex = -1
            }
        }
    }
});
