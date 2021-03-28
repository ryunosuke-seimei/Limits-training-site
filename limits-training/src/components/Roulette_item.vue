<template>
    <div id="roulette_item">
      <div class="view">
        <div class="top">
          <div>
            {{left_title}}
          </div>
          <div>
            {{right_title}}
          </div>
        </div>
        <div class="middle">
          <div class="left">
            {{left_display}}
          </div>
          <div class="right">
            {{right_display}}
          </div>
        </div>
        <div class="bottom">
          <button type="button" v-on:click="start" v-if="!roulette_flag">start</button>
          <button type="button" v-on:click="stop" v-if="roulette_flag">stop</button>
        </div>
      </div>

      <div class="controller">
        <button type="button" v-on:click="change_flag = !change_flag" v-if="!change_flag">変更</button>
        <button type="button" v-on:click="change_flag = !change_flag" v-if="change_flag">閉じる</button>
      </div>

      <div class="sub-view" v-bind:class="{'subviewon': change_flag}">
        <div class="top">
          <button type="button" v-on:click=change_title>変更</button>
        </div>
        <div class="middle">
          <div class="left" v-on:click="change_target = true" v-bind:class="{'bord-active': change_target}">
            {{left_title}}
          </div>
          <div class="right" v-on:click="change_target = false" v-bind:class="{'bord-active': !change_target}">
            {{right_title}}
          </div>
        </div>
        <div class="bottom">
          <div class="child-bord" v-if="change_detail">
            <li v-for="(item, index) in data_list" v-on:click="select_title(index)" v-bind:key="index">{{item.title}}</li>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:"Roulette_Item",
    data(){
        return{
            data_list:[
                {title:"人", value:["男", "女", "男の子", "女の子", "男の娘","おじさん", "おばさん", "お爺さん","お婆さん", "馬"]},
                {title:"形容詞", value:["面白い", "不思議な", "頭のおかしい", "マッドサイエンティストな", "ドMな","ドSな", "普通の", "かっこいい","ダンディな", "走力Sな"]}
            ],
            left_id:1,
            right_id:0,
            left_display:"新しい",
            right_display:"世界",
            roulette_obj:null,
            roulette_flag: false,

            change_flag: false,
            change_target: false,
            change_detail:false,
        }
    },
    computed:{
        left_title:function(){
        return this.data_list[this.left_id].title
        },
        right_title:function(){
        return this.data_list[this.right_id].title
        },
    },
    methods:{
        random:function(){
            let random = Math.floor(Math.random() * 10);
            return random;
        },
        roulette:function(){
            let random;
            random = this.random();
            this.left_display = this.data_list[this.left_id].value[random];
            random = this.random();
            this.right_display = this.data_list[this.right_id].value[random];
        },
        start:function(){
            let self = this;
            this.roulette_obj = setInterval(function() {self.roulette()}, 50)
            this.roulette_flag = true;
        },
        stop:function(){
            clearInterval(this.roulette_obj);
            this.roulette_flag = false;
        },
        change_title:function(){
            this.change_detail = true;
        },
        select_title:function(index){
            if(this.change_target){
                this.left_id = index;
            }else{
                this.right_id = index;
            }
            this.change_detail = false;
        }
    },
    created:function(){
        let self = this;
        axios.get("https://reina-raft.xyz/rin_jin/item-api",{
            params: {
                flag: 2,
            }
        }).then(function(response){
            response.data.forEach(function(key){
                self.data_list.push({title:key.title, value:key.value});
            });
        }.bind(this)).catch(function(e){
            console.log(e);
        });
    },

}
</script>

<style>
#roulette_item{
  position: relative;
  display: inline-flex;
  width: 100%;
  height: 50%;
  justify-content: center;
  align-items: center;
  z-index: 11;
  background-color: white;
}
#roulette_item .view{
  flex: 0 0 auto;
  display: inline-flex;
  flex-direction: column;
  width: calc(100% - 120px);
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  z-index: 8;
}
#roulette_item .controller{
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 100%;
}
#roulette_item .controller button{
  font-size: 20px;
  display: inline-flex;
  margin: 100px 0;
  width: 80%;;
  height: 50px;
  border-radius: 20%;
  justify-content: center;
  align-items: center;
  border: none;

  font-family: inherit;
}

#roulette_item .sub-view{
  position: absolute;
  display: inline-flex;
  flex-direction: column;
  width: calc(100% - 120px);
  height: 100%;
  left: 0;
  top: 100%;;
  z-index: 9;
  transition: 1s;
  background-color: white;
}
#roulette_item .subviewon{
  top: 0;
}
#roulette_item .bord{
  display: inline-flex;
  flex-direction: column;
  width: 100%;;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
#roulette_item .top{
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 20%;
}
#roulette_item .top div{
  display: inline-flex;
  width: 500px;
  height: 40px;
  align-items: center;
  background-color: rgba(240, 230, 140, 0.5);
  font-size: 20px;
}
#roulette_item .top div::before{
  content: "title:";
  margin: 0 10px;
}
#roulette_item .top button{
  font-size: 20px;
  display: inline-flex;
  margin: 100px 0;
  width: 200px;;
  height: 80%;
  border-radius: 20%;
  justify-content: center;
  align-items: center;
  border: none;

  font-family: inherit;
}

#roulette_item .middle{
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 30%;
}
#roulette_item .middle div{
  display: inline-flex;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  width: 500px;
  height: 100%;
  background-color: rgba(240, 230, 140, 0.5);
  font-size: 40px;
}
#roulette_item .middle .bord-active{
  border: 5px solid orange;
}

#roulette_item .bottom{
  display: inline-flex;
  justify-content: center;

  width: 100%;
  height: 50%;
}
#roulette_item .bottom button{
  font-size: 20px;
  display: inline-flex;
  margin: 100px 0;
  width: 200px;;
  height: 20%;
  border-radius: 20%;
  justify-content: center;
  align-items: center;
  border: none;

  font-family: inherit;
}
#roulette_item .bottom .child-bord{
  display: inline-flex;
  align-items: center;
  overflow-x: scroll;
  width: 80%;
  height: 100%;
}
#roulette_item .child-bord li{
  list-style: none;
  margin: 0 20px;
  display: inline-block;
  width: 120px;
  flex: 0 0 auto;
  height: 90%;
  background-color: rgba(255, 245, 155, 0.5);
  border: 2px solid rgba(255, 245, 155, 0.9);
}

</style>