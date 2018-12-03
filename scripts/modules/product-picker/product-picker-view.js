define(["modules/jquery-mozu", "modules/backbone-mozu", "modules/product-picker/product-modal-view", "modules/models-product", "modules/search-autocomplete"], function ($, Backbone, ProductModalViews, ProductModels, SearchAutoComplete) {
    var productPickerModel = Backbone.MozuModel.extend({
        relations: {
            selectedProduct: ProductModels.Product
        },
        defaults: {
            selectedProduct: ProductModels.Product.extend({})
        }
    });
    
    var productPickerView = Backbone.MozuView.extend({
        templateName: 'modules/product-picker/product-picker',
        initialize: function () {
            var self = this;
            this.listenTo(this.model, "configurationComplete", function (product) {
                self.trigger('productSelected', product);
            });
        },
        render: function(){
            Backbone.MozuView.prototype.render.apply(this, arguments);
            var self = this;
            self.model.set('selectedProduct', new ProductModels.Product({}));
            var productModalView = new ProductModalViews.ModalView({
                el: self.$el.find("[mz-modal-product-dialog]"),
                model: self.model.get('selectedProduct'),
                messagesEl: self.$el.find("[mz-modal-product-dialog]").find('[data-mz-message-bar]')
            });
            self._productConfigurationView = productModalView;
            productModalView.render();

            var $fields = self.$el.find('[data-mz-role="searchquery"]').each(function (field) {
                var search = new SearchAutoComplete();
                search.initialize();

                var $field = search.AutocompleteManager.$typeaheadField = $(this);

                search.AutocompleteManager.typeaheadInstance = $field.typeahead({
                    minLength: 0
                }, search.dataSetConfigs).data('ttTypeahead');
                $field.on('typeahead:selected', function (e, data, set) {
                    var product = data.suggestion;
                    self.model.set('selectedProduct', product);
                    if (product.options) {
                        productModalView.setInit();
                        return;
                    }
                    self.model.trigger('productSelected', product);
                    
                    // window.console.log('Add Product ' + data.suggestion.productCode);
                });
            });
        }
    });
    return productPickerView;
});