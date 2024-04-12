const vm = new Vue({
  el: '#app',
  data: {
    produtos: [],
    produto: false,
    carrinho: [],
  },
  filters: {
    numeroPreco(valor) {
      return valor.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
    }
  },
  computed: {
    carrinhoTotal() {
      return this.carrinho.reduce((acc, item) => acc + item.preco, 0);
    }
  },
  methods: {
    fetchProdutos() {
      fetch("./api/produtos.json")
        .then(r => r.json())
        .then(data => {this.produtos = data});
    },
    fetchProduto(id) {
      fetch(`./api/produtos/${id}/dados.json`)
        .then(r => r.json())
        .then(data => {this.produto = data});
    },
    abrirModal(id) {
      this.fetchProduto(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    fecharModal({target, currentTarget}) {
      if (target === currentTarget) this.produto = false;
    },
    addItem() {
      this.produto.estoque--;
      const {id, nome, preco} = this.produto;
      this.carrinho.push({id, nome, preco});
    },
    removerItem(index) {
      this.carrinho.splice(index, 1);
    },
  },
  created() {
    this.fetchProdutos();
  }
});