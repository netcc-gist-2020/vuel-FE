import { mapGetters } from 'vuex'
import io from 'socket.io-client'
import Peer from 'peerjs'

export const classRoomMixin = {
  data: () => ({
    myPeer: new Peer(undefined, {
      host: '116.89.189.14',
      port: '3001'
    }),
    socket: io.connect('http://116.89.189.14:3000'),
    myStream: null,
    hostStream: null
  }),

  computed: {
    ...mapGetters([
      'getRoomID',
      'getAmIHost'
    ])
  },

  methods: {
    connectToNewUser (userId, stream) {
      const call = this.myPeer.call(userId, stream)
      console.log('I\'m calling ' + userId)

      call.on('stream', userVideoStream => {
      })

      call.on('close', () => {
      })
    }
  },

  mounted () {
    this.myPeer.on('open', id => {
      this.socket.emit('join-room', this.getRoomID, id)
    })

    this.socket.on('user-connected', userId => {
      console.log(userId + ' user is connected')
      if (this.getAmIHost) {
        console.log('hey')
        this.connectToNewUser(userId, this.myStream)
      }
    })

    if (this.getAmIHost === true) {
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(stream => {
        this.myStream = stream
        this.hostStream = this.myStream
      })
    } else {
      this.myPeer.on('call', call => {
        console.log('I got a call')
        call.answer(this.myStream)
        console.log('And I answered with ' + this.myStream)
        call.on('stream', hostVideoStream => {
          this.hostStream = hostVideoStream
          console.log('I got a stream')
        })
      })

      /*
      navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true
      }).then(stream => {
        this.host = stream
      })
      */
    }
  },

  beforeDestroy () {
    this.myStream.getTracks().forEach(track => {
      track.stop()
    })
  }
}
