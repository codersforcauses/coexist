export default async function addEvent(data: any) {
  //let test = JSON.stringify(data, null);
  //alert(test);
  /*let data_time = `${data.date}T${data.time}:00Z`;
  if (data.paymenturl === "") {
    data.paymenturl = "N/A";
  }*/

  try {
    const response = await fetch("http://localhost:8000/api/event/", {
      method: "POST",
      body: data,
    });

    if (response.ok) {
      const responseData = await response.json();
      return true;
    } else {
      alert("Failed to add event");
      return false;
    }
  } catch (error) {
    alert(error);
    return false;
  }
}
