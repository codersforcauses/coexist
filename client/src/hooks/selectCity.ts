export default async function selectCity() {
  try {
    const response = await fetch("http://localhost:8000/api/branch/", {
      method: "GET",
    });

    if (response.ok) {
      const responseData = await response.json();
      return responseData.results;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
