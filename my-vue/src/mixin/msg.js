/*提示信息封装*/
import Vue from 'vue'
 Vue.mixin({
   methods:{
     $msg(message,type="info",duration){
       this.$message({
         type,
         message,duration
       })
     },
     $success(message){
       this.$msg(message,"success",1000)
     },
     $fail(message){
       this.$msg(message,"error",1000)
     }
   }

 })
