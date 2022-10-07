Vue.component('products', {
    data() {
        return {
            catalogUrl: `/catalogData.json`,
            products: [],
            filtered: [],
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `<div class="products">
            <product 
            v-for="product of filtered" 
            :key="product.id_product"
            :product="product"
            :img="product.imgProduct"></product>
        </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-card">
    <a href="product/product.html" class="product-link">
        <img :src="img" :alt="product.product_name" class="product-img">
        <div class="product-text-box">
            <h2 class="product-card-title">{{ product.product_name }}</h2>
            <p class="product-card-text">Known for her sculptural takes on traditional tailoring,
                Australian arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
            <p class="product-card-price">{{ product.price }} руб.</p>
        </div>
    </a>
    <div class="cart-box">
        <button class="cart-link" @click="$root.$refs.cart.addProduct(product)">
            <img src="images/addtocart.svg" alt="addtocart">
            <p class="cart-link-text">Add to Cart</p>
        </button>
    </div>
</div>`
})
//<div class="product-item standart p-3" >
            //     <img :src="img" :alt="product.product_name">
            //     <div class="desc">
            //         <h3 class="price-name text-white pt-3">{{ product.product_name }}</h3>
            //         <div class="price d-flex justify-content-center align-items-end"><p>{{ product.price }} руб.</p></div>
            //         <button class="buy-btn ml-3" @click="$root.$refs.cart.addProduct(product)">Купить</button>
            //     </div>
            // </div>//