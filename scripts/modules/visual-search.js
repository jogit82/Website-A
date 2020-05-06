define(['modules/jquery-mozu', 'hyprlivecontext'], function ($,HyprLiveContext) {
      //https://searchconfig-cdev.certonakube.kibo-dev.com/portal/start?accountId=kibo-11961&applicationId=16493&userId=joe.cool&sessionId=0&apiKey=49bd6667-8dee-4037-846c-743b5984b421&application=search
    
    var config = {
        "apiUrl": "https://searchapi-cqa.certonakube.kibo-dev.com/api/visualsearch/",
        "errorLogUrl": "https://searchapi-cdev.certonakube.kibo-dev.com/api/ApiLogs",
        "inputId": "mz-searchbox-input",
        "anchorElement":"mz-searchbox-field-dd",
        "appid":"k-16493",
        "catalogId":"k-16493-1",
        "trackingId": 999999999999,
        "apiKey":"78b7873e-a4b0-d011-9cea-f7a07ae14744",
        "scheme":"visualsearch1_rr",
        "numSuggestions":8,
        "numRecs":4,
        "suggestedContent": {
            "enable": true,
            "itemType": "type",
            "title": "title",
            "position": {
                "vertical": "bottom",
                "horizontal": "right"
              }
        },
        "attributeMappings":{
            "suggestion":{
                "name":"title",
                "detailUrl":"link",
                "itemId":"Account_Item_ID",
                "type": "type",
                "Account_Item_ID": "Account_Item_ID"
            },
            "recDetailLink":{
                "detailUrl":"link"
            },
            "recImage":{
                "name":"short_description",
                "imageUrl":"image_link"
            },
            "recName":{
                "name":"title"
            },
            "recPrice": {
                "currentPrice": "price"
            }
        },
        "arrangement":"vertical",
        "suggestionsPosition": "top",
        "itemsLayout":{
            "suggestions":"vertical",
            "recommendations":{
            "recLayout":"vertical",
            "contentView":"landscape"
            }
        },
        "recommendations.source":{
            "enable":true,
            "suggestions.field.name":"type",
            "suggestions.field.values":{
                "Product":{
                    "request.verb":"GET",
                    "request.url":"https://searchapi-cqa.certonakube.kibo-dev.com/api/visualsearch",
                    "request.api.rules":"certona",
                    "request.params":{
                        "searchTerm":{
                            "value":"suggestion.field.value",
                            "suggestion.field.name":"title"
                        },
                        "filters":[
                            {
                                "name":"type",
                                "values":[
                                    "Product",
                                    "product",
                                    "PRODUCT"
                                ]
                            }
                        ],
                        "returnFields":[
                            "title",
                            "image_link",
                            "short_description",
                            "price",
                            "link"
                        ],
                        "ignoregrouping":true
                    }
                },
                "Category":{
                    "request.verb":"GET",
                    "request.url":"https://searchapi-cqa.certonakube.kibo-dev.com/api/visualsearch",
                    "request.api.rules":"certona",
                    "request.params":{
                        "searchTerm":{
                            "value":"user.input"
                        },
                        "filters":[
                            {
                                "name":"type",
                                "values":[
                                    "Product"
                                ]
                            },
                            {
                                "name":"categoryid",
                                "values":[
                                    "filter.field.value"
                                ],
                                "filter.field.name": "Account_Item_ID"
                            }
                        ],
                        "returnFields":[
                            "item_name",
                            "categoryid",
                            "ImageURL"
                        ],
                        "ignoregrouping":true
                    }
                }
            }
        },
        templates: {
            suggestion: '<a class="tt-suggestion-wrapper tt-suggestion-wrapper-custom" href="/p/[[itemId]]/[[detailUrl]]" data-itemid="[[itemId]]" onmouseover="CertonaVisualSearch.suggestionHover(this)"><div class="tt-suggestion-text tt-suggestion-text-custom">[[name]]</div></a>'
        }   
    };
      var waitForCertonaVisualSearch = function() { //waitForCertonaVisualSearch([vsConfig path[, max # of tries[, interval]]])
        try {
            var args = Array.prototype.slice.call(arguments);
            var vsConfig = args[0];
            var counter = args[1] || 0;
            var interval = 200;
            counter += 1;
            args[1] = counter; //keeps track of # of tries
            if (typeof window.CertonaVisualSearch === "undefined") {
                window.setTimeout(function () {
            if (counter < 10) {
                waitForCertonaVisualSearch.apply(null, args); //no CertonaVisualSearch try again
            }
            }, interval);
            } else {
                window.CertonaVisualSearch.automatedTestVisualSearch(config);
        }
          } catch (ignore) {
              console.log('Fail on VS');
          }
        };
    $(document).ready(function () {
        var visualSearch = document.createElement("script");
        visualSearch.type = "text/javascript";
        visualSearch.async = true;
        visualSearch.src = "//s.certona.net/VisualSearch2/Production/CertonaVisualSearch.js";
        $("head").append(visualSearch);

        waitForCertonaVisualSearch();
    });


    return {

    };
});





