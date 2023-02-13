<template>
  <div class="admin-container">
    <div class="d-flex justify-content-between">
      <h1>Hello Admin!</h1>
      <button class="btn" @click="handleLogout()">Logout</button>
    </div>

    <div class="table-responsive">
      <!-- PROJECT TABLE -->
      <table class="table colored-header datatable project-list">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>User Id</th>
            <th>Phone</th>
            <th>Address</th>
            <th>When</th>
            <th>Paid</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="b in filterOrders.slice().reverse()" :key="b.order_id">
            <td>{{ b.order_id }}</td>
            <td>{{ b.user_id }}</td>
            <td>{{ b.order_phone }}</td>
            <td>{{ b.order_address }}</td>
            <td>{{ b.order_when }}</td>
            <td>{{ b.order_paid }}</td>
            <td>${{ b.order_total }}</td>
            <td>{{ avaiableStatus[b.order_status] }}</td>
            <td>
              <button
                v-if="b.order_status < 5"
                class="action-btn"
                @click="nextStatusBtn(b.order_id)"
              >
                {{ avaiableStatus[b.order_status + 1] }}
              </button>

              <button
                v-if="b.order_status == 1"
                class="cancel-btn"
                @click="cancelBtn(b.order_id)"
              >
                Cancel
              </button>

              <button
                v-else-if="b.order_status == 5 && b.order_paid == 'false'"
                class="paid-btn"
                @click="paidBtn(b.order_id)"
              >
                Paid
              </button>

              <button
                v-else-if="b.order_status == 5 && b.order_paid == 'true'"
                class="action-btn"
                @click="nextStatusBtn(b.order_id)"
              >
                {{ avaiableStatus[b.order_status + 1] }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useAuthStore } from "../stores/useAuth";
import { useRouter } from "vue-router";
export default {
  setup() {
    const avaiableStatus = ref([
      "cancel",
      "confirmed",
      "preparing",
      "checking",
      "delivering",
      "delivered",
      "completed",
    ]);

    const allOrder = ref([]);
    const showOrderDetails = ref(false);
    const sendId = ref(undefined);
    const interval = ref("");

    const users = useAuthStore();
    const admin = users.admin;
    const setAdmin = users.setAdmin;
    const router = useRouter();

    const getAllOrders = async () => {
      allOrder.value = (await axios.get("/orderstatus")).data;
    };

    const filterOrders = computed(() => {
      return allOrder.value.filter(
        (b) => b.order_status < 6 && b.order_status > 0
      );
    });

    const sendBillId = (id) => {
      sendId.value = id;
      showOrderDetails.value = !showOrderDetails.value;
    };

    const closeView = () => {
      showOrderDetails.value = !showOrderDetails.value;
    };

    const handleLogout = () => {
      setAdmin("");
    };

    const nextStatusBtn = async (id) => {
      await axios.put("/orderstatus/" + id);
      getAllOrders();
    };

    const paidBtn = async (id) => {
      await axios.put("/orderstatus/paid/" + id);
      getAllOrders();
    };
    const cancelBtn = async (id) => {
      await axios.put("/orderstatus/cancel/" + id);
      getAllOrders();
    };
    const autoUpdate = () => {
      interval.value = setInterval(
        function () {
          getAllOrders();
        }.bind(this),
        1000
      );
    };

    onMounted(() => autoUpdate());
    onBeforeUnmount(() => clearInterval(interval.value));

    if (!admin) {
      router.push("/");
    }

    return {
      avaiableStatus,
      setAdmin,
      admin,
      filterOrders,
      getAllOrders,
      sendBillId,
      closeView,
      handleLogout,
      nextStatusBtn,
      paidBtn,
      cancelBtn,
      autoUpdate,
    };
  },
};
</script>

<style scoped>
.admin-container {
  background-color: #fff;
  height: 100vh;
  padding: 2rem 9%;
  font-size: 16px;
}
.project-list > tbody > tr > td {
  padding: 12px 8px;
}
.project-list > tbody > tr > td .avatar {
  width: 22px;
  border: 1px solid #ccc;
}
.table-responsive {
  margin-top: 8vh;
}
.action-btn,
.cancel-btn,
.paid-btn {
  width: 100px;
  height: 25px;
  color: white;
  text-transform: capitalize;
}
.action-btn {
  background-color: #0da9ef;
  margin-right: 10px;
}
.cancel-btn,
.paid-btn {
  background-color: red;
}
.action-btn:hover {
  background-color: #27ae60;
}
</style>
