export default async function selectCity() {
  try {
    const response = await fetch("http://localhost:8000/api/branch/", {
      method: "GET",
    });

    if (response.ok) {
      const responseData = await response.json();
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
