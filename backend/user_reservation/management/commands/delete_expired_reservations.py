from django.core.management.base import BaseCommand
from django.utils import timezone
from admin_reservation.models import ReservationModel

class Command(BaseCommand):
    help = "Delete expired reservation"

    def handle(self, *args, **options):
        now = timezone.now()
        res = ReservationModel.objects.filter(expiry_date__lt=now)
        
        for i in res:
            i.status = "expired"
        i.save()
        self.stdout.write("Expired items status changed")