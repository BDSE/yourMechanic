(function () {
    $('#datepicker').datepicker();
}());

var taskApp = angular.module("tasks", ["ngRoute"]);

taskApp.service("myService", function(){
    this.id = 0;
});

taskApp.controller("controllerMain", ["$scope","$timeout","myService" ,function ($scope,$timeout,myService) {

    $scope.timer = "00.00";
    $scope.counter = 0;
    $scope.list = false;
    $scope.calendar = false;
    $scope.showTick = false;
    $scope.taskData = [
        {
            taskName: 'Prepare for Interview',
            priority: 'high',
            date: '7/14/2017',
            timer: '6000',
            status: 'pending'
         },
        {
            taskName: 'Prepare documents',
            priority: 'moderate',
            date: '7/14/2017',
            timer: '10000',
            status: 'pending'
        },
        {
            taskName: 'Pay bills',
            priority: 'high',
            date: '7/14/2017',
            timer: '60000',
            status: 'pending'
        },
        {
            taskName: 'Wash the car',
            priority: 'low',
            date: '7/14/2017',
            timer: '70000',
            status: 'pending'
        },
        {
            taskName: 'Go for workout',
            priority: 'high',
            date: '7/14/2017',
            timer: '60000',
            status: 'pending'
        }
    ]

    $scope.taskListlen = $scope.taskData.length;
    
    $scope.additionalInfo = function (id) {
        $scope.showTick = true;
        var timer = $scope.taskData[id].timer;
        myService.id = id;
        $scope.timer = timer;
        if($scope.counter == 0){
            $("#"+id).removeClass("hide");
            $scope.counter = 1;
        }else{
             $("#"+id).addClass("hide");
            $scope.counter = 0;
        }
    }
    
    $scope.showCalendar = function(){
        if($scope.taskName){
            $scope.calendar = true;
        }else{
            $scope.error_task = true;
        }
    }
    
    $scope.startTimer = function(){
        $(".circle").hide();
        $scope.list=  false;
        var id = myService.id;
        var bar = new ProgressBar.Circle(container, {
            strokeWidth: 2,
            duration: $scope.timer,
            color: '#E1293B',
            trailColor: '#fff',
            trailWidth: 1,
            svgStyle: null
        });
        bar.animate(1.0);
        $timeout(function(){
            console.log("Task....Done");
            bar = null;
            $("body svg").remove();
             $(".circle").show();
            $scope.error_task_done = true;
            $scope.showTick = false;
            $scope.taskData[id].status = "complete";
        },$scope.timer);
    }
    
    $scope.addTask = function(){
        var date = $('#datepicker').datepicker('getDate').toString().split(" ");
        date = date[1]+" "+date[2]+" "+ date[3];
        var taskName = $scope.taskName;
        
        var taskObj = {
            taskName: $scope.taskName,
            priority: 'high',
            date: date,
            timer: '60000',
            status: 'pending'
        }
        
        $scope.taskData.push(taskObj);
         $scope.taskListlen = $scope.taskData.length;
        $scope.calendar = false;
    }

}]);






taskApp.config(function ($routeProvider) {

    $routeProvider
        .when('/calendar', {

        })
        .when('/addTask', {

        })

});