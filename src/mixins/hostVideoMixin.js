import { mapGetters } from 'vuex'
import { Client, LocalStream, IonSFUJSONRPCSignal } from 'ion-sdk-js'

export const hostVideoMixin = {
  data: () => ({
    signal: null,
    client: null,
    hostStream: null
  }),

  computed: {
    ...mapGetters([
      'getRoomID',
      'getMyID',
      'getAmIHost'
    ])
  },

  created () {
    this.signal = new IonSFUJSONRPCSignal('ws://kvm05:7000/ws')
    this.client = new Client(this.getRoomID + '-host', this.signal)
  },

  mounted () {
    if (this.getAmIHost) {
      LocalStream.getUserMedia({
        audio: true,
        video: true,
        simulcast: true
      }).then(localStream => {
        this.hostStream = localStream.stream
        this.client.publish(localStream)
      })
    } else {
      this.client.ontrack = (track, stream) => {
        stream.preferLayer('high')
        this.hostStream = stream
      }
    }
  },

  beforeDestroy () {
    this.client.close()
  }
}
