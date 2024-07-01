export default async function addEvent(data: any) {
  //let test = JSON.stringify(data, null);
  //alert(test);
  let data_time = `${data.date}T${data.time}:00Z`;
  if (data.paymenturl === "") {
    data.paymenturl = "N/A";
  }

  try {
    const response = await fetch("http://localhost:8000/api/event/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: `{"title": "${data.title}", "description": "${data.description}", "date_time": "${data_time}", "location": "${data.location}", "payment_link": "${data.paymenturl}"}`,
    });

    if (response.ok) {
      const responseData = await response.json();
      alert("Event added successfully");
    } else {
      alert("Failed to add event");
    }
  } catch (error) {
    alert(error);
  }
}
