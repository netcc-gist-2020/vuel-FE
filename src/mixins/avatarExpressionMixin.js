import gsap from 'gsap'

export const avatarExpressionMixin = {
  props: {
    userId: String,
    index: Number,
    absence: String,
    expression: String,
    eyeDir: String
  },

  methods: {
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
      gsap.to('#saliva', { opacity: 0, duration: 0.1 })
      gsap.to('#saliva', { duration: at, y: -5 })
    },
    normal () {
      const at = 0.3
      this.rmSaliva()
      gsap.to('#norm_right', { duration: at, morphSVG: '#norm_right' })
      gsap.to('#norm_left', { duration: at, morphSVG: '#norm_left' })
      gsap.to('#mouth_center', { duration: at, morphSVG: '#mouth_center' })
    },
    lookLeft () {
      const at = 0.3
      this.normal()
      gsap.to('#face', { duration: at, morphSVG: '#face_left' })
      gsap.to('#nose_center', { duration: at, morphSVG: '#nose_left' })
      gsap.to('.eye', { duration: at, x: -10 })
      gsap.to('#mouth_center', { duration: at, x: -10 })
    },
    lookCenter () {
      const at = 0.3
      this.normal()
      this.rmSaliva()
      gsap.to('#face', { duration: at, morphSVG: '#face' })
      gsap.to('#nose_center', { duration: at, morphSVG: '#nose_center' })
      gsap.to('.eye', { duration: at, x: 0 })
      gsap.to('#mouth_center', { duration: at, x: 0 })
    },
    lookRight () {
      const at = 0.3
      this.normal()
      gsap.to('#face', { duration: at, morphSVG: '#face_right' })
      gsap.to('#nose_center', { duration: at, morphSVG: '#nose_right' })
      gsap.to('.eye', { duration: at, x: 10 })
      gsap.to('#mouth_center', { duration: at, x: 10 })
    },
    sleepy () {
      const at = 0.3
      this.lookCenter()
      gsap.to('#norm_right', { duration: at, morphSVG: '#sleepy_right' })
      gsap.to('#norm_left', { duration: at, morphSVG: '#sleepy_left' })
      gsap.to('#mouth_center', { duration: at, morphSVG: '#mouth_sleepy' })
      gsap.to('#saliva', { opacity: 100, duration: at })
      gsap.to('#saliva', { duration: at, delay: at, y: 5 })
    },
    happy () {
      const at = 0.3
      console.log('trying to be happy')
      this.lookCenter()
      gsap.to('#norm_right', { duration: at, morphSVG: '#happy_right' })
      gsap.to('#norm_left', { duration: at, morphSVG: '#happy_left' })
      gsap.to('#mouth_center', { duration: at, morphSVG: '#mouth_happy' })
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
