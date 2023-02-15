from rest_framework.response import Response
from rest_framework.decorators import api_view
from .utils import getUrlsList, createUrl, updateUrl, deleteUrl, redirectToMainLink

@api_view(['GET', 'POST'])
def getUrls(request):

    if request.method == 'GET':
        return getUrlsList(request)

    if request.method == 'POST':
        return createUrl(request)


@api_view(['GET', 'PUT', 'DELETE'])
def getUrl(request, pk):

    if request.method == 'PUT':
        return updateUrl(request, pk)

    if request.method == 'DELETE':
        return deleteUrl(request, pk)

def redirectToLink(request, url):
    return redirectToMainLink(url)

