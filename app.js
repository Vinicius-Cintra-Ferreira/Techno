const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
    carrinhoAtivo: false,
  },
  methods: {
    fetchProdutos() {
      fetch("./api/produtos.json")
        .then(r => r.json())
        .then(data => {this.produtos = data});
    },
  },
  created() {
    this.fetchProdutos();
  }
});