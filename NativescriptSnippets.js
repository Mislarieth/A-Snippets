/*


*/


/*
  for navigating to a new page
*/

var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
topmost.navigate("views/register/register");


/*
  for getting the UI elements on a page by ID
*/
var page;
var email;
exports.loaded = function(args){
  page=args.object;
  email=page.getViewById("email");
}

/*
  for array data-binding
*/
var page;
var pageData = new observableModule.fromObject({
    groceryList: new ObservableArray([
        { name: "eggs" },
        { name: "bread" },
        { name: "cereal" }
    ])
});
exports.loaded = function(args) {
    page = args.object;
    page.bindingContext = pageData;
};
