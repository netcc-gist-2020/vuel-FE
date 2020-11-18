import gsap from 'gsap'

export const avatarExpressionMixin = {
  data: () => ({
    at: 0.3
  }),
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

    getExpression (expression, eyeDir, isSpy, absence) {
      console.log('expression: ', expression)
      if (absence) this.Absence()
      else {
        this.Present()
        if (isSpy) this.spy()
        else this.notspy()

        if (eyeDir === 'left') this.lookLeft()
        else if (eyeDir === 'right') this.lookRight()
        else this.lookCenter()

        if (expression === 'happy') this.happy()
        else if (expression === 'sleepy') this.sleepy()
        else this.normal()
      }
    },
    rmSaliva () {
      gsap.to(this.my('#saliva'), { opacity: 0, duration: 0.1 })
      gsap.to(this.my('#saliva'), { duration: this.at, y: -5 })
    },
    normal () {
      this.rmSaliva()
      gsap.to(this.my('#norm_right'), { duration: this.at, morphSVG: this.my('#norm_right') })
      gsap.to(this.my('#norm_left'), { duration: this.at, morphSVG: this.my('#norm_left') })
      gsap.to(this.my('#mouth_center'), { duration: this.at, morphSVG: this.my('#mouth_center') })
    },
    lookLeft () {
      this.normal()
      gsap.to(this.my('#face'), { duration: this.at, morphSVG: this.my('#face_left') })
      gsap.to(this.my('#nose_center'), { duration: this.at, morphSVG: this.my('#nose_left') })
      gsap.to(this.my('.eye'), { duration: this.at, x: -10 })
      gsap.to(this.my('#mouth_center'), { duration: this.at, x: -10 })
    },
    lookCenter () {
      this.normal()
      this.rmSaliva()
      gsap.to(this.my('#face'), { duration: this.at, morphSVG: this.my('#face') })
      gsap.to(this.my('#nose_center'), { duration: this.at, morphSVG: this.my('#nose_center') })
      gsap.to(this.my('.eye'), { duration: this.at, x: 0 })
      gsap.to(this.my('#mouth_center'), { duration: this.at, x: 0 })
    },
    lookRight () {
      this.normal()
      gsap.to(this.my('#face'), { duration: this.at, morphSVG: this.my('#face_right') })
      gsap.to(this.my('#nose_center'), { duration: this.at, morphSVG: this.my('#nose_right') })
      gsap.to(this.my('.eye'), { duration: this.at, x: 10 })
      gsap.to(this.my('#mouth_center'), { duration: this.at, x: 10 })
    },
    sleepy () {
      this.lookCenter()
      gsap.to(this.my('#norm_right'), { duration: this.at, morphSVG: this.my('#sleepy_right') })
      gsap.to(this.my('#norm_left'), { duration: this.at, morphSVG: this.my('#sleepy_left') })
      gsap.to(this.my('#mouth_center'), { duration: this.at, morphSVG: this.my('#mouth_sleepy') })
      gsap.to(this.my('#saliva'), { opacity: 100, duration: this.at })
      gsap.to(this.my('#saliva'), { duration: this.at, delay: this.at, y: 5 })
    },
    happy () {
      console.log('trying to be happy')
      this.lookCenter()
      gsap.to(this.my('#norm_right'), { duration: this.at, morphSVG: this.my('#happy_right') })
      gsap.to(this.my('#norm_left'), { duration: this.at, morphSVG: this.my('#happy_left') })
      gsap.to(this.my('#mouth_center'), { duration: this.at, morphSVG: this.my('#mouth_happy') })
    },
    spy () {
      console.log('I am Spy')
      gsap.to(this.my('#Spy'), { opacity: 1, duration: this.at })
    },
    notspy () {
      console.log('I am not Spy')
      gsap.to(this.my('#Spy'), { opacity: 0, duration: this.at })
    },
    Absence () {
      gsap.to(this.my('.absence'), { opacity: 1, duration: this.at })
      gsap.to(this.my('.present'), { opacity: 0, duration: this.at })
    },
    Present () {
      gsap.to(this.my('.absence'), { opacity: 0, duration: this.at })
      gsap.to(this.my('.present'), { opacity: 1, duration: this.at })
    }
  },
  watch: {
    expression (exp) {
      // console.log('Expression for svg avatar is: ' + exp)
      this.getExpression(exp, this.eyeDir, this.isSpy, this.absence)
    },
    eyeDir (edir) {
      this.getExpression(this.expression, edir, this.isSpy, this.absence)
    },
    isSpy (sspy) {
      this.getExpression(this.expression, this.eyeDir, sspy, this.absence)
    },
    absence (abs) {
      this.getExpression(this.expression, this.eyeDir, this.isSpy, abs)
    }
  },
  mounted () {
  }
}
