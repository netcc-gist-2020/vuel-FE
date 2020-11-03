export const videoToCanvasMixin = {
  data: () => ({
    myStream: null,
    video: document.createElement('video'),
    keepDrawing: true
  }),

  methods: {
    createWaitingAnimation (canvas) {
      this.keepDrawing = false

      const context = canvas.getContext('2d')
      const image = context.getImageData(0, 0, canvas.width, canvas.height)
      const data = image.data
      let i = 0

      for (i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const brightness = (r + g + b) / 3

        data[i] = data[i + 1] = data[i + 2] = brightness
      }

      context.putImageData(image, 0, 0)
    },
    async captureImageBaseURL () {
      const canvas = this.$el.querySelector('canvas')
      const base64 = canvas.toDataURL('image/jpeg')
      const blob = await fetch(base64).then(res => res.blob())

      return blob
    }
  },

  mounted () {
    function draw (video, context, width, height) {
      if (vm.keepDrawing) {
        context.drawImage(video, 0, 0, width, height)
        setTimeout(draw, 10, video, context, width, height)
      }
    }

    const video = this.video
    const canvas = this.$el.querySelector('canvas')
    const vm = this
    video.muted = true

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    }).then(stream => {
      video.srcObject = stream
      this.myStream = stream
      video.addEventListener('loadedmetadata', () => {
        console.log('metadata is loaded')
        video.play()
      })
    })

    video.addEventListener('play', () => {
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      draw(
        video,
        canvas.getContext('2d'),
        video.videoWidth,
        video.videoHeight
      )
    }, false)
  },

  beforeDestroy () {
    this.myStream.getTracks().forEach(track => {
      track.stop()
    })
  }
}
