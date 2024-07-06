export default async function addEvent(data: FormData) {
  try {
    const response = await fetch("http://localhost:8000/api/event/", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      const responseData = await response.json();
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}
