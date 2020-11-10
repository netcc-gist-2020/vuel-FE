<template>
  <div class="lecview">
    <img :class="{ disappear: isStreaming }" src="@/assets/transprepare.png">
    <div id="vid" :class="{ disappear: !isStreaming }">
      <Video :mediaStream="lectureStream" :toReverse="false"/>
      <p> {{ sourcename }} </p>
    </div>

    <div v-if="getAmIHost" class="btn-wrapper d-flex p-absolute selector">
      <v-btn @click="popupMenu" fab> 선택 </v-btn>
      <v-select :items=mediaSources label="Select" outlined></v-select>
    </div>
  </div>
</template>

<script>
import { Client, IonSFUJSONRPCSignal, LocalStream } from 'ion-sdk-js'
import { desktopCapturer, remote } from 'electron'
import { mapGetters } from 'vuex'
import Video from '@/components/Video'

const { Menu } = remote

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
    ])
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
    popupMenu () {
      this.mediaMenu.popup()
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
  },
  mounted () {
    if (this.getAmIHost) {
      desktopCapturer.getSources({ types: ['window', 'screen'] })
        .then(sources => {
          this.mediaSources = sources

          this.mediaMenu = Menu.buildFromTemplate(
            sources.map(source => ({
              label: source.name,
              click: () => this.selectSource(source)
            }))
          )

          console.log(sources)
        }).catch(console.log)
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
