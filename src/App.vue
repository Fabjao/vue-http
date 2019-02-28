<template>
  <div id="app">
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Requisições HTTP no Vue</h1>
        <p class="lead">Usando a biblioteca Axios para fazer chamadas Ajax à uma API REST.</p>
      </div>
    </div>

    <div class="container">
      <TarefasLista/>

      <button class="btn btn-primary mt-4 mb-2" @click="download">Baixar Imagem</button>
      <div class="progress">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          :aria-valuenow="progresso"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="{width: progresso + '%'}"
        >{{progresso}} %</div>
      </div>
    </div>
    <div v-if="imagem">
      <img :src="imagem" style="max-with:100%">
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "./config/config";

import TarefasLista from "./components/TarefasLista.vue";
export default {
  components: {
    TarefasLista
  },
  data() {
    return {
      progresso: 0,
      imagem: undefined
    };
  },
  async created() {
    //Method async para usar com await
    /*axios //varioas requisições
      .all([
        axios.get(`${config.apiURL}/tarefas/1`),
        axios.get(`${config.apiURL}/tarefas/4`)
      ])
      .then(
        axios.spread((tarefa1, tarefa4) => {
          console.log("Requisições simultâneas:");
          console.log("Tarefa 1: ", tarefa1);
          console.log("Tarefa 4: ", tarefa4);
        })
      );*/
    /*axios //Varias requisições pegando a resposta de modo diferente
      .all([
        axios.get(`${config.apiURL}/tarefas/1`),
        axios.get(`${config.apiURL}/tarefas/4`)
      ])
      .then(response => {
        console.log("Requisições simultâneas 2:");
        const [tarefa1, tarefa4] = response;
        console.log("Tarefa 1: ", tarefa1);
        console.log("Tarefa 4: ", tarefa4);
      });*/

    //Utilizando await
    const tarefa1 = await axios.get(`${config.apiURL}/tarefas/1`);
    const tarefa4 = await axios.get(`${config.apiURL}/tarefas/4`);
    console.log("Requisições simultâneas 3:");
    console.log("Tarefa 1: ", tarefa1);
    console.log("Tarefa 4: ", tarefa4);
  },
  methods:{
    download(event){
      axios.get('https://images.unsplash.com/photo-1551161171-1ab79f254edc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80',
      {
        responseType: 'blob',
        onDownloadProgress:(progressEvent)=>{
          console.log('Fazendo download...: ', progressEvent);
          this.progresso = (progressEvent.loaded / progressEvent.total * 100).toFixed(0)
          
        }
      }).then(response =>{
        console.log('Download concluido! ', response);
        const reader = new window.FileReader()
        reader.readAsDataURL(response.data)
        reader.onload =()=>{
          this.imagem = reader.result
        }
      })
    }
  }
};
</script>
