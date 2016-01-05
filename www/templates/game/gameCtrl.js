app.controller('GameCtrl', function($scope, $window, $timeout) {

  $scope.TurnoUsuario = false;
  $scope.valoresDefault = [1,2,3];
  var valoresCalculados = [];

  var innerWidth = $window.innerWidth;
  var innerHeight = $window.innerHeight;

  var valorOriginal = Aleatorio(20, 60);
  $scope.valorInestable = valorOriginal;

  $scope.percent = 100;
  $scope.options = {
      animate:{
          duration:1000,
          enabled:true
      },
      size: innerWidth/1.1,
      barColor:'#2C3E50',
      scaleColor:false,
      lineWidth:30,
      lineCap:'circle'
  };

  $scope.valoresDefault.forEach(function(item){
    valoresCalculados.push(reglaDeTres(valorOriginal, item));
  });
  console.log(valoresCalculados);
  function reglaDeTres(arg0, arg1){
      return  (arg1*100)/arg0;
  }

  function Aleatorio(inferior, superior){
    return (Math.round(Math.random()*(superior-inferior)))+inferior;
  }

  function minusCpu(val){
    console.log(val + '  ->  '+ valoresCalculados[val-1]);
    console.log('------------------------------Porcentaje---------------------------');
    console.log($scope.percent +'-'+valoresCalculados[val-1]);
    if($scope.valorInestable > 0){
      $scope.valorInestable -= val;
      if($scope.percent!=0)
        $scope.percent -= valoresCalculados[val-1];//reglaDeTres(valorOriginal, val);
      console.log('='+$scope.percent);
      $scope.TurnoUsuario = true;
    }
    console.log('------------------------------End Porcentaje---------------------------');
  }

  function runCpu(){
    $timeout(function() {
      var valor = ($scope.valorInestable - 1) % (3+1);
      minusCpu(valor);
    }, 500);
  }

  function DecidirTurno (){
    if ($scope.valorInestable % (3+1)==1) {
      $scope.TurnoUsuario = true;
    }else {
      $scope.TurnoUsuario= false;
      runCpu();
    }
  }

  $scope.minus = function(val, index){
    console.log(val + '  ->  '+ valoresCalculados[index]);
    console.log('------------------------------Porcentaje---------------------------');
    console.log($scope.percent +'-'+valoresCalculados[index]);

    if($scope.valorInestable > 0 && $scope.TurnoUsuario){
      $scope.valorInestable -= val;
      if($scope.percent!=0)
        $scope.percent -= valoresCalculados[index];//reglaDeTres(valorOriginal, val);
      console.log('='+$scope.percent);
      $scope.TurnoUsuario = false;
      runCpu();
    }
    console.log('------------------------------End Porcentaje---------------------------');
  }

  //INIT GAME
  DecidirTurno();

});
