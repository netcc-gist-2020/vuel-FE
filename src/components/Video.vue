<template>
  <div>
    <video></video>
  </div>
</template>

<script>
export default {
  data: () => ({
    mounted: false
  }),
  props: {
    mediaStream: MediaStream
  },
  mounted () {
    this.mounted = true
  },
  watch: {
    mediaStream: function () {
      if (this.mounted !== true ||
          this.mediaStream === null) {
        return
      }

      const video = this.$el.querySelector('video')
      video.muted = true

      video.srcObject = this.mediaStream

      video.addEventListener('loadedmetadata', () => {
        video.play()
      })
    }
  }
}
</script>
