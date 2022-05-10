import api from "./api.js"

export default {
    template: `
        <div class="border m-2 p-2">
            <button @click="reqGet" class="flex items-center text-sm border rounded p-1 text-white bg-emerald-700 hover:bg-emerald-500">
                <span class="iconify text-sm mr-1" data-icon="ic:outline-get-app"></span>
                Atualizar
            </button>
            <div class="row">
                <div class="col-4">
                    <div class="card p-2 mt-2">
                        <div v-for="(elem,index) in resposta" class="flex items-center">
                            <span class="font-bold text-xs rounded px-2 bg-gray-100 mr-1">
                                ID:
                            </span>
                            <span class="font-bold text-xs">{{elem.id}}</span>
                            <span class="font-bold text-xs rounded px-2 bg-gray-100 ml-3 mr-1">
                                NAME:
                            </span>
                            <span class="font-bold text-xs">{{elem.name}}</span>
                            <button @click="alterar(elem)" class="ml-2 flex items-center text-xs border rounded p-1 text-white bg-emerald-700 hover:bg-emerald-500">alterar</button>
                            <button @click="remover(elem.id)" class="ml-2 flex items-center text-xs border rounded p-1 text-white bg-emerald-700 hover:bg-emerald-500">excluir</button>
                        </div>
                    </div>

                    <div class="card p-2 mt-2">
                        <div>
                            <div>
                                <span class="mr-2">ID:</span>
                                <input class="border" type="text" v-model="id">
                            </div>
                            <div>
                                <span class="mr-2">Nome:</span>
                                <input class="border" type="text" v-model="name">
                            </div>
                            <div>
                                <span class="mr-2">País:</span>
                                <input class="border" type="text">
                            </div>
                            <div>
                                <span class="mr-2">Estilo:</span>
                                <input class="border" type="text">
                            </div>
                        </div>
                        <button @click="inserirDados" class="flex items-center text-sm border rounded p-1 text-white bg-emerald-700 hover:bg-emerald-500">
                            Inserir dados pessoa POST
                        </button>
                        <button @click="alterarDados" class="flex items-center text-sm border rounded p-1 text-white bg-emerald-700 hover:bg-emerald-500">
                            Inserir dados pessoa PUT
                        </button>
                    </div>

                </div>
            </div>
        </div>
    `,
    data() {
        return {
            resposta: {},
            id: "",
            name: ""
        }
    },
    mounted() {
        console.log("montei o componente painel");
        this.reqGet();
    },
    methods: {
        reqGet() {
            let self = this;
            //console.log("clicou no botao");
            api.get("pessoas").then(function (response) {
                console.log(response.data);
                self.resposta = response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        },

        alterar(item) {
            let self = this;
            console.log("alterar");
            this.id = item.id
            this.name = item.name
        },

        inserirDados() {
            let self = this;
            console.log("inserirDados");
            console.log("id: ", this.id);
            console.log("name: ", this.name);
            let dados = {
                id: this.id,
                name: this.name
            }
            api.post("pessoas",dados).then(function(response) {
                console.log(response.data);
                self.resposta = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        },

        alterarDados() {
            let self = this;
            console.log("alterarDados");
            console.log("id: ", this.id);
            console.log("name: ", this.name);
            let dados = {
                id: this.id,
                name: this.name
            }
            api.put("pessoas",dados).then(function(response) {
                console.log(response.data);
                self.resposta = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        },

        remover(id) {
            console.log("id",id);
            api.delete("pessoas",id).then(function(response) {
                console.log(response.data);
                self.resposta = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        }
    }
}