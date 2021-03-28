<template>
    <div class="right" id="right">
        <div class="left">
            <li v-for="form in data_list" v-on:click="clickItem(form.id)" v-bind:key="form.id">No.{{form.id}}{{form.value}}</li>
        </div>
        <div class="right" v-show="show_flag">
            <input type="text" v-model="title">
            <input type="text" v-for="(form, index) in form_list" v-model="form.value" v-bind:key="index">
            <input type="button" v-bind:value="edit_value" v-on:click="sendEdit" >
            <input type="button" v-bind:value="delete_value" v-on:click="sendDelete" >
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:"Item-Right",
    data(){
        return{
            id: 0,
            title:"title",
            form_list:[
            {id:0,value:""},
            {id:1,value:""},
            {id:2,value:""},
            {id:3,value:""},
            {id:4,value:""},
            {id:5,value:""},
            {id:6,value:""},
            {id:7,value:""},
            {id:8,value:""},
            {id:9,value:""},
            ],
            edit_value: "編集",
            delete_value: "削除",
            link: "https://reina-raft.xyz/rin_jin/item-api",
            data_list:[],
            show_flag:false,
        }
    },
    created: function(){
        this.data_list = this.ApiGetAll();
    },
    methods:{
        clickItem: function(id){
            this.ApiGetOne(id);
            this.show_flag = true;
        },
        ConnectEdit: function(temp_data){
            this.id = temp_data[0];
            this.title = temp_data[1];
            for(let i=2;i<temp_data.length;i++){
                this.form_list[i-2].value = temp_data[i];
            }
        },
        sendEdit:function(){
            let send_data = {
                id: this.id,
                title: this.title,
                data: this.form_list
            }
            console.log(send_data);
            this.ApiUpdate(JSON.stringify(send_data));
            // this.ApiUpdate(send_data);
        },
        sendDelete: function(){
            let send_data = {
                id: this.id
            }
            console.log(send_data);
            this.ApiDelete(JSON.stringify(send_data));
            // this.ApiDelete(send_data);
        },
        ApiGetAll: function(){
            let temp_data = [];
            axios.get(this.link,{
                params: {
                flag: 0
                }
            }).then(function(response){
                console.log(response.data);
                response.data.forEach(function(key){
                    let data = {id:key[0], value:key[1]};
                    temp_data.push(data);
                });
            }.bind(this)).catch(function(e){
                console.log(e);
            });
            return temp_data;
        },
        ApiGetOne: function(id){
            let temp_data;
            axios.get(this.link,{
                params: {
                flag: 1,
                id: id
                }
            }).then(function(response){
                temp_data = response.data;
                this.ConnectEdit(temp_data);
            }.bind(this)).catch(function(e){
                console.log(e);
            });
        },
        ApiUpdate: function(data){
            axios.put(this.link, {data:data}).then(function(response){
                // location.reload();
                console.log(response.data);
                this.data_list.find((v) => v.id === this.id).value = this.title;

            }.bind(this)).catch(function(e){
                console.log(e);
            });
        },
        ApiDelete: function(data){
            console.log({data: data});
            axios.delete(this.link, {data:data}).then(function(response){
                console.log(response.data);
                location.reload();
            }.bind(this)).catch(function(e){
                console.log(e);
            });
        }
    }

}
</script>

<style>
#right{
  display: inline-flex;
  flex-direction: row;
  width: 60%;
  height: 100%;

  background-color: rgba(240, 230, 140, 0.5);
}
#right .left{
  display: inline-flex;
  flex-direction: column;
  width: 34%;
  height: 100%;
  overflow-y: scroll;

  box-sizing: content-box;
  border-top: none;
  border-bottom: none;
}
#right .left li{
  display: inline-flex;
  margin: 10px 10%;
  width: 80%;
  height: 60px;

  flex: 0 0 auto;

  border-radius: 10px;;

  box-sizing: border-box;
  padding-left: 5px;

  background-color: rgba(255, 199, 175, 0.8);
  box-shadow: 1px 1px 1px rgba(255, 255, 175, 0.8);
  align-items: center;
}

#right .right{
  width: 66%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: rgba(240, 230, 140, 0.5);

}

#right input{
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
#right input[type="button"]{
  justify-content: center;
  align-items: center;
  border:none;
  background-color: rgba(255, 199, 175, 0.8);
}

</style>