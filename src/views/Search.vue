<template>
  <div class="search">
    <div class="top">
      <div class="arrow" @click="this.$router.go(-1)">
        <svg class="icon liebiao" aria-hidden="true" @click="backHome">
          <use xlink:href="#icon-zuojiantou"></use>
        </svg>
      </div>
      <van-search
        v-model="keyword"
        show-action
        placeholder="请输入搜索内容"
        @search="onSearch"
      >
        <template #action>
          <div @click="onSearch">搜索</div>
        </template>
      </van-search>
    </div>
    <div class="history">
      <div class="del">
        <svg class="icon" aria-hidden="true" @click="delHistory">
          <use xlink:href="#icon-shanchu"></use>
        </svg>
      </div>
      <span class="his">历史</span>
      <span
        class="item"
        v-for="item in singerList"
        :key="item"
        @click="isKeyword(item)"
        >{{ item }}</span
      >
    </div>
    <div class="music-item" v-for="(item, index) in searchList" :key="item.id">
      <div class="left" @click="playMusic(item)">
        <span>{{ index + 1 }}</span>
        <span class="song">
          <span class="song-name">{{ item.name }}</span>
          <span>
            <span
              v-for="author in item.artists"
              :key="author.id"
              class="author-name"
            >
              {{ author.name }}
            </span>
          </span>
        </span>
      </div>
      <div class="right">
        <svg class="icon bofang" aria-hidden="true" v-if="item.mvid != 0">
          <use xlink:href="#icon-shipin"></use>
        </svg>
        <svg class="icon liebiao" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import {getSearchList} from '@/api/serch'
export default {
  data() {
    return {
      keyword: "",
      singerList: [],
      searchList:[]
    };
  },
  methods: {
    async onSearch() {
      if (this.singerList.indexOf(this.keyword) == -1) {
        this.singerList.unshift(this.keyword);
      }
      // 最多为11个
      if(this.singerList.length>10) {
        this.singerList=this.singerList.splice(this.singerList.length-1,1)
      }
      localStorage.setItem("singerList", JSON.stringify(this.singerList));
      let res=await getSearchList(this.keyword)
      this.searchList=res.result.songs
      this.keyword = "";
    },
    async isKeyword(item) {
      this.keyword = item;
      let res=await getSearchList(this.keyword)
      this.searchList=res.result.songs
    },
    playMusic(item){
      // 把当前的歌push进列表中
      let playList=this.$store.state.playList
      item.al=item.album
      item.al.picUrl=item.album.artist.img1v1Url
      playList.push(item)
      this.$store.commit('updatePlayList',playList)
      this.$store.commit('updateIndex',playList.length-1)
    },
    delHistory() {
      localStorage.removeItem('singerList')
      this.singerList=[]
    }
  },
  mounted() {
    this.singerList = JSON.parse(localStorage.getItem("singerList")) || [];
  },
};
</script>

<style lang='less' scoped>
.search {
  width: 100%;
  padding: 0.1rem;
  .top {
    width: 100%;
    display: flex;
    align-items: center;
    .van-search {
      width: 100%;
    }
  }
  .history {
    display: flex;
    align-items: center;
    margin-top: 0.2rem;
    flex-wrap: wrap;
    position: relative;
    .del {
      position: absolute;
      right: 0;
      top: -0.3rem;
      .icon {
        width: 0.3rem;
      }
    }
    .item {
      background: #ddd;
      padding: 0.1rem;
      border-radius: 0.2rem;
      margin: 0 0.2rem;
      margin-bottom: 0.2rem;
    }
    .his {
      margin-bottom: 0.2rem;
      font-weight: 600;
    }
  }
  .music-item {
    display: flex;
    justify-content: space-between;
    padding: 0.2rem;
    .left {
      display: flex;
      align-items: center;
      .song {
        margin-left: 0.3rem;
        display: flex;
        // justify-content: center;
        flex-direction: column;
        .song-name {
          padding-bottom: .1rem;
          font-weight: bold;
        }
        .author-name {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
          padding-right: .1rem;
        }
      }
    }
    .right {
      .bofang {
        margin-right: .4rem;
      }
      .icon {
        fill: #999;
      }
    }
  }
}
</style>