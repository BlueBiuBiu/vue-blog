<template>
  <div class="music">
    <div class="prompt">从什么时候开始，只剩下了音乐懂你~</div>
    <input type="text" @keyup.enter="search" v-model="searchContent" placeholder="开启你的音乐之旅吧~"/>
    <div class="search-list" v-show="isShow">
      <div v-for="(item, index) in result" class="search-item" :key="index">
        <span>{{ (index + 1) | padStart }}</span>
        <span class="name">{{ item.name }}</span>
        <img src="~assets/img/play.svg" @click="play(item.id, index)" alt="" />
      </div>
    </div>
    <footer v-show="isAudio">
      <div class="player">
        <div class="title">
          <img :src="musicImg[currentIndex] | defaultImg" alt="" />
          <span class="name">{{ musicName[currentIndex] | defaultName}}</span>
          <img
            v-if="isPlay"
            src="~assets/img/pause.svg"
            alt=""
            @click="start"
          />
          <img v-else src="~assets/img/play.svg" alt="" @click="start" />
        </div>
        <audio ref="audio" :src="url" loop></audio>
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "",
  data() {
    return {
      searchContent: "",
      result: [],
      url: "",
      isShow: false,
      isAudio: true,
      musicId: 0,
      musicImg: [],
      musicName: [],
      isPlay: true,
      currentIndex: 0,
    };
  },
  methods: {
    play(id, index) {
      this.searchContent = "";
      this.currentIndex = index;
      this.musicId = id;
      axios({
        url: "https://autumnfish.cn/song/url",
        params: {
          id,
        },
      }).then((res) => {
        this.url = res.data.data[0].url;
      });
      this.isAudio = true;
      this.isShow = false;
      this.$refs.audio.addEventListener("canplay", () => {
        this.$refs.audio.play();
      });
    },
    start() {
      this.isPlay = !this.isPlay;
      if (this.isPlay) {
        this.$refs.audio.play();
      } else {
        this.$refs.audio.pause();
      }
    },
    search() {
      axios({
        url: "https://autumnfish.cn/search",
        params: {
          keywords: this.searchContent,
        },
      }).then((res) => {
        this.musicImg = [];
        this.musicName = [];
        this.result = res.data.result.songs;
        for (let item of res.data.result.songs) {
          this.musicImg.push(item.artists[0].img1v1Url);
          this.musicName.push(item.name);
        }
      });
      this.isShow = true;
      this.isAudio = false;
    },
  },
  filters: {
    padStart(index) {
      return index.toString().padStart(2, 0);
    },
    defaultImg(value) {
      if(!value) return require("assets/img/playDefaultBgc.jpg")
      return value
    },
    defaultName(value) {
      if(!value) return "请在搜索框输入搜索歌名吧~"
      return value
    }
  },
};
</script>

<style scoped>
.music {
  width: 350px;
  height: 230px;
  border-radius: 5px;
  margin-top: 10px;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, .4);
}

.music .prompt {
  padding-top: 10px;
  margin-bottom: 20px;
  font-size: 15px;
  font-weight: 700;
  font-style: italic;
}

.music input {
  width: 280px;
  height: 35px;
  border-radius: 5px;
  border: 1px solid #f5f5f5;
  border-bottom-right-radius: 0;
  color: #fff;
  outline: none;
  background-color: transparent;
}

.music input::placeholder {
  color: rgb(213, 211, 211);
  font-style: italic;
  font-size: 13px;
}

.music .search-list {
  margin: 0 auto;
  width: 280px;
  height: 130px;
  overflow: scroll;
  overflow-x: hidden;
}

/* 滑轮样式 */
::-webkit-scrollbar {
  width: 8px;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  border-radius: 0 0 10px 10px;
  background-color: #f5f5f5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.5);
}

.music .search-list .search-item {
  width: 100%;
  height: 25px;
  line-height: 25px;
  display: flex;
  justify-content: space-between;
}

.music .search-list img {
  position: relative;
  top: 5px;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.music .search-list img:hover {
  cursor: pointer;
}

.music .search-list .search-item .name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 7px;
}

.music .player {
  width: 280px;
  height: 100px;
  margin: 20px auto;
  border-radius: 15px;
  text-align: left;
  background-color: rgba(10, 172, 241, 0.3);
}

.music .player img:first-of-type {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  margin: 0 10px;
  animation: rotate 3.5s infinite linear;
}

@keyframes rotate
{
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.music .player .title {
  display: flex;
  align-items: center;
  padding-top: 10px;
}

.music .player .title .name {
  width: 100px;
  height: 35px;
  font-size: 13px;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin: 20px 10px;
}

.music .player img:nth-of-type(2) {
  width: 45px;
  height: 45px;
  margin: 20px;
}

.music .player img:nth-of-type(3) {
  width: 45px;
  height: 45px;
  margin: 20px;
}
</style>
