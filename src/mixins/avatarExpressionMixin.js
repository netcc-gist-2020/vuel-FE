import gsap from 'gsap'

export const avatarExpressionMixin = {
  props: {
    userId: String,
    index: Number,
    absence: Boolean,
    expression: String,
    eyeDir: String,
    isSpy: Boolean
  },

  methods: {
    my (selector) { return `.id_${this.userId} ${selector}` },

    getExpression (expression, eyeDir) {
      console.log('expression: ', expression)
      if (eyeDir === 'left') this.lookLeft()
      else if (eyeDir === 'right') this.lookRight()
      else this.lookCenter()

      if (expression === 'happy') this.happy()
      else if (expression === 'sleepy') this.sleepy()
      else this.normal()
    },
    rmSaliva () {
      const at = 0.3
      gsap.to(this.my('#saliva'), { opacity: 0, duration: 0.1 })
      gsap.to(this.my('#saliva'), { duration: at, y: -5 })
    },
    normal () {
      const at = 0.3
      this.rmSaliva()
      gsap.to(this.my('#norm_right'), { duration: at, morphSVG: this.my('#norm_right') })
      gsap.to(this.my('#norm_left'), { duration: at, morphSVG: this.my('#norm_left') })
      gsap.to(this.my('#mouth_center'), { duration: at, morphSVG: this.my('#mouth_center') })
    },
    lookLeft () {
      const at = 0.3
      this.normal()
      gsap.to(this.my('#face'), { duration: at, morphSVG: this.my('#face_left') })
      gsap.to(this.my('#nose_center'), { duration: at, morphSVG: this.my('#nose_left') })
      gsap.to(this.my('.eye'), { duration: at, x: -10 })
      gsap.to(this.my('#mouth_center'), { duration: at, x: -10 })
    },
    lookCenter () {
      const at = 0.3
      this.normal()
      this.rmSaliva()
      gsap.to(this.my('#face'), { duration: at, morphSVG: this.my('#face') })
      gsap.to(this.my('#nose_center'), { duration: at, morphSVG: this.my('#nose_center') })
      gsap.to(this.my('.eye'), { duration: at, x: 0 })
      gsap.to(this.my('#mouth_center'), { duration: at, x: 0 })
    },
    lookRight () {
      const at = 0.3
      this.normal()
      gsap.to(this.my('#face'), { duration: at, morphSVG: this.my('#face_right') })
      gsap.to(this.my('#nose_center'), { duration: at, morphSVG: this.my('#nose_right') })
      gsap.to(this.my('.eye'), { duration: at, x: 10 })
      gsap.to(this.my('#mouth_center'), { duration: at, x: 10 })
    },
    sleepy () {
      const at = 0.3
      this.lookCenter()
      gsap.to(this.my('#norm_right'), { duration: at, morphSVG: this.my('#sleepy_right') })
      gsap.to(this.my('#norm_left'), { duration: at, morphSVG: this.my('#sleepy_left') })
      gsap.to(this.my('#mouth_center'), { duration: at, morphSVG: this.my('#mouth_sleepy') })
      gsap.to(this.my('#saliva'), { opacity: 100, duration: at })
      gsap.to(this.my('#saliva'), { duration: at, delay: at, y: 5 })
    },
    happy () {
      const at = 0.3
      console.log('trying to be happy')
      this.lookCenter()
      gsap.to(this.my('#norm_right'), { duration: at, morphSVG: this.my('#happy_right') })
      gsap.to(this.my('#norm_left'), { duration: at, morphSVG: this.my('#happy_left') })
      gsap.to(this.my('#mouth_center'), { duration: at, morphSVG: this.my('#mouth_happy') })
    },
    spy () {
      const at = 0.3
      console.log('I am Spy')
      gsap.fromTo('#Spy', { opacity: 0 }, { opacity: 1, duration: at })
    },
    notspy () {
      const at = 0.3
      console.log('I am not Spy')
      gsap.fromTo('#Spy', { opacity: 1 }, { opacity: 0, duration: at })
    }
  },
  watch: {
    expression (exp) {
      console.log('Expression for svg avatar is: ' + exp)
      this.getExpression(exp, this.eyeDir)
      // this.expression = exp
    },
    eyeDir (edir) {
      this.getExpression(this.expression, edir)
      // this.eyeDir = edir
    }
  },
  mounted () {
  }
}
