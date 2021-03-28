<template>
    <div id="roulette">
        <Header></Header>
        <section>
            <RouletteItem></RouletteItem>
            <RouletteTimer></RouletteTimer>
        </section>
    </div>
</template>

<script>
import Header from '../components/Header'
import RouletteItem from '../components/Roulette_item'
import RouletteTimer from '../components/Roulette_timer'

export default {
    name:"Roulette",
    components: {
        Header,
        RouletteItem,
        RouletteTimer
    },
}
</script>

<style>
#roulette{
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-around;

  background-color: rgba(240, 230, 140, 0.5);
}
#roulette section{
  display: inline-flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-around;

  background-color: rgba(240, 230, 140, 0.5);

}
</style>