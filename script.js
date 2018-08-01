const PARAGRAPH = `NIH (Not Invented Here) isn’t a 4-letter word. We’re all presumably 
programmers because we like programming. We shouldn’t have to resign ourselves to the 
plumbing together of existing, poorly understood software, spending our days to write 
glue code we hate to produce a Frankenstein, monster system that sucks. We can do noble 
work and have it address problems from first principles. And that, in turn, makes us 
better more able engineers in the doing. NIH is a derogatory term for what I think is 
actually an incredibly important and virtuous impulse that is to invent and to create, 
to learn by doing. Of course, we have to strike a balance between self-actualizing and 
getting the job done, but I don’t think we should take inventing something from first 
principles out of our tool belt kind of reflexively. Sometimes it can be the right thing 
to do and it can help us grow as professionals and as human beings.`
new Vue({
    el: '#app',
    data: {
        title: 'Vue typer',
        originalText: PARAGRAPH,
        typedText: '',
        typoIndex: -1
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
        }
    },
    watch: {
        typedText: function(value) {
            for (let i = 0; i < value.length; i++) {
                if (value[i] !== this.originalText[i]) {
                    this.typoIndex = i
                    break
                }
                this.typoIndex = -1
            }
        }
    }
});
