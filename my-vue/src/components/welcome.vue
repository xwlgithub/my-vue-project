<template>
  <div>
    <el-carousel :interval="4000" type="card"   height="300px">
      <el-carousel-item v-for="item in imageList" :key="item.id">
        <img style="height: 300px" :src="item.idView" class="image">
      </el-carousel-item>
    </el-carousel>
    <div>
      <hr>
    </div>
  </div>
</template>

<script>
  import one from  '../images/1.jpg'
  import two from  '../images/2.jpg'
  import three from  '../images/3.jpg'
  import four from  '../images/4.jpg'
  import five from  '../images/5.jpg'
  import six from  '../images/6.jpg'
  import seven from  '../images/7.jpg'
  import eight from  '../images/8.jpg'
  import nine from  '../images/9.jpg'
    export default {
        name: "welcome",
      data() {
        return {
            imageList:[
              {id:0,idView:one},
              {id:1,idView:two},
              {id:2,idView:three},
              {id:3,idView:four},
              {id:4,idView:five},
              {id:5,idView:six},
              {id:6,idView:seven},
              {id:7,idView:eight},
              {id:8,idView:nine},
            ]
        }
      },
      methods: {

      },
      created(){

        }
    }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
