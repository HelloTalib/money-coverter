new Vue({
  el: "#app",
  data: {
    currencies: {

    },
    amount: 0,
    result: null,
    from: 'EUR',
    to: 'USD',
    loading: false
  },

  methods: {

    convert() {
      const key = `${this.from}_${this.to}`
      this.loading = true
      axios.get(`https://free.currencyconverterapi.com/api/v6/convert?q=${key}`)
        .then((response) => {
          this.loading = false
          this.result = response.data.results[key].val
        })
    },
    getCurrencies() {
      const currencies = localStorage.getItem('currencies')


      if (currencies) {
        this.currencies = JSON.parse(currencies);


        return;
      }
      axios.get('https://free.currencyconverterapi.com/api/v6/currencies')
        .then(response => {
          this.currencies = response.data.results;
          localStorage.setItem('currencies', JSON.stringify(response.data.results))
        })
    }
  },
  watch: {
    from() {
      this.result = 0;
    },
    to() {
      this.result = 0;
    }
  },
  mounted() {
    this.getCurrencies();
  },
  computed: {
    formatedCurrencies() {
      return Object.values(this.currencies);
    },
    calculateResult() {
      return (Number(this.amount) * this.result).toFixed(3);
    },
    disabled() {
      return this.amound === 0 || !this.amount || this.loading;
    }
  }
})