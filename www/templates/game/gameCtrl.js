app.controller('GameCtrl', function($scope, $window, $timeout) {

  $scope.btnOne = '1';
  $scope.btnTwo = '2';
  $scope.btnThree = '3';
  $scope.TurnoUsuario = false;

  var innerWidth = $window.innerWidth;
  var innerHeight = $window.innerHeight;

  var valorOriginal = Aleatorio(20, 60);
  $scope.valorInestable = valorOriginal;

  function reglaDeTres(arg0, arg1){
      return  Math.round((arg1*100)/arg0);
  }

  function Aleatorio(inferior, superior){
    return (Math.round(Math.random()*(superior-inferior)))+inferior;
  }

  function minusCpu(val){
    if($scope.valorInestable > 0){
      $scope.valorInestable -= val;
      $scope.percent -= reglaDeTres(valorOriginal, val);
      $scope.TurnoUsuario = true;
    }
  }

  function runCpu(){
    $timeout(function() {
      var valor = ($scope.valorInestable - 1) % (3+1);
      console.log(valor);
      minusCpu(valor);
    }, 1000);
  }

  function DecidirTurno (){
    if ($scope.valorInestable % (3+1)==1) {
      $scope.TurnoUsuario = true;
    }else {
      $scope.TurnoUsuario= false;
      runCpu();
    }
  }

  //INIT GAME
  DecidirTurno();

  $scope.percent = 100;
  $scope.options = {
      animate:{
          duration:2000,
          enabled:true
      },
      size: innerWidth/1.1,
      barColor:'#2C3E50',
      scaleColor:false,
      lineWidth:30,
      lineCap:'circle'
  };

  $scope.minus = function(val){
    if($scope.valorInestable > 0 && $scope.TurnoUsuario){
      $scope.valorInestable -= val;
      $scope.percent -= reglaDeTres(valorOriginal, val);
      $scope.TurnoUsuario = false;
      runCpu();
    }
  }
});
