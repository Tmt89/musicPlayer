/* Các bước code js cho trình phát nhạc mp3:
1. Render song
2. Scroll top
3. Play / pause / seek
4. CD rotate
5. Next / preview 
6. Random
7. Next / Repeat when ended
8. Active song
9. Scroll active song into view 
10. Play song when click */

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const pevBtn  = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
  // Biến biểu thị trạng thái dùng hay mở của audio
  isPlaying: false,
  // Biểu thị trạng thái của nút random
  isRandom: false,
  // Biểu thị trạng thái của nút repeat
  isReapeat: false,
  // Lấy ra phần tử đầu tiên trong mảng songs bằng cách đặt biến currentIndex
  currentindex: 0,
    songs: [
      { name: 'Một triệu like',
          singer: 'Đen vâu',
          path: './songs/update1/1millionlike.mp3',  
          image: './image/1millionlike.jpg'  
        },
        { name: 'You should bet on me',
          singer: 'Someone who is best singer',
          path: './songs/update1/betonme.mp3',  
          image: './image/betonme.jpg'  
        },
        { name: 'Mang tiền về cho mẹ',
          singer: 'Đen vâu',
          path: './songs/update1/bring mom moneys.mp3',  
          image: './image/bring mom money.jpg'  
        },
        { name: 'Cảm ơn',
          singer: 'Đen vâu', 
          path: './songs/update1/camon.mp3',  
          image: './image/thanks.jpg'  
        },
        { name: 'Không thích',
          singer: 'Low G',
          path: './songs/update1/dontlike.mp3',  
          image: './image/dontlike.jpg'  
        },
        { name: 'Everyboy die in their nightmare',
          singer: 'XXXTENTACION',
          path: './songs/update1/everybodydie.mp3',  
          image: './image/everybodydie.jpg'  
        },
        { name: 'Thích em hơi nhiều',
          singer: 'Wren Evan',
          path: './songs/update1/likeyoutoomuch.mp3',  
          image: './image/likeyoutoomuch.jpg'  
        },
        { name: 'Love me like that',
          singer: 'San Kim',
          path: './songs/update1/lovemelikethat.mp3',  
          image: './image/lovemelikethat.jpg'  
        },
        { name: 'Querry',
          singer: 'QNT - Trung Trần ft MCK',
          path: './songs/update1/querry.mp3',  
          image: './image/querry.jpg'  
        },
        { name: 'Lối nhỏ',
          singer: 'Đen vâu',
          path: './songs/update1/smallway.mp3',  
          image: './image/smallway.jpg'  
        },
        { name: 'Bước Qua Nhau',
          singer: 'Vũ',
          path: './songs/Buoc Qua Nhau - Vu.mp3',
          image: './image/buocqua.jpg'
        },
        { name: 'Ánh sao và mặt trời',
          singer: 'Tri',
          path: './songs/Anh Sao Va Bau Troi - T_R_I.mp3',  
          image: './image/AnhSao.jpg'  
        },
        { name: 'Bông hoa đẹp nhất',
          singer: 'Quân AP',
          path: './songs/Bong Hoa Dep Nhat - Quan A_P.mp3',  
          image: './image/Bonghoadepnhat.jpg'  
        },
        { name: 'Bông hoa chẳng thuộc về ta',
          singer: 'Việt',
          path: './songs/BÔNG HOA CHẲNG THUỘC VỀ TA - NHƯ VIỆT - OFFICIAL MUSIC VIDEO.mp3',  
          image: './image/Bonghoa.jpg'  
        },
        { name: 'Chúng ta của sau này',
          singer: 'Tri',
          path: './songs/ChungTaSauNay-TRI-6929586.mp3',  
          image: './image/chungta.jpg'  
        },
        { name: 'Meant To Be',
          singer: 'GDucky',
          path: './songs/meant to be.mp3',  
          image: './image/meantTobe.png'  
        },
        { name: 'Still With You',
          singer: 'Chris Andrian',
          path: './songs/jungkook - still with you (slowed down)༄.mp3',  
          image: './image/stillWithU.png'  
        },
        { name: 'Thói quen ( 25 mét vuông P1 )',
          singer: 'Hoàng Dũng - GDucky',
          path: './songs/Thoi Quen - Hoang Dung.mp3',  
          image: './image/thoiquen.jpg'  
        },
        { name: 'Flex in Circle K',
          singer: 'Flex',
          path: './songs/flex in circle k.mp3',  
          image: './image/flex.png'  
        },
        { name: 'Đã lỡ yêu em nhiều',
          singer: 'JustaTee',
          path: './songs/Da Lo Yeu Em Nhieu - JustaTee.mp3',  
          image: './image/dalo.jpg'  
        },
        
    ],
    // Hàm render dùng để lấy thông tin từ biến sóng sau đó tạo ra code html để hiển thị
    render: function(){
      const htmls = this.songs.map( (song, index) => {
        return `
        <div class="song hover ${index == this.currentindex? 'active': ''}" data-index = ${index}>
            <div class="thumb " style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
        </div>`
      })
      $('.playlist').innerHTML = htmls.join('');
    },
    
    // Hàm defineProperties dùng để định nghĩa ra các thuộc tính cần sử dụng
    // giúp cho việc code trở nên ngắn gọn dễ hiểu hơn
    defineProperties:function () {
      // Tạo ra thuộc tính tên là currentSong trả về bài hát hiện tại
      // đang phát
      Object.defineProperty(this, 'currentSong',{
        get: function () {
          return this.songs[this.currentindex]
        }
      })
    },
    handleEvents: function () {
      // Lấy ra con trỏ this của biến app
      _this = this
      // Lấy ra thuộc tính của class cd để làm chuyển động biến mất khi 
      // cuộn trang lên
      const cdwidth = cd.offsetWidth
      
      // Lắng nghe sự kiện cuộn trang để tạo hiệu ứng phóng to, thu nhỏ cd
      document.onscroll = function () {
        const scrollTop = document.documentElement.scrollTop
        const newCdWidth = cdwidth - scrollTop
        // Tạo hiệu ứng thu nhỏ và mờ dần cho cd  
        cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0;
        cd.style.opacity = newCdWidth  / cdwidth
      }
      // Xử lý cd quay với dừng
      const cdThumbAnimate = cdThumb.animate([
        {transform: 'rotate(360deg'}
      ],{
        duration: 10000, // Quay 1 vòng trong 10s
        iterations: Infinity // Quay vô hạn vòng
      })
      cdThumbAnimate.pause()

      // Xử lý khi click vào nút play code theo cách thông thường 
       /*playBtn.onclick = function () {
        if(_this.isPlaying){
          _this.isPlaying = false;
          audio.pause();
          player.classList.remove('playing')
        }
        else{
          _this.isPlaying = true
        audio.play()
        player.classList.add('playing')}
      }*/

      // Xử lý hành động click phát nhạc theo cách lắng nghe sự kiện của thẻ audio
      // Cách này được khuyên dùng vì nó sẽ giúp code mượt mà tránh bị lỗi 
      /* B1: lắng nghe được sự kiện đang diễn ra ở thẻ audio là play hay pause
        B2: Gán gí trị tương ứng với sự kiện vào biến isPlaying ( Đang phát nhạc thì là true)
        B3 Viết ra phương thức xử lý theo giá trị của isPlaying */
        audio.onplay = function () {
          _this.isPlaying = true
          player.classList.add('playing')
          cdThumbAnimate.play()
        }
        audio.onpause = function () {
          _this.isPlaying = false
          player.classList.remove('playing')
          cdThumbAnimate.pause()
        }
          playBtn.onclick = function () {
            if(_this.isPlaying){audio.pause()}
            else{audio.play()}
          }
      // Tạo hiệu ứng di chuyển theo tiến độ bài hát
      /* B1: lắng nghe thời gian hiện tại của bài hát và chia giá trị này cho 
             thời gian để lấy được giá trị phần trăm của bài hát đang chạy
         B2: Khi đã lấy được giá trị phần trăm này ta sẽ set giá trị này value của thẻ
             progress để tạo con trỏ chuyển động */
        audio.ontimeupdate = function (){
          if(audio.duration){
            const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
            progress.value = progressPercent
          }
        }
      // Xử lý khi tua song
        progress.oninput = function (){
          const seekTime = audio.duration / 100 * progress.value
          audio.currentTime = seekTime
        }
      // Xử lý khi bấm next songs
        nextBtn.onclick = function () {
          // Thêm thuộc tính random song khi baamss nút next bài
          if(_this.isRandom){
            _this.playRandomSong()
          }
          else{
            _this.nextSong()
          }
          audio.play()
          // Tạo hiệu ứng active cho bài hát hiện tại 
          _this.render()
          // Tạo hiệu ứng đẩy bài hát đang phát lên vị trí có thể nhìn thấy
          _this.scrollToActiveSong()
        }
      // Xử lý khi bấm pev song
        pevBtn.onclick = function () {
          if(_this.isRandom){
            _this.playRandomSong()
          }
          else{
            _this.pevSong()
          }
          audio.play()
          _this.render()
          _this.scrollToActiveSong()
        }
      // Xử lý bật tắt nút chọn bài ngẫu nhiên 
        randomBtn.onclick = function () {
          // Gán cho biến isRandom kết quả ngược lại của nó hiện tại
          _this.isRandom = !_this.isRandom
          // Nếu _this.isRandom có kết quả là true sẽ gán class active còn false thì
          // ngược lại 
          randomBtn.classList.toggle('active',_this.isRandom)
        }
      // Xử lý next bài khi phát hết bài hát
        audio.onended = function(){
          if(_this.isReapeat){
            audio.play()
          }
          else{
            nextBtn.click()
          }
        }
      // Xử lý phát lại 1 bài hát
        repeatBtn.onclick = function(){
          _this.isReapeat = !_this.isReapeat;
          repeatBtn.classList.toggle('active', _this.isReapeat);
        }
      // Xử lý hành vi bấm vào playlist
        playlist.onclick= function(e){
  // Biến e.target trả về thẻ mà ta click vào 
          const songNode = e.target.closest('.song:not(.active)')
  // Phương thức closet sẽ kiểm tra xem class trong ngoặc có hợp lệ ko và trả về true, false 
  // Trong câu lệnh if bên dưới nếu bấm vào thẻ có cả class song nhưng không có active
  // hoặc bấm vào thẻ có class option thì câu lệnh sẽ được gọi
          if(songNode || e.target.closest('.option')){
            if(songNode){
              _this.currentindex = Number(songNode.dataset.index)
              _this.loadCurrentSong()
              audio.play()
              _this.render()
            }
            if(e.target.closest('.option')){

            }
          }
        }

    },
    // Hàm loadCurrentSong tải audio phù hợp khi phát nhạc
    loadCurrentSong: function () {
     
      heading.textContent = this.currentSong.name;
      cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
      audio.src = this.currentSong.path
    },
    // Hàm chuyển bài hát
    nextSong: function () {
      this.currentindex++
      if(this.currentindex >= this.songs.length-1){
        this.currentindex = 0
      }
     
      this.loadCurrentSong()
    },
    // Hàm trở lại bài hát trước
    pevSong: function () {
      if(this.currentindex == 0 ){this.currentindex = this.songs.length-1}
      else{
        this.currentindex--
      }
      this.loadCurrentSong()
    },
    // Hàm chọn ngẫu nhiên bài hát
    playRandomSong: function () {
      let newIndex
      do{
        newIndex = Math.floor(Math.random() * this.songs.length)
      }
      while (newIndex == this.currentindex) 
      this.currentindex = newIndex
      this.loadCurrentSong()
    },
    // Hàm kéo tới bài hát đang phát
    scrollToActiveSong: function () {
      setTimeout(function () {
        // Sử dựng phương thức scrollIntoView (tra trên gg để học thêm)
        $('.song.active').scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        }
        )
      },100)
      
    },
    // Hàm start được dùng để gọi nhiều phương thức của object app trong 1 dòng code 
    start: function () {
      // Hàm định nghĩa các thuộc tính cho object
      this.defineProperties();
      // Lắng nghe và xử lý các sự kiện
      this.handleEvents();
      // Tải thông tin bài hát đầu tiên khi mở ứng dụng
      this.loadCurrentSong()
      // Render ra playlist cho file html
      this.render();
    }
}
app.start();
const opmodal = $('.info-admin-btn')
const modaltable = $('.modal-table')
const modal = $('.modal')
const exitModal = $('.table-exit')

function showModal() {
  modal.classList.add('open');
}
function hideModal(){
  modal.classList.remove('open');
}
opmodal.addEventListener('click', showModal);
exitModal.addEventListener('click', hideModal);
modal.addEventListener('click', hideModal);
modaltable.addEventListener('click', function(e){
  e.stopPropagation();
})