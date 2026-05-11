from django.shortcuts import render
from .tasks import add


def addition(request):

    result = add.delay(10, 20)

    print(result.id)

    return render(request, "order.html")
