<template>
  <div>
    <div v-if="user" class="quick-view">
      <div
        class="quick-view-inner"
        v-for="item in selectedFood"
        :key="item.product_id"
      >
        <h2 class="d-flex justify-content-between">
          {{ item.product_name }}
          <slot></slot>
        </h2>
        <div class="product-detail d-flex">
          <div class="image">
            <img :src="`/images/${item.product_src}`" alt="" />
          </div>
          <div class="content">
            <p class="desc">{{ item.product_desc }}</p>
            <p class="money">
              ${{
                parseFloat(item.product_price) -
                parseFloat(item.product_discount)
              }}<span v-if="parseFloat(item.product_discount) > 0"
                >${{ parseFloat(item.product_price) }}</span
              >
            </p>
            <div class="qty">
              <label for="qty">Quantity:</label>
              <input
                type="number"
                name="qty"
                id="qty"
                value="1"
                min="1"
                max="1000"
                @change="onQtyChange($event)"
              />
            </div>
            <button class="btn" @click="addToCart">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="quick-view">
      <div class="quick-view-inner">
        <h2 class="d-flex justify-content-between">
          Please login to use this method
          <slot></slot>
        </h2>
        <div
          class="link-to-login"
          style="text-align: center; margin-top: 120px"
        >
          <router-link
            class="btn"
            to="/login"
            style="padding: 10px; font-size: 20px"
            >login now
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useAuthStore } from "../stores/useAuth";

import useData from "../composables/useData";

export default {
  props: ["food"],
  setup(props) {
    const { getAllFoods, foods } = useData();
    getAllFoods();

    const users = useAuthStore();
    const user = users.user;
    const food = props.food;
    const qty = ref(1);

    const selectedFood = computed(() =>
      foods.value.filter((item) => parseInt(item.product_id) == parseInt(food))
    );

    const onQtyChange = (e) => {
      if (e.target.value < 1) {
        e.target.value = 1;
        qty.value = e.target.value;
      } else {
        qty.value = e.target.value;
      }
    };

    async function addToCart() {
      try {
        let existItem = await axios.get(
          `/cartItem/` + parseInt(user.user_id) + "/" + parseInt(food)
        );

        if (existItem.data.length === 1) {
          let data = {
            user_id: parseInt(user.user_id),
            product_id: parseInt(food),
            item_qty:
              parseInt(qty.value) + parseInt(existItem.data[0].item_qty),
          };

          await axios.put(`/cartItem/`, data);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Add To Cart Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          let data = {
            user_id: parseInt(user.user_id),
            product_id: parseInt(food),
            item_qty: parseInt(qty.value),
          };

          await axios.post(`/cartItem/`, data);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Add To Cart Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } catch (e) {
        console.log(e);
      }
    }

    return { foods, food, user, selectedFood, onQtyChange, qty, addToCart };
  },
};
</script>

<style scoped>
.quick-view {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.quick-view .quick-view-inner {
  /* width: 45vw;
  height: 45vh; */
  background-color: #fff;
  padding: 32px;
}
.quick-view .quick-view-inner h2 {
  margin: 0;
  font-size: 32px;
  color: #27ae60;
}
.quick-view .quick-view-inner .product-detail .image img {
  height: 20rem;
  margin: 20px;
}
.quick-view .quick-view-inner .product-detail .content {
  margin-top: 20px;
  font-size: 20px;
  width: 100%;
}
.quick-view .quick-view-inner .product-detail .content p span {
  margin-left: 5px;
  text-decoration: line-through;
  opacity: 0.5;
}
.quick-view .quick-view-inner .product-detail .content div label {
  margin-right: 10px;
}
.quick-view .quick-view-inner .product-detail .content .btn {
  margin-top: 20px;
  float: right;
}
@media (max-width: 768px) {
  .quick-view .quick-view-inner {
    /* width: 45vw;
    height: 30vh; */
  }
  .quick-view .quick-view-inner h2 {
    font-size: 20px;
  }
  .quick-view .quick-view-inner .btn {
    font-size: 10px;
    padding: 0.3rem 0.9rem;
  }
  .quick-view .quick-view-inner .product-detail .image img {
    height: 12rem;
    margin: 30px;
    margin-left: 0px;
  }
  .quick-view .quick-view-inner .product-detail .content .desc {
    font-size: 12px;
  }
  .quick-view .quick-view-inner .product-detail .content .qty {
    font-size: 12px;
  }
  .link-to-login {
    margin-top: 20px !important;
  }
}
@media (max-width: 576px) {
  .quick-view .quick-view-inner {
    /* width: 90vw;
    height: 40vh; */
  }
  .link-to-login {
    margin-top: 50px !important;
  }
  .link-to-login > a {
    padding: 20px !important;
    font-size: 18px !important;
  }
}
</style>
