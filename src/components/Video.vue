<template>
  <div class="text-center" style="width: 100%;">
    <video :class="{ notLoaded: !isMediaLoaded }"></video>

    <v-progress-circular :class="{ notLoaded: isMediaLoaded }"
      style="height: 100%; width: 70px;"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  data: () => ({
    mounted: false,
    isMediaLoaded: false
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
        this.isMediaLoaded = true
      })
    }
  }
}
</script>

<style>
.notLoaded {
  display: none;
}
</style>
