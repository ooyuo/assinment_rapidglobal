import axios from "axios";
import { useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";

let clientAccessToken = "";
const getClientTokenURL = `http://ec2-52-79-228-35.ap-northeast-2.compute.amazonaws.com:8002/api/v1/auth/login`;

const getClientToken = async (id, pw) => {
  const response = await axios
    .post(getClientTokenURL, { name: id, password: pw })
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.response);
    });
  return response;
};

export default function GetAccessToken(id, pw) {
  const navigate = useNavigate();
  let clientAccessToken = "";
  const response = useQuery(
    "clientToken",
    async (id, pw) => {
      const response = await axios.post(getClientTokenURL, {
        name: id,
        password: pw,
      });
    },
    {
      onSuccess: (response) => {
        console.log(response);
        // clientAccessToken = response.access_token;
        navigate("/", { state: { clientAccessToken } });
      },
      onError: (error) => {
        console.log(error);
      },
    },
  );
}
