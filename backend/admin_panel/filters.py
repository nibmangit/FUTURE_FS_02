import django_filters
from store.models import Product
from orders.models import Order

# 1. Custom Filter Class for Date Ranges
class OrderFilter(django_filters.FilterSet): 
    date = django_filters.DateFilter(field_name="created_at", lookup_expr='date')
    start_date = django_filters.DateFilter(field_name="created_at", lookup_expr='date__gte')
    end_date = django_filters.DateFilter(field_name="created_at", lookup_expr='date__lte')

    class Meta:
        model = Order
        fields = ['status', 'date', 'start_date', 'end_date']
        
        
class AdminProductFilter(django_filters.FilterSet): 
    min_stock = django_filters.NumberFilter(field_name="stock", lookup_expr='gte')
    max_stock = django_filters.NumberFilter(field_name="stock", lookup_expr='lte') 
    out_of_stock = django_filters.BooleanFilter(method='filter_out_of_stock')
    
    # Category filter (by ID)
    category = django_filters.UUIDFilter(field_name="category__id")

    class Meta:
        model = Product
        fields = ['category', 'min_stock', 'max_stock']

    def filter_out_of_stock(self, queryset, name, value):
        if value:
            return queryset.filter(stock=0)
        return queryset