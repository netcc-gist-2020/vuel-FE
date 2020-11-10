<template>
  <div class="lecview">
    <img :class="{ disappear: isStreaming }" src="@/assets/transprepare.png">
    <div id="vid" :class="{ disappear: !isStreaming }">
      <Video :mediaStream="lectureStream" :toReverse="false"/>
    </div>

    <div v-if="getAmIHost" class="btn-wrapper d-flex p-absolute selector">
      <v-select
        :items="mediaSourcesOptions"
        @change="selectSource"
        @click="getSources"
        label="Select"
        outlined
      ></v-select>
    </div>
  </div>
</template>

<script>
import { Client, IonSFUJSONRPCSignal, LocalStream } from 'ion-sdk-js'
import { desktopCapturer } from 'electron'
import { mapGetters } from 'vuex'
import Video from '@/components/Video'

export default {
  name: 'LectureView',
  components: {
    Video
  },
  data: () => ({
    signal: null,
    client: null,
    lectureStream: null,
    mediaSources: [],
    mediaMenu: null,
    sourcename: '',
    isStreaming: false
  }),
  computed: {
    ...mapGetters([
      'getRoomID',
      'getMyID',
      'getAmIHost',
      'getSfuURL'
    ]),

    mediaSourcesOptions () {
      return this.mediaSources.map(ms => ({
        text: ms.name,
        value: ms
      }))
    }
  },
  watch: {
    mediaSources: {
      immediate: true,
      handler (newSources) {
        console.log('new sources')
        console.log(newSources)
      }
    }
  },
  methods: {
    getSources () {
      desktopCapturer.getSources({ types: ['window', 'screen'] })
        .then(sources => {
          this.mediaSources = sources
        }).catch(console.log)
    },
    selectSource (source) {
      this.sourcename = source.name
      console.log(source.name)

      const constraints = {
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: source.id
          }
        }
      }

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          console.log(`stream: ${stream}`)
          this.lectureStream = stream
          this.isStreaming = true

          this.lectureStream = stream

          this.client.publish(new LocalStream(stream, {
            codec: 'VP8'
          }))
        })
    }
  },
  created () {
    this.signal = new IonSFUJSONRPCSignal(this.getSfuURL)
    this.client = new Client(this.getRoomID + '-lecture', this.signal)
    if (this.getAmIHost) {
      this.getSources()
      console.log('mso', this.mediaSourcesOptions)
    } else {
      this.client.ontrack = (track, stream) => {
        console.log('lecture track')
        stream.preferLayer('high')
        this.lectureStream = stream
        this.isStreaming = true
      }
    }
  }
}
</script>

<style>
.lecview {
  background: white;
  height: 100%;
  align-items: center;
}
img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.disappear {
  display: none;
}

#vid {
  width: 100%;
  height: 100%;
}
.selector{
  top: 10px;
}
</style>
