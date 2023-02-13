import { ref } from "vue";
import { useAuthStore } from "../stores/useAuth";

export default function () {
  const foods = ref([]);
  const matchUser = ref(undefined);
  const users = useAuthStore();

  const getAllFoods = async () => {
    try {
      const res = await axios.get(`/foods`);
      foods.value = res.data;
    } catch (e) {
      console.log(e);
    }
  };

  const getMatchUser = async (email) => {
    try {
      let resData = await axios.get(`/users/` + email);
      matchUser.value = resData.data;
    } catch (e) {
      console.log(e);
    }
  };

  return {
    foods,
    getAllFoods,
    getMatchUser,
    matchUser,
  };
}
