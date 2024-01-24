from django.utils import timezone

# Get the current time in the server's time zone
def current_time_specific():
    current_time_server_tz = timezone.now()

    # Convert to a specific time zone (e.g., 'Canada/Pacific')
    current_time_pacific_tz = current_time_server_tz.astimezone(timezone.get_current_timezone())

    return current_time_pacific_tz
