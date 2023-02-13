<template>
  <div>
    <section class="order-section">
      <div class="heading">
        <span>book a table</span>
        <h3>enjoy your moment</h3>
      </div>

      <div class="icons-container">
        <div class="icons">
          <img src="/images/icon-1.png" alt="" />
          <h3>7:00am to 10:00pm</h3>
        </div>

        <div class="icons">
          <img src="/images/icon-2.png" alt="" />
          <h3>+84 123 123 123</h3>
        </div>

        <div class="icons">
          <img src="/images/icon-3.png" alt="" />
          <h3>Binh Thạnh, HCMC, Viet Nam</h3>
        </div>
      </div>

      <!-- booking form -->
      <form id="bookTableForm" novalidate autocomplete="off">
        <div class="row">
          <div class="input-box">
            <label for="uName">your name</label>
            <input
              type="text"
              name="uName"
              id="uName"
              v-model="orderObj.name"
            />
            <p v-if="errorObj.nameErr.length > 0">{{ errorObj.nameErr[0] }}</p>
          </div>
          <div class="input-box">
            <label for="uPhone">your phone number</label>
            <input
              type="text"
              name="uPhone"
              id="uPhone"
              v-model="orderObj.phone"
            />
            <p v-if="errorObj.phoneErr.length > 0">
              {{ errorObj.phoneErr[0] }}
            </p>
          </div>
        </div>

        <div class="row">
          <div class="input-box">
            <label for="oPeople">how many people</label>
            <input
              type="number"
              name="oPeople"
              id="oPeople"
              v-model="orderObj.people"
            />
            <p v-if="errorObj.peopleErr.length > 0">
              {{ errorObj.peopleErr[0] }}
            </p>
          </div>
          <div class="input-box">
            <label for="oTables">how many tables</label>
            <input
              type="number"
              name="oTables"
              id="oTables"
              v-model="orderObj.tables"
            />
            <p v-if="errorObj.tablesErr.length > 0">
              {{ errorObj.tablesErr[0] }}
            </p>
          </div>
        </div>

        <div class="row">
          <div class="input-box">
            <label for="uCard">your membership card</label>
            <input
              type="text"
              name="uCard"
              id="uCard"
              v-model="orderObj.card"
            />
            <p v-if="errorObj.cardErr.length > 0">{{ errorObj.cardErr[0] }}</p>
          </div>
          <div class="input-box">
            <label for="oWhen">when</label>
            <input
              type="datetime-local"
              name="oWhen"
              id="oWhen"
              v-model="orderObj.when"
              @click="availableTime()"
            />
            <p v-if="errorObj.whenErr.length > 0">{{ errorObj.whenErr[0] }}</p>
          </div>
        </div>

        <div class="row">
          <div class="input-box">
            <label for="uMessage">note</label>
            <textarea
              placeholder="your message, do you want to decorate your table?"
              name="uMessage"
              id="uMessage"
              cols="30"
              rows="10"
              v-model="orderObj.note"
            ></textarea>
          </div>
          <div class="input-box">
            <iframe
              class="map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62703.828137976074!2d106.68264966718503!3d10.812133478021504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175289f02a8eae9%3A0x34ec9d90e055cde3!2zQsOsbmggVGjhuqFuaCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1675747542866!5m2!1svi!2s"
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <input type="submit" value="Book Now" class="btn" />
      </form>
    </section>
  </div>
</template>

<script>
import useTable from "../composables/useTable";

export default {
  setup() {
    const { orderObj, errorObj, checkEmptyErr, checkForm } = useTable();

    const availableTime = () => {
      let now = new Date();
      let day = ("0" + now.getDate()).slice(-2);
      let currentMonth = ("0" + (now.getMonth() + 1)).slice(-2);
      let maxMonth = ("0" + (now.getMonth() + 3)).slice(-2);
      let hour = ("0" + now.getHours()).slice(-2);
      let min = ("0" + now.getMinutes()).slice(-2);
      let minRange =
        now.getFullYear() +
        "-" +
        currentMonth +
        "-" +
        day +
        "T" +
        hour +
        ":" +
        min;
      let maxRange =
        now.getFullYear() + "-" + maxMonth + "-" + day + "T" + hour + ":" + min;
      document.getElementById("oWhen").setAttribute("min", minRange);
      document.getElementById("oWhen").setAttribute("max", maxRange);
    };

    return { availableTime, checkForm, orderObj, errorObj, checkEmptyErr };
  },
};
</script>

<style scoped>
.order-section {
  padding: 2rem 9%;
}
.order-section .icons-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(40rem, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}
.order-section .icons-container .icons {
  border-radius: 0.5rem;
  padding: 2rem;
  text-align: center;
  background: #f7f7f7;
}
.order-section .icons-container .icons img {
  height: 10rem;
}
.order-section .icons-container .icons h3 {
  font-size: 2rem;
  color: #130f40;
  margin-top: 0.5rem;
}
.order-section form {
  background: #f7f7f7;
  padding: 2rem;
  border-radius: 0.5rem;
}
.order-section form .row {
  justify-content: space-between;
}
.order-section form .row .input-box {
  width: 49%;
  padding: 1.8rem 0;
}
.order-section form .row label {
  font-size: 1.7rem;
  color: #666;
}
.order-section form .row p {
  font-size: 1.5rem;
  position: absolute;
  color: rgb(243, 47, 47);
  margin: 0;
  padding-top: 5px;
}
.order-section form .row input,
.order-section form .row textarea {
  width: 100%;
  margin-top: 0.5rem;
  padding: 1rem 1.2rem;
  width: 100%;
  border-radius: 0.5rem;
  font-size: 1.6rem;
  text-transform: none;
  color: #130f40;
}
.order-section form .row textarea {
  height: 20rem;
  resize: none;
}
.order-section form .row .map {
  height: 100%;
  width: 100%;
  border-radius: 0.5rem;
}
@media (max-width: 768px) {
  .order form .row .input-box {
    width: 100%;
  }
  .order-section form .row {
    display: block;
    max-width: 100%;
    width: 100%;
    margin: 0;
  }
  .order-section form .row .input-box {
    width: 100%;
  }
}
@media (max-width: 576px) {
  .order-section .icons-container {
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  }
}
</style>
