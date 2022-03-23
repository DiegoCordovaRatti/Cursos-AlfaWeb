<template>
  <div id="app">
      <navbar></navbar>
    <v-app>
      <router-view/>
    </v-app>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import {mapMutations} from 'vuex'
import {getDocs} from 'firebase/firestore'
import cursosCollection from './firestore'

export default {
  components:{
    Navbar
  },
  methods: {
    ...mapMutations(['FETCH_CURSOS']),
    async fetchCursos(){
      let cursosSnapShot = await getDocs(cursosCollection)
      let cursos = []
      cursosSnapShot.forEach(curso =>{
        let cursosData = curso.data()
        cursosData.id = curso.id
        cursos.push(cursosData)
      })
      console.log(cursos)
      this.$store.commit('FETCH_CURSOS', cursos)
    }
  },
  created() {
    this.fetchCursos()
  },
}
</script>

<style>

</style>