from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from cloudinary.uploader import destroy

from store.models import Product, Category
from admin_panel.serializers.product_admin import AdminProductSerializer, AdminCategorySerializer
from admin_panel.permissions import IsAdminOrStaff

class AdminProductListCreateView(generics.ListCreateAPIView):
    """
    Handles GET (list) and POST (create) for Products.
    Sorting and request context are handled automatically.
    """
    queryset = Product.objects.all().order_by("-created_at")
    serializer_class = AdminProductSerializer
    permission_classes = [IsAuthenticated, IsAdminOrStaff]


class AdminProductDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Handles GET (detail), PATCH/PUT (update), and DELETE.
    """
    queryset = Product.objects.all()
    serializer_class = AdminProductSerializer
    permission_classes = [IsAuthenticated, IsAdminOrStaff]

    def perform_destroy(self, instance):
        # override this specific hook to handle Cloudinary cleanup
        if instance.image:
            try:
                destroy(instance.image.public_id)
            except Exception:
                pass
         
        instance.delete()
 

class AdminCategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all().order_by("name")
    serializer_class = AdminCategorySerializer
    permission_classes = [IsAuthenticated, IsAdminOrStaff]
    pagination_class = None

class AdminCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = AdminCategorySerializer
    permission_classes = [IsAuthenticated, IsAdminOrStaff]