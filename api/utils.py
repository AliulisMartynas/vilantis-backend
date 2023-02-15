from rest_framework.response import Response
from .models import Url
from .serializers import UrlSerializer
import random
import string
from django.shortcuts import redirect

def shorten(url):
    random_hash = ''.join(random.choice(string.ascii_uppercase + string.ascii_lowercase + string.digits) for _ in range(5))
    try:
        existingUrl = Url.objects.get(shortened_value=random_hash)
        shorten(url)
    except Url.DoesNotExist:
        return 'http://127.0.0.1:8000/shrt/'+random_hash        

def getUrlsList(request):
    urls = Url.objects.all()
    serializer = UrlSerializer(urls, many=True)
    return Response(serializer.data)

def createUrl(request):
    data = request.data
    url = Url.objects.create(
        value=data['body'],
        shortened_value = shorten(data['body']),
        number_of_clicks=0,
        active=True
    )
    serializer = UrlSerializer(url, many=False)
    return Response(serializer.data)

def updateUrl(request, pk):
    data = request.data
    url = Url.objects.get(id=pk)
    if data['active'] == True and data['number_of_clicks'] == 5:
        data['number_of_clicks'] = 0
    serializer = UrlSerializer(instance=url, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

def deleteUrl(request, pk):
    url = Url.objects.get(id=pk)
    url.delete()
    return Response('Url was deleted!')

def redirectToMainLink(url):
    url = Url.objects.get(shortened_value='http://127.0.0.1:8000/shrt/'+url)
    if url.number_of_clicks == 5:
        url.active = False
        url.save()

        return redirect('http://127.0.0.1:8000/#/url-not-active')
    
    if url.active == False:
        return redirect('http://127.0.0.1:8000/#/url-not-active')
    
    url.number_of_clicks = url.number_of_clicks + 1
    url.save()

    return redirect(url.value)