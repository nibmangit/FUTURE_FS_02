from rest_framework import serializers
from cloudinary.uploader import destroy
from store.models import Product, Category


class AdminCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug"]


class AdminProductSerializer(serializers.ModelSerializer):
    category = AdminCategorySerializer(read_only=True)
    category_id = serializers.UUIDField(write_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["id", "title", "description", "category", "category_id", "price", "stock", "image", "created_at", ]
 
    # READ IMAGE 
    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None
 
    # VALIDATION 
    def validate_stock(self, value):
        if value < 0:
            raise serializers.ValidationError("Stock cannot be negative")
        return value
 
    # CREATE PRODUCT 
    def create(self, validated_data):
        category_id = validated_data.pop("category_id")
        category = Category.objects.get(id=category_id)

        image = self.context["request"].FILES.get("image")

        product = Product.objects.create(
            category=category,
            image=image,
            **validated_data
        )

        return product
 
    # UPDATE PRODUCT 
    def update(self, instance, validated_data):
        category_id = validated_data.pop("category_id", None)

        # update category if provided
        if category_id:
            instance.category = Category.objects.get(id=category_id)

        new_image = self.context["request"].FILES.get("image")

        # delete old image if new one is uploaded
        if new_image and instance.image:
            try:
                destroy(instance.image.public_id)
            except Exception:
                pass

            instance.image = new_image

        return super().update(instance, validated_data)