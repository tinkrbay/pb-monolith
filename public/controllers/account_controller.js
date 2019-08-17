var app = angular.module('Personal-Banking',['chart.js','ngCookies','ngRoute']);

app.controller('AccountController',['$scope','$http','$location','$cookies','LoginService',function($scope,$http,$location,$cookies, LoginService){


  $scope.accountbalancebg = {
    "color" : "white",
    "background-color" : "coral",
    "font-size" : "60px",
    "padding" : "50px"
};

//USER REGISTRATION & LOGIN###############################################



$scope.username="";
$scope.password="";
$scope.isError="";
$scope.login_href="";
$scope.showNoTransaction="";
$scope.showTransaction="";

$scope.newuser= {
};

$scope.register = function() {
$http({
          method  : 'POST',
          url     : 'http://localhost:3000/users',
          data    : $scope.newuser 
         })
 .success(function(response) {
$cookies.put("email",$scope.newuser.emailAddress)
$location.path('/welcome')
})
}

$scope.register_user = function() {
$location.path("/register")
}

$scope.login = function() {
    LoginService.Login($scope.username,$scope.password);
    $scope.isError = LoginService.isErrorValue;
}

$scope.sign_out = function() {
$cookies.remove('email');
}

//DISPLAY ACCOUNT BALANCE. NOTE THERE IS A LOT OF JUGGLERY HERE TO CREATE VARIABLES AND PUSH VALUES OF ID AND BALANCE
//THE NEW SCOPES CREATED ARE THEN REFERENCED IN TRANSFER FUNCTION TO UPDATE THE BALANCE USING PUT FUNCTION
//FIRST WE CREATE DUMMY VAR WITH BLANK 
//THEN USING ANGULAR.FOREACH WE EXTRACT VALUE AND USING VAR.PUSH WE RENDER/CACHE THE VALUES
//THEN WE CREATE SCOPES., NOTE THE NAME OF THESE SCOPES IS HAVING AN UNDERSCORE TO KEEP THEM DIFFERENT
//THESE SCOPES EQUATE TO THE VAR WHICH NOW CACHE THE VALUES
//THESE SCOPES ARE THEN REFERENCED LATER IN THE TRANSFER FUNCTION TO SUBSTRACT TRANSFER AMOUNT FROM THE VAR VALUE FOR BALANCE
//ALSO THE ID IS DERIVED AS A SCOPE USING THE VAR CACHE AS THIS ID IS REFERENCED FOR THE PUT FUNCTION
//AT THEN END OF IT THERE IS A THEN _SUCCESS WHICH IS A FUNCTION BY ITSELF TO EXECUTE CLEAR FORM
//ALSO NOTE THAT THIS PARTICULAR ACCOUNT BALANCE FUNCTION APPEARS IN NG INIT ON WELCOME PAGE TO INITIALIZE THE PAGE WITH THE BALANCE

$scope.account_balance = function() {
         $http.get('http://localhost:3000/balance/?myAccountId='+$cookies.get('email')).success(function(response) {             
         $scope.mybalance = response;
         var mybalanceid = [];
         var mybalance = [];
angular.forEach(response, function(value, key){
mybalanceid.push(value._id);
mybalance.push(value.myAccountBalance);
});
         $scope.my_balanceid= mybalanceid;
         $scope.my_balance=mybalance;
	             }).then(_success);
}

//ABOVE THE SCOPES ARE POPULATED WITH THE VAR VALUES AND IN THE BELOW THESE ARE EMPTY INDICATING VALUES RECEIVED
//NOTE THE EMPTY VARS ARE OUTSIDE THE ACCOUNT BALANCE FUNCTION, WHICH MEANS THEY CAN BE CALLED IN ANY OTHER FUNCTION
//THIS IS AN IMPORTANT TRICK TO EXPORT DATA VALUES FROM ONE FUNCTION TO ANOTHER
//THE BELOW WILL EXTRACT ID FROM THE ABOVE VAR AND PUSH COMBINATIONS WHICH WILL BE USED IN THE THEN FUNCTION FOR TRANSFER

$scope.my_balanceid = '';
$scope.my_balance = '';

// THE ABOVE COMPLETES THE ACCOUNT BALANCE


// NOW FOR THE ADD AND EDIT PAYEE#################################################
//Add Edit Payee (note: In scope.form it's id and in scope.form.id its _id ..tried making id for scope.form.id and it failed
//Note the use of if else for submit button, wherein based on id being -1 or not either it will be a post or put
//Note the use of location.reload which will refresh the page to the same location
//Also when the location returns it will invoke the get function and within that function we clear the form

//SCOPE.FORM IS THE ACTUAL REPRESENTATION OF VALUES TO BE PASSED ON TO THE EDIT FUNCTION
//HOWEVER SCOPE.FORM RECEIVES ITS VALUES FROM A FUNCTION SCOPE.EDITPAYEE WHICH EQUATES THE SCOPE.FORM.SUBFIELDS TO THE 
//VALUES IN THE PAYEE TABLE. THE TRICK IS THAT WHICH EDIT HYPERLINK IS CLICKED IT INVOKES THE EDITPAYEE FUNCTION AND
//RFERENCES THE VALUES IN THE PAYEE TABLE, WHICH ARE THEN EQUATED VIA THIS FUNCTION TO SCOPE.FORM.SUBFIELDS
//THEREAFTER THE SUBFIELDS INHERIT THE VALUES AND CAN BE PASSED ON THE THE SCOPE.FORM FUNCTION
               
		    $scope.form = {
                    id : -1,
                    payeeName : "",
                    payeeBank : "",
                    payeeAccountId : "",
		    payeeAddress: $cookies.get('email'),		
                };

                $scope.editPayee = function(payee) {
                    $scope.form.payeeName = payee.payeeName;
                    $scope.form.payeeBank = payee.payeeBank;
                    $scope.form.payeeAccountId = payee.payeeAccountId;
                    $scope.form.id = payee._id;
		    $scope.form.payeeAddress = payee.payeeAddress;
                };


                $scope.submitPayee = function() {
         
                    var method = "";
                    var url = "";
                    if ($scope.form.id == -1) {
                        //Id is absent so add employee - POST operation
                        method = "POST";
                        url = 'http://localhost:3000/payee';
                    } else {
                        //If Id is present, it's edit operation - PUT operation
                        method = "PUT";
                        url = 'http://localhost:3000/payee/' + $scope.form.id;
                    }

                    $http({
                        method : method,
                        url : url,
                        data : $scope.form,

                    }).success(function(response) {
location.reload()
});
}

// REMOVE DELETE PAYEE. ##################################################
//ON LOCATION RELOAD THE GET FUNCTION IS AGAIN INVOKED AS WELCOME.HTML IS INVOKED LEADING TO GET FUNCTION. 
//THIS WILL ALSO CLEAR THE FORM AND REFETCH THE UPDATED LIST OF PAYEES
//ALSO NOTE THE USE OF PAYEE._ID AS AN EXTENSION TO THE URL. SINCE THE URL CLICK HAPPENS OVER PAYEE TABLE 
//THE FIELD PAYEE._ID IS REFERENCED FROM THE PAYEE TABLE ITSELF

                $scope.removePayee = function(payee) {
                    $http({
                        method : 'DELETE',
                        url : 'http://localhost:3000/payee/' + payee._id
                    }).success(function(response) {
location.reload()
});
}

//FUNCTION TO CLEAR EVERYTIME WELCOME.HTML IS LOADED OR RELOADED TYPICALLY AFTER ADD EDIT DELETE

                function _success(response) {
                    _clearForm()
                }
         
                //Clear the form
                function _clearForm() {
                    $scope.form.firstName = "";
                    $scope.form.lastName = "";
                    $scope.form.email = "";
                    $scope.form.id = -1;
					$scope.payform.payeeName = "";
                    $scope.payform.payeeBank = "";
                    $scope.payform.payeeAccountId = "";
			        $scope.payform.id = -1;
					$scope.payform.payeeTransferAmount = "";
			        $scope.payform.payeeTransferDate = "";
                }
         

//DISPLAY PAYEES. HEREIN WE HAVE ALSO ADDED A SCOPE.WELCOME AND RETRIEVING THE SET COOKIE TO SET AS A WELCOME NAME MESSAGE.

$scope.init_payee = function() {
         $http.get('http://localhost:3000/payee/?payeeAddress='+$cookies.get('email')).success(function(response) {             
         $scope.payees = response;
	 $scope.welcome = $cookies.get('email');
            }).then(_success);
}

//TRANSFER TO PAYEES####################
//THIS WAS THE MOST BRUTAL FOR ME TO BUILD
//NOTE THE CHAINED FUNCTION
//FIRST WE INVOKE THIS FUNCTION VIA THE TRANSFER HYPERLINK
//SIMILAR TO EDIT FUNCTION, THE MAIN TRANSFER FUNCTION DERIVES ITS VALUES FROM THE PAYEE TABLE
//THE PAYEE TABLE FIELDS ARE PASSED ON TO THE TRANSFER FORM VIA  SCOPE.TRANSFERTOPAYEE FUNCTION
//WHICH SETS VALUES FOR SUBFIELDS USED IN SCOPE.PAYFORM
//THE SCOPE.PAYFORM ALONG WITH ITS DERIVED SUBFIELDS IS THEN USED FOR TRANSFER FUNCTION
//THE TRANSFER FUNCTION ALSO NEEDS TO UPDATE THE ACCOUNT BALANCE
//HEREIN WE RUN A THEN FUNCTION WHEREIN WE DEFINE VARIABLES USING PARSEFLOAT METHOD
//NOTE HEREIN WE ARE REFERENCING THE SCOPE.MY_BALANCE WHICH NOW HAS THE VALUE OF BALANCE DERIVED IN THE ACCOUNT BALANCE FUNCTION
//THE UPDATEDBALANCE VARIABLE SUBSTRACTS THE VALUES
//NEXT WE CONSTRUCT THE URL WITH AN ID PARAMETER WHICH IS ALSO A DERIVATION FROM THE ACCOUNT BALANCE FUNCTION
//NEXT WE CONSTRUCT A DUMMY SCOPE THAT WILL HOLD THE UPDATEDBALANCE DATA AND THE ID OF THE ACCOUNTBALANCE ENTRY
//THIS SCOPE VARIABLE IS PASSED AS A DATA SET TO THE PUT FUNCTION WHICH IS A "THEN" CHAINED FUNCTION


		    $scope.payform = {
                    id : "",
                    payeeName : "",
					payeeEmail: "",
                    payeeBank : "",
                    payeeAccountId : "",
		    payeeTransferAmount: "",
			payeeTransferDate: "",
			myAccountId: $cookies.get('email'),
			
                };

                $scope.transferToPayee = function(payee) {
                    $scope.payform.payeeName = payee.payeeName;
                    $scope.payform.payeeBank = payee.payeeBank;
                    $scope.payform.payeeAccountId = payee.payeeAccountId;
			        $scope.payform.id = payee._id;
                };

$scope.payPayee = function() {
$http({
          method  : 'POST',
          url     : 'http://localhost:3000/transfer',
          data    : $scope.payform 
         })
 .then (function success(response) {
var transfer = parseFloat($scope.payform.payeeTransferAmount);
var currentbalance = parseFloat($scope.my_balance);
var updatedbalance = currentbalance - transfer;
$scope.myAccountBalance = {
myAccountBalance : updatedbalance,
_id : $scope.my_balanceid,

};
var mybalanceid = mybalanceid;
$http({
          method  : 'PUT',
          url     : 'http://localhost:3000/balance/'+$scope.my_balanceid,
          data    : $scope.myAccountBalance
         }) 
})
.then (function success(response) {
location.reload()
});
}

//READ ACCOUNT TRANSACTIONS#############
//THIS IS RERENCED AS A NG INIT IN THE WELCOME PAGE AND IS USED TO BUILD A TABLE OF TRANSACTIONS BY DOING A GET ON THE RESPECTIVE SCHEMA
//THE SCHEMA WAS POPULATED DURING THE TRANSFER HTTP POST FUNCTION
//NOW WE ARE RETRIEVING THOSE VALUES VIA A GET FUNCTION AND POPULATING A TABLE
//NOTE THE USE OF COOKIES

$scope.account_transactions = function() {
         $http.get('http://localhost:3000/transfer/?myAccountId='+$cookies.get('email')).success(function(response) {             
         $scope.mytransactions = response;
	             }).then(_success);
}

//END OF ACCOUNT TRANSACTIONS

$scope.home_link = function() {
    console.log($cookies.get('email'))
    if($cookies.get('email')==null){
$location.path("/")
    }
    else {
$location.path("/welcome")
}
}

}]);

//LOGIN SERVICE

app.factory('LoginService',
    ['$http', '$cookies', '$rootScope','$location',
    function ($http, $cookies, $rootScope,$location) {
        var service = {};

        service.Login = function (username, password) {

$http.get('http://localhost:3000/users/?userId='+username).success(function(response) {
if(response != null && angular.fromJson(response).password==password){
    $cookies.put("email",username)
    $location.path("/welcome")
}
else {
    $rootScope.isError=true 
}
})
        };

        service.isErrorValue = function() {
            return $rootScope.isError;
        }

 
        return service;
    }])


//ROUTE PROVIDER CONFIGURATION

app.config(function($routeProvider) {
        $routeProvider
            .when('/welcome', {
                templateUrl : 'welcome.html',
                controller : 'AccountController'
            })
            .when('/register', {
                templateUrl : 'register.html',
                controller : 'AccountController'
            })
             .otherwise({
                templateUrl : 'login.html',
                controller : 'AccountController'
            });

    });
