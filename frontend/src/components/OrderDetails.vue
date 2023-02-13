<template>
  <div class="order-details">
    <div class="order-details-inner">
      <h2 class="d-flex justify-content-between">
        Order summary
        <slot></slot>
      </h2>
      <div class="d-flex flex-wrap h-50 flex-row" style="overflow-y: auto">
        <div
          style="flex: 50%"
          v-for="(f, index) in filterFoods"
          :key="f.product_id"
        >
          <div class="product-detail d-flex">
            <div class="image">
              <img :src="require(`../assets/images/${f.product_src}`)" alt="" />
            </div>
            <div class="content">
              <p class="name">
                {{ f.product_name }} <span>X {{ item_qty[index] }}</span>
              </p>
              <p class="desc">{{ f.product_desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="price">
        <p>Discount: ${{ orderMatch.order_discount }}</p>
        <p>Delivery Fee: ${{ orderMatch.order_delivery }}</p>
        <p>Total: ${{ orderMatch.order_total }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import useData from "../composables/useData";
export default {
  props: ["order"],
  setup(props) {
    const order = props.order;
    const allFoodsInOrder = ref([]);
    const item_qty = ref([]);

    const orderMatch = ref(undefined);
    const { getAllFoods, foods } = useData();
    getAllFoods();

    const filterFoods = computed(() => {
      return foods.value.filter((food) => matchId(food, cartItem.value));
    });

    let matchId = (food, cartArr) => {
      let temp = "";
      cartArr.forEach((el) => {
        if (parseInt(food.product_id) === el) {
          temp = food;
        }
      });
      return temp;
    };

    const getBillStatus = async () => {
      if (order) {
        orderMatch.value = (
          await axios.get("/orderStatus/order/" + order)
        ).data[0];
      }
    };

    const getAllFoodsInOrder = async () => {
      if (order) {
        let data = (await axios.get("/orderdetails/" + order)).data;
        data.forEach((element) => {
          allFoodsInOrder.value.push(element.product_id);
          item_qty.value.push(element.item_qty);
        });
      }
    };

    return {
      order,
      orderMatch,
      getBillStatus,
      getAllFoodsInOrder,
      filterFoods,
      item_qty,
    };
  },
};
</script>

<style scoped>
.order-details {
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
.order-details .order-details-inner {
  width: 60vw;
  height: 70vh;
  background-color: #fff;
  padding: 32px;
}
.order-details .order-details-inner h2 {
  margin: 0;
  font-size: 32px;
  color: #27ae60;
  margin-bottom: 20px;
}
.order-details .order-details-inner .product-detail .image img {
  height: 8rem;
  width: 8rem;
  margin: 20px;
}
.order-details .order-details-inner .product-detail .content {
  margin-top: 20px;
  font-size: 12px;
  width: 100%;
}
.order-details .order-details-inner .product-detail .content p:first-of-type {
  font-size: 16px;
  color: #f38609;
}
.order-details .order-details-inner .product-detail .content p span {
  font-size: 14px;
  color: black;
}
.order-details .order-details-inner .price {
  margin-top: 30px;
  font-size: 16px;
}
@media (max-width: 768px) {
  .order-details .order-details-inner {
    width: 80vw;
    height: 60vh;
  }
  .order-details .order-details-inner h2 {
    font-size: 20px;
  }
  .order-details .order-details-inner .product-detail .content .desc,
  .order-details .order-details-inner .product-detail .content .name span {
    font-size: 12px !important;
  }
  .order-details .order-details-inner .product-detail .content .name {
    font-size: 14px !important;
  }
}
@media (max-width: 576px) {
  .order-details .order-details-inner {
    width: 90vw;
    height: 65vh;
  }
  .order-details .order-details-inner div:first-of-type {
    flex-direction: column;
  }
}
@media (max-width: 376px) {
  .order-details .order-details-inner {
    width: 90vw;
    height: 65vh;
    padding: 5px !important;
  }
  .order-details .order-details-inner .product-detail .content .name {
    font-size: 12px !important;
  }
}
</style>
