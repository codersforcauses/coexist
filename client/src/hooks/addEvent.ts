import api from "@/lib/api";

export default async function addEvent(data: FormData) {
  try {
    const response = await api.post("http://localhost:8000/api/event/", data);

    if (response.status == 201) {
      const responseData = await response.data;
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
