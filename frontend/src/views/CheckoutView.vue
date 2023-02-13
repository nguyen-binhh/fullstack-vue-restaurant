<template>
  <div class="checkout-container">
    <div class="checkout-form-container">
      <form
        id="checkoutForm"
        @submit.prevent="handleSubmit"
        novalidate
        autocomplete="off"
      >
        <div class="checkout-heading">
          <h3>Few more step to place your order<span>Total</span></h3>
          <h3 v-if="user">
            {{ user.user_name }}'s Order<span
              >${{ calculateSummaryPrice()[3] }}</span
            >
          </h3>
        </div>

        <div class="form-group details-group">
          <h4>Shipping Details</h4>
          <div class="form-group">
            <input
              type="text"
              name="coPhone"
              id="coPhone"
              placeholder="Phone number"
              class="form-control"
              v-model="checkoutObj.phone"
            />
            <p class="error-mess" v-if="errObj.phoneErr.length > 0">
              {{ errObj.phoneErr[0] }}
            </p>
          </div>

          <div class="form-group">
            <input
              type="text"
              name="coAddress"
              id="coAddress"
              placeholder="Address in Hanoi, Vietnam"
              class="form-control"
              v-model="checkoutObj.address"
            />
            <p class="error-mess" v-if="errObj.addressErr.length > 0">
              {{ errObj.addressErr[0] }}
            </p>
          </div>
        </div>

        <div class="form-group details-group">
          <h4>Payment Method</h4>
          <div class="form-group">
            <div class="form-group">
              <input
                type="radio"
                name="payment"
                value="cash"
                id="paymentCash"
                v-model="checkoutObj.paymentMethod"
              /><span>Cash</span>
              <input
                type="radio"
                name="payment"
                value="card"
                id="paymentCard"
                v-model="checkoutObj.paymentMethod"
              /><span>Card (Visa)</span>
            </div>
            <p class="error-mess" v-if="errObj.payErr.length > 0">
              {{ errObj.payErr[0] }}
            </p>
          </div>

          <div v-if="checkoutObj.paymentMethod === 'card'">
            <div class="form-group">
              <input
                type="text"
                name="coCardNum"
                placeholder="Enter your card number"
                id="coCardNum"
                class="form-control"
                v-model="cardObj.number"
                size="16"
                maxlength="16"
              />
              <p class="error-mess" v-if="errObj.numErr.length > 0">
                {{ errObj.numErr[0] }}
              </p>
            </div>

            <div class="form-group">
              <input
                type="text"
                name="coCardName"
                placeholder="Enter the name in your card "
                id="coCardName"
                class="form-control"
                v-model="cardObj.name"
              />
              <p class="error-mess" v-if="errObj.nameErr.length > 0">
                {{ errObj.nameErr[0] }}
              </p>
            </div>

            <div class="form-group">
              <div class="form-control">
                <span
                  style="
                    font-size: 1.6rem;
                    position: absolute;
                    margin-left: -5px;
                    margin-top: -11px;
                  "
                  >Expiry Date:
                </span>
                <input
                  style="
                    position: absolute;
                    margin-left: 100px;
                    margin-top: -12px;
                    background: inherit;
                  "
                  type="month"
                  name="coCardEx"
                  id="coCardEx"
                  v-model="cardObj.expiryDate"
                  @click="availableTime()"
                />
              </div>
              <p class="error-mess" v-if="errObj.exDateErr.length > 0">
                {{ errObj.exDateErr[0] }}
              </p>
            </div>

            <div class="form-group">
              <input
                type="text"
                name="coCardCvv"
                placeholder="CVV"
                id="coCardCvv"
                class="form-control"
                v-model="cardObj.cvv"
              />
              <p class="error-mess" v-if="errObj.cvvErr.length > 0">
                {{ errObj.cvvErr[0] }}
              </p>
            </div>
          </div>
        </div>

        <div v-if="user" class="form-group">
          <input
            type="submit"
            value="CONFIRM & PAY"
            class="btn"
            :disabled="filterFoods.length ? false : true"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "../stores/useAuth";
import useData from "../composables/useData";
import useForm from "../composables/useForm";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const users = useAuthStore();
    const user = users.user;
    const router = useRouter();

    const { getAllFoods, foods } = useData();
    const { checkEmptyErr, checkForm, isPaid, checkoutObj, cardObj, errObj } =
      useForm();
    getAllFoods();
    const cartItem = ref([]);
    const itemQuantity = ref([]);

    // const vUpcase = onMounted((el) => {
    //   el.style.textTransform = "uppercase";
    // });

    const getAllCartItem = onMounted(async () => {
      try {
        if (user) {
          let existItem = await axios.get(`/cartItem/` + user.user_id);

          existItem.data.forEach((el) => {
            cartItem.value.push(el.product_id);
            itemQuantity.value.push(el.item_qty);
          });
        }
      } catch (e) {
        console.log(e);
      }
    });

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

    const calculateSummaryPrice = () => {
      let subtotal = 0;
      let discount = 0;
      let delivery = 15;
      let i = 0;
      while (i < itemQuantity.value.length) {
        subtotal +=
          parseInt(filterFoods.value[i].product_price) * itemQuantity.value[i];
        discount =
          discount +
          parseInt(filterFoods.value[i].product_discount) *
            itemQuantity.value[i];
        i = i + 1;
      }
      if (!filterFoods.value.length) {
        delivery = 0;
      }
      let total = subtotal - discount + delivery;
      return [subtotal, discount, delivery, total];
    };

    const availableTime = () => {
      let now = new Date();
      let currentMonth = ("0" + (now.getMonth() + 1)).slice(-2);
      let minRange = now.getFullYear() + "-" + currentMonth;
      let maxRange = now.getFullYear() + 10 + "-" + currentMonth;
      document.getElementById("coCardEx").setAttribute("min", minRange);
      document.getElementById("coCardEx").setAttribute("max", maxRange);
    };

    const sendOrderDetails = async (orderId, foodId, qty) => {
      let orderDetails = {
        order_id: parseInt(orderId),
        product_id: parseInt(foodId),
        item_qty: parseInt(qty),
      };
      await axios.post("/orderdetails", orderDetails);
    };

    const handleSubmit = async (e) => {
      checkForm();
      if (!checkEmptyErr()) {
        e.preventDefault();
      } else {
        e.preventDefault();
        let orderId = (await axios.get("/orderStatus/new")).data;
        if (orderId == "") {
          orderId = 1;
        } else {
          orderId = parseInt(orderId.order_id) + 1;
        }
        cartItem.value.forEach((foodId, index) => {
          sendOrderDetails(orderId, foodId, itemQuantity.value[index]);
        });
        let now = new Date();
        let day = ("0" + now.getDate()).slice(-2);
        let month = ("0" + (now.getMonth() + 1)).slice(-2);
        let hour = ("0" + now.getHours()).slice(-2);
        let min = ("0" + now.getMinutes()).slice(-2);
        let currentTime =
          now.getFullYear() + "-" + month + "-" + day + "T" + hour + ":" + min;
        let orderStatus = {
          order_id: parseInt(orderId),
          user_id: parseInt(user.user_id),
          order_phone: checkoutObj.phone,
          order_address: checkoutObj.address,
          order_when: currentTime,
          order_method: checkoutObj.paymentMethod,
          order_discount: parseInt(calculateSummaryPrice()[1]),
          order_delivery: parseInt(calculateSummaryPrice()[2]),
          order_total: parseInt(calculateSummaryPrice()[3]),
          order_paid: isPaid(),
          order_status: 1,
        };
        axios.post("/orderstatus", orderStatus);
        axios.delete("/cartItem/" + user.user_id);
        cartItem.value = [];
        itemQuantity.value = [];
        router.push("/thanks");
      }
    };

    return {
      getAllCartItem,
      filterFoods,
      user,
      calculateSummaryPrice,
      availableTime,
      checkEmptyErr,
      checkForm,
      checkoutObj,
      cardObj,
      errObj,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
.checkout-container {
  padding: 2rem 9%;
}
.checkout-container .checkout-form-container {
  background: #fff;
  height: 90vh;
}
.checkout-container .checkout-form-container form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -42%);
  max-width: 70rem;
  width: 100%;
  box-shadow: 0 1rem 1rem rgba(0, 0, 0, 0.05);
  border: 0.1rem solid rgba(0, 0, 0, 0.2);
  padding: 2rem;
  border-radius: 0.5rem;
  animation: fadeUp 0.4s linear;
}
.checkout-container .checkout-form-container form h3 {
  padding-bottom: 1rem;
  font-size: 2rem;
  text-transform: uppercase;
  color: #130f40;
  margin: 0;
}
.checkout-container .checkout-form-container form .form-control {
  margin: 0.7rem 0;
  border-radius: 0.5rem;
  background: #f7f7f7;
  padding: 2rem 1.2rem;
  font-size: 1.6rem;
  color: #130f40;
  text-transform: none;
  width: 100%;
  border: none;
}
.checkout-container .checkout-form-container form label {
  font-size: 2rem;
  margin: 0;
  padding: 0;
}
.checkout-container .checkout-form-container form span {
  font-size: 18px;
  padding-left: 5px;
  padding-right: 40px;
}
.checkout-container .checkout-form-container form .btn {
  margin: 1rem 0;
  width: 100%;
  text-align: center;
}
.checkout-container .checkout-form-container form p {
  padding-top: 1rem;
  font-size: 1.5rem;
  color: #666;
  margin: 0;
}
.checkout-container .checkout-form-container form p a {
  color: #27ae60;
}
.checkout-container .checkout-form-container form p a:hover {
  color: #130f40;
  text-decoration: underline;
}
.checkout-container .checkout-form-container form .form-group {
  margin: 0;
}
.checkout-container .checkout-form-container form .form-group.details-group {
  margin-top: 40px;
}
.checkout-container .checkout-form-container form .form-group .error-mess {
  font-size: 1.5rem;
  position: relative;
  color: rgb(243, 47, 47);
  margin: 0;
  padding: 0;
}
.checkout-container .checkout-form-container form .checkout-heading h3 {
  display: flex;
  justify-content: space-between;
}
.checkout-container .checkout-form-container form .checkout-heading h3 span {
  padding-right: 0px;
  color: #f38609;
}
.checkout-container
  .checkout-form-container
  form
  .checkout-heading
  h3:first-of-type
  span {
  padding-right: 0px;
  color: #130f40;
}
</style>
