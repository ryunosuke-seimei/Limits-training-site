<template>
    <div id="title">
        <section>
            <div class="title">
                {{title}}
            </div>
            <div class="links">
                <li>
                    <router-link to="/item">Item</router-link>
                </li>
                <li>
                    <router-link to="/roulette">Roulette</router-link>
                </li>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name:"Title",
    computed:{
        title(){
            return this.$store.state.title
        }
    }

}
</script>

<style>
#title section{
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
#title section .title{
  box-sizing: content-box;
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: 50%;
  font-size: 100px;
  padding-top: 20%;;
  justify-content: center;
  align-items: center;
}
#title section .links{
  display: inline-flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
  justify-content: space-around;
  font-size: 55px;
  animation:2s ease-in 1s infinite alternate forwards running slidein
}
#title section .links li{
  list-style: none;
}

@keyframes slidein {
  from { opacity: 1; }
  to   { opacity: 0; }
}
</style>