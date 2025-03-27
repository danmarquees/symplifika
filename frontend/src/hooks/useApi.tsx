import { useState, useEffect } from "react";
import api from "../services/api";

function useApi(url: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(url).then((response) => {
      setData(response.data);
      setLoading(false);
    });
  }, [url]);

  return { data, loading };
}

export default useApi;
