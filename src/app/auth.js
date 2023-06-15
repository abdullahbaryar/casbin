import axios from "axios";

export const login = async (values, setUser, setLoading) => {
  setLoading(true);
  try {
    const response = await axios.post(
      "http://192.168.77.18:18044/api/usercasbinData/login",
      values
    );

    setLoading(false);
    localStorage.setItem("token", response?.data.token);
    setUser(response?.data?.data?.user);
    // manual();
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

export const manual = async (setmanual) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      "http://192.168.77.18:18044/api/policydata/getPolicy/user/manual",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setmanual(response?.data?.permission);
  } catch (error) {
    console.log(error);
  }
};

export const auto = async (setmaAuto) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(
      "http://192.168.77.18:18044/api/policydata/getPolicy/user/auto",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setmaAuto(response?.data?.permission);
  } catch (error) {
    console.log(error);
  }
};
