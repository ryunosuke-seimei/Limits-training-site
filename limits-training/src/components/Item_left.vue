<template>
    <div class="left" id="left">
        <input type="text" v-bind:value="title">
        <input type="text" v-for="(form, index) in form_list"  v-bind:key="index" v-model="form.value">
        <input type="button" v-bind:value="submit" v-on:click="valueGather">
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:"Item-left",
    data(){
        return{
            title:"title",
            form_list:[
            {id:0,value:"1"},
            {id:1,value:"2"},
            {id:2,value:"3"},
            {id:3,value:"4"},
            {id:4,value:"5"},
            {id:5,value:"6"},
            {id:6,value:"7"},
            {id:7,value:"8"},
            {id:8,value:"9"},
            {id:9,value:"10"},
            ],
            submit: "送信",
            link: "https://reina-raft.xyz/rin_jin/item-api",
        }
    },
    methods:{
        valueGather:function(){
            let data = {
                "title": this.title,
                "data": this.form_list
            }
            this.SendApi(JSON.stringify(data));
            // this.SendApi(data);

        },
        SendApi: function(data){
        console.log(data);
        axios.post(this.link, {data:data}).then(function(response){

            console.log(response);
            location.reload();

        }.bind(this)).catch(function(e){
            console.log(e);
        });
        }
    }
}
</script>

<style>
#left{
  display: inline-flex;
  flex-direction: column;

  align-items: center;
  width: 40%;
  height: 100%;
}

#left input{
  display: inline-flex;
  width: 300px;
  height: 40px;
  margin: 10px 0;

  box-sizing: border-box;
  padding-left: 5px;

  box-shadow: 1px 1px 1px black;
  background-color: rgba(255, 220, 180, 0.8);

  border-radius: 10px;;

  border: none;
  outline: none;

}
#left input[type="button"]{
  justify-content: center;
  align-items: center;
  border:none;
  background-color: rgba(255, 199, 175, 0.8);
}
</style>