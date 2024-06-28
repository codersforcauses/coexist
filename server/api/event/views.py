from rest_framework.decorators import api_view
from django.http import HttpResponse
from models import Event


@api_view(["GET"])
def ping(request):
    return HttpResponse("Pong!", status=200)


@api_view(["POST"])
def create_event(request):
    if request.method == "POST":
        data = request.data

        # Create a new event object with data from the request
        event = Event(
            title=data.get("title"),
            description=data.get("description"),
            image=data.get("image"),
            date_time=data.get("date_time"),
            location=data.get("location"),
            branch_id=data.get("branch_id"),
            is_cancelled=data.get("is_cancelled", False)
        )

        event.save()

    return HttpResponse("Event created successfully", status=201)


@api_view(["GET"])
def get_event(request, event_id):
    # TODO: Logic for this view
    return HttpResponse(f"Event id {event_id}", status=200)


@api_view(["PUT"])
def update_event(request, event_id):
    # TODO: Logic for this view
    return HttpResponse(f"Event {event_id} updated successfully", status=200)
