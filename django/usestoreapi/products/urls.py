from django.urls import path
from .views import ProductListCreate, ProductDetail, RegisterView

urlpatterns = [
    path("products/", ProductListCreate.as_view(), name="product-list-create"),
    path("products/<int:pk>/", ProductDetail.as_view(), name="product-detail"),
    path("register/", RegisterView.as_view(), name="register"),
]
