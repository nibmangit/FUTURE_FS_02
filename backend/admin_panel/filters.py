import django_filters
from store.models import Product
from orders.models import Order

from users.models import User

class AdminUserFilter(django_filters.FilterSet): 
    start_date = django_filters.DateFilter(field_name="date_joined", lookup_expr='gte')
    end_date = django_filters.DateFilter(field_name="date_joined", lookup_expr='lte')
     
    date_joined = django_filters.DateFilter(field_name="date_joined__date")
 
    search = django_filters.CharFilter(method='filter_search')

    class Meta:
        model = User
        fields = ['role', 'is_active', 'date_joined']

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            django_filters.db.models.Q(email__icontains=value) | 
            django_filters.db.models.Q(username__icontains=value) |
            django_filters.db.models.Q(first_name__icontains=value) |
            django_filters.db.models.Q(last_name__icontains=value)
        )
        
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