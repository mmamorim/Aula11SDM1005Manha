
//API
import api from "./api.js"

// Vue
import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js"

import topo from "./topo.js"
import painel from "./painel.js"

createApp({
    components: {
        topo, painel
    },
    data() {
        return {
        }
    },
}).mount('#meuApp')
