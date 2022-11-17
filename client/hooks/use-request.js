import { useState } from "react";
import axios from "axios";

export default ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      setErrors(null);
      const { data } = await axios[method](url, body);
      return data;
    } catch (error) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Oooooooooopsssssss.....</h4>
          <ul className="my-0">
            {error.response.data.errors.map(err => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      );
    }
  };

  return { doRequest, errors };
};
