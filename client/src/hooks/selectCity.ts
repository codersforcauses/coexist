import api from "@/lib/api";

export default async function selectCity() {
  try {
    const response = await api.get("http://localhost:8000/api/branch/");

    if (response.status == 200) {
      const responseData = await response.data;
      if (responseData.results.length === 0) {
        return null;
      }
      return responseData.results;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
