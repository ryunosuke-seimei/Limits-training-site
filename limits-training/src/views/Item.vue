<template>
    <div id="item">
        <Header></Header>
        <section>
            <ItemLeft></ItemLeft>
            <ItemRight></ItemRight>
        </section>
    </div>
</template>

<script>
import Header from '../components/Header'
import ItemLeft from '../components/Item_left.vue'
import ItemRight from '../components/Item_right.vue'

export default {
    name:"Item",
    components: {
        Header,
        ItemLeft,
        ItemRight
    },
}
</script>

<style>
section{
  display: inline-flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 60px);

  /* background-color: khaki; */
  background-color: rgba(240, 230, 140, 0.5);
}
</style>